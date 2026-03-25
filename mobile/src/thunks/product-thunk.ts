import {createAsyncThunk} from '@reduxjs/toolkit';
import {Product} from '../models/product';
import {productService} from '../services/product-service';

export const fetchProducts = createAsyncThunk<
  Product[],
  {searchQuery?: string; unitPrice?: number}
>('product/fetchProducts', async ({searchQuery, unitPrice}) => {
  const products = await productService.getProducts({searchQuery, unitPrice});
  return products;
});
