
import { USER_DATA } from "../types/configTypes";

const initialValue = {};

export const userData = (state = initialValue, action) => {
    switch (action.type) {
        case USER_DATA: return action.payload;
        default: return state;
    }
}  