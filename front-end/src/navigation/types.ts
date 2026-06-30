import { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Home: undefined;
  Marketplace: undefined;
  Map: undefined;
  Chats: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;
  Tabs: NavigatorScreenParams<TabParamList>;
  ProductDetail: { productId: string };
  ProducerProfile: { producerId: string };
  Chat: { conversationId: string; producerId: string };
  ProducerDashboard: undefined;
  ProductForm: { productId?: string };
};
