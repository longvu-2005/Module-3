import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rawKeyword: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setRawKeyword: (state, action) => {
      state.rawKeyword = action.payload;
    },
    clearKeyword: (state) => {
      state.rawKeyword = '';
    },
  },
});

export const { setRawKeyword, clearKeyword } = searchSlice.actions;
export const selectRawKeyword = (state) => state.search.rawKeyword;

export default searchSlice.reducer;