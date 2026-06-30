import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import { Badge, ImageBlock, RatingStars } from '@/components/common';
import { useStore } from '@/context/store';
import { conversations, getProducer, getProduct } from '@/data/mock';
import { colors, font, radius, shadow, spacing } from '@/theme';
import { RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;
const { width } = Dimensions.get('window');

export function ProductDetailScreen({ route, navigation }: Props) {
  const insets = useSafeAreaInsets();
  const product = getProduct(route.params.productId);
  const producer = getProducer(product.producerId);
  const { addToCart, isFavorite, toggleFavorite } = useStore();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const fav = isFavorite(product.id);

  const openChat = () => {
    const conv = conversations.find((c) => c.producerId === producer.id);
    navigation.navigate('Chat', {
      conversationId: conv?.id ?? 'c1',
      producerId: producer.id,
    });
  };

  const buy = () => {
    addToCart(product.id, qty);
    navigation.goBack();
  };

  return (
    <View style={styles.flex}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Gallery */}
        <View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => setActiveImg(Math.round(e.nativeEvent.contentOffset.x / width))}
          >
            {product.images.map((c, i) => (
              <ImageBlock key={i} color={c} emoji={product.emoji} size={120} style={{ width, height: 320 }} />
            ))}
          </ScrollView>
          <View style={[styles.topBar, { paddingTop: insets.top + spacing.sm }]}>
            <TouchableOpacity style={styles.circleBtn} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={22} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleBtn} onPress={() => toggleFavorite(product.id)}>
              <Ionicons name={fav ? 'heart' : 'heart-outline'} size={22} color={fav ? colors.danger : colors.text} />
            </TouchableOpacity>
          </View>
          <View style={styles.dots}>
            {product.images.map((_, i) => (
              <View key={i} style={[styles.dot, i === activeImg && styles.dotActive]} />
            ))}
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.titleRow}>
            <Text style={styles.name}>{product.name}</Text>
            <RatingStars rating={product.rating} size={16} />
          </View>
          {product.organic && <Badge label="🌱 Orgânico" style={{ marginTop: spacing.sm }} />}

          <Text style={styles.price}>
            R$ {product.price.toFixed(2)}
            <Text style={styles.unit}> / {product.unit}</Text>
          </Text>

          <Text style={styles.sectionLabel}>Descrição</Text>
          <Text style={styles.desc}>{product.description}</Text>

          {/* Quantity */}
          <Text style={styles.sectionLabel}>Quantidade</Text>
          <View style={styles.qtyRow}>
            <View style={styles.stepper}>
              <TouchableOpacity style={styles.stepBtn} onPress={() => setQty((q) => Math.max(1, q - 1))}>
                <Ionicons name="remove" size={20} color={colors.green} />
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{qty}</Text>
              <TouchableOpacity style={styles.stepBtn} onPress={() => setQty((q) => q + 1)}>
                <Ionicons name="add" size={20} color={colors.green} />
              </TouchableOpacity>
            </View>
            <Text style={styles.subtotal}>Subtotal: R$ {(product.price * qty).toFixed(2)}</Text>
          </View>

          {/* Producer card */}
          <Text style={styles.sectionLabel}>Produtor</Text>
          <TouchableOpacity
            style={styles.producerCard}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('ProducerProfile', { producerId: producer.id })}
          >
            <ImageBlock color={producer.cover} emoji={producer.avatar} size={26} style={styles.pAvatar} />
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={styles.pName}>{producer.name}</Text>
              <Text style={styles.pMeta}>{producer.location} · {producer.distanceKm} km</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>

          {/* Map placeholder */}
          <Text style={styles.sectionLabel}>Localização</Text>
          <View style={styles.map}>
            <Ionicons name="location" size={28} color={colors.green} />
            <Text style={styles.mapText}>{producer.location}</Text>
            <Text style={styles.mapHint}>Mapa interativo</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom action bar */}
      <View style={[styles.actionBar, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button
          title="Conversar"
          variant="outline"
          onPress={openChat}
          style={{ flex: 1 }}
          icon={<Ionicons name="chatbubble-outline" size={18} color={colors.green} />}
        />
        <View style={{ width: spacing.md }} />
        <Button title="Comprar" onPress={buy} style={{ flex: 1.4 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.card,
  },
  dots: { flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: spacing.md, left: 0, right: 0 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.5)', marginHorizontal: 3 },
  dotActive: { backgroundColor: colors.white, width: 18 },
  body: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    marginTop: -spacing.xl,
    padding: spacing.lg,
  },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  name: { flex: 1, fontSize: font.size.xl, fontWeight: font.weight.bold, color: colors.text, marginRight: spacing.md },
  price: { fontSize: font.size.xxl, fontWeight: font.weight.bold, color: colors.green, marginTop: spacing.md },
  unit: { fontSize: font.size.md, fontWeight: font.weight.regular, color: colors.textMuted },
  sectionLabel: { fontSize: font.size.md, fontWeight: font.weight.bold, color: colors.text, marginTop: spacing.xl, marginBottom: spacing.sm },
  desc: { fontSize: font.size.sm, color: colors.textMuted, lineHeight: 22 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  qtyValue: { fontSize: font.size.lg, fontWeight: font.weight.bold, color: colors.text, minWidth: 32, textAlign: 'center' },
  subtotal: { fontSize: font.size.sm, fontWeight: font.weight.semibold, color: colors.text },
  producerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadow.card,
  },
  pAvatar: { width: 52, height: 52, borderRadius: 26 },
  pName: { fontSize: font.size.md, fontWeight: font.weight.semibold, color: colors.text },
  pMeta: { fontSize: font.size.xs, color: colors.textMuted, marginTop: 2 },
  map: {
    height: 140,
    borderRadius: radius.lg,
    backgroundColor: colors.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: { fontSize: font.size.sm, fontWeight: font.weight.semibold, color: colors.green, marginTop: 4 },
  mapHint: { fontSize: font.size.xs, color: colors.textMuted },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
