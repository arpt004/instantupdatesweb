import React, { useState } from 'react';
import classes from './ImageUploader.module.css'; // Add your CSS file

const ImageUploader = ({images, setImages}) => {

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    let imageObject = imageFiles.map((file) => {
      return({
        imageUrls: URL.createObjectURL(file),
        imageName: file.name
      })
    })

    setImages(prevImages => [...prevImages, ...imageObject]);
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
            <img src={src.imageUrls} alt={`uploaded-img-${index}`} className={classes.image} />
            <button onClick={() => handleImageDelete(index)}> &times; </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
