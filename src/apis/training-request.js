import axios from "axios"
import {MAIN_SERVER} from "./config"

export const fetchAllTrainingRequest = async () => {
    const ENDPOINT_URL = `${MAIN_SERVER}/training-requests`
    const response = await axios.get(ENDPOINT_URL)
    return response.data
}


export const stopTraining = async (id) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/training-requests/${id}/stop`
    const response = await axios.get(ENDPOINT_URL)
    return response.data
}

export const fetchTrainingRequestDetail = async (id) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/training-requests/${id}`
    const response = await axios.get(ENDPOINT_URL)
    return response.data
}

export const fetchTrainingResult = async(id) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/training-results`
    const response = await axios.get(ENDPOINT_URL)
    return response.data
}

export const createNewTrainingRequest = async({referenceStyleFile, lr, saveStep, contentWeight, styleWeight, relu12Weight, relu22Weight, relu33Weight, relu43Weight, name, description, numOfIterations}) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/training-requests`
    let formData = new FormData();
    formData.append("name", name)
    formData.append("description", description)
    formData.append("numOfIterations", numOfIterations)
    formData.append("lr", lr)
    formData.append("photo", referenceStyleFile)
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

export const deleteTrainingRequest = (id) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/training-requests/${id}`
    return axios.delete(ENDPOINT_URL)
}