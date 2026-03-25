// src/navigation/MainNavigator.tsx

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProfileScreen} from '../profile/profile-screen';
import ShopScreen from '../shop-screen';
import CategoriesScreen from '../categories-screen';
import SavedScreen from '../saved-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();

interface IMainNavigator {
  navigation: any;
}

type TabIconProps = {
  iconName: string;
  color: string;
  size: number;
};

const TabIcon: React.FC<TabIconProps> = ({iconName, color, size}) => (
  <MaterialCommunityIcons name={iconName} size={size} color={color} />
);

const getTabIconName = (routeName: string): string => {
  switch (routeName) {
    case 'Shop':
      return 'storefront';
    case 'Categories':
      return 'apps';
    case 'Saved':
      return 'heart-outline';
    case 'Profile':
      return 'account-outline';
    default:
      return 'circle';
  }
};

/**
 * FIX: function outside render
 */
const renderTabIcon =
  (routeName: string) =>
  ({color, size}: {color: string; size: number}) => {
    const iconName = getTabIconName(routeName);

    return <TabIcon iconName={iconName} color={color} size={size} />;
  };

const MainNavigator: React.FC<IMainNavigator> = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#00d4ff',
        tabBarInactiveTintColor: '#9e9e9e',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}>
      <Tab.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: renderTabIcon('Shop'),
        }}
      />

      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: renderTabIcon('Categories'),
        }}
      />

      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          tabBarLabel: 'Saved',
          tabBarIcon: renderTabIcon('Saved'),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: renderTabIcon('Profile'),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 66,
    borderTopWidth: 0,
    elevation: 8,
    paddingBottom: 8,
    paddingTop: 8,
    backgroundColor: '#ffffff',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default MainNavigator;
