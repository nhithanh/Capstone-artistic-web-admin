import {MAIN_SERVER} from "../configs"
import axios from "axios"

export const fetchTrainningResultByRequestId = async (trainningRequestId) => {
    const ENDPOINT_URL = `${MAIN_SERVER}/training-results?requestId=${trainningRequestId}`
    const response = await axios.get(ENDPOINT_URL)
    return response.data
}