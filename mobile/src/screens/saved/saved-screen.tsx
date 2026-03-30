import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';

import ProductGrid from '@/screens/shop/components/ProductGrid';
import {useWishlist} from '@/hooks/use-wishlist';
import {useAuth} from '@/providers/AuthProvider';
import {styles} from '@/screens/shop/styles';
import {Product} from '@/types/product';

const SavedScreen: React.FC = () => {
  const {user} = useAuth();
  const {wishlist, toggleWishlist, loading} = useWishlist(user?.id);

  const handleAddToCart = (product: Product) => {
    Toast.show({
      type: 'success',
      text1: 'Added to cart',
      text2: product.name,
    });
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.unauthText}>
          Please sign in to view saved items.
        </Text>
      </SafeAreaView>
    );
  }

  if (wishlist.length === 0 && !loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centeredEmpty}>
          <Text style={styles.title}>Wishlist Empty</Text>
          <Text style={styles.subtitle}>Tap ♥ in Shop to save products.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Saved Items</Text>
      <ProductGrid
        products={wishlist}
        isLoading={loading}
        isError={false}
        isRefreshing={false}
        onRefresh={() => {}}
        savedIds={wishlist.map(item => item.id)}
        onToggleWishlist={toggleWishlist}
        onAddToCart={handleAddToCart}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

export default SavedScreen;
