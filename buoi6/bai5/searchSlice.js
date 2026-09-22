import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  keyword: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    clearKeyword: (state) => {
      state.keyword = '';
    },
  },
});

export const { setKeyword, clearKeyword } = searchSlice.actions;

// Selector
export const selectSearchKeyword = (state) => state.search.keyword;

export default searchSlice.reducer;