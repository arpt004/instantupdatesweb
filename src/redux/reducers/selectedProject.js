
import { SELECTED_PROJECT } from "../types/configTypes";

const initialValue = {
    "project_name": "",
    "description":"",
    "tech_stack": "",
    "jira_id": "",
    "business_vertical": "",
    "business_owner": "",
    "estimated_timeline": "",
};

export const selectedProject = (state = initialValue, action) => {
    switch (action.type) {
        case SELECTED_PROJECT: return action.payload;
        default: return state;
    }
}  