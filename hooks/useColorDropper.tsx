import { useEffect, useCallback, useState } from 'react';

export const useColorDropper = (canvasRef: React.RefObject<HTMLCanvasElement>, cursorRef: React.RefObject<HTMLDivElement>) => {
  const [color, setColor] = useState<string>('#000000');

  const handleColorPick = useCallback((event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const imageData = ctx.getImageData(x, y, 1, 1);
    const pixelData = imageData.data;

    const red = pixelData[0];
    const green = pixelData[1];
    const blue = pixelData[2];

    const hex = "#" + ((1 << 24) | (red << 16) | (green << 8) | blue).toString(16).slice(1);

    setColor(hex);
  }, [canvasRef]);

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
    canvas.addEventListener('mouseenter', () => cursorDiv.style.display = 'block');
    canvas.addEventListener('mouseleave', () => cursorDiv.style.display = 'none');

    return () => {
      canvas.removeEventListener('mousemove', moveCursor);
    };
  }, [canvasRef, cursorRef, handleColorPick, color]);

  return color;
};
