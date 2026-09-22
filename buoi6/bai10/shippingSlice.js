import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullName: '',
  phone: '',
  address: '',
};

export const shippingSlice = createSlice({
  name: 'shipping',
  initialState,
  reducers: {
    updateShippingInfo: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    clearShippingInfo: (state) => {
      state.fullName = '';
      state.phone = '';
      state.address = '';
    },
  },
});

export const { updateShippingInfo, clearShippingInfo } = shippingSlice.actions;
export const selectShippingInfo = (state) => state.shipping;

export default shippingSlice.reducer;