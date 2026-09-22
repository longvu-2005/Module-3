import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customerInfo: {
    fullName: '',
    phone: '',
    address: '',
    note: '',
  },
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    updateCustomerInfo: (state, action) => {
      state.customerInfo = { ...state.customerInfo, ...action.payload };
    },
    resetCheckoutForm: (state) => {
      state.customerInfo = initialState.customerInfo;
    },
  },
});

export const { updateCustomerInfo, resetCheckoutForm } = checkoutSlice.actions;
export const selectCustomerInfo = (state) => state.checkout.customerInfo;

export default checkoutSlice.reducer;