'use client';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Input from '@/components/ui/input';
import TextArea from '@/components/ui/textarea';
import Button from '@/components/ui/button';
import { CATEGORIES } from '../../Constants/constant';
import classes from './AdminForm.module.css'
import AdminSelect from './utils/AdminSelect';
// import { ProductDetails } from '../../Constants/ProductData.json'
import { filterByCategory } from '../../utils/commonFunctions';
import ImageUploader from './ImageUploader/ImageUploader';
import { filterByProductId } from '../../utils/commonFunctions';
import { fetchAllData } from "../../utils/fetchApiHelper";
import { jainsKartAllData } from "@/redux/actions/jainsKartAllData";

function generateUniqueId() {
    const currentTime = Date.now() % 100000000; // Get the last 8 digits of the current time
    const randomNumber = Math.floor(Math.random() * 100); // Generate a random number between 0 and 99
    const uniqueId = (`${currentTime}${randomNumber}`).slice(-8); // Ensure the ID is exactly 8 digits
    return parseInt(uniqueId, 10);
}

const AdminForm = () => {
    const dispatch = useDispatch();

    const ProductDetails = useSelector((state) => state.jainsKartAllData);
    const jainsKartSelectedProduct = useSelector((state) => state.jainsKartSelectedProduct);

    const [formData, setFromData] = useState({})
    const [images, setImages] = useState([]);
    const [variantToggle, setVariantToggle] = useState(false)
    const [variantList, setVariantList] = useState([])
    const [addedVariant, setAddedVariant] = useState([])
    const [IdName, setIdName] = useState({})
    // const [loadData, setLoadData] = useState(false)
    
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

    useEffect( () => {
        if(ProductDetails.length<1) setFetchAllData()
        if(Object.keys(jainsKartSelectedProduct).length >= 1) {

            const tempFormData  = {
              title: jainsKartSelectedProduct.title,
              device_SKU: jainsKartSelectedProduct.devicesku,
              category: jainsKartSelectedProduct.category,
              manufacturer_name: jainsKartSelectedProduct.manufacturername,
              inventory: jainsKartSelectedProduct.inventorystatus,
              price: jainsKartSelectedProduct.price,
              mrp: jainsKartSelectedProduct.mrp,
              description: jainsKartSelectedProduct.description,
            }

            setFromData(tempFormData)
            setImages(jainsKartSelectedProduct.images)
            setIdName(jainsKartSelectedProduct.variants)
            const tempIdName = {}
            const tempVariants = []
            jainsKartSelectedProduct.variants.forEach((variant) => {
                tempIdName[variant.devicecatalogid] = variant.Tag
                tempVariants.push(variant.devicecatalogid)
            })
            if(tempVariants && tempVariants.length >= 1) {
                setAddedVariant(tempVariants)
                setVariantToggle(true)
                setIdName(tempIdName)
                const categoryData = filterByCategory(jainsKartSelectedProduct.category, ProductDetails)
                setVariantList(categoryData)
            }
        }
    }, [])

    const handleSubmit = async () => {
        console.log('handleSubmit')
        console.log(formData)
        console.log(addedVariant)
        console.log(images)

        //  Validation
        let a = {
            "title": "dsf",
            "device_SKU": "fdsa",
            "manufacturer_name": "dsfa",
            "inventory": "57",
            "price": "78678",
            "mrp": "4342342",
            "category": "Gifts",
            "description": "sawwd"
        }

        try{
            const uploadResponse = await fetch(`/api/jains-kart/upload-multiple`,
              {
                method: 'POST',
                body: JSON.stringify(images),
              },
            );
            if(uploadResponse.ok){
                const res = await uploadResponse.json()
                console.log(res)

                const imageDataURI = res.map((eachImage) => {
                    return({
                        altText: eachImage.pathname,
                        blobURI: eachImage.url
                    })
                })

                const variantsWithTags = addedVariant.map((eachVariant) => {     
                    const filteredObject = filterByProductId(eachVariant, ProductDetails)               
                    return({
                        devicecatalogid: eachVariant,
                        Tag: filteredObject.devicesku
                    })
                })               

                let newData = {    
                    devicecatalogid: generateUniqueId(), 
                    title: formData.title, 
                    mrp: formData.mrp , 
                    devicesku: formData.device_SKU, 
                    shortdescription: formData.description, 
                    description: formData.description,
                    images: JSON.stringify(imageDataURI), 
                    devicetype: 1, 
                    category: formData.category, 
                    inventorystatus: formData.inventory, 
                    manufacturername: formData.manufacturer_name,
                    marketplacelistingstate: '3', 
                    price: formData.price, 
                    resellerid: 1, 
                    startingleaseformattedprice: "₹101.11", 
                    variants: JSON.stringify(variantsWithTags)
                }

                const responseInsertOne = await fetch( `/api/jains-kart/insert-product-data`, 
                    {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(newData),
                    },
                );
                console.log(responseInsertOne)
                if(responseInsertOne.ok){
                    console.log('successful insertion')
                    setFromData({})
                }

                console.log(newData)
                console.log(JSON.parse(newData.images))
                console.log(JSON.parse(newData.variants))
            }
        }catch(error) {
            console.log(error);
        }
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

        
        ProductDetails.forEach(element => {
            const variantIdName = IdName
            variantIdName[element.devicecatalogid] = element.devicesku
            setIdName(variantIdName)
        });
        
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


    const checkData = () => {
        console.log(addedVariant)
        console.log(ProductDetails)
        console.log('IdName')
        console.log(IdName)
        console.log(formData)
        console.log(images)
        console.log(variantList)
    }

  return (
    <>
     {true ?
        <div className={classes.formContainer}>
            <button onClick={checkData}> click </button>
            <form action={handleSubmit} className={classes.form}>
                <div className={classes.leftForm}>
                    <Input label={'title'} placeholder={'Enter Title'} type={'text'} formData={formData} setFromData={setFromData}/>
                    <Input label={'device_SKU'} placeholder={'Enter Device Model'} type={'text'} formData={formData} setFromData={setFromData}/>
                    <AdminSelect label={'category'} categories={CATEGORIES} formData={formData} handleChange={handleCategoryChange} />
                    <TextArea label={'description'} placeholder={'Enter Description'} formData={formData} setFromData={setFromData} />
                    <div className={classes.image_container}>
                        <ImageUploader images={images} setImages={setImages}/>
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
                                        <option value={variant.devicecatalogid} key={variant.devicecatalogid}> 
                                            {variant.devicesku} 
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
        :
        <> Loading </>
     }
    </>
  )
}

export default AdminForm