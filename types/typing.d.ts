type ImageType = {
  image: HTMLImageElement;
  pos: PositionType;
  scale: number;
};

type PositionType = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

type iconType = {
  fill?: string;
  stroke?: string;
};


interface ColorDropCursorProps {
  cursorRef: React.RefObject<HTMLDivElement>;
  isColorPickerActive: boolean;
  centerColor: string;
  gridLineCount: number;
  gridColumnCount: number;
  colors: string[];
}

interface ControlPanelProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isColorPickerActive: boolean;
  centerColor: string;
  pickedColor: string;
  toggleColorPicker: () => void;
  handleSettingsClick: () => void;
  handleFileChange: (canvasRef: React.RefObject<HTMLCanvasElement>) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}
