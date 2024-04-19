import { useRef, useState } from 'react';

import { useWindowResize } from "@/hooks/useWindowResize";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useColorDropper } from "@/hooks/useColorDropper";

import { ColorDropCursor } from "@/components/atoms/ColorDropCursor";
import { ControlsPanel } from "@/components/atoms/ControlsPanel";

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [hasTwoColors, setHasTwoColors] = useState(false);

  const toggleTwoColors = () => setHasTwoColors((prev) => !prev);

  const { gridLineCount, gridColumnCount, colors, centerColor, pickedColor, isColorPickerActive, toggleColorPicker, setGridLineCount, setGridColumnCount, } = useColorDropper(canvasRef, cursorRef);
  const { fileInputRef, handleSettingsClick, handleFileChange, hasImage, imageWillBeScaled, handleImageScaling } = useImageUpload();
  const { initialCanvasWidth,initialCanvasHeight } = useWindowResize(canvasRef, setImageData, imageWillBeScaled);

  return (
    <main>
      <div className="page-container">
        <div className="canvas__container">
          <canvas
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
          toggleTwoColors={toggleTwoColors}
          hasTwoColors={hasTwoColors}
          gridLineCount={gridLineCount}
          gridColumnCount={gridColumnCount}
          setGridLineCount={setGridLineCount}
          setGridColumnCount={setGridColumnCount}
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
