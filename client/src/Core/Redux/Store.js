import {configureStore} from '@reduxjs/toolkit';
import GetUserInfoReducer from './Slices/GetUserInfoSlice';

export const store = configureStore({
  reducer: {
    userInfo: GetUserInfoReducer,
  },
});
