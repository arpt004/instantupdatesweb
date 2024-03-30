import { USER_DATA } from "../types/configTypes";

export const userData = (userData) => {
    return {
        type:USER_DATA,
        payload: userData
    }
}