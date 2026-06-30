import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { colors, font } from '@/theme';
import { HomeScreen } from '@/screens/HomeScreen';
import { MarketplaceScreen } from '@/screens/MarketplaceScreen';
import { MapScreen } from '@/screens/MapScreen';
import { ChatListScreen } from '@/screens/ChatListScreen';
import { UserProfileScreen } from '@/screens/UserProfileScreen';
import { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

const icons: Record<keyof TabParamList, keyof typeof Ionicons.glyphMap> = {
  Home: 'home',
  Marketplace: 'storefront',
  Map: 'map',
  Chats: 'chatbubbles',
  Profile: 'person',
};

export function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.green,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          height: 64,
          paddingBottom: 10,
          paddingTop: 8,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: { fontSize: font.size.xs, fontWeight: font.weight.medium },
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={focused ? icons[route.name] : (`${icons[route.name]}-outline` as any)}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
      <Tab.Screen name="Marketplace" component={MarketplaceScreen} options={{ title: 'Mercado' }} />
      <Tab.Screen name="Map" component={MapScreen} options={{ title: 'Mapa' }} />
      <Tab.Screen name="Chats" component={ChatListScreen} options={{ title: 'Chat' }} />
      <Tab.Screen name="Profile" component={UserProfileScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}
