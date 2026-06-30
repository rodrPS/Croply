import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductCard } from '@/components/ProductCard';
import { ImageBlock, RatingStars, SectionTitle } from '@/components/common';
import { useStore } from '@/context/store';
import { categories, producers, products } from '@/data/mock';
import { colors, font, radius, shadow, spacing } from '@/theme';
import { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const { user } = useStore();
  const [activeCat, setActiveCat] = useState('all');

  const nearby = products.slice(0, 4);

  return (
    <View style={styles.flex}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 90 }}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
          <View>
            <View style={styles.locRow}>
              <Ionicons name="location" size={14} color={colors.wheat} />
              <Text style={styles.locText}>Vale Verde, SP</Text>
              <Ionicons name="chevron-down" size={14} color={colors.white} />
            </View>
            <Text style={styles.greeting}>Olá, {user?.name?.split(' ')[0] ?? 'visitante'} 👋</Text>
          </View>
          <View style={styles.bell}>
            <Ionicons name="notifications-outline" size={22} color={colors.white} />
            <View style={styles.bellDot} />
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <View style={styles.search}>
            <Ionicons name="search" size={18} color={colors.textMuted} />
            <TextInput
              placeholder="Buscar produtos ou produtores..."
              placeholderTextColor={colors.textMuted}
              style={styles.searchInput}
            />
            <Ionicons name="options-outline" size={18} color={colors.green} />
          </View>
        </View>

        <View style={{ paddingHorizontal: spacing.lg }}>
          {/* Promo banner */}
          <View style={styles.banner}>
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerTag}>FRETE GRÁTIS</Text>
              <Text style={styles.bannerTitle}>Primeira compra com 15% OFF</Text>
              <Text style={styles.bannerText}>Produtos frescos perto de você</Text>
            </View>
            <Text style={{ fontSize: 56 }}>🥕</Text>
          </View>

          {/* Categories */}
          <SectionTitle title="Categorias" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((c) => (
              <TouchableOpacity
                key={c.id}
                style={[styles.cat, activeCat === c.id && styles.catActive]}
                onPress={() => setActiveCat(c.id)}
              >
                <Text style={{ fontSize: 24 }}>{c.icon}</Text>
                <Text style={[styles.catLabel, activeCat === c.id && { color: colors.green }]}>
                  {c.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Nearby products */}
          <SectionTitle title="Perto de você" action="Ver tudo" onAction={() => navigation.navigate('Tabs', { screen: 'Marketplace' })} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {nearby.map((p) => (
              <View key={p.id} style={{ marginRight: spacing.md }}>
                <ProductCard
                  product={p}
                  width={160}
                  onPress={() => navigation.navigate('ProductDetail', { productId: p.id })}
                />
              </View>
            ))}
          </ScrollView>

          {/* Featured producers */}
          <SectionTitle title="Produtores em destaque" action="Ver tudo" />
          {producers.map((pr) => (
            <TouchableOpacity
              key={pr.id}
              style={styles.producerRow}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('ProducerProfile', { producerId: pr.id })}
            >
              <ImageBlock color={pr.cover} emoji={pr.avatar} size={28} style={styles.producerAvatar} />
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <Text style={styles.producerName}>{pr.name}</Text>
                <View style={styles.producerMeta}>
                  <Ionicons name="location-outline" size={12} color={colors.textMuted} />
                  <Text style={styles.producerMetaText}>
                    {pr.location} · {pr.distanceKm} km
                  </Text>
                </View>
              </View>
              <RatingStars rating={pr.rating} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.green,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl + spacing.md,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  locRow: { flexDirection: 'row', alignItems: 'center' },
  locText: { color: colors.wheatSoft, fontSize: font.size.sm, marginHorizontal: 4 },
  greeting: { color: colors.white, fontSize: font.size.xl, fontWeight: font.weight.bold, marginTop: 4 },
  bell: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.wheat,
  },
  searchWrap: { paddingHorizontal: spacing.lg, marginTop: -spacing.xl },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 52,
    ...shadow.card,
  },
  searchInput: { flex: 1, marginHorizontal: spacing.sm, fontSize: font.size.sm, color: colors.text },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.greenLight,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  bannerTag: {
    color: colors.wheat,
    fontSize: font.size.xs,
    fontWeight: font.weight.bold,
    letterSpacing: 1,
  },
  bannerTitle: { color: colors.white, fontSize: font.size.lg, fontWeight: font.weight.bold, marginTop: 4 },
  bannerText: { color: colors.wheatSoft, fontSize: font.size.sm, marginTop: 2 },
  cat: { alignItems: 'center', marginRight: spacing.lg, width: 64 },
  catActive: {},
  catLabel: { fontSize: font.size.xs, color: colors.textMuted, marginTop: 6, fontWeight: font.weight.medium },
  producerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadow.card,
  },
  producerAvatar: { width: 56, height: 56, borderRadius: 28 },
  producerName: { fontSize: font.size.md, fontWeight: font.weight.semibold, color: colors.text },
  producerMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  producerMetaText: { fontSize: font.size.xs, color: colors.textMuted, marginLeft: 2 },
});
