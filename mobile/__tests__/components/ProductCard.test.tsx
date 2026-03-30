import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import ProductCard from '@/components/ProductCard';
import {Product} from '@/types/product';

const product: Product = {
  id: 10,
  name: 'Bag',
  description: '',
  image: 'https://img.test/bag.png',
  price: 25,
  priceUnit: '',
  createdAt: '',
  updatedAt: '',
};

describe('ProductCard', () => {
  it('calls heart and add handlers with product', () => {
    const onHeart = jest.fn();
    const onAdd = jest.fn();

    const {getByTestId} = render(
      <ProductCard
        product={product}
        isSaved={false}
        onPressHeart={onHeart}
        onPressAdd={onAdd}
      />,
    );

    fireEvent.press(getByTestId('heart-10'));
    fireEvent.press(getByTestId('add-10'));

    expect(onHeart).toHaveBeenCalledWith(product);
    expect(onAdd).toHaveBeenCalledWith(product);
  });
});
