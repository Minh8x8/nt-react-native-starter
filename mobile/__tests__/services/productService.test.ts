import api from '@/services/axiosInstance';
import {productService} from '@/services/productService';

jest.mock('@/services/axiosInstance', () => ({
  get: jest.fn(),
}));

describe('productService', () => {
  it('fetches products with query params', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: {
        data: [
          {
            id: 1,
            name: 'Hat',
            description: '',
            image: '',
            price: 10,
            priceUnit: '',
            createdAt: '',
            updatedAt: '',
          },
        ],
      },
    });

    const result = await productService.getProducts({
      searchQuery: 'hat',
      unitPrice: 10,
    });

    expect(api.get).toHaveBeenCalledWith('/product', {
      params: {name: 'hat', priceUnit: 10},
    });
    expect(result).toEqual([
      {
        id: 1,
        name: 'Hat',
        description: '',
        image: '',
        price: 10,
        priceUnit: '',
        createdAt: '',
        updatedAt: '',
      },
    ]);
  });

  it('handles empty params gracefully', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({data: {data: []}});

    const result = await productService.getProducts({});

    expect(api.get).toHaveBeenCalledWith('/product', {params: {name: undefined, priceUnit: undefined}});
    expect(result).toEqual([]);
  });
});
