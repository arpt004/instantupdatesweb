'use client'

import React, { useState } from 'react'
import { IconButton, Image, Stack } from '@fluentui/react'
import { ChevronLeft12Regular, ChevronRight12Regular } from '@fluentui/react-icons'
import classes from './ProductImageGallery.module.css'

const ProductImageGallery = ({ images, handleImageClick, setSelectedImage }) => {

  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    const selectedIndex = (currentIndex + 1) % images.length
    setSelectedImage(selectedIndex)
    setCurrentIndex( prevIndex => (prevIndex + 1) % images.length)
  }
  
  const handlePrevious = () => {
    const selectedIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
    setSelectedImage(selectedIndex)
    setCurrentIndex( prevIndex => (prevIndex === 0 ? images.length - 1 : currentIndex - 1 ))
  }
  
  const handleThumbnailClick = (index) => {
    setSelectedImage(index)
    setCurrentIndex(index)
  }

  return (
    <Stack className={classes.mainContainer}>
      <Image 
        src={images[currentIndex].blobURI}
        alt={images[currentIndex].altText}
        className={classes.image}
        onClick={handleImageClick}
        width="750"      
      />

      <Stack horizontal horizontalAlign="space-between" className={classes.controls} >
        <IconButton
          iconProps={{ iconName: 'ChevronLeft'}}
          onClick={handlePrevious}
          title='Previous'
          ariaLabel='Previous'
          className={classes.previousNextButton}
        >
          <ChevronLeft12Regular />
        </IconButton>

        <Stack horizontal className={classes.navigationControl}>
          {images.map( (image, index) => {
            return(
              <div key={index} className={classes.navigationControlImageDiv} onClick={() => handleThumbnailClick(index)} >
                <Image 
                  src={image.blobURI}
                  alt={image.altText}
                  className={classes.navigationControlImage}
                  width={'3rem'}
                  height={'3rem'}
                  styles={{
                    root: {
                      border: currentIndex === index ? '2px solid #44434385' : 'none',
                    }
                  }}
                />
              </div>
            )
            
          })

          }
        </Stack>

        <IconButton
          iconProps={{ iconName: 'ChevronRight'}}
          onClick={handleNext}
          title='Next'
          ariaLabel='Next'
          className={classes.previousNextButton}
        >
          <ChevronRight12Regular />
        </IconButton>
      </Stack>
    </Stack>
  )
}

export default ProductImageGallery