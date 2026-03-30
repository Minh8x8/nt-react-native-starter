import {createSlice} from '@reduxjs/toolkit';

import type {RootState} from '../store';
import {Product} from '../../types/product';
import {fetchProducts} from './productThunk';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Loading
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      // Success
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      // Error
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

// Selectors
export const selectProducts = (state: RootState) => state.product.products;
export const selectProductLoading = (state: RootState) => state.product.loading;
export const selectProductError = (state: RootState) => state.product.error;

export default productSlice.reducer;
