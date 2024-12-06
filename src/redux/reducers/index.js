import { combineReducers } from "redux";
import { userData } from "./userData";
import { cartCount, cartData } from "./cartController";
import { adminJainsKart } from "./adminJainsKart";
import { jainsKartAllData, jainsKartSelectedProduct } from "./jainsKartAllData";

const reducers = combineReducers({
  userData: userData,
  adminJainsKart: adminJainsKart,
  cartCount: cartCount,
  cartData: cartData,
  jainsKartAllData: jainsKartAllData,
  jainsKartSelectedProduct: jainsKartSelectedProduct,
});

export default reducers;