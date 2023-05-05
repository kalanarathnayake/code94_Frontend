import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productSlice from './slices/productSlice';

const rootReducer = combineReducers({
  productSlice,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
