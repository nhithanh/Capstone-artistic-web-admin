import axios from "axios"
import {MAIN_SERVER} from "./config"

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