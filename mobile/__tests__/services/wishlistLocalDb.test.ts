import {wishlistLocalDb} from '@/services/wishlistLocalDb';
import {Product} from '@/types/product';

const mockExecuteSql = jest.fn();

jest.mock('react-native-sqlite-storage', () => ({
  enablePromise: jest.fn(),
  openDatabase: jest.fn(() => Promise.resolve({executeSql: mockExecuteSql})),
}));

describe('wishlistLocalDb', () => {
  const sampleProduct: Product = {
    id: 1,
    name: 'Sample',
    description: 'Desc',
    image: 'img.png',
    price: 9.99,
    priceUnit: 'USD',
    createdAt: '',
    updatedAt: '',
  };

  beforeEach(() => {
    mockExecuteSql.mockReset();
  });

  it('reads wishlist items and maps rows to products', async () => {
    mockExecuteSql
      // ensureTable create call
      .mockResolvedValueOnce([{}])
      // select call
      .mockResolvedValueOnce([
        {
          rows: {
            length: 1,
            item: (index: number) =>
              index === 0
                ? {
                    productId: 1,
                    name: 'Sample',
                    image: 'img.png',
                    price: 9.99,
                  }
                : null,
          },
        },
      ]);

    const items = await wishlistLocalDb.getWishlist(123);

    expect(mockExecuteSql).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('CREATE TABLE IF NOT EXISTS'),
    );
    expect(mockExecuteSql).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('SELECT productId'),
      [123],
    );
    expect(items).toEqual([
      {
        id: 1,
        name: 'Sample',
        description: '',
        image: 'img.png',
        price: 9.99,
        priceUnit: '',
        createdAt: '',
        updatedAt: '',
      },
    ]);
  });

  it('returns true when item exists in isSaved', async () => {
    mockExecuteSql
      .mockResolvedValueOnce([{}]) // table creation
      .mockResolvedValueOnce([{rows: {length: 1}}]);

    const saved = await wishlistLocalDb.isSaved(1, 10);

    expect(saved).toBe(true);
    expect(mockExecuteSql).toHaveBeenLastCalledWith(
      expect.stringContaining('SELECT 1 FROM'),
      [1, 10],
    );
  });

  it('inserts product when adding', async () => {
    mockExecuteSql
      .mockResolvedValueOnce([{}]) // table creation
      .mockResolvedValueOnce([{}]); // insert

    await wishlistLocalDb.add(5, sampleProduct);

    expect(mockExecuteSql).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('INSERT OR REPLACE'),
      [sampleProduct.id, 5, sampleProduct.name, sampleProduct.image, sampleProduct.price],
    );
  });

  it('deletes product when removing', async () => {
    mockExecuteSql
      .mockResolvedValueOnce([{}]) // table creation
      .mockResolvedValueOnce([{}]); // delete

    await wishlistLocalDb.remove(7, 42);

    expect(mockExecuteSql).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('DELETE FROM'),
      [7, 42],
    );
  });
});
