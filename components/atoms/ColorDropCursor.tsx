import React from 'react';
import { SelectedColorIcon } from "@/components/Icons/selectedColorIcon";
import { getContrastColor } from "@/utils/getContrastColor";

export const ColorDropCursor = ({
  cursorRef,
  isColorPickerActive,
  centerColor,
  gridLineCount,
  gridColumnCount,
  colors,
  pickedColor,
  hasTwoColors,
 }: ColorDropCursorProps) => {
  return (
    <div className={`color-drop__cursor ${isColorPickerActive ? '' : 'hidden'}`} ref={cursorRef} >
      <div
        className="color-drop__tag"
        style={{
          ["--px-color" as string]: centerColor,
           color: getContrastColor(centerColor)
        }}>
          {centerColor.toUpperCase()}
      </div>
      <SelectedColorIcon fill={centerColor} fill2={hasTwoColors ? pickedColor : centerColor} />
      <div className="color-drop__grid">
        {[...Array(gridLineCount)].map((_, i) => (
          <div key={i} className="color-drop__grid--line" style={{ ["--grid-line-count" as string]: gridLineCount }} >
            {[...Array(gridColumnCount)].map((_, j) => {

              const isMiddle = i === Math.floor(gridLineCount / 2) && j === Math.floor(gridColumnCount / 2);
              return (
                <div
                  key={j}
                  className={`color-drop__grid--column ${isMiddle ? 'picked-color' : ''}`}
                  style={{
                    ["--grid-column-count" as string]: gridColumnCount,
                    ["--grid-element-color" as string]: colors[i * gridColumnCount + j],
                    backgroundColor: colors[i * gridColumnCount + j],
                  }}
                >
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
