import React from 'react';

import { useModal } from '@/hooks/useModal';

import { Modal } from './Modal';
import { ColorPickerIcon } from "@/components/Icons/colorPickerIcon";
import { InfoIcon } from '@/components/Icons/infoIcon';
import { BrushIcon } from '../Icons/brushIcon';

import { getContrastColor } from "@/utils/getContrastColor";
import { copyToClipboard } from '@/utils/copyToClipboard';

import { Toaster } from 'react-hot-toast';

export const ControlsPanel = ({
  canvasRef,
  handleSettingsClick,
  toggleColorPicker,
  isColorPickerActive,
  centerColor,
  pickedColor,
  handleFileChange,
  fileInputRef,
  imageWillBeScaled,
  handleImageScaling,
  toggleTwoColors,
  hasTwoColors,
  gridLineCount,
  gridColumnCount,
  setGridLineCount,
  setGridColumnCount,
  paintingMode,
  setPaintingMode
 }: ControlPanelProps) => {

  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="controls__container">
      <div
        className="btn-icon"
        onClick={isOpen ? closeModal : openModal}
      >
        <InfoIcon />
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
        onClick={() => {
          toggleColorPicker();
          if (paintingMode) {
            setPaintingMode(false);
          }
        }}
      >
        <ColorPickerIcon fill={centerColor} />
      </div>
      <div
        className={paintingMode ? "btn-icon active" : "btn-icon"}
        onClick={() => {
          setPaintingMode(!paintingMode);
          if (isColorPickerActive) {
            toggleColorPicker();
          }
        }}
      >
        <BrushIcon fill={centerColor} />
      </div>
      <div className="btn" onClick={handleSettingsClick}>
        Upload image
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
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <h1>How to use</h1>
        <ul>
          <li>Upload an image from your computer</li>
          <li>Activate the color picker tool</li>
          <li>Select any color from the picture</li>
          <li>Copy the hex code from the palette</li>
        </ul>
        <div>
        <small>Extra options:</small>
          <label htmlFor="canvas-scaling" className='checkbox__container'>
            <input type="checkbox" name="canvas-scaling" id="canvas-scaling" onChange={handleImageScaling} checked={!imageWillBeScaled} />
            <span>Scale canvas to fit image upon upload</span>
          </label>
          <label htmlFor="dropper-two-colors" className='checkbox__container'>
            <input type="checkbox" name="dropper-two-colors" id="dropper-two-colors" onChange={toggleTwoColors} checked={hasTwoColors} />
            <span>Enable two-color dropper</span>
          </label>
          <label htmlFor="set-grid-size" className='range__container'>
            <span>Change color picker preview size. Current: <b>{gridLineCount}</b></span>
            <input
              type="range"
              min="7"
              max="35"
              step="2"
              value={gridLineCount}
              onChange={(e) => {
                setGridLineCount(parseInt(e.target.value));
                setGridColumnCount(parseInt(e.target.value));
              }}
            />
          </label>
        </div>
        <i>- Enjoy -</i>
      </Modal>
    </div>
  );
}
