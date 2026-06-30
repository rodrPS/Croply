import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SplashScreen } from '@/screens/SplashScreen';
import { OnboardingScreen } from '@/screens/OnboardingScreen';
import { AuthScreen } from '@/screens/AuthScreen';
import { ProductDetailScreen } from '@/screens/ProductDetailScreen';
import { ProducerProfileScreen } from '@/screens/ProducerProfileScreen';
import { ChatScreen } from '@/screens/ChatScreen';
import { ProducerDashboardScreen } from '@/screens/ProducerDashboardScreen';
import { ProductFormScreen } from '@/screens/ProductFormScreen';
import { Tabs } from './Tabs';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="ProducerProfile" component={ProducerProfileScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="ProducerDashboard" component={ProducerDashboardScreen} />
      <Stack.Screen
        name="ProductForm"
        component={ProductFormScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}
