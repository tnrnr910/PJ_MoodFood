import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  emotions: []
};

const emotionsSlice = createSlice({
  name: 'emotions',
  initialState,
  reducers: {
    getEmotions: (state, action) => {
      state.emotions = action.payload;
    }
  }
});

export const { getEmotions } = emotionsSlice.actions;
export default emotionsSlice.reducer;
