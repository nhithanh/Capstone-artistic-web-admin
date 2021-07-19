import io from 'socket.io-client'
import {SOCKET_SERVER} from '../configs/index'
import {UPDATE_TRAINING_REQUEST} from '../enums/socket-event'
import {updateTrainingRequests} from '../redux/slicers/training-request'
const socket = io(SOCKET_SERVER)
export function useSocket() {
    return socket
}

export const emitEvent = async ({event, payload}) => {
    await socket.emit(event, payload)
}

export const setUpListen = async ({dispatch}) => {
    await socket.on("ADMIN", data => {
        console.log("Receive message baby boy")
        const {action} = data
        switch(action) {
            case UPDATE_TRAINING_REQUEST: {
                const {updatedTrainingRequest} = data
                dispatch(updateTrainingRequests(updatedTrainingRequest))
                break;
            }
        }
    })
}

