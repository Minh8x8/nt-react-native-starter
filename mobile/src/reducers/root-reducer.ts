import {combineReducers} from '@reduxjs/toolkit';
import productReducer from '../slices/product-slice';

const rootReducer = combineReducers({
  product: productReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
