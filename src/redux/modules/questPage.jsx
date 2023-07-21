import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questPage: 0
};

const questPageSlice = createSlice({
  name: 'questPage',
  initialState,
  reducers: {
    prevPage: (state, action) => {
      state.questPage = state.questPage - action.payload;
    },
    nextPage: (state, action) => {
      state.questPage = state.questPage + action.payload;
    }
  }
});

export const { prevPage, nextPage } = questPageSlice.actions;

export default questPageSlice.reducer;
