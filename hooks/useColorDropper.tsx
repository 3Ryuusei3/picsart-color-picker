import { useEffect, useCallback, useState } from 'react';

export const useColorDropper = (canvasRef: React.RefObject<HTMLCanvasElement>, cursorRef: React.RefObject<HTMLDivElement>) => {
  const gridLineCount = 25;
  const gridColumnCount = 25;

  const [colors, setColors] = useState<string[]>([]);
  const [centerColor, setCenterColor] = useState<string>('#000000');
  const [pickedColor, setPickedColor] = useState<string>('#000000');
  const [isColorPickerActive, setIsColorPickerActive] = useState(false);

  const toggleColorPicker = () => {
    setIsColorPickerActive(!isColorPickerActive);
  };

  const handleClick = useCallback((event: MouseEvent) => {
    if (!isColorPickerActive) return;
    setPickedColor(centerColor);
  }, [centerColor, isColorPickerActive]);

  const handleColorPick = useCallback((event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas || !isColorPickerActive) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const gridStartingPointX = x - Math.floor(gridLineCount / 2);
    const gridStartingPointY = y - Math.floor(gridColumnCount / 2);

    let newColors = [];
    for (let i = 0; i < gridLineCount; i++) {
      let lineColors = [];
      for (let j = 0; j < gridColumnCount; j++) {
        const imageData = ctx.getImageData(gridStartingPointX + i, gridStartingPointY + j, 1, 1);
        const pixelData = imageData.data;

        const red = pixelData[0];
        const green = pixelData[1];
        const blue = pixelData[2];

        const hex = "#" + ((1 << 24) | (red << 16) | (green << 8) | blue).toString(16).slice(1);
        lineColors.push(hex);
      }
      newColors.push(...lineColors.reverse());
    }
    setColors(newColors.reverse());
    const middleIndex = Math.floor(newColors.length / 2);
    setCenterColor(newColors[middleIndex]);
  }, [canvasRef, isColorPickerActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cursorDiv = cursorRef.current;
    if (!canvas || !cursorDiv) return;

    const moveCursor = (e: MouseEvent) => {
      cursorDiv.style.left = `${e.clientX}px`;
      cursorDiv.style.top = `${e.clientY}px`;
      handleColorPick(e);
    };

    canvas.addEventListener('mousemove', moveCursor);
    canvas.addEventListener('mouseenter', () => {
      if (isColorPickerActive) {
        cursorDiv.style.display = 'block';
        canvas.classList.add('cursor-none');
      } else {
        cursorDiv.style.display = 'none';
        canvas.classList.remove('cursor-none');
      }
    });
    canvas.addEventListener('mouseleave', () => {
      cursorDiv.style.display = 'none';
      canvas.classList.remove('cursor-none');
    });

    canvas.addEventListener('click', handleClick);

    return () => {
      canvas.removeEventListener('mousemove', moveCursor);
      canvas.removeEventListener('click', handleClick);
    };
  }, [canvasRef, cursorRef, handleColorPick, handleClick, colors, isColorPickerActive]);

  return { gridLineCount, gridColumnCount, colors, centerColor, pickedColor, isColorPickerActive, toggleColorPicker }
};
