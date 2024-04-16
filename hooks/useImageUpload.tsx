import { useState, useRef } from 'react';

export const useImageUpload = () => {
  const [scale, setScale] = useState<number>(1);
  const [image, setImage] = useState<ImageType | null>(null);
  const [imagePos, setImagePos] = useState<PositionType>({x1: 0, y1: 0, x2: 0, y2: 0});

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSettingsClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (canvasRef: React.RefObject<HTMLCanvasElement>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx || !canvasRef.current) return;

      let x = (canvasRef.current.width / 2) - (img.width / 2) * scale;
      let y = (canvasRef.current.height / 2) - (img.height / 2) * scale;

      if (img.width > canvasRef.current.width || img.height > canvasRef.current.height) {
        setScale(Math.min(
          canvasRef.current.width / img.width,
          canvasRef.current.height / img.height
        ));

        x = (canvasRef.current.width / 2) - (img.width / 2) * scale;
        y = (canvasRef.current.height / 2) - (img.height / 2) * scale;
      }

      const newImage = { image: img, pos: { x1: x, y1: y, x2: x + img.width * scale, y2: y + img.height * scale }, scale };
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      setImage(newImage);
      setImagePos({
        x1: x,
        y1: y,
        x2: x + img.width * scale,
        y2: y + img.height * scale
      });
    };
    img.src = url;
  };

  return { fileInputRef, handleSettingsClick, handleFileChange };
}
