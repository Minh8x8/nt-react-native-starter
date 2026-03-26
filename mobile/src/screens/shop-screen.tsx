// mobile/src/screens/shop-screen.tsx

import React, {useState, useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useAuth} from '../contexts/auth-context';
import {Product} from '../models/product';
import {styles} from './styles/shop-screen-styles';
import ProductCard from '../components/ProductCard';
import {useProducts} from '../hooks/use-products';

const CATEGORIES = ['All Items', 'Electronics', 'Fashion', 'Home', 'Beauty'];

const ShopScreen: React.FC = () => {
  const {user} = useAuth();

  const [activeCategory, setActiveCategory] = useState<string>('All Items');

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Search states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const {
    data: products = [],
    isLoading: loading,
    isError,
    refetch,
  } = useProducts({
    searchQuery: debouncedSearchQuery,
  });

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  }, [refetch]);

  const renderProductItem = useCallback(({item}: {item: Product}) => {
    return (
      <ProductCard
        product={item}
        onPressHeart={product => {
          console.log('Heart:', product.id);
        }}
        onPressAdd={product => {
          console.log('Add:', product.id);
        }}
      />
    );
  }, []);

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.unauthText}>Please sign in to view products.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Discover</Text>

        <View style={styles.topIcons}>
          <Pressable style={styles.iconBadge}>
            <MaterialCommunityIcons
              name="bell-outline"
              size={20}
              color="#1a1a1a"
            />
          </Pressable>

          <Pressable style={styles.iconBadge}>
            <MaterialCommunityIcons
              name="cart-outline"
              size={20}
              color="#1a1a1a"
            />
          </Pressable>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <MaterialCommunityIcons name="magnify" size={20} color="#9e9e9e" />

        <TextInput
          placeholder="Search products..."
          placeholderTextColor="#9e9e9e"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryPillsContainer}
        contentContainerStyle={styles.categoryPillsContent}>
        {CATEGORIES.map(category => (
          <Pressable
            key={category}
            style={[
              styles.categoryPill,
              activeCategory === category && styles.activeCategoryPill,
            ]}
            onPress={() => setActiveCategory(category)}>
            <Text
              style={
                activeCategory === category
                  ? styles.activeCategoryText
                  : styles.categoryText
              }>
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Loading */}
      {loading && !isRefreshing && (
        <View style={styles.loader} testID="products-loader">
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}

      {/* Error */}
      {isError && <Text style={styles.errorText}>Failed to load products</Text>}

      {/* Product Grid */}
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={renderProductItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
};

export default ShopScreen;
