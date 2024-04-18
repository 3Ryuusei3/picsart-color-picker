import { useRef, useState } from 'react';

import { useWindowResize } from "@/hooks/useWindowResize";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useColorDropper } from "@/hooks/useColorDropper";
import { useModal } from '@/hooks/useModal';

import { ColorDropCursor } from "@/components/atoms/ColorDropCursor";
import { ControlsPanel } from "@/components/atoms/ControlsPanel";

export function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);

  const { gridLineCount, gridColumnCount, colors, centerColor, pickedColor, isColorPickerActive, toggleColorPicker } = useColorDropper(canvasRef, cursorRef);
  const { fileInputRef, handleSettingsClick, handleFileChange } = useImageUpload();
  useWindowResize(canvasRef, setImageData);


  return (
    <main>
      <div className="page-container">
        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            width={960}
            height={540}
          />
        </div>
        <ControlsPanel
          isColorPickerActive={isColorPickerActive}
          centerColor={centerColor}
          pickedColor={pickedColor}
          toggleColorPicker={toggleColorPicker}
          handleSettingsClick={handleSettingsClick}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          canvasRef={canvasRef}
        />
      </div>
      <ColorDropCursor
        cursorRef={cursorRef}
        isColorPickerActive={isColorPickerActive}
        centerColor={centerColor}
        gridLineCount={gridLineCount}
        gridColumnCount={gridColumnCount}
        colors={colors}
      />
    </main>
  );
}
