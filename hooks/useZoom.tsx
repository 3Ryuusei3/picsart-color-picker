import { useState } from 'react';

export const useZoom = () => {
  const [zoomLevel, setZoomLevel] = useState(1);

  const zoomIn = () => setZoomLevel(prevZoom => prevZoom < 2 ? prevZoom + 0.1 : prevZoom);
  const zoomOut = () => setZoomLevel(prevZoom => prevZoom > 1 ? prevZoom - 0.1 : prevZoom);

  return { zoomLevel, zoomIn, zoomOut };
}
