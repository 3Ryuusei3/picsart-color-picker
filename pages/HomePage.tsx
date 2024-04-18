import { useRef, useState } from 'react';

import { useWindowResize } from "@/hooks/useWindowResize";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useColorDropper } from "@/hooks/useColorDropper";
import { useZoom } from "@/hooks/useZoom";

import { ColorDropCursor } from "@/components/atoms/ColorDropCursor";
import { ControlsPanel } from "@/components/atoms/ControlsPanel";
import { ImageUploadInput } from '@/components/atoms/ImageUploadInput';

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [hasTwoColors, setHasTwoColors] = useState(false);

  const toggleTwoColors = () => setHasTwoColors((prev) => !prev);

  const { gridLineCount, gridColumnCount, colors, centerColor, pickedColor, isColorPickerActive, toggleColorPicker } = useColorDropper(canvasRef, cursorRef);
  const { fileInputRef, handleSettingsClick, handleFileChange, hasImage, imageWillBeScaled, handleImageScaling } = useImageUpload();
  const { zoomLevel, zoomIn, zoomOut } = useZoom();
  const { initialCanvasWidth,initialCanvasHeight } = useWindowResize(canvasRef, setImageData);

  return (
    <main>
      <div className="page-container">
        <div className="canvas__container">
          <canvas
            style={{ transform: `scale(${zoomLevel})` }}
            ref={canvasRef}
            width={initialCanvasWidth}
            height={initialCanvasHeight}
          />
          {!hasImage && (
            <div
              className="canvas__container--overlay"
              onClick={handleSettingsClick}
            >
              <h1>Upload an image to start!</h1>
              <ImageUploadInput fileInputRef={fileInputRef} handleFileChange={handleFileChange} canvasRef={canvasRef} />
            </div>
          )}
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
          imageWillBeScaled={imageWillBeScaled}
          handleImageScaling={handleImageScaling}
          zoomLevel={zoomLevel}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          toggleTwoColors={toggleTwoColors}
          hasTwoColors={hasTwoColors}
        />
      </div>
      <ColorDropCursor
        cursorRef={cursorRef}
        isColorPickerActive={isColorPickerActive}
        centerColor={centerColor}
        gridLineCount={gridLineCount}
        gridColumnCount={gridColumnCount}
        colors={colors}
        pickedColor={pickedColor}
        hasTwoColors={hasTwoColors}
      />
    </main>
  );
}
