import React from 'react';
import {Text} from 'react-native';

export default function MaterialCommunityIcons(props: {name: string; size?: number; color?: string}) {
  const {name} = props;
  return <Text accessibilityLabel={`icon-${name}`}>icon</Text>;
}
