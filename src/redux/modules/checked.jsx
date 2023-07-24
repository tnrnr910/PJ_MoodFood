import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checked: Array(10).fill(-1)
};

const checkedSlice = createSlice({
  name: 'checked',
  initialState,
  reducers: {
    newnewChecked: (state, action) => {
      state.checked = action.payload;
    },
    resetChecked: (state) => {
      state.checked = Array(10).fill(-1);
    }
  }
});

export const { newnewChecked, resetChecked } = checkedSlice.actions;
export default checkedSlice.reducer;
