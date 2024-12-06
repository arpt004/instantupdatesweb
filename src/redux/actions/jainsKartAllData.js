import { JAINS_KART_ALL_DATA, JAINS_KART_SELECTED_PRODUCT } from "../types/configTypes";

export const jainsKartAllData = (value) => {
    return {
        type:JAINS_KART_ALL_DATA,
        payload: value
    }
}

export const jainsKartSelectedProduct = (value) => {
    return {
        type:JAINS_KART_SELECTED_PRODUCT,
        payload: value
    }
}