import React from 'react';
import { ColorPickerIcon } from "@/components/Icons/colorPickerIcon";
import { getContrastColor } from "@/utils/getContrastColor";
import { copyToClipboard } from '@/utils/copyToClipboard';

import { Toaster } from 'react-hot-toast';

export const ControlsPanel = ({
  handleSettingsClick,
  isColorPickerActive,
  centerColor,
  pickedColor,
  handleFileChange,
  fileInputRef,
  canvasRef,
  toggleColorPicker
 }: ControlPanelProps) => {

  return (
    <div className="controls__container">
      <div
        className='selected-color__container'
        style={{ backgroundColor: pickedColor }}
        onClick={() => copyToClipboard(pickedColor)}
      >
        {pickedColor && (
          <div
            className="color-drop__tag"
            style={{
              ["--px-color" as string]: pickedColor,
              color: getContrastColor(pickedColor)
            }}>
              {pickedColor.toUpperCase()}
          </div>
        )}
      </div>
      <div
        className={isColorPickerActive ? "btn-icon active" : "btn-icon"}
        onClick={toggleColorPicker}
      >
        <ColorPickerIcon fill={centerColor} />
      </div>
      <div className="btn" onClick={handleSettingsClick}>
        Upload file
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange(canvasRef)}
        />
      </div>
      <Toaster
        toastOptions={{
          style: {
            background: 'var(--clr-terciary-black)',
            color: 'var(--clr-main-white)',
          },
          icon: '🎨',
        }}
      />
    </div>
  );
}
