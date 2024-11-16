'use client';

import React, { useEffect, useState } from 'react'
import Input from '@/components/ui/input';
import TextArea from '@/components/ui/textarea';
import Button from '@/components/ui/button';
import { CATEGORIES } from '../../Constants/constant';
import classes from './AdminForm.module.css'
import AdminSelect from './utils/AdminSelect';
import { ProductDetails } from '../../Constants/ProductData.json'
import { filterByCategory } from '../../utils/commonFunctions';
import ImageUploader from './ImageUploader/ImageUploader';

const AdminForm = () => {
    const [formData, setFromData] = useState({})
    const [variantToggle, setVariantToggle] = useState(false)
    const [variantList, setVariantList] = useState([])
    const [addedVariant, setAddedVariant] = useState([])

    const IdName = {}
    ProductDetails.forEach(element => {
        IdName[element.DeviceCatalogId] = element.DeviceSKU
    });

    console.log('IdName')
    console.log(IdName)

    const handleSubmit = () => {
        console.log('handleSubmit')
        console.log(formData)
    }

    const handleCategoryChange = (e) => {
        setFromData(pd => {
            pd[e.target.name] = e.target.value
            return pd;
        })
        if(e.target.value) {
            setAddedVariant([])
            setVariantToggle(true)
            const filterId = e.target.value.toLowerCase().replaceAll(' ','-')
            const categoryData = filterByCategory(filterId, ProductDetails)
            setVariantList(categoryData)
        }
        else setVariantToggle(false)
    }

    const handleAddVariant = (e) => {
        const currentVariants = addedVariant || []
        if(!currentVariants.includes(e.target.value)){
            currentVariants.push(e.target.value)   
            setAddedVariant(currentVariants)
            setVariantToggle(false)
            setTimeout(() => {
                setVariantToggle(true)
            }, 100)
        }
    }

    const handleDeleteVariant = (index) => {
        const currentVariants = addedVariant || []
        currentVariants.splice(index, 1)
        setAddedVariant(currentVariants)
        setVariantToggle(false)
        setTimeout(() => {
            setVariantToggle(true)
        }, 100)
    }

  return (
    <div className={classes.formContainer}>
        <form action={handleSubmit} className={classes.form}>
            <div className={classes.leftForm}>
                <Input label={'title'} placeholder={'Enter Title'} type={'text'} formData={formData} setFromData={setFromData}/>
                <Input label={'device_SKU'} placeholder={'Enter Device Model'} type={'text'} formData={formData} setFromData={setFromData}/>
                <AdminSelect label={'category'} categories={CATEGORIES} formData={formData} handleChange={handleCategoryChange} />
                <TextArea label={'description'} placeholder={'Enter Description'} formData={formData} setFromData={setFromData} />
                <div className={classes.image_container}>
                    {/* <input className={classes.image} placeholder={'Upload Image'} type={'file'} 
                        accept="image/png, image/gif, image/jpeg"  required
                        // onChange={handleImage}
                    /> */}

                    <ImageUploader />
                </div>
            </div>

            <div className={classes.rightForm}>
                <Input label={'manufacturer_name'} placeholder={'Enter Manufacturer Name'} type={'text'} formData={formData} setFromData={setFromData} />
                <Input label={'inventory'} placeholder={'Inventory Count'} type={'number'} formData={formData} setFromData={setFromData}/>
                <Input label={'price'} placeholder={'Price'} type={'number'} formData={formData} setFromData={setFromData}/>
                <Input label={'mrp'} placeholder={'MRP'} type={'number'} formData={formData} setFromData={setFromData}/>

                {variantToggle ?
                  <div className={classes.variantsContainer}>
                    <div> 
                        <label className={classes.label}> VARIANTS: </label>
                        <select className={classes.input}
                            onChange={handleAddVariant} value={'variants'} name='variants'
                        >
                            <option value=''> Select </option>
                            { variantList.map(variant => {
                                return(
                                    <option value={variant.DeviceCatalogId} key={variant.DeviceCatalogId}> 
                                        {variant.DeviceSKU} 
                                    </option>
                                )
                            })
                            }
                        </select>
                    </div>
                    
                    { addedVariant && addedVariant.length > 0 &&
                        <div>
                            { addedVariant.map( (variant, index) => {
                                return(
                                    <div key={index} className={classes.renderVariants}>
                                        <span> {IdName[variant]} </span>
                                        <button onClick={() => handleDeleteVariant(index)} className={classes.removeButton}>
                                            &times; 
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    }
                  </div>
                  :
                  <div className={classes.variantsContainerSkeleton}> </div>
                }
                <div className={classes.submit}>
                    <Button text={'submit'} />  
                </div>
            </div>
        </form>
    </div>
  )
}

export default AdminForm