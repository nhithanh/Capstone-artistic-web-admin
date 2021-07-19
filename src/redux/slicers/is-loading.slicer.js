import { createSlice } from "@reduxjs/toolkit"


const initialState = false


const isLoadingSlicer = createSlice({
    name: "Loading",
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state = action.payload
            return state
        }
    }
})


// action export
export const { setIsLoading } = isLoadingSlicer.actions


// use-selector export 
export const selectIsLoading = state => state.isLoading


// reducer export
export default isLoadingSlicer.reducer
