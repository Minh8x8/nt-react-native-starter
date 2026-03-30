import {configureStore, Middleware} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import productReducer from './product/productSlice';
import wishlistReducer from './wishlist/wishlistSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    wishlist: wishlistReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(logger as Middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
