import React, {useCallback} from 'react';
import {SafeAreaView, Text} from 'react-native';
import Toast from 'react-native-toast-message';

import {useAuth} from '@/providers/AuthProvider';
import {Product} from '@/types/product';
import {useWishlist} from '@/hooks/use-wishlist';

import {useShopScreen} from './hooks/useShopScreen';
import ShopHeader from './components/ShopHeader';
import SearchBar from './components/SearchBar';
import CategoryPills from './components/CategoryPills';
import ProductGrid from './components/ProductGrid';
import {CATEGORIES} from './constants';
import {styles} from './styles';

const ShopScreen: React.FC = () => {
  const {user} = useAuth();
  const {wishlistIds, toggleWishlist, refresh} = useWishlist(user?.id);
  const {
    products,
    isLoading,
    isError,
    isRefreshing,
    searchQuery,
    activeCategory,
    setSearchQuery,
    setActiveCategory,
    handleRefresh: refreshProducts,
  } = useShopScreen();

  const handleAddToCart = useCallback((product: Product) => {
    Toast.show({
      type: 'success',
      text1: 'Added to cart',
      text2: product.name,
    });
  }, []);

  const handleRefresh = useCallback(async () => {
    await Promise.all([refreshProducts(), refresh?.()]);
  }, [refresh, refreshProducts]);

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.unauthText}>Please sign in to view products.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ShopHeader />
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <CategoryPills
        categories={CATEGORIES}
        active={activeCategory}
        onSelect={setActiveCategory}
      />
      <ProductGrid
        products={products}
        isLoading={isLoading}
        isError={isError}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
        savedIds={wishlistIds}
        onToggleWishlist={toggleWishlist}
        onAddToCart={handleAddToCart}
      />
    </SafeAreaView>
  );
};

export default ShopScreen;
