import React from 'react';
import { ColorPickerIcon } from "@/components/Icons/colorPickerIcon";

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
        className='selected-color'
        style={{ backgroundColor: pickedColor }}
      />
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
    </div>
  );
}
