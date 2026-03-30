import React from 'react';
import {Pressable, ScrollView, Text} from 'react-native';
import {styles} from '../styles';

interface CategoryPillsProps {
  categories: string[];
  active: string;
  onSelect: (category: string) => void;
}

const CategoryPills: React.FC<CategoryPillsProps> = ({
  categories,
  active,
  onSelect,
}) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.categoryPillsContainer}
    contentContainerStyle={styles.categoryPillsContent}>
    {categories.map(category => (
      <Pressable
        key={category}
        style={[
          styles.categoryPill,
          active === category && styles.activeCategoryPill,
        ]}
        onPress={() => onSelect(category)}>
        <Text
          style={
            active === category
              ? styles.activeCategoryText
              : styles.categoryText
          }>
          {category}
        </Text>
      </Pressable>
    ))}
  </ScrollView>
);

export default CategoryPills;
