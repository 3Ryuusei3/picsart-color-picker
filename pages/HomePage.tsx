import { useRef, useState } from 'react';

import { useWindowResize } from "@/hooks/useWindowResize";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useColorDropper } from "@/hooks/useColorDropper";
import { useZoom } from "@/hooks/useZoom";

import { ColorDropCursor } from "@/components/atoms/ColorDropCursor";
import { ControlsPanel } from "@/components/atoms/ControlsPanel";

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);

  const { gridLineCount, gridColumnCount, colors, centerColor, pickedColor, isColorPickerActive, toggleColorPicker } = useColorDropper(canvasRef, cursorRef);
  const { fileInputRef, handleSettingsClick, handleFileChange, hasImage } = useImageUpload();
  const { zoomLevel, zoomIn, zoomOut } = useZoom();
  const { initialCanvasWidth,initialCanvasHeight } = useWindowResize(canvasRef, setImageData);

  return (
    <main>
      <div className="page-container">
        <div className="canvas-container">
          <canvas
            style={{ transform: `scale(${zoomLevel})` }}
            ref={canvasRef}
            width={initialCanvasWidth}
            height={initialCanvasHeight}
          />
        </div>
        <ControlsPanel
          canvasRef={canvasRef}
          isColorPickerActive={isColorPickerActive}
          centerColor={centerColor}
          pickedColor={pickedColor}
          toggleColorPicker={toggleColorPicker}
          handleSettingsClick={handleSettingsClick}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          hasImage={hasImage}
          zoomLevel={zoomLevel}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
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
