import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/Button';
import { ImageBlock, RatingStars, SectionTitle } from '@/components/common';
import { conversations, getProducer, getProductsByProducer, reviews } from '@/data/mock';
import { colors, font, radius, shadow, spacing } from '@/theme';
import { RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ProducerProfile'>;

export function ProducerProfileScreen({ route, navigation }: Props) {
  const insets = useSafeAreaInsets();
  const producer = getProducer(route.params.producerId);
  const prods = getProductsByProducer(producer.id);

  const openChat = () => {
    const conv = conversations.find((c) => c.producerId === producer.id);
    navigation.navigate('Chat', { conversationId: conv?.id ?? 'c1', producerId: producer.id });
  };

  return (
    <View style={styles.flex}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Cover */}
        <View style={[styles.cover, { backgroundColor: producer.cover, paddingTop: insets.top + spacing.sm }]}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.headerCard}>
          <ImageBlock color={producer.cover} emoji={producer.avatar} size={40} style={styles.avatar} />
          <Text style={styles.name}>{producer.name}</Text>
          <View style={styles.locRow}>
            <Ionicons name="location-outline" size={14} color={colors.textMuted} />
            <Text style={styles.loc}>{producer.location} · {producer.distanceKm} km</Text>
            {producer.online && <View style={styles.onlineBadge}><Text style={styles.onlineText}>online</Text></View>}
          </View>

          {/* Stats */}
          <View style={styles.stats}>
            <Stat value={producer.rating.toFixed(1)} label="Avaliação" />
            <View style={styles.statDivider} />
            <Stat value={String(prods.length)} label="Produtos" />
            <View style={styles.statDivider} />
            <Stat value={String(producer.reviewsCount)} label="Vendas" />
          </View>

          <Text style={styles.bio}>{producer.bio}</Text>

          <Button
            title="Conversar com o produtor"
            onPress={openChat}
            icon={<Ionicons name="chatbubble-outline" size={18} color={colors.greenDark} />}
            style={{ marginTop: spacing.md }}
          />
        </View>

        <View style={{ paddingHorizontal: spacing.lg }}>
          <SectionTitle title="Produtos disponíveis" />
          <View style={styles.grid}>
            {prods.map((p) => (
              <View key={p.id} style={styles.gridItem}>
                <ProductCard product={p} onPress={() => navigation.navigate('ProductDetail', { productId: p.id })} />
              </View>
            ))}
          </View>

          <SectionTitle title="Avaliações" />
          {reviews.map((r) => (
            <View key={r.id} style={styles.review}>
              <View style={styles.reviewHead}>
                <View style={styles.reviewAvatar}>
                  <Text style={{ fontWeight: '700', color: colors.green }}>{r.author[0]}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: spacing.sm }}>
                  <Text style={styles.reviewAuthor}>{r.author}</Text>
                  <Text style={styles.reviewDate}>{r.date}</Text>
                </View>
                <RatingStars rating={r.rating} />
              </View>
              <Text style={styles.reviewText}>{r.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  cover: { height: 160, paddingHorizontal: spacing.lg },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCard: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginTop: -60,
    borderRadius: radius.xl,
    padding: spacing.lg,
    alignItems: 'center',
    ...shadow.card,
  },
  avatar: { width: 88, height: 88, borderRadius: 44, marginTop: -64, borderWidth: 4, borderColor: colors.surface },
  name: { fontSize: font.size.xl, fontWeight: font.weight.bold, color: colors.text, marginTop: spacing.sm },
  locRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  loc: { fontSize: font.size.sm, color: colors.textMuted, marginLeft: 4 },
  onlineBadge: { marginLeft: 8, backgroundColor: colors.greenSoft, borderRadius: radius.pill, paddingHorizontal: 8, paddingVertical: 2 },
  onlineText: { fontSize: font.size.xs, color: colors.success, fontWeight: font.weight.semibold },
  stats: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.lg },
  stat: { alignItems: 'center', paddingHorizontal: spacing.lg },
  statValue: { fontSize: font.size.lg, fontWeight: font.weight.bold, color: colors.green },
  statLabel: { fontSize: font.size.xs, color: colors.textMuted, marginTop: 2 },
  statDivider: { width: 1, height: 32, backgroundColor: colors.border },
  bio: { fontSize: font.size.sm, color: colors.textMuted, textAlign: 'center', lineHeight: 22, marginTop: spacing.lg },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: { width: '48%', marginBottom: spacing.md },
  review: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.md, ...shadow.card },
  reviewHead: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  reviewAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.greenSoft, alignItems: 'center', justifyContent: 'center' },
  reviewAuthor: { fontSize: font.size.sm, fontWeight: font.weight.semibold, color: colors.text },
  reviewDate: { fontSize: font.size.xs, color: colors.textMuted },
  reviewText: { fontSize: font.size.sm, color: colors.text, lineHeight: 20 },
});
