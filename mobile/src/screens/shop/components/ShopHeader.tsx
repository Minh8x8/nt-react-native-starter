import React from 'react';
import {Pressable, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../styles';

const ShopHeader: React.FC = () => (
  <View style={styles.headerRow}>
    <Text style={styles.headerTitle}>Discover</Text>
    <View style={styles.topIcons}>
      <Pressable style={styles.iconBadge}>
        <MaterialCommunityIcons name="bell-outline" size={20} color="#1a1a1a" />
      </Pressable>
      <Pressable style={styles.iconBadge}>
        <MaterialCommunityIcons name="cart-outline" size={20} color="#1a1a1a" />
      </Pressable>
    </View>
  </View>
);

export default ShopHeader;
