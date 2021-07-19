import { createSlice } from "@reduxjs/toolkit"
import { TRAINING_REQUESTS_PREFIX } from '../../enums/redux-prefix'
import _ from 'lodash'

const initialState = {
    data: {}
}

const trainingRequestsSlicer = createSlice({
    name: TRAINING_REQUESTS_PREFIX,
    initialState,
    reducers: {
        setTrainingReqests: (state, action) => {
            const data = action.payload
            state.data = data
        },
        updateTrainingRequests: (state, action) => {
            const updateTrainingRequest = action.payload
            const trainingRequest = state.data[updateTrainingRequest.id]
            if(trainingRequest) {
                state.data[updateTrainingRequest.id] = {
                    ...updateTrainingRequest,
                    accessURL: trainingRequest.accessURL 
                }
            } else {
                state.data[updateTrainingRequest.id] = updateTrainingRequest  
            }
            
        },
        deleteTrainingRequest: (state, action) => {
            const deleteTrainingRequest = action.payload
            state.data = _.omit(state.data, [deleteTrainingRequest.id])
        }
    }
})


// action export
export const { setTrainingReqests, updateTrainingRequests, deleteTrainingRequest } = trainingRequestsSlicer.actions

// use-selector export 
export const selectTrainingRequests = state => state.trainingRequests.data

// reducer export
export default trainingRequestsSlicer.reducer
