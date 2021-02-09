import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'cart',
  initialState: {
    searchTerm: {},
  },
  reducers: {
    addSearchTerm(state, action) {
      if (!!action.payload.name_like) {
        state.searchTerm = { _limit: 9, ...action.payload };
      } else state.searchTerm = {};
    },

    clearSearchTerm(state) {
      state.searchTerm = { _page: 1, _limit: 9 };
    },
  },
});

const { reducer, actions } = productSlice;
export const { addSearchTerm, clearSearchTerm } = actions;
export default reducer;
