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
  fill2?: string;
  stroke?: string;
};


interface ColorDropCursorProps {
  cursorRef: React.RefObject<HTMLDivElement>;
  isColorPickerActive: boolean;
  centerColor: string;
  gridLineCount: number;
  gridColumnCount: number;
  colors: string[];
  pickedColor: string;
  hasTwoColors: boolean;
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
  hasImage: boolean;
  imageWillBeScaled: boolean;
  handleImageScaling: () => void;
  zoomLevel: number;
  zoomIn: () => void;
  zoomOut: () => void;
  toggleTwoColors: () => void;
  hasTwoColors: boolean;
}

interface ImageUploadInputProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  fileInputRef: React.Ref<HTMLInputElement>;
  handleFileChange: (canvasRef: React.RefObject<HTMLCanvasElement>) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}
