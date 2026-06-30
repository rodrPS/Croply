import {
  Category,
  Conversation,
  Message,
  Order,
  Producer,
  Product,
  Review,
} from './types';

export const categories: Category[] = [
  { id: 'all', name: 'Todos', icon: '🌾' },
  { id: 'veggies', name: 'Verduras', icon: '🥬' },
  { id: 'fruits', name: 'Frutas', icon: '🍎' },
  { id: 'dairy', name: 'Laticínios', icon: '🧀' },
  { id: 'grains', name: 'Grãos', icon: '🌽' },
  { id: 'honey', name: 'Mel & Doces', icon: '🍯' },
  { id: 'eggs', name: 'Ovos', icon: '🥚' },
];

export const producers: Producer[] = [
  {
    id: 'p1',
    name: 'Sítio Boa Terra',
    avatar: '👨‍🌾',
    cover: '#2E7D32',
    location: 'Vale Verde, SP',
    distanceKm: 2.3,
    rating: 4.9,
    reviewsCount: 128,
    bio: 'Produção orgânica familiar há 3 gerações. Verduras, legumes e ovos frescos colhidos no dia.',
    lat: 0.62,
    lng: 0.35,
    online: true,
  },
  {
    id: 'p2',
    name: 'Fazenda Lua Cheia',
    avatar: '👩‍🌾',
    cover: '#1B5E20',
    location: 'Serra do Mel, SP',
    distanceKm: 5.1,
    rating: 4.7,
    reviewsCount: 86,
    bio: 'Mel puro, doces caseiros e geleias artesanais. Sem conservantes.',
    lat: 0.30,
    lng: 0.55,
    online: false,
  },
  {
    id: 'p3',
    name: 'Chácara do Sol',
    avatar: '🧑‍🌾',
    cover: '#558B2F',
    location: 'Campo Belo, SP',
    distanceKm: 8.4,
    rating: 4.8,
    reviewsCount: 204,
    bio: 'Frutas da estação e laticínios artesanais. Queijos premiados.',
    lat: 0.48,
    lng: 0.72,
    online: true,
  },
];

export const products: Product[] = [
  {
    id: 'pr1',
    name: 'Alface Crespa Orgânica',
    emoji: '🥬',
    categoryId: 'veggies',
    price: 4.5,
    unit: 'unid.',
    organic: true,
    producerId: 'p1',
    rating: 4.9,
    images: ['#A5D6A7', '#81C784', '#66BB6A'],
    description:
      'Alface crespa colhida no dia, cultivo orgânico sem agrotóxicos. Folhas crocantes e frescas.',
    distanceKm: 2.3,
  },
  {
    id: 'pr2',
    name: 'Tomate Italiano',
    emoji: '🍅',
    categoryId: 'veggies',
    price: 8.9,
    unit: 'kg',
    organic: true,
    producerId: 'p1',
    rating: 4.8,
    images: ['#EF9A9A', '#E57373'],
    description: 'Tomate italiano maduro, ideal para molhos e saladas.',
    distanceKm: 2.3,
  },
  {
    id: 'pr3',
    name: 'Morango Doce',
    emoji: '🍓',
    categoryId: 'fruits',
    price: 12.0,
    unit: 'bandeja',
    organic: false,
    producerId: 'p3',
    rating: 4.9,
    images: ['#F48FB1', '#F06292'],
    description: 'Morangos selecionados, doçura natural. Bandeja de 250g.',
    distanceKm: 8.4,
  },
  {
    id: 'pr4',
    name: 'Mel Silvestre Puro',
    emoji: '🍯',
    categoryId: 'honey',
    price: 28.0,
    unit: 'pote 500g',
    organic: true,
    producerId: 'p2',
    rating: 5.0,
    images: ['#FFCC80', '#FFB74D'],
    description: 'Mel silvestre puro, extraído de forma artesanal. Sem adição de açúcar.',
    distanceKm: 5.1,
  },
  {
    id: 'pr5',
    name: 'Queijo Minas Frescal',
    emoji: '🧀',
    categoryId: 'dairy',
    price: 22.5,
    unit: 'peça 500g',
    organic: false,
    producerId: 'p3',
    rating: 4.7,
    images: ['#FFF59D', '#FFF176'],
    description: 'Queijo minas frescal artesanal, leve e cremoso.',
    distanceKm: 8.4,
  },
  {
    id: 'pr6',
    name: 'Ovos Caipira (dúzia)',
    emoji: '🥚',
    categoryId: 'eggs',
    price: 14.0,
    unit: 'dúzia',
    organic: true,
    producerId: 'p1',
    rating: 4.9,
    images: ['#FFE0B2', '#FFCC80'],
    description: 'Ovos caipira de galinhas criadas soltas. Gema alaranjada e saborosa.',
    distanceKm: 2.3,
  },
  {
    id: 'pr7',
    name: 'Milho Verde',
    emoji: '🌽',
    categoryId: 'grains',
    price: 2.5,
    unit: 'espiga',
    organic: false,
    producerId: 'p2',
    rating: 4.6,
    images: ['#FFF176', '#FFEE58'],
    description: 'Milho verde fresco, ótimo para cozinhar ou assar.',
    distanceKm: 5.1,
  },
  {
    id: 'pr8',
    name: 'Banana Prata',
    emoji: '🍌',
    categoryId: 'fruits',
    price: 6.0,
    unit: 'kg',
    organic: true,
    producerId: 'p3',
    rating: 4.8,
    images: ['#FFF176', '#FFEB3B'],
    description: 'Banana prata madura no ponto, doce e nutritiva.',
    distanceKm: 8.4,
  },
];

