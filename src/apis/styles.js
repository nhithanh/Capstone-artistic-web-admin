import axios from "axios"
import {MAIN_SERVER} from "./config"

export const fetchAllStyles = async () => {
    const ENDPOINT_URL = `${MAIN_SERVER}/styles/all`
    const response = await axios.get(ENDPOINT_URL)
    return response.data
}

export const fetchStyleDetail = async (id) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/styles/${id}`
    const response = await axios.get(ENDPOINT_URL)
    return response.data
}

export const createNewStyle = async({styleName, iconFile, isActive}) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/styles`
    let formData = new FormData();
    formData.append("styleName", styleName)
    formData.append("icon", iconFile)
    formData.append("isActive", isActive)
    return axios.post(ENDPOINT_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}