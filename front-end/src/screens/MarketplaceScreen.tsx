import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductCard } from '@/components/ProductCard';
import { EmptyState } from '@/components/common';
import { categories, products } from '@/data/mock';
import { colors, font, radius, spacing } from '@/theme';
import { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Sort = 'relevance' | 'priceAsc' | 'priceDesc' | 'distance' | 'rating';

const sortLabels: Record<Sort, string> = {
  relevance: 'Relevância',
  priceAsc: 'Menor preço',
  priceDesc: 'Maior preço',
  distance: 'Mais perto',
  rating: 'Melhor avaliados',
};

export function MarketplaceScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('all');
  const [sort, setSort] = useState<Sort>('relevance');
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (cat === 'all' || p.categoryId === cat) &&
        p.name.toLowerCase().includes(query.toLowerCase())
    );
    switch (sort) {
      case 'priceAsc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'distance':
        list = [...list].sort((a, b) => a.distanceKm - b.distanceKm);
        break;
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }, [query, cat, sort]);

  return (
    <View style={[styles.flex, { paddingTop: insets.top }]}>
      <View style={styles.headerArea}>
        <Text style={styles.title}>Mercado</Text>
        <View style={styles.search}>
          <Ionicons name="search" size={18} color={colors.textMuted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar produtos..."
            placeholderTextColor={colors.textMuted}
            style={styles.searchInput}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.toolbar}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(c) => c.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.chip, cat === item.id && styles.chipActive]}
                onPress={() => setCat(item.id)}
              >
                <Text style={[styles.chipText, cat === item.id && styles.chipTextActive]}>
                  {item.icon} {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.resultRow}>
          <Text style={styles.resultCount}>{filtered.length} produtos</Text>
          <TouchableOpacity style={styles.sortBtn} onPress={() => setSortOpen(true)}>
            <Ionicons name="swap-vertical" size={16} color={colors.green} />
            <Text style={styles.sortText}>{sortLabels[sort]}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(p) => p.id}
        numColumns={2}
        columnWrapperStyle={{ gap: spacing.md, paddingHorizontal: spacing.lg }}
        contentContainerStyle={{ gap: spacing.md, paddingBottom: 90 }}
        ListEmptyComponent={<EmptyState icon="leaf-outline" text="Nenhum produto encontrado" />}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
            />
          </View>
        )}
      />

      {/* Sort sheet */}
      <Modal visible={sortOpen} transparent animationType="fade" onRequestClose={() => setSortOpen(false)}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={() => setSortOpen(false)}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>Ordenar por</Text>
            {(Object.keys(sortLabels) as Sort[]).map((s) => (
              <TouchableOpacity
                key={s}
                style={styles.sheetRow}
                onPress={() => {
                  setSort(s);
                  setSortOpen(false);
                }}
              >
                <Text style={[styles.sheetRowText, sort === s && { color: colors.green, fontWeight: '700' }]}>
                  {sortLabels[s]}
                </Text>
                {sort === s && <Ionicons name="checkmark" size={18} color={colors.green} />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  headerArea: { paddingHorizontal: 0, paddingTop: spacing.md },
  title: {
    fontSize: font.size.xxl,
    fontWeight: font.weight.bold,
    color: colors.text,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: 50,
    marginHorizontal: spacing.lg,
  },
  searchInput: { flex: 1, marginHorizontal: spacing.sm, fontSize: font.size.sm, color: colors.text },
  toolbar: { marginTop: spacing.md, paddingLeft: spacing.lg },
  chip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    marginRight: spacing.sm,
  },
  chipActive: { backgroundColor: colors.green, borderColor: colors.green },
  chipText: { fontSize: font.size.sm, color: colors.textMuted, fontWeight: font.weight.medium },
  chipTextActive: { color: colors.white },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  resultCount: { fontSize: font.size.sm, color: colors.textMuted },
  sortBtn: { flexDirection: 'row', alignItems: 'center' },
  sortText: { fontSize: font.size.sm, color: colors.green, fontWeight: font.weight.semibold, marginLeft: 4 },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  sheetTitle: { fontSize: font.size.lg, fontWeight: font.weight.bold, color: colors.text, marginBottom: spacing.md },
  sheetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  sheetRowText: { fontSize: font.size.md, color: colors.text },
});
