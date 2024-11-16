import React from 'react'
import { ProductDetails } from '../../Constants/ProductData.json'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import classes from './CategoryPage.module.css'
import ProductCard from '../ProductCard/ProductCard'
import { filterByCategory, splitByCategory } from '../../utils/commonFunctions'

const CategoryPage = ({category_id}) => {
  
  const categoryData = filterByCategory(category_id, ProductDetails)
  const categories = splitByCategory(ProductDetails)

  return (
    <div className={classes.mainCategoryContainer}>
      <LeftSideBar categories={Object.keys(categories)} filterSection={true} />
      <div className={classes.categorySection}> 
        <h2 className={classes.categoryHeader}> {categoryData[0]?.Category} </h2>           
        <div className={classes.categoryContainer}>
          {categoryData.map((item) => {
            return(
              <React.Fragment key={item.DeviceCatalogId}>
                <ProductCard cardDetails={item}/>
              </React.Fragment> 
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage