import { useState, useEffect } from 'react';

export const useColorZoom = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const [color, setColor] = useState<string>('#ffffff');
  const [isHovering, setIsHovering] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const pixel = context.getImageData(x, y, 1, 1).data;
      const hexColor = '#' + ((pixel[0] << 16) | (pixel[1] << 8) | pixel[2]).toString(16).padStart(6, '0');
      setColor(hexColor);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [canvasRef]);

  return { color, isHovering };
};
