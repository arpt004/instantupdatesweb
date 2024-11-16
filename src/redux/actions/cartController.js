import {CART_COUNT, CART_DATA } from "../types/configTypes";

export const cartCount = (count) => {
    return {
        type:CART_COUNT,
        payload: count
    }
}

export const cartData = (cartDetails) => {
    return {
        type:CART_DATA,
        payload: cartDetails
    }
}