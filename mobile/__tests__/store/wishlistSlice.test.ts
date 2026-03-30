import {configureStore} from '@reduxjs/toolkit';

import wishlistReducer, {
  loadWishlist,
  toggleWishlist,
  WishlistState,
} from '@/store/wishlist/wishlistSlice';
import {wishlistLocalDb} from '@/services/wishlistLocalDb';
import {Product} from '@/types/product';

jest.mock('react-native-sqlite-storage', () => ({
  enablePromise: jest.fn(),
  openDatabase: jest.fn(() =>
    Promise.resolve({
      executeSql: jest.fn(),
    }),
  ),
}));

describe('wishlist slice', () => {
  const sampleProduct: Product = {
    id: 1,
    name: 'Hat',
    description: 'Nice hat',
    image: 'img',
    price: 12,
    priceUnit: 'USD',
    createdAt: '',
    updatedAt: '',
  };

  const createStore = (preloaded?: Partial<WishlistState>) =>
    configureStore({
      reducer: {wishlist: wishlistReducer},
      preloadedState: preloaded
        ? {wishlist: {...{items: [], loading: false}, ...preloaded}}
        : undefined,
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('loads wishlist items successfully', async () => {
    const getWishlistSpy = jest
      .spyOn(wishlistLocalDb, 'getWishlist')
      .mockResolvedValueOnce([sampleProduct]);
    const store = createStore();

    const action = await store.dispatch(loadWishlist(99));

    expect(action.type).toBe(loadWishlist.fulfilled.type);
    expect(getWishlistSpy).toHaveBeenCalledWith(99);
    expect(store.getState().wishlist.items).toEqual([sampleProduct]);
    expect(store.getState().wishlist.loading).toBe(false);
  });

  it('handles loadWishlist rejection without altering items', async () => {
    jest
      .spyOn(wishlistLocalDb, 'getWishlist')
      .mockRejectedValueOnce(new Error('db failed'));
    const store = createStore({items: [sampleProduct]});

    await store.dispatch(loadWishlist(5));

    expect(store.getState().wishlist.items).toEqual([sampleProduct]);
    expect(store.getState().wishlist.loading).toBe(false);
  });

  it('adds product when toggleWishlist saves new item', async () => {
    const isSavedSpy = jest
      .spyOn(wishlistLocalDb, 'isSaved')
      .mockResolvedValueOnce(false);
    const addSpy = jest
      .spyOn(wishlistLocalDb, 'add')
      .mockResolvedValueOnce(undefined);
    const store = createStore();

    const action = await store.dispatch(
      toggleWishlist({userId: 1, product: sampleProduct}),
    );

    expect(action.type).toBe(toggleWishlist.fulfilled.type);
    expect(isSavedSpy).toHaveBeenCalledWith(1, sampleProduct.id);
    expect(addSpy).toHaveBeenCalledWith(1, sampleProduct);
    expect(store.getState().wishlist.items).toEqual([sampleProduct]);
  });

  it('removes product when toggleWishlist unsaves existing item', async () => {
    const isSavedSpy = jest
      .spyOn(wishlistLocalDb, 'isSaved')
      .mockResolvedValueOnce(true);
    const removeSpy = jest
      .spyOn(wishlistLocalDb, 'remove')
      .mockResolvedValueOnce(undefined);
    const store = createStore({items: [sampleProduct]});

    const action = await store.dispatch(
      toggleWishlist({userId: 1, product: sampleProduct}),
    );

    expect(action.type).toBe(toggleWishlist.fulfilled.type);
    expect(isSavedSpy).toHaveBeenCalledWith(1, sampleProduct.id);
    expect(removeSpy).toHaveBeenCalledWith(1, sampleProduct.id);
    expect(store.getState().wishlist.items).toEqual([]);
  });
});
