import {Product} from '../models/product';
import api from './axiosInstance';

export const productService = {
  getProducts: async ({
    searchQuery,
    unitPrice,
  }: {
    searchQuery?: string;
    unitPrice?: number;
  }): Promise<Product[]> => {
    const response = await api.get('/product', {
      params: {name: searchQuery, priceUnit: unitPrice},
    });
    return response.data.data;
  },
};
