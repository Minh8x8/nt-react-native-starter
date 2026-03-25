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
import {selectProductLoading, selectProducts} from '../slices/product-slice';
import {useAppDispatch, useAppSelector} from '../stores/store';
import {fetchProducts} from '../thunks/product-thunk';

const CATEGORIES = ['All Items', 'Electronics', 'Fashion', 'Home', 'Beauty'];

const ShopScreen: React.FC = () => {
  const {user} = useAuth();
  const [activeCategory, setActiveCategory] = useState<string>('All Items');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectProductLoading);

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

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
      {/* ── Header ──────────────────────────────────────────────── */}
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

      {/* ── Search ──────────────────────────────────────────────── */}
      <View style={styles.searchBox}>
        <MaterialCommunityIcons name="magnify" size={20} color="#9e9e9e" />
        <TextInput
          placeholder="Search products, brands..."
          placeholderTextColor="#9e9e9e"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* ── Category pills ──────────────────────────────────────── */}
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

      {/* ── Product grid ────────────────────────────────────────── */}
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}
      <FlatList
        data={products} // thêm dòng này
        keyExtractor={item => item.id.toString()}
        renderItem={renderProductItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ShopScreen;
