import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {Product} from '@/types/product';
import {wishlistLocalDb} from '@/services/wishlistLocalDb';
import type {RootState} from '../store';

export interface WishlistState {
  items: Product[];
  loading: boolean;
}

const initialState: WishlistState = {
  items: [],
  loading: false,
};

export const loadWishlist = createAsyncThunk(
  'wishlist/loadWishlist',
  async (userId: number) => {
    const items = await wishlistLocalDb.getWishlist(userId);
    return {items};
  },
);

export const toggleWishlist = createAsyncThunk(
  'wishlist/toggleWishlist',
  async ({userId, product}: {userId: number; product: Product}) => {
    const saved = await wishlistLocalDb.isSaved(userId, product.id);
    if (saved) {
      await wishlistLocalDb.remove(userId, product.id);
      return {product, saved: false};
    }
    await wishlistLocalDb.add(userId, product);
    return {product, saved: true};
  },
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearWishlist: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadWishlist.pending, state => {
        state.loading = true;
      })
      .addCase(loadWishlist.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.loading = false;
      })
      .addCase(loadWishlist.rejected, state => {
        state.loading = false;
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        const {product, saved} = action.payload;
        if (saved) {
          const exists = state.items.some(item => item.id === product.id);
          if (!exists) {
            state.items.push(product);
          }
        } else {
          state.items = state.items.filter(item => item.id !== product.id);
        }
      });
  },
});

export const {clearWishlist} = wishlistSlice.actions;

export const selectWishlist = (state: RootState) => state.wishlist.items;
export const selectWishlistIds = (state: RootState) =>
  state.wishlist.items.map(item => item.id);
export const selectWishlistLoading = (state: RootState) =>
  state.wishlist.loading;

export default wishlistSlice.reducer;
