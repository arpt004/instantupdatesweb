'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { Delete20Regular, Dismiss24Filled } from '@fluentui/react-icons'
import classes from './ProductCard.module.css'
import { Button, Dialog, DialogBody, DialogSurface, Image } from '@fluentui/react-components'
import { adminJainsKart } from '@/redux/actions/adminJainsKart'

const ProductCard = ({ cardDetails, setFetchAllData }) => {
  const { devicesku, shortdescription, devicecatalogid, inventorystatus, images, price, manufacturername } = cardDetails
  const dispatch = useDispatch();
  const [ confirmationPopup, setConfirmationPopup ] = useState(false);
  const authToken = useSelector((state) => state.adminJainsKart);

  useEffect(() => {
    const authValue = sessionStorage.getItem('authJainsKart');
    const salt = process.env.NEXT_PUBLIC_SALT;
    if(salt === authValue) dispatch(adminJainsKart(true));
    else dispatch(adminJainsKart(false));
  }, []);

  const closeConfimationModal = () => {
    setConfirmationPopup(false)
  }

  const handleDelete = async () => {
    try{
      const responseDeleteOne = await fetch( `/api/jains-kart/delete-product-data`, 
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ devicecatalogid: devicecatalogid }),
        },
    );
    console.log(responseDeleteOne)
    if(responseDeleteOne.ok){
      console.log('Successful Deletion')
      closeConfimationModal()
      setFetchAllData()
    }

    }catch(err) {
      console.log(err)
    }
  }

  return (
    <div className={classes.card}>
      { authToken && 
        <button className={classes.adminDeleteButton} onClick={() => setConfirmationPopup(true)}> 
          <Delete20Regular /> 
        </button> 
      }
      <Link href={`/jains-kart/product/${devicecatalogid}`} className={classes.cardLink}>
        <div className={classes.preview} >
          <Image src={images[0].blobURI} alt={images[0].altText} className={classes.imageCard}/>
        </div>
        <div className={classes.header} >
          <h4 className={classes.title} > { devicesku } </h4>
          <h4 className={classes.manufacturerName} > { manufacturername } </h4>
          <h3 className={inventorystatus >= 1 ? classes.price : classes.outOfStock } > 
            { inventorystatus >= 1 ? price : 'Out of Stock'}
          </h3>
        </div>
        <div className={classes.footer} >
          <p className={classes.shortDescription}> { shortdescription } </p>
        </div>
      </Link>

      {confirmationPopup && 
       <Dialog open={confirmationPopup} onOpenChange={closeConfimationModal}>
        <DialogSurface className={classes.modalContainer}>
          <DialogBody className={classes.modalInnerContainer}>
            <Button className={classes.modalButton} onClick={closeConfimationModal}>
              <Dismiss24Filled />
            </Button>
            <div>
              <div className={classes.modalContent}>
                <p> Are you sure ? You want to delete </p>
                <h3> { devicesku }</h3>
                <p> by {manufacturername} Arpit </p>
              </div>
              <div className={classes.modalButtonContainer}>
                <Button onClick={closeConfimationModal} className={classes.modalCancelButton}> Cancel </Button>
                <Button onClick={handleDelete} className={classes.modalDeleteButton}> Delete </Button>
              </div>
            </div>
          </DialogBody>
        </DialogSurface>
       </Dialog>
      }
    </div>
  )
}

export default ProductCard