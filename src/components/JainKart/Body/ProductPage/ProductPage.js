"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Dialog,
  DialogBody,
  DialogSurface,
  Image,
} from "@fluentui/react-components";
import { Dismiss24Filled, ChevronRight16Filled } from "@fluentui/react-icons";
import { ProductDetails } from "../../Constants/ProductData.json";
import classes from "./ProductPage.module.css";
import Link from "next/link";
import ProductImageGallery from "./ProductImageGallery/ProductImageGallery";
import ModalImageGallery from "./ModalImageGallery/ModalImageGallery";

const filterByProductId = (filterId) => {
  const filteredData = ProductDetails.filter(
    (item) => item.DeviceCatalogId === Number(filterId)
  );
  return filteredData[0];
};

const ProductPage = ({ product_id }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const ProductData = filterByProductId(product_id);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleOptionChange = (e) => {
    router.push(`/jains-kart/product/${e.target.value}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const selectedVariant =
    ProductData.Variants?.find(
      (variant) => variant.DeviceCatalogId === product_id
    )?.Tag || "";

  return (
    <div className={classes.cardContianer}>
      <div className={classes.card}>
        <div className={classes.cardContent}>
          <div className={classes.imageContainer}>
            {ProductData.Images?.length <= 1 ? ( //update to one
              <Image
                src={ProductData.Images[0].blobURI}
                alt={ProductData.Images[0].altText}
                className={classes.image}
                onClick={handleImageClick}
              />
            ) : (
              <ProductImageGallery
                images={ProductData.Images}
                handleImageClick={handleImageClick}
                setSelectedImage={setSelectedImage}
              />
            )}
          </div>

          <div className={classes.productDetails}>
            <h2 className={classes.deviceSKU}> {ProductData.DeviceSKU} </h2>
            <h3 className={classes.manufacturerName}>
              {" "}
              {ProductData.ManufacturerName}{" "}
            </h3>
            <p className={classes.description}> {ProductData.Description} </p>
            <h2
              className={
                ProductData.Price && ProductData.InventoryStatus > 0
                  ? classes.price
                  : classes.outOfStock
              }
            >
              {ProductData.Price && ProductData.InventoryStatus > 0
                ? ProductData.Price
                : "Out Of Stock"}
            </h2>
            <p className={classes.mrp}> ₹{ProductData.MRP} </p>
            {ProductData.StartingLeaseFormattedPrice && (
              <p className={classes.leasingOptions}>
                {" "}
                Leasing options available starting at{" "}
                {ProductData.StartingLeaseFormattedPrice}/mo{" "}
              </p>
            )}

            {!!ProductData.Variants?.length && (
              <select
                role="combobox"
                defaultValue={selectedVariant}
                className={classes.dropdown}
                onChange={handleOptionChange}
                aria-label="variants"
                title="variants"
              >
                {ProductData.Variants.map((variant) => {
                  return (
                    <option
                      key={variant.DeviceCatalogId}
                      value={variant.DeviceCatalogId}
                    >
                      {variant.Tag}
                    </option>
                  );
                })}
              </select>
            )}

            <button
              className={classes.buyNowButton}
              title="Buy Now"
              onClick={handleCloseModal}
              disabled={!ProductData.Price || ProductData.InventoryStatus <= 0}
            >
              Buy Now
            </button>
          </div>
        </div>

        {ProductData.StartingLeaseFormattedPrice ? (
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
                  {ProductData.Images.length <= 1 ? (
                    <Image
                      src={ProductData.Images[0].blobURI}
                      alt={ProductData.Images[0].altText}
                      className={classes.modalImage}
                    />
                  ) : (
                    <ModalImageGallery
                      imageArray={ProductData.Images}
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
