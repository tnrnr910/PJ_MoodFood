import { configureStore } from '@reduxjs/toolkit';
import checked from '../modules/checked';
import questPage from '../modules/questPage';
import isOpen from '../modules/isOpen';
import emotions from '../modules/emotions';

const store = configureStore({
  reducer: {
    checked,
    emotions,
    isOpen,
    questPage
  }
});

export default store;
