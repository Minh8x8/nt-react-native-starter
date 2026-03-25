// mobile/src/screens/shop-screen.tsx

import React, {useState, useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
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

const CATEGORIES = ['All Items', 'Electronics', 'Fashion', 'Home', 'Beauty'];

const ShopScreen: React.FC = () => {
  const {user} = useAuth();
  const [activeCategory, setActiveCategory] = useState<string>('All Items');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const renderProductItem = useCallback(({item}: {item: Product}) => {
    const price = `$${item.price.toFixed(2)}`;
    const isSale = item.id % 5 === 0;

    return (
      <View style={styles.productCard}>
        <View>
          <Image source={{uri: item.image}} style={styles.productImage} />
          {isSale && (
            <View style={styles.saleBadge}>
              <Text style={styles.saleLabel}>SALE</Text>
            </View>
          )}
          <Pressable style={styles.heartButton} onPress={() => {}}>
            <MaterialCommunityIcons
              name="heart-outline"
              size={18}
              color="#ff4d6d"
            />
          </Pressable>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.productTitle} numberOfLines={2}>
            {item.name}
          </Text>
          <View style={styles.productFooter}>
            <Text style={styles.productPrice}>{price}</Text>
            <Pressable style={styles.addButton} onPress={() => {}}>
              <MaterialCommunityIcons name="plus" size={18} color="#fff" />
            </Pressable>
          </View>
        </View>
      </View>
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
      {/* {loading ? (
        <ActivityIndicator style={styles.loader} size="large" />
      ) : error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : (
        <FlatList
          keyExtractor={item => item.id.toString()}
          renderItem={renderProductItem}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
        />
      )} */}
    </SafeAreaView>
  );
};

export default ShopScreen;
