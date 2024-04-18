import { useState, useRef } from 'react';

export const useImageUpload = () => {
  const [scale, setScale] = useState<number>(1);
  const [image, setImage] = useState<ImageType | null>(null);
  const [imagePos, setImagePos] = useState<PositionType>({x1: 0, y1: 0, x2: 0, y2: 0});
  const [hasImage, setHasImage] = useState<boolean>(false);
  const [imageWillBeScaled, setImageWillBeScaled] = useState<boolean>(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSettingsClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageScaling = () => {
    setImageWillBeScaled(!imageWillBeScaled);
  }

  const handleFileChange = (canvasRef: React.RefObject<HTMLCanvasElement>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx || !canvasRef.current) return;

      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      let newScale = scale;

      if (imageWillBeScaled && (img.width > canvasRef.current.width || img.height > canvasRef.current.height)) {
        newScale = Math.min(
          canvasRef.current.width / img.width,
          canvasRef.current.height / img.height
        );
      } else {
        canvasRef.current.width = img.width;
        canvasRef.current.height = img.height;
        newScale = 1;
      }

      const x = (canvasRef.current.width / 2) - (img.width / 2) * newScale;
      const y = (canvasRef.current.height / 2) - (img.height / 2) * newScale;

      const newImage = { image: img, pos: { x1: x, y1: y, x2: x + img.width * newScale, y2: y + img.height * newScale }, scale: newScale };
      ctx.drawImage(img, x, y, img.width * newScale, img.height * newScale);
      setImage(newImage);
      setImagePos({
        x1: x,
        y1: y,
        x2: x + img.width * newScale,
        y2: y + img.height * newScale
      });
      setScale(newScale);
      setHasImage(true);
    };
    img.src = url;
  };

  return { fileInputRef, handleSettingsClick, handleFileChange, hasImage, imageWillBeScaled, handleImageScaling };
}
