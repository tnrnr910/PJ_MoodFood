import { configureStore } from '@reduxjs/toolkit';
import checked from '../modules/checked';
import questPage from '../modules/questPage';
import isOpen from '../modules/isOpen';
import emotions from '../modules/emotions';
import comments from '../modules/comments';

const store = configureStore({
  reducer: {
    checked,
    emotions,
    isOpen,
    questPage,
    comments
  }
});

export default store;
