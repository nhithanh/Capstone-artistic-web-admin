import io from 'socket.io-client'
import {setGeneratedImage} from '../redux/slicers/generated-image.slicer'
import {setOriginImage} from '../redux/slicers/origin-image.slicer'
import { setIsLoading } from '../redux/slicers/is-loading.slicer'
import { TRANSFER_PHOTO_COMPLETED, TRANSFER_VIDEO_COMPLETED, UPLOAD_IMAGE_SUCCESS} from '../enums/socket-event'
import {SOCKET_SERVER} from '../config/index'


const socket = io(SOCKET_SERVER)
export function useSocket() {
    return socket
}

export const emitEvent = async ({event, payload}) => {
    await socket.emit(event, payload)
}

export const setUpListen = async ({userId, dispatch}) => {
    await socket.on(userId, data => {
        const {action} = data
        switch(action) {
            case TRANSFER_VIDEO_COMPLETED: {
                const {albumId} = data
                requestGetNotifications().then(({data, count}) => {
                    dispatch(setNotifications({
                        notifications: data,
                        count,
                    }))
                    dispatch(setMediasNull({id: albumId}))
                })
                break;
            }
            case TRANSFER_PHOTO_COMPLETED: {
                const {accessURL, styleId, transferPhotoLocation} = data
                dispatch(setGeneratedImage({accessURL, styleId, transferPhotoLocation}))
                dispatch(setIsLoading(false))
                break;
            }
            case UPLOAD_IMAGE_SUCCESS: {
                dispatch(setOriginImage(data))
                dispatch(setIsLoading(false))
                break;
            }
        }
    })
}

