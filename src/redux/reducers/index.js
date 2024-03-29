
import { combineReducers } from "redux";
import { userData } from "./userData";
import { selectedProject } from "./selectedProject";

const reducers = combineReducers({
  userData: userData,
  selectedProject: selectedProject,
});

export default reducers;