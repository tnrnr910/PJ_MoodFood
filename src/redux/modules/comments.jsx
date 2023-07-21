import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: ''
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    getComments: (state, action) => {
      console.log('state', state);
      if (action.payload === '행복') {
        state.comments = '행복은 나누면 두배가 됩니다. 당신의 행복을 음식을 나누며 전파해 보세요~!';
      } else if (action.payload === '즐거움') {
        state.comments = '즐거운 나날들만 앞으로도 가득하시길 바랍니다~! ';
      } else if (action.payload === '분노') {
        state.comments = '저희가 추천해 준 음식과 함께 분노를 가라앉혀보시지요...ㅎ';
      } else if (action.payload === '슬픔') {
        state.comments = '슬픈 마음은 기쁨으로 채워보세요!^^';
      }
    }
  }
});

export const { getComments } = commentsSlice.actions;
export default commentsSlice.reducer;
