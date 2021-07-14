import {MAIN_SERVER} from './config'
import axios from 'axios'
export const login = async ({username, password}) => {
    const payload = {username, password}
    const ENDPOINT_URL = `${MAIN_SERVER}/auth/login`
    try {
        const response = await axios.post(ENDPOINT_URL, payload)
        return response.data
    } catch (error) {
        return error.response.data
    }
}