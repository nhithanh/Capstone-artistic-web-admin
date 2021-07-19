import axios from "axios"
import {MAIN_SERVER} from "../configs"

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

export const updateStyle = async({id, styleName, isActive, activeSnapshotId}) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/styles/${id}`
    const data = {
        styleName,
        isActive,
        activeSnapshotId
    }
    return axios.put(ENDPOINT_URL, data)
}

export const updateStyleWithIconChange = async({id, styleName, iconFile, isActive, activeSnapshotId}) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/styles/${id}/upload-file`
    let formData = new FormData();
    formData.append("styleName", styleName)
    formData.append("icon", iconFile)
    formData.append("isActive", isActive)
    formData.append("activeSnapshotId", activeSnapshotId)
    return axios.put(ENDPOINT_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const deleteStyle = async ({styleId}) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/styles/${styleId}`
    const response = await axios.delete(ENDPOINT_URL)
    return response.data
}
