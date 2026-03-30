import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useAuth} from '@/contexts/auth-context';

import {useShopScreen} from './hooks/useShopScreen';
import ShopHeader from './components/ShopHeader';
import SearchBar from './components/SearchBar';
import CategoryPills from './components/CategoryPills';
import ProductGrid from './components/ProductGrid';
import {CATEGORIES} from './constants';
import {styles} from './styles';

const ShopScreen: React.FC = () => {
  const {user} = useAuth();
  const {
    products,
    isLoading,
    isError,
    isRefreshing,
    searchQuery,
    activeCategory,
    setSearchQuery,
    setActiveCategory,
    handleRefresh,
  } = useShopScreen();

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
      />
    </SafeAreaView>
  );
};

export default ShopScreen;
