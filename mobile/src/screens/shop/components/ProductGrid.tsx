import React, {useCallback} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import ProductCard from '@/components/ProductCard';
import {Product} from '@/models/product';
import {styles} from '../styles';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading,
  isError,
  isRefreshing,
  onRefresh,
}) => {
  const renderItem = useCallback(
    ({item}: {item: Product}) => <ProductCard product={item} />,
    [],
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
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.flatListContent}
      showsVerticalScrollIndicator={false}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
    />
  );
};

export default ProductGrid;
