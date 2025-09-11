export interface WindowConfig {
  id: string;
  title: string;
  width: number;
  height: number;
  x: number;
  y: number;
  resizable?: boolean;
  minimizable?: boolean;
  maximizable?: boolean;
  closable?: boolean;
}

export interface WindowState {
  isMinimized: boolean;
  isMaximized: boolean;
  isActive: boolean;
  originalBounds?: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
}

export interface DragState {
  isDragging: boolean;
  startX: number;
  startY: number;
  initialX: number;
  initialY: number;
}

export interface Component {
  element: HTMLElement;
  render(): HTMLElement;
  destroy(): void;
}


export interface MenuBarItem {
  label: string;
  action?: () => void;
}


export interface DockItem {
  id: string;
  label: string;
  iconpath: string;
  windowId: string;
  isActive: boolean;
}

export interface DockLink {
  id: string;
  label: string;
  iconpath: string;
  href: string;
}

export interface DesktopIcon {
  id: string;
  label: string;
  x: number;
  y: number;
  iconpath: string;
  windowId: string;
}

export type TrafficLightAction = 'close' | 'minimize' | 'maximize';


export interface WindowEvent {
  type: 'open' | 'close' | 'minimize' | 'maximize' | 'focus' | 'blur';
  windowId: string;
  window?: BaseWindow;
}


export interface BaseWindow extends Component {
  config: WindowConfig;
  state: WindowState;
  element: HTMLElement;
}