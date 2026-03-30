import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import ShopScreen from '@/screens/shop/shop-screen';
import {useAuth} from '@/providers/AuthProvider';
import {useProducts} from '@/hooks/use-products';
import {useWishlist} from '@/hooks/use-wishlist';
import {Provider} from 'react-redux';
import store from '@/store/store';

jest.mock('@/providers/AuthProvider', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/hooks/use-products', () => ({
  useProducts: jest.fn(),
}));

jest.mock('@/hooks/use-wishlist', () => ({
  useWishlist: jest.fn(),
}));

jest.mock('react-native-vector-icons/MaterialCommunityIcons');

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
  __esModule: true,
  default: {show: jest.fn()},
}));

describe('ShopScreen', () => {
  const baseProductsHook = {
    data: [],
    isLoading: false,
    isError: false,
    refetch: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useProducts as jest.Mock).mockReturnValue(baseProductsHook);
    (useAuth as jest.Mock).mockReturnValue({user: {id: 1}});
    (useWishlist as jest.Mock).mockReturnValue({
      wishlistIds: [],
      toggleWishlist: jest.fn(),
      refresh: jest.fn(),
    });
  });

  it('prompts unauthenticated users to sign in', () => {
    (useAuth as jest.Mock).mockReturnValue({user: null});

    render(
      <Provider store={store}>
        <ShopScreen />
      </Provider>,
    );
    expect(screen.getByText('Please sign in to view products.')).toBeTruthy();
  });

  it('shows loader when products are loading', () => {
    (useProducts as jest.Mock).mockReturnValue({
      ...baseProductsHook,
      isLoading: true,
    });

    render(
      <Provider store={store}>
        <ShopScreen />
      </Provider>,
    );

    expect(screen.getByTestId('products-loader')).toBeTruthy();
  });

  it('shows error state when products cannot be fetched', () => {
    (useProducts as jest.Mock).mockReturnValue({
      ...baseProductsHook,
      isError: true,
    });

    render(
      <Provider store={store}>
        <ShopScreen />
      </Provider>,
    );

    expect(screen.getByText('Failed to load products')).toBeTruthy();
  });

  it('renders product cards when data is available', () => {
    (useProducts as jest.Mock).mockReturnValue({
      ...baseProductsHook,
      data: [
        {
          id: 1,
          name: 'Test Product',
          description: 'A great item',
          image: 'https://example.com/image.jpg',
          price: 19.99,
          priceUnit: 'USD',
          createdAt: '',
          updatedAt: '',
        },
      ],
    });

    render(
      <Provider store={store}>
        <ShopScreen />
      </Provider>,
    );

    expect(screen.getByText('Test Product')).toBeTruthy();
  });

  it('adds item to cart via add button', () => {
    const toastShow = jest.fn();
    (useProducts as jest.Mock).mockReturnValue({
      ...baseProductsHook,
      data: [
        {
          id: 2,
          name: 'Addable',
          description: '',
          image: 'img',
          price: 9.5,
          priceUnit: '',
          createdAt: '',
          updatedAt: '',
        },
      ],
    });
    (useWishlist as jest.Mock).mockReturnValue({
      wishlistIds: [],
      toggleWishlist: jest.fn(),
      refresh: jest.fn(),
    });
    // Replace toast mock for this test
    const toastModule = require('react-native-toast-message');
    toastModule.show = toastShow;
    toastModule.default.show = toastShow;

    render(
      <Provider store={store}>
        <ShopScreen />
      </Provider>,
    );

    fireEvent.press(screen.getByTestId('add-2'));

    expect(toastShow).toHaveBeenCalledWith({
      type: 'success',
      text1: 'Added to cart',
      text2: 'Addable',
    });
  });
});
