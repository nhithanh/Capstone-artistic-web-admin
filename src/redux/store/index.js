import { configureStore } from '@reduxjs/toolkit';
import trainingRequestsReducer from '../slicers/training-request'

export const store = configureStore({
  reducer: {
    trainingRequests: trainingRequestsReducer,
  }, 
});
