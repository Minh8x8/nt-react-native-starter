import {createAsyncThunk} from '@reduxjs/toolkit';

import {Product} from '../../types/product';
import {productService} from '../../services/productService';

export const fetchProducts = createAsyncThunk<
  Product[],
  {searchQuery?: string; unitPrice?: number}
>('product/fetchProducts', async ({searchQuery, unitPrice}) => {
  const products = await productService.getProducts({searchQuery, unitPrice});
  return products;
});
