import React, {useCallback} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import ProductCard from '@/components/ProductCard';
import {Product} from '@/types/product';
import {styles} from '../styles';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  savedIds: number[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  numColumns?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading,
  isError,
  isRefreshing,
  onRefresh,
  savedIds,
  onToggleWishlist,
  onAddToCart,
  numColumns = 2,
}) => {
  const renderItem = useCallback(
    ({item}: {item: Product}) => (
      <ProductCard
        product={item}
        isSaved={savedIds.includes(item.id)}
        onPressHeart={onToggleWishlist}
        onPressAdd={onAddToCart}
      />
    ),
    [onAddToCart, onToggleWishlist, savedIds],
  );

  if (isLoading && !isRefreshing) {
    return (
      <View style={styles.loader} testID="products-loader">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (isError) {
    return <Text style={styles.errorText}>Failed to load products</Text>;
  }

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      numColumns={numColumns}
      columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : undefined}
      contentContainerStyle={styles.flatListContent}
      showsVerticalScrollIndicator={false}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
    />
  );
};

export default ProductGrid;
