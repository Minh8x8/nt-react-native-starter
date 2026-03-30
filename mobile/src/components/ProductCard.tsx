import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Product} from '../types/product';
import {styles} from '../screens/shop/styles';

interface ProductCardProps {
  product: Product;
  isSaved?: boolean;
  onPressHeart?: (product: Product) => void;
  onPressAdd?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSaved,
  onPressHeart,
  onPressAdd,
}) => {
  const price = `$${product.price.toFixed(2)}`;
  const isSale = product.id % 5 === 0;

  return (
    <View style={styles.productCard}>
      <View>
        <Image source={{uri: product.image}} style={styles.productImage} />

        {isSale && (
          <View style={styles.saleBadge}>
            <Text style={styles.saleLabel}>SALE</Text>
          </View>
        )}

        <Pressable
          style={styles.heartButton}
          testID={`heart-${product.id}`}
          onPress={() => onPressHeart?.(product)}>
          <MaterialCommunityIcons
            name={isSaved ? 'heart' : 'heart-outline'}
            size={18}
            color={isSaved ? '#ff4d6d' : '#ff6b81'}
          />
        </Pressable>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.productFooter}>
          <Text style={styles.productPrice}>{price}</Text>

          <Pressable
            style={styles.addButton}
            testID={`add-${product.id}`}
            onPress={() => onPressAdd?.(product)}>
            <MaterialCommunityIcons name="plus" size={18} color="#fff" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
