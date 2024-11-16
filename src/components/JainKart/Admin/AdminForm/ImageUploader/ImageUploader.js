import React, { useState } from 'react';
import classes from './ImageUploader.module.css'; // Add your CSS file

const ImageUploader = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    const imageUrls = imageFiles.map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...imageUrls]);
  };

  const handleImageDelete = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className={classes.image_uploader}>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
      />
      <div className={classes.image_preview}>
        {images.map((src, index) => (
          <div className={classes.image_container} key={index}>
            <img src={src} alt={`uploaded-img-${index}`} className={classes.image} />
            <button onClick={() => handleImageDelete(index)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
