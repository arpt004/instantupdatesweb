'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from "react-redux";
import ProductCard from './ProductCard/ProductCard'
import { see_all } from '../Constants/constant'
import classes from './JainKartBody.module.css'
import LeftSideBar from './LeftSideBar/LeftSideBar'
import { splitByCategory } from '../utils/commonFunctions'
import { fetchAllData } from '../utils/fetchApiHelper'
import { jainsKartAllData } from "@/redux/actions/jainsKartAllData";
// import { ProductDetails } from '../Constants/ProductData.json'


// Task Pending
//  Two error
//  1. dialog error in jain's kart header
//  2. on click of edit in product page it will take to admin form when useRouter is failling 
// Place Loader -> loading and No Data Should be differentiated
// update product data on click of edit button


const JainKartBody = () => {
  const dispatch = useDispatch()
  const jainsKartReduxData = useSelector((state) => state.jainsKartAllData);
  const categories = splitByCategory(jainsKartReduxData)
  // const categories = splitByCategory(ProductDetails)

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

  useEffect(() => {
    setFetchAllData()
  }, [])

  if(jainsKartReduxData.length<1){
    return <h2> Loading... </h2>
  }

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
                  <React.Fragment key={item.devicecatalogid}>
                    { index<4 && <ProductCard cardDetails={item} setFetchAllData={setFetchAllData}/>}
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