export const reviews: Review[] = [
  {
    id: 'r1',
    author: 'Marina S.',
    rating: 5,
    comment: 'Produtos super frescos e entrega rápida! Recomendo demais.',
    date: 'há 2 dias',
  },
  {
    id: 'r2',
    author: 'Carlos A.',
    rating: 5,
    comment: 'Melhor alface que já comprei. Dá pra sentir que é colhida no dia.',
    date: 'há 1 semana',
  },
  {
    id: 'r3',
    author: 'Júlia P.',
    rating: 4,
    comment: 'Tudo ótimo, só demorou um pouco para responder no chat.',
    date: 'há 2 semanas',
  },
];

export const conversations: Conversation[] = [
  { id: 'c1', producerId: 'p1', lastMessage: 'Pode passar amanhã às 9h 🙂', time: '09:24', unread: 2 },
  { id: 'c2', producerId: 'p3', lastMessage: 'Tenho morango fresquinho hoje!', time: 'ontem', unread: 0 },
  { id: 'c3', producerId: 'p2', lastMessage: 'O mel de 500g está R$ 28', time: 'seg', unread: 0 },
];

export const messagesByConversation: Record<string, Message[]> = {
  c1: [
    { id: 'm1', text: 'Olá! A alface orgânica está disponível?', fromMe: true, time: '09:10' },
    { id: 'm2', text: 'Oi! Sim, colhi hoje de manhã 🌱', fromMe: false, time: '09:12' },
    { id: 'm3', text: 'Quero 3 unidades. Posso retirar aí?', fromMe: true, time: '09:20' },
    { id: 'm4', text: 'Claro! Pode passar amanhã às 9h 🙂', fromMe: false, time: '09:24' },
  ],
  c2: [
    { id: 'm1', text: 'Bom dia! Tem morango hoje?', fromMe: true, time: '08:00' },
    { id: 'm2', text: 'Tenho morango fresquinho hoje!', fromMe: false, time: '08:05' },
  ],
  c3: [{ id: 'm1', text: 'O mel de 500g está R$ 28', fromMe: false, time: 'seg' }],
};

export const producerOrders: Order[] = [
  { id: 'o1', productName: 'Alface Crespa', emoji: '🥬', qty: 3, unit: 'unid.', total: 13.5, status: 'pending', date: 'Hoje', buyerName: 'Marina S.' },
  { id: 'o2', productName: 'Ovos Caipira', emoji: '🥚', qty: 2, unit: 'dúzia', total: 28.0, status: 'confirmed', date: 'Hoje', buyerName: 'Carlos A.' },
  { id: 'o3', productName: 'Tomate Italiano', emoji: '🍅', qty: 1, unit: 'kg', total: 8.9, status: 'delivered', date: 'Ontem', buyerName: 'Júlia P.' },
];

export const purchaseHistory: Order[] = [
  { id: 'h1', productName: 'Mel Silvestre Puro', emoji: '🍯', qty: 1, unit: 'pote', total: 28.0, status: 'delivered', date: '18 jun' },
  { id: 'h2', productName: 'Morango Doce', emoji: '🍓', qty: 2, unit: 'bandeja', total: 24.0, status: 'delivered', date: '12 jun' },
  { id: 'h3', productName: 'Queijo Minas', emoji: '🧀', qty: 1, unit: 'peça', total: 22.5, status: 'delivered', date: '05 jun' },
];

export const revenueByMonth = [
  { label: 'Jan', value: 1200 },
  { label: 'Fev', value: 1800 },
  { label: 'Mar', value: 1500 },
  { label: 'Abr', value: 2400 },
  { label: 'Mai', value: 2100 },
  { label: 'Jun', value: 3200 },
];

export const getProducer = (id: string) => producers.find((p) => p.id === id)!;
export const getProduct = (id: string) => products.find((p) => p.id === id)!;
export const getProductsByProducer = (id: string) =>
  products.filter((p) => p.producerId === id);
