'use client'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { ProductDetails } from '../../Constants/ProductData.json'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import classes from './CategoryPage.module.css'
import ProductCard from '../ProductCard/ProductCard'
import { filterByCategory, splitByCategory } from '../../utils/commonFunctions'
import { fetchAllData } from '../../utils/fetchApiHelper'
import { jainsKartAllData } from "@/redux/actions/jainsKartAllData";


const CategoryPage = ({category_id}) => {
  const dispatch = useDispatch()
  const ProductDetails = useSelector((state) => state.jainsKartAllData);
  
  const setFetchAllData = async () => {
    const fetchData = await fetchAllData()
    const finalData = fetchData.map(element => {
      return({
        ...element,
        images: JSON.parse(element.images),
        variants: JSON.parse(element.variants),
      })
    });
    dispatch(jainsKartAllData(finalData))
  }

  let categoryData = []
  let categories = []
  if(ProductDetails.length<1) setFetchAllData()
  else {
    categoryData = filterByCategory(category_id, ProductDetails)
    categories = splitByCategory(ProductDetails)
  }

  if(!ProductDetails || ProductDetails<1 || categoryData.length<1 || categories.length<1) return <h2> No Data Found </h2>

  return (
    <div className={classes.mainCategoryContainer}>
      <LeftSideBar categories={Object.keys(categories)} filterSection={true} />
      <div className={classes.categorySection}> 
        <h2 className={classes.categoryHeader}> {categoryData[0]?.category} </h2>           
        <div className={classes.categoryContainer}>
          {categoryData.map((item) => {
            return(
              <React.Fragment key={item.devicecatalogid}>
                <ProductCard cardDetails={item} setFetchAllData={setFetchAllData}/>
              </React.Fragment> 
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage