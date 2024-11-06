import React from 'react'
import ProductCard from './ProductCard/ProductCard'
import { ProductDetails } from '../Constants/ProductData.json'
import { see_all } from '../Constants/constant'
import classes from './JainKartBody.module.css'
import Link from 'next/link'
import LeftSideBar from './LeftSideBar/LeftSideBar'
import { splitByCategory } from '../utils/commonFunctions'

const JainKartBody = () => {
  const categories = splitByCategory(ProductDetails)

  return (
    <div className={classes.mainBodyContainer}>
      <LeftSideBar categories={Object.keys(categories)} filterSection={false} />
      <div className={classes.categorySection}>            
        {Object.keys(categories).map((category, index) => (
          <div key={index}>
            <div className={classes.categoryHeader} >
              <div className={classes.categoryTitle} >
                <h2>{category}</h2>
              </div>
              <div className={classes.categoryLink} >
                <Link href={`jains-kart/category/${category.toLowerCase().replaceAll(' ','-')}`}> {see_all} </Link>              
              </div>
            </div>
            <div className={classes.categoryContainer}>
              {categories[category].map((item, index) => {
                return(
                  <React.Fragment key={item.DeviceCatalogId}>
                    { index<4 && <ProductCard cardDetails={item}/>}
                  </React.Fragment> 
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JainKartBody