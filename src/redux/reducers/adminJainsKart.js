import { ADMIN_JAINS_KART } from "../types/configTypes";

const initialValue = false;

export const adminJainsKart = (state = initialValue, action) => {
    switch (action.type) {
        case ADMIN_JAINS_KART: return action.payload;
        default: return state;
    }
}  