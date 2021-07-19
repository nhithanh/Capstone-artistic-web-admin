import { configureStore } from '@reduxjs/toolkit';
import isLoadingReducer from '../slicers/is-loading.slicer'

export const store = configureStore({
  reducer: {
    isLoading: isLoadingReducer,
  }, 
});
