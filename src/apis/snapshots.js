import axios from "axios"
import {MAIN_SERVER} from "./config"

export const fetchAllSnapshots = async (id) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/styles/${id}/snapshots`
    const response = await axios.get(ENDPOINT_URL)
    return response.data
}

export const uploadSnapshot = async ({snapshotName, styleRoutingKey, styleId, snapshotFile}) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/snapshots`
    let formData = new FormData();
    formData.append("snapshotName", snapshotName)
    formData.append("routingKey", styleRoutingKey)
    formData.append("styleId", styleId)
    formData.append("snapshot", snapshotFile)
    return axios.post(ENDPOINT_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const deleteSnapshot = async ({snapshotId}) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/snapshots/${snapshotId}`
    const response = await axios.delete(ENDPOINT_URL)
    return response.data
}