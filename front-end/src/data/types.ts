export type ProfileType = 'producer' | 'buyer';

export interface Category {
  id: string;
  name: string;
  icon: string; // emoji
}

export interface Producer {
  id: string;
  name: string;
  avatar: string; // emoji or color seed
  cover: string; // hex color seed
  location: string;
  distanceKm: number;
  rating: number;
  reviewsCount: number;
  bio: string;
  lat: number;
  lng: number;
  online: boolean;
}

export interface Product {
  id: string;
  name: string;
  emoji: string;
  categoryId: string;
  price: number;
  unit: string; // kg, dúzia, maço...
  organic: boolean;
  producerId: string;
  rating: number;
  images: string[]; // hex color seeds (placeholder)
  description: string;
  distanceKm: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Message {
  id: string;
  text: string;
  fromMe: boolean;
  time: string;
  image?: string;
}

export interface Conversation {
  id: string;
  producerId: string;
  lastMessage: string;
  time: string;
  unread: number;
}

export interface Order {
  id: string;
  productName: string;
  emoji: string;
  qty: number;
  unit: string;
  total: number;
  status: 'pending' | 'confirmed' | 'delivered';
  date: string;
  buyerName?: string;
}
