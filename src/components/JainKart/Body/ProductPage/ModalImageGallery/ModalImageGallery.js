import React, { useState } from 'react'
import { Carousel, CarouselButton, CarouselCard, CarouselNav, CarouselSlider } from '@fluentui/react-carousel-preview'
import { Image } from '@fluentui/react-components'
import { Circle16Regular, Circle16Filled } from '@fluentui/react-icons'
import classes from './ModalImageGallery.module.css'

const ModalImageGallery = ({ imageArray, selectedImage }) => {
  const [ currentIndex, setCurrentIndex ] = useState(selectedImage)

  if(!imageArray || imageArray.length < 1){
    return <p> No Data Found </p>
  }

  return (
    <Carousel
      circular
      groupSize={1}
      activeIndex={currentIndex}
      className={classes.carouselContainer}
      onActiveIndexChange={(_, data) => setCurrentIndex(data.index)}      
    >
      {imageArray && (
        <CarouselSlider className={classes.carouselContent}>
          {imageArray?.map((item, index) => {
            return(
              <CarouselCard className={classes.carouselItem} key={index}>
                <div className={classes.imageContainer}>
                  <Image src={item.blobURI} alt={item.altText} className={classes.imageModal}/>
                </div>
              </CarouselCard>
            )
          })}
        </CarouselSlider>
      )
      }

      <div className={classes.controlsContainer}>
        <CarouselButton navType='prev' className={classes.leftCarouselButton+' '+classes.carouselButton} title='Previous'/>
        <CarouselNav className={classes.navCarousel}>
          { (activeIndex) => {
            return(
              <button onClick={() => setCurrentIndex(activeIndex)} className={classes.navButton}>
                { activeIndex === currentIndex ? <Circle16Filled /> : <Circle16Regular /> }
              </button>
            )

          }

          }
        </CarouselNav>
        <CarouselButton navType='next' className={classes.rightCarouselButton+' '+classes.carouselButton} title='Next'/>

      </div>

    </Carousel>
  )
}

export default ModalImageGallery