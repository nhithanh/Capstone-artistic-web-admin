import axios from "axios"
import {MAIN_SERVER} from "./config"

export const fetchAllTraining = async () => {
    const ENDPOINT_URL = `${MAIN_SERVER}/training`
    const response = await axios.get(ENDPOINT_URL)
    return response.data
}

export const fetchTrainingDetail = async (id) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/training/${id}`
    const response = await axios.get(ENDPOINT_URL)
    return response.data
}

export const fetchTrainingResult = async(id) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/training-results`
    const response = await axios.get(ENDPOINT_URL)
    return response.data
}

export const createNewTrainingRequest = async({referenceStyleFile, lr, saveStep, contentWeight, styleWeight, relu12Weight, relu22Weight, relu33Weight, relu43Weight}) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/styles`
    let formData = new FormData();
    formData.append("lr", lr)
    formData.append("referenceStyleFile", referenceStyleFile)
    formData.append("saveStep", saveStep)
    formData.append("contentWeight", contentWeight)
    formData.append("styleWeight", styleWeight)
    formData.append("relu12Weight", relu12Weight)
    formData.append("relu22Weight", relu22Weight)
    formData.append("relu33Weight", relu33Weight)
    formData.append("relu43Weight", relu43Weight)
    return axios.post(ENDPOINT_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
