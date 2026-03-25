import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface DetailFieldProps {
  label: string;
  value: string;
  isLast?: boolean;
}

const DetailField: React.FC<DetailFieldProps> = ({label, value, isLast}) => (
  <View style={[styles.fieldRow, isLast && styles.fieldRowLast]}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <Text style={styles.fieldValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  fieldRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eef0f5',
  },
  fieldRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 4,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#9aa1af',
    textTransform: 'uppercase',
    marginBottom: 6,
    letterSpacing: 0.4,
  },
  fieldValue: {
    fontSize: 15,
    color: '#1f1f27',
  },
});

export default DetailField;
