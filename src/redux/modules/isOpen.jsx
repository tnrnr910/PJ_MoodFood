import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false
};

const isOpenSlice = createSlice({
  name: 'isOpenSlice',
  initialState,
  reducers: {
    statusModal: (state, action) => {
      state.isOpen = action.payload;
    }
  }
});

export const { statusModal } = isOpenSlice.actions;
export default isOpenSlice.reducer;
