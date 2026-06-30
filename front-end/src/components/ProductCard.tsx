import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Product } from '@/data/types';
import { colors, font, radius, shadow, spacing } from '@/theme';
import { useStore } from '@/context/store';
import { Badge, ImageBlock, RatingStars } from './common';

export function ProductCard({
  product,
  onPress,
  width,
}: {
  product: Product;
  onPress: () => void;
  width?: number;
}) {
  const { isFavorite, toggleFavorite } = useStore();
  const fav = isFavorite(product.id);
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={[styles.card, width ? { width } : null]}>
      <View>
        <ImageBlock
          color={product.images[0]}
          emoji={product.emoji}
          size={52}
          style={styles.image}
        />
        <TouchableOpacity style={styles.fav} onPress={() => toggleFavorite(product.id)}>
          <Ionicons
            name={fav ? 'heart' : 'heart-outline'}
            size={18}
            color={fav ? colors.danger : colors.textMuted}
          />
        </TouchableOpacity>
        {product.organic ? (
          <Badge label="Orgânico" style={styles.organicBadge} />
        ) : null}
      </View>
      <View style={styles.body}>
        <Text numberOfLines={1} style={styles.name}>
          {product.name}
        </Text>
        <View style={styles.metaRow}>
          <Ionicons name="location-outline" size={12} color={colors.textMuted} />
          <Text style={styles.meta}>{product.distanceKm} km</Text>
          <View style={{ width: 8 }} />
          <RatingStars rating={product.rating} size={12} />
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.price}>
            R$ {product.price.toFixed(2)}
            <Text style={styles.unit}> /{product.unit}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    ...shadow.card,
    overflow: 'hidden',
  },
  image: { height: 110, width: '100%' },
  fav: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.white,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  organicBadge: { position: 'absolute', top: 8, left: 8 },
  body: { padding: spacing.md },
  name: { fontSize: font.size.sm, fontWeight: font.weight.semibold, color: colors.text },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  meta: { fontSize: font.size.xs, color: colors.textMuted, marginLeft: 2 },
  priceRow: { marginTop: 8 },
  price: { fontSize: font.size.md, fontWeight: font.weight.bold, color: colors.green },
  unit: { fontSize: font.size.xs, fontWeight: font.weight.regular, color: colors.textMuted },
});
