import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Product} from '../models/product';
import {styles} from '../screens/styles/shop-screen-styles';

interface ProductCardProps {
  product: Product;
  onPressHeart?: (product: Product) => void;
  onPressAdd?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  //onPressHeart,
  //onPressAdd,
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
          // onPress={() => onPressHeart?.(product)}
        >
          <MaterialCommunityIcons
            name="heart-outline"
            size={18}
            color="#ff4d6d"
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
            // onPress={() => onPressAdd?.(product)}
          >
            <MaterialCommunityIcons name="plus" size={18} color="#fff" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
