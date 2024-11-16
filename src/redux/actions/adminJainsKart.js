import { ADMIN_JAINS_KART } from "../types/configTypes";

export const adminJainsKart = (value) => {
    return {
        type:ADMIN_JAINS_KART,
        payload: value
    }
}