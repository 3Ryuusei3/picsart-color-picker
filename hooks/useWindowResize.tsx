import { useEffect, useRef, useCallback } from 'react';

export const useWindowResize = (canvasRef: React.RefObject<HTMLCanvasElement>, setImageData: (data: ImageData | null) => void) => {
  const imageDataRef = useRef<ImageData | null>(null);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas && canvas.getContext) {
      const context = canvas.getContext('2d');
      if (context) {
        imageDataRef.current = context.getImageData(0, 0, canvas.width, canvas.height);
        setImageData(imageDataRef.current);

        canvas.width = Math.min(window.innerWidth - 96, 960);
        canvas.height = Math.min(window.innerHeight - 96, 540);

        if (imageDataRef.current) {
          context.putImageData(imageDataRef.current, 0, 0);
        }
      }
    }
  }, [canvasRef, setImageData]);

  useEffect(() => {
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas]);
}
