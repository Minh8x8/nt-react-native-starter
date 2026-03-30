import React from 'react';
import {TextInput, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../styles';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({value, onChangeText}) => (
  <View style={styles.searchBox}>
    <MaterialCommunityIcons name="magnify" size={20} color="#9e9e9e" />
    <TextInput
      placeholder="Search products..."
      placeholderTextColor="#9e9e9e"
      style={styles.searchInput}
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

export default SearchBar;
