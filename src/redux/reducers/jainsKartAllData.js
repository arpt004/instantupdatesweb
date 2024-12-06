import { JAINS_KART_ALL_DATA, JAINS_KART_SELECTED_PRODUCT } from "../types/configTypes";

const initialValue = [];
export const jainsKartAllData = (state = initialValue, action) => {
    switch (action.type) {
        case JAINS_KART_ALL_DATA: return action.payload;
        default: return state;
    }
}

const initialSelectedProduct = {};
export const jainsKartSelectedProduct = (state = initialSelectedProduct, action) => {
    switch (action.type) {
        case JAINS_KART_SELECTED_PRODUCT: return action.payload;
        default: return state;
    }
} 