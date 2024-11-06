
import { combineReducers } from "redux";
import { userData } from "./userData";
import { selectedProject } from "./selectedProject";
import { adminJainsKart } from "./adminJainsKart";

const reducers = combineReducers({
  userData: userData,
  selectedProject: selectedProject,
  adminJainsKart: adminJainsKart,
});

export default reducers;