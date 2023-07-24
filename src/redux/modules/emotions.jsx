import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  emotions: ''
};

const emotionsSlice = createSlice({
  name: 'emotions',
  initialState,
  reducers: {
    getEmotions: (state, action) => {
      state.emotions = action.payload;
    },
    resetEmotions: (state) => {
      state.emotions = '';
    }
  }
});

export const { getEmotions, resetEmotions } = emotionsSlice.actions;
export default emotionsSlice.reducer;
