import { CART_COUNT, CART_DATA } from "../types/configTypes";

const initialCartValue = 0
export const cartCount = (state = initialCartValue, action) => {
    switch (action.type) {
        case CART_COUNT: return action.payload;
        default: return state;
    }
}

const initialCartData = []
export const cartData = (state = initialCartData, action) => {
    switch (action.type) {
        case CART_DATA: return action.payload;
        default: return state;
    }
}  