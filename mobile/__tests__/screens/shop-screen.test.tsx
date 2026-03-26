import React from 'react';
import {render, screen} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import ShopScreen from '@/screens/shop-screen';
import {useAuth} from '@/contexts/auth-context';
import {useProducts} from '@/hooks/use-products';

jest.mock('@/contexts/auth-context', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/hooks/use-products', () => ({
  useProducts: jest.fn(),
}));

jest.mock('react-native-vector-icons/MaterialCommunityIcons');

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
  });

  it('prompts unauthenticated users to sign in', () => {
    (useAuth as jest.Mock).mockReturnValue({user: null});

    render(<ShopScreen />);

    expect(screen.getByText('Please sign in to view products.')).toBeTruthy();
  });

  it('shows loader when products are loading', () => {
    (useProducts as jest.Mock).mockReturnValue({
      ...baseProductsHook,
      isLoading: true,
    });

    render(<ShopScreen />);

    expect(screen.getByTestId('products-loader')).toBeTruthy();
  });

  it('shows error state when products cannot be fetched', () => {
    (useProducts as jest.Mock).mockReturnValue({
      ...baseProductsHook,
      isError: true,
    });

    render(<ShopScreen />);

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

    render(<ShopScreen />);

    expect(screen.getByText('Test Product')).toBeTruthy();
  });
});
