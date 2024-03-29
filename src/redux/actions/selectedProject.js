import { SELECTED_PROJECT } from "../types/configTypes";

export const selectedProject = (projectData) => {
    return {
        type:SELECTED_PROJECT,
        payload: projectData
    }
}