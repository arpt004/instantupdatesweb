"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogBody,
  DialogSurface,
  Image,
} from "@fluentui/react-components";
import { Dismiss24Filled, ChevronRight16Filled, Edit24Regular } from "@fluentui/react-icons";
// import { ProductDetails } from "../../Constants/ProductData.json";
import classes from "./ProductPage.module.css";
import Link from "next/link";
import ProductImageGallery from "./ProductImageGallery/ProductImageGallery";
import ModalImageGallery from "./ModalImageGallery/ModalImageGallery";
import { cartCount, cartData } from "@/redux/actions/cartController";
import { filterByProductId } from "../../utils/commonFunctions";
import NotFound from "../NotFound";
import { fetchAllData } from "../../utils/fetchApiHelper";
import { jainsKartAllData, jainsKartSelectedProduct } from "@/redux/actions/jainsKartAllData";
import { adminJainsKart } from "@/redux/actions/adminJainsKart";

const ProductPage = ({ product_id }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartReduxCount = useSelector((state) => state.cartCount);
  const cartReduxData = useSelector((state) => state.cartData);
  const ProductDetails = useSelector((state) => state.jainsKartAllData);
  const authToken = useSelector((state) => state.adminJainsKart);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const authValue = sessionStorage.getItem('authJainsKart');
    const salt = process.env.NEXT_PUBLIC_SALT;
    if(salt === authValue) dispatch(adminJainsKart(true));
    else dispatch(adminJainsKart(false));
  }, []);

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
  
  let ProductData = []
  if(ProductDetails.length<1) setFetchAllData()
  else ProductData = filterByProductId(product_id, ProductDetails);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleOptionChange = (e) => {
    const checkValue = e.target.value
    if(checkValue) router.push(`/jains-kart/product/${checkValue}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBuyNow = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = (AddProductData) => {
    setIsModalOpen(false);

    const dataObject = {
      devicesku: AddProductData.devicesku,
      manufacturername: AddProductData.manufacturername,
      price: AddProductData.price,
      images: AddProductData.images,
      devicecatalogid: AddProductData.devicecatalogid,
      quantity: 1,
    }

    const checkForId = cartReduxData.find(item => item.devicecatalogid === AddProductData.devicecatalogid)
    let dataArray = []
    if(checkForId){
      cartReduxData.forEach(element => {
        if(element.devicecatalogid === AddProductData.devicecatalogid){
          dataObject.quantity = Number(element.quantity) + 1
          dataArray.push(dataObject)
        } else {
          dataArray.push(element)
        }
      });
    } else {
      dataArray = [...cartReduxData, dataObject]
    }
    dispatch(cartCount(cartReduxCount+1))
    dispatch(cartData(dataArray))
  };

  const handleEditClick = () => {
    dispatch(jainsKartSelectedProduct(ProductData));
    router.push(`/jains-kart/admin`)
  }

  const selectedVariant =
    ProductData?.variants?.find(
      (variant) => variant.devicecatalogid === product_id
    )?.devicecatalogid || "";

  if(!ProductData) return <NotFound />

  return (
    <div className={classes.cardContianer}>
      <div className={classes.card}>
        { authToken && 
          <Button className={classes.adminEditButton} onClick={handleEditClick}  > 
            <Edit24Regular />
          </Button> 
        }

        <div className={classes.cardContent}>
          <div className={classes.imageContainer}>
            {ProductData.images?.length <= 1 ? ( 
              <Image
                src={ProductData.images[0].blobURI}
                alt={ProductData.images[0].altText}
                className={classes.image}
                onClick={handleImageClick}
              />
            ) : (
              <ProductImageGallery
                images={ProductData.images}
                handleImageClick={handleImageClick}
                setSelectedImage={setSelectedImage}
              />
            )}
          </div>

          <div className={classes.productDetails}>
            <h2 className={classes.deviceSKU}> {ProductData.devicesku} </h2>
            <h3 className={classes.manufacturerName}>
              {" "}
              {ProductData.ManufacturerName}{" "}
            </h3>
            <p className={classes.description}> {ProductData.description} </p>
            <h2
              className={
                ProductData.price && ProductData.inventorystatus > 0
                  ? classes.price
                  : classes.outOfStock
              }
            >
              {ProductData.price && ProductData.inventorystatus > 0
                ? ProductData.price
                : "Out Of Stock"}
            </h2>
            <p className={classes.mrp}> ₹{ProductData.mrp} </p>
            {ProductData.startingleaseformattedprice && (
              <p className={classes.leasingOptions}>
                {" "}
                Leasing options available starting at{" "}
                {ProductData.startingleaseformattedprice}/mo{" "}
              </p>
            )}

            {!!ProductData.variants?.length && (
              <>
                <label> Variants : </label>
                <select
                  role="combobox"
                  defaultValue={selectedVariant}
                  className={classes.dropdown}
                  onChange={handleOptionChange}
                  aria-label="variants"
                  title="variants"
                >
                  <option value=''> Select </option>
                  {ProductData.variants.map((variant) => {
                    return (
                      <option
                        key={variant.devicecatalogid}
                        value={variant.devicecatalogid}
                      >
                        {variant.Tag}
                      </option>
                    );
                  })}
                </select>
              </>
            )}

            <div>
              <button
                className={classes.buyNowButton}
                title="Buy Now"
                onClick={handleBuyNow}
                disabled={!ProductData.price || ProductData.inventorystatus <= 0}
              >
                Buy Now
              </button>

              <button
                className={classes.buyNowButton}
                title="Add to Cart"
                onClick={() => handleAddToCart(ProductData)}
                disabled={!ProductData.price || ProductData.inventorystatus <= 0}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {ProductData.startingleaseformattedprice ? (
          <div className={classes.financingOption}>
            <span>
              Monthly financing options available in shopping cart with
              qualifying order. Terms and conditions may apply
            </span>
            <Link
              target="_blank"
              href="/jains-kart"
              className={classes.financingOptionLink}
            >
              <span> Learn More </span>
              <span className={classes.financingOptionIcon}>
                <ChevronRight16Filled />
              </span>
            </Link>
          </div>
        ) : (
          <div className={classes.extraPadding}></div>
        )}

        {isModalOpen && (
          <>
            {isModalOpen && (
              <div
                className={classes.modalContainerBackdrop}
                onClick={handleCloseModal}
              />
            )}
            <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
              <DialogSurface className={classes.modalContainer}>
                <DialogBody className={classes.modalImageContainer}>
                  <Button
                    className={classes.modalButton}
                    onClick={handleCloseModal}
                    title="Close"
                  >
                    <Dismiss24Filled />
                  </Button>
                  {ProductData.images.length <= 1 ? (
                    <Image
                      src={ProductData.images[0].blobURI}
                      alt={ProductData.images[0].altText}
                      className={classes.modalImage}
                    />
                  ) : (
                    <ModalImageGallery
                      imageArray={ProductData.images}
                      selectedImage={selectedImage}
                    />
                  )}
                </DialogBody>
              </DialogSurface>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
