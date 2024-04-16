import { useEffect } from 'react';

export const useTrackCursor = (canvasRef: React.RefObject<HTMLCanvasElement>, cursorRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const cursorDiv = cursorRef.current;
    if (!canvas || !cursorDiv) return;

    const moveCursor = (e: MouseEvent) => {
      cursorDiv.style.left = `${e.clientX}px`;
      cursorDiv.style.top = `${e.clientY}px`;
    };

    canvas.addEventListener('mousemove', moveCursor);
    canvas.addEventListener('mouseenter', () => cursorDiv.style.display = 'block');
    canvas.addEventListener('mouseleave', () => cursorDiv.style.display = 'none');

    return () => {
      canvas.removeEventListener('mousemove', moveCursor);
    };
  }, [canvasRef, cursorRef]);
}
