import {MAIN_SERVER} from '../configs'
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

export const getUserProfile = async () => {
    const ENDPOINT_URL = `${MAIN_SERVER}/users/profile`
    const token = await localStorage.getItem("token")
    try {
        const {data} = await axios.get(ENDPOINT_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return {"data": data}
    } catch(error) {
        if(error.response) {
            return error.response.data
        } else if (error.request) {
            return error.request;
        } 
    }
    
}