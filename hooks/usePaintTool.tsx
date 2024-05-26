import { useState, useEffect } from 'react';

export const usePaintTool = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const [brushColor, setBrushColor] = useState<string>('#000000');
  const [brushSize, setBrushSize] = useState<number>(5);
  const [isPainting, setIsPainting] = useState<boolean>(false);
  const [lastPos, setLastPos] = useState<{x: number, y: number} | null>(null);
  const [paintingMode, setPaintingMode] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const handleMouseDown = (event: MouseEvent) => {
      if (!paintingMode) return;

      setIsPainting(true);
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setLastPos({x, y});
    };

    const handleMouseUp = () => {
      setIsPainting(false);
      setLastPos(null);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (isPainting && lastPos && paintingMode) {
        paint(event);
      }
    };

    const paint = (event: MouseEvent) => {
      if (!lastPos) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      context.strokeStyle = brushColor;
      context.lineWidth = brushSize;
      context.lineCap = 'round';
      context.beginPath();
      context.moveTo(lastPos.x, lastPos.y);
      context.lineTo(x, y);
      context.stroke();
      setLastPos({x, y});
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [canvasRef, brushColor, brushSize, isPainting, lastPos, paintingMode]);

  return { setBrushColor, paintingMode, setPaintingMode };
};
