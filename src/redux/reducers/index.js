import { combineReducers } from "redux";
import { userData } from "./userData";
import { cartCount, cartData } from "./cartController";
import { adminJainsKart } from "./adminJainsKart";

const reducers = combineReducers({
  userData: userData,
  adminJainsKart: adminJainsKart,
  cartCount: cartCount,
  cartData: cartData,
});

export default reducers;