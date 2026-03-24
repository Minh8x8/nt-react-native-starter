import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const SavedScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centered}>
        <Text style={styles.title}>Saved Items</Text>
        <Text style={styles.subtitle}>No saved items yet.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#747d8c',
  },
});

export default SavedScreen;
