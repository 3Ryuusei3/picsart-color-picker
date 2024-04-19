import { useEffect, useRef, useCallback } from 'react';

export const useWindowResize = (canvasRef: React.RefObject<HTMLCanvasElement>, setImageData: (data: ImageData | null) => void, imageWillBeScaled: boolean) => {
  const imageDataRef = useRef<ImageData | null>(null);
  const initialCanvasWidth = 960;
  const initialCanvasHeight = 540;

  const resizeCanvas = useCallback(() => {
    if (!imageWillBeScaled) return; // Agregar esta línea

    const canvas = canvasRef.current;
    if (canvas && canvas.getContext) {
      const context = canvas.getContext('2d');
      if (context) {
        imageDataRef.current = context.getImageData(0, 0, canvas.width, canvas.height);
        setImageData(imageDataRef.current);

        canvas.width = Math.min(window.innerWidth - 64, initialCanvasWidth);
        canvas.height = Math.min(window.innerHeight - 64, initialCanvasHeight);

        if (imageDataRef.current) {
          context.putImageData(imageDataRef.current, 0, 0);
        }
      }
    }
  }, [canvasRef, setImageData, imageWillBeScaled]);

  useEffect(() => {
    if (imageWillBeScaled) {
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();
    }
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas, imageWillBeScaled]);

  return { initialCanvasWidth, initialCanvasHeight };
}
