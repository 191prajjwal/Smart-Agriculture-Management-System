import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import fieldReducer from '../features/fieldSlice';
import analysisReducer from '../features/analysisSlice';
import paymentReducer from '../features/paymentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    fields: fieldReducer,
    analysis: analysisReducer,
    payment: paymentReducer
  }
});