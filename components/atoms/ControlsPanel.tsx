import React from 'react';

import { useModal } from '@/hooks/useModal';

import { ColorPickerIcon } from "@/components/Icons/colorPickerIcon";
import { Modal } from './Modal';

import { getContrastColor } from "@/utils/getContrastColor";
import { copyToClipboard } from '@/utils/copyToClipboard';

import { Toaster } from 'react-hot-toast';
import { InfoIcon } from '../Icons/infoIcon';

export const ControlsPanel = ({
  canvasRef,
  handleSettingsClick,
  toggleColorPicker,
  isColorPickerActive,
  centerColor,
  pickedColor,
  handleFileChange,
  fileInputRef,
  hasImage,
  zoomLevel,
  zoomIn,
  zoomOut
 }: ControlPanelProps) => {

  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="controls__container">
      <div className="zoom-controls">
        <span>{Math.round(zoomLevel * 100)}%</span>
        <button className={!hasImage || zoomLevel >= 2 ? 'btn-icon inactive' : 'btn-icon'} onClick={zoomIn}>+</button>
        <button className={!hasImage || zoomLevel <= 1 ? 'btn-icon inactive' : 'btn-icon'} onClick={zoomOut}>-</button>
      </div>
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
      <div
        className="btn-icon"
        onClick={isOpen ? closeModal : openModal}
      >
        <InfoIcon />
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
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <h1>How to use</h1>
        <ul>
          <li>Upload an image from your computer</li>
          <li>Activate the color picker tool</li>
          <li>Select any color from the picture</li>
          <li>Copy the hex code from the palette</li>
        </ul>
        <i>Enjoy!</i>
      </Modal>
    </div>
  );
}
