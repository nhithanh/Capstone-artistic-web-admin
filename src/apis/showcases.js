import axios from "axios"
import {MAIN_SERVER} from "../config"

export const fetchAllShowcases = async (id) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/showcases?styleId=${id}`
    const response = await axios.get(ENDPOINT_URL)
    return response.data
}

export const deleteShowcase = async ({showcaseId}) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/showcases/${showcaseId}`
    const response = await axios.delete(ENDPOINT_URL)
    return response.data
}

export const addShowcase = async ({styleId, file, showcaseName}) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/showcases`
    let formData = new FormData();
    formData.append("styleId", styleId)
    formData.append("photo", file)
    formData.append("showcaseName", showcaseName)
    return axios.post(ENDPOINT_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
