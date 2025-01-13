import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subscriptionPlans: [],
  paymentHistory: [],
  currentOrder: null,
  loading: false,
  error: null
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setSubscriptionPlans: (state, action) => {
      state.subscriptionPlans = action.payload;
      state.loading = false;
    },
    setPaymentHistory: (state, action) => {
      state.paymentHistory = action.payload;
      state.loading = false;
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  setLoading,
  setSubscriptionPlans,
  setPaymentHistory,
  setCurrentOrder,
  setError
} = paymentSlice.actions;

export default paymentSlice.reducer;