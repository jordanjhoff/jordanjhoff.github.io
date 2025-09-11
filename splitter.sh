#!/bin/bash

# CSS File Splitter Script
# Automatically organizes a monolithic CSS file into component-based structure

set -e  # Exit on any error

# Configuration
SOURCE_FILE="css/styles.css"
OUTPUT_DIR="css"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if source file exists
if [[ ! -f "$SOURCE_FILE" ]]; then
    print_error "Source file $SOURCE_FILE not found!"
    exit 1
fi

print_status "Starting CSS file organization..."
print_status "Source: $SOURCE_FILE"
print_status "Output directory: $OUTPUT_DIR"

# Create directory structure
create_directories() {
    print_status "Creating directory structure..."
    
    mkdir -p "$OUTPUT_DIR/base"
    mkdir -p "$OUTPUT_DIR/layout"
    mkdir -p "$OUTPUT_DIR/components"
    mkdir -p "$OUTPUT_DIR/pages"
    
    print_success "Directory structure created"
}

# Extract CSS sections based on comments and selectors
extract_section() {
    local input_file="$1"
    local output_file="$2"
    local section_pattern="$3"
    local description="$4"
    
    print_status "Extracting $description..."
    
    # Create header for the file
    cat > "$output_file" << EOF
/* 
 * $description
 * Auto-generated from $SOURCE_FILE
 * Generated on: $(date)
 */

EOF
    
    # Extract the section using awk
    awk -v pattern="$section_pattern" '
    BEGIN { in_section=0; buffer=""; found=0 }
    
    # Start of section detection
    /^\/\*.*/ && tolower($0) ~ tolower(pattern) { 
        in_section=1; 
        found=1;
        print $0;
        next;
    }
    
    # CSS rule detection (selector + opening brace)
    /^[^\/\*].*{/ && tolower($0) ~ tolower(pattern) {
        in_section=1;
        found=1;
        brace_count=1;
        print $0;
        next;
    }
    
    # Continue extracting if in section
    in_section {
        print $0;
        
        # Count braces to know when section ends
        gsub(/[^{]/, "", temp1); brace_open = length(temp1=$0);
        gsub(/[^}]/, "", temp2); brace_close = length(temp2=$0);
        
        if (brace_open > 0) brace_count += brace_open;
        if (brace_close > 0) brace_count -= brace_close;
        
        # End section when braces balance or empty line after comment block
        if ((brace_count <= 0 && found) || (/^$/ && substr(prev_line,1,2) == "*/")) {
            in_section=0;
            print "";
        }
    }
    
    { prev_line = $0 }
    ' "$input_file" >> "$output_file"
    
    # Check if anything was extracted
    if [[ $(wc -l < "$output_file") -gt 6 ]]; then
        print_success "Extracted $description to $output_file"
    else
        print_warning "No content found for $description"
    fi
}

# Extract multiple sections with patterns
extract_multi_section() {
    local input_file="$1"
    local output_file="$2"
    local description="$3"
    shift 3
    local patterns=("$@")
    
    print_status "Extracting $description..."
    
    # Create header
    cat > "$output_file" << EOF
/* 
 * $description
 * Auto-generated from $SOURCE_FILE
 * Generated on: $(date)
 */

EOF
    
    # Extract each pattern
    for pattern in "${patterns[@]}"; do
        awk -v pattern="$pattern" '
        BEGIN { in_section=0; brace_count=0 }
        
        # Match selectors or comments
        (tolower($0) ~ tolower(pattern) && /^[^\/\*].*{/) || 
        (tolower($0) ~ tolower(pattern) && /^\/\*/) {
            in_section=1;
            print $0;
            
            if (/^[^\/\*].*{/) {
                gsub(/[^{]/, "", temp); 
                brace_count = length(temp);
            }
            next;
        }
        
        in_section {
            print $0;
            
            if (/^[^\/\*]/) {
                gsub(/[^{]/, "", temp1); brace_count += length(temp1);
                gsub(/[^}]/, "", temp2); brace_count -= length(temp2);
                
                if (brace_count <= 0) {
                    in_section=0;
                    print "";
                }
            } else if (/\*\/$/) {
                in_section=0;
                print "";
            }
        }
        ' "$input_file" >> "$output_file"
    done
    
    print_success "Extracted $description to $output_file"
}

# Main extraction function
extract_all_sections() {
    print_status "Beginning CSS extraction process..."
    
    # Base styles
    extract_multi_section "$SOURCE_FILE" "$OUTPUT_DIR/base/reset.css" "Base Reset Styles" \
        "Reset and Base Styles" "^\*" "^body"
    
    extract_multi_section "$SOURCE_FILE" "$OUTPUT_DIR/base/typography.css" "Typography Styles" \
        "font-" "text-" "h1" "h2" "h3" "h4" "h5" "h6" "p {"
    
    # Layout
    extract_section "$SOURCE_FILE" "$OUTPUT_DIR/layout/desktop.css" "desktop" "Desktop Layout"
    
    extract_multi_section "$SOURCE_FILE" "$OUTPUT_DIR/layout/responsive.css" "Responsive Design" \
        "@media" "responsive"
    
    # Components
    extract_multi_section "$SOURCE_DIR/$SOURCE_FILE" "$OUTPUT_DIR/components/menu-bar.css" "Menu Bar Component" \
        "menu-bar" "menu-left" "menu-right" "apple-logo" "menu-item" "menu-clock" "menu-status"
    
    extract_multi_section "$SOURCE_FILE" "$OUTPUT_DIR/components/dock.css" "Dock Component" \
        "dock" "dock-container" "dock-item" "dock-icon" "dock-separator" "dock-indicator"
    
    extract_multi_section "$SOURCE_FILE" "$OUTPUT_DIR/components/desktop-icons.css" "Desktop Icons" \
        "desktop-icon" "folder-icon" "icon-label"
    
    extract_multi_section "$SOURCE_FILE" "$OUTPUT_DIR/components/windows.css" "Windows Component" \
        "\.window" "title-bar" "window-content" "window-title"
    
    extract_multi_section "$SOURCE_FILE" "$OUTPUT_DIR/components/traffic-lights.css" "Traffic Lights" \
        "traffic-light" "\.close" "\.minimize" "\.maximize"
    
    extract_multi_section "$SOURCE_FILE" "$OUTPUT_DIR/components/buttons.css" "Button Components" \
        "portfolio-btn" "send-button" "filter-btn" "project-link" "contact-links"
    
    # Page-specific styles
    extract_multi_section "$SOURCE_FILE" "$OUTPUT_DIR/pages/portfolio.css" "Portfolio Page Styles" \
        "portfolio-content" "welcome-section" "quick-links" "link-group" "bio" "intro"
    
    extract_multi_section "$SOURCE_FILE" "$OUTPUT_DIR/pages/skills.css" "Skills Page Styles" \
        "skills-" "skill-" "legend-" "level-indicator"
    
    extract_multi_section "$SOURCE_FILE" "$OUTPUT_DIR/pages/projects.css" "Projects Page Styles" \
        "project-" "tech-tag" "featured-badge"
    
    extract_multi_section "$SOURCE_FILE" "$OUTPUT_DIR/pages/contact.css" "Contact Page Styles" \
        "contact-" "form-" "send-button"
}

# Create main.css import file
create_main_css() {
    print_status "Creating main.css import file..."
    
    cat > "$OUTPUT_DIR/main.css" << 'EOF'
/* 
 * Main CSS Import File
 * Imports all component CSS files in correct order
 */

/* Base Styles - Load First */
@import url('base/reset.css');
@import url('base/typography.css');

/* Layout Styles */
@import url('layout/desktop.css');

/* Core Components */
@import url('components/menu-bar.css');
@import url('components/dock.css');
@import url('components/desktop-icons.css');
@import url('components/windows.css');
@import url('components/traffic-lights.css');
@import url('components/buttons.css');

/* Page-Specific Styles */
@import url('pages/portfolio.css');
@import url('pages/skills.css');
@import url('pages/projects.css');
@import url('pages/contact.css');

/* Responsive Styles - Load Last */
@import url('layout/responsive.css');
EOF
    
    print_success "Created main.css import file"
}

# Create backup of original file
create_backup() {
    local backup_file="${SOURCE_FILE}.backup.$(date +%Y%m%d_%H%M%S)"
    cp "$SOURCE_FILE" "$backup_file"
    print_success "Created backup: $backup_file"
}

# Generate summary report
generate_report() {
    print_status "Generating summary report..."
    
    local report_file="$OUTPUT_DIR/split-report.txt"
    
    cat > "$report_file" << EOF
CSS File Split Report
Generated: $(date)
Source file: $SOURCE_FILE
Total original file size: $(wc -l < "$SOURCE_FILE") lines

Component Files Created:
========================

Base Files:
- base/reset.css ($(wc -l < "$OUTPUT_DIR/base/reset.css") lines)
- base/typography.css ($(wc -l < "$OUTPUT_DIR/base/typography.css") lines)

Layout Files:
- layout/desktop.css ($(wc -l < "$OUTPUT_DIR/layout/desktop.css") lines)
- layout/responsive.css ($(wc -l < "$OUTPUT_DIR/layout/responsive.css") lines)

Component Files:
- components/menu-bar.css ($(wc -l < "$OUTPUT_DIR/components/menu-bar.css") lines)
- components/dock.css ($(wc -l < "$OUTPUT_DIR/components/dock.css") lines)
- components/desktop-icons.css ($(wc -l < "$OUTPUT_DIR/components/desktop-icons.css") lines)
- components/windows.css ($(wc -l < "$OUTPUT_DIR/components/windows.css") lines)
- components/traffic-lights.css ($(wc -l < "$OUTPUT_DIR/components/traffic-lights.css") lines)
- components/buttons.css ($(wc -l < "$OUTPUT_DIR/components/buttons.css") lines)

Page Files:
- pages/portfolio.css ($(wc -l < "$OUTPUT_DIR/pages/portfolio.css") lines)
- pages/skills.css ($(wc -l < "$OUTPUT_DIR/pages/skills.css") lines)
- pages/projects.css ($(wc -l < "$OUTPUT_DIR/pages/projects.css") lines)
- pages/contact.css ($(wc -l < "$OUTPUT_DIR/pages/contact.css") lines)

Next Steps:
===========
1. Update your HTML to use: <link rel="stylesheet" href="css/main.css">
2. Test that all styles still work correctly
3. Remove or rename the original styles.css if everything works
4. Individual component files can now be edited independently

EOF
    
    print_success "Report generated: $report_file"
    cat "$report_file"
}

# Main execution
main() {
    print_status "CSS File Splitter v1.0"
    print_status "================================"
    
    create_backup
    create_directories
    extract_all_sections
    create_main_css
    generate_report
    
    print_success "CSS file splitting completed successfully!"
    print_status "Update your HTML to use: <link rel=\"stylesheet\" href=\"css/main.css\">"
}

# Run the script
main "$@"

