export const ImageUploadInput = ({ fileInputRef, handleFileChange, canvasRef }:ImageUploadInputProps ) => (
  <input
    type="file"
    accept="image/*"
    style={{ display: 'none' }}
    ref={fileInputRef}
    onChange={handleFileChange(canvasRef)}
  />
);
