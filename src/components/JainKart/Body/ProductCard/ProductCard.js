'use client'

import React from 'react'
import Link from 'next/link'
import classes from './ProductCard.module.css'
import { Image } from '@fluentui/react-components'

const ProductCard = ({ cardDetails }) => {
  const { DeviceSKU, ShortDescription, DeviceCatalogId, InventoryStatus, Images, Price, ManufacturerName } = cardDetails
  
  return (
    <div className={classes.card}>
      <Link href={`/jains-kart/product/${DeviceCatalogId}`} className={classes.cardLink}>
        <div className={classes.preview} >
          <Image src={Images[0].blobURI} alt={Images[0].altText} className={classes.imageCard}/>
        </div>
        <div className={classes.header} >
          <h4 className={classes.title} > { DeviceSKU } </h4>
          <h4 className={classes.manufacturerName} > { ManufacturerName } </h4>
          <h3 className={InventoryStatus >= 1 ? classes.price : classes.outOfStock } > 
            { InventoryStatus >= 1 ? Price : 'Out of Stock'}
          </h3>
        </div>
        <div className={classes.footer} >
          <p className={classes.shortDescription}> { ShortDescription } </p>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard