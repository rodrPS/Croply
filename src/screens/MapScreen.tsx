import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import { ImageBlock, RatingStars } from '@/components/common';
import { getProductsByProducer, producers } from '@/data/mock';
import { colors, font, radius, shadow, spacing } from '@/theme';
import { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function MapScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<string | null>(producers[0].id);
  const active = producers.find((p) => p.id === selected) ?? null;

  return (
    <View style={styles.flex}>
      {/* Fake map canvas */}
      <View style={styles.map}>
        {/* grid lines */}
        {[...Array(6)].map((_, i) => (
          <View key={`h${i}`} style={[styles.gridH, { top: `${(i + 1) * 14}%` }]} />
        ))}
        {[...Array(6)].map((_, i) => (
          <View key={`v${i}`} style={[styles.gridV, { left: `${(i + 1) * 14}%` }]} />
        ))}

        {/* user location */}
        <View style={[styles.userPin, { top: '50%', left: '45%' }]}>
          <View style={styles.userDot} />
          <View style={styles.userPulse} />
        </View>

        {/* producer pins */}
        {producers.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={[styles.pin, { top: `${p.lat * 100}%`, left: `${p.lng * 100}%` }]}
            onPress={() => setSelected(p.id)}
          >
            <View style={[styles.pinBubble, selected === p.id && styles.pinBubbleActive]}>
              <Text style={{ fontSize: 18 }}>{p.avatar}</Text>
            </View>
            <View style={[styles.pinTip, selected === p.id && { borderTopColor: colors.green }]} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Top bar */}
      <View style={[styles.topBar, { paddingTop: insets.top + spacing.sm }]}>
        <View style={styles.searchPill}>
          <Ionicons name="search" size={18} color={colors.textMuted} />
          <Text style={styles.searchText}>Produtores perto de você</Text>
        </View>
      </View>

      <TouchableOpacity style={[styles.locateBtn, { bottom: active ? 220 : 110 }]}>
        <Ionicons name="locate" size={22} color={colors.green} />
      </TouchableOpacity>

      {/* Expandable card */}
      {active && (
        <View style={[styles.card, { paddingBottom: insets.bottom + spacing.md }]}>
          <View style={styles.cardHead}>
            <ImageBlock color={active.cover} emoji={active.avatar} size={28} style={styles.cardAvatar} />
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={styles.cardName}>{active.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                <RatingStars rating={active.rating} size={12} />
                <Text style={styles.cardMeta}>  · {active.distanceKm} km · {getProductsByProducer(active.id).length} produtos</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setSelected(null)}>
              <Ionicons name="close" size={22} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
          <Text style={styles.cardBio} numberOfLines={2}>{active.bio}</Text>
          <View style={{ flexDirection: 'row', marginTop: spacing.md }}>
            <Button
              title="Ver perfil"
              variant="outline"
              style={{ flex: 1 }}
              onPress={() => navigation.navigate('ProducerProfile', { producerId: active.id })}
            />
            <View style={{ width: spacing.md }} />
            <Button
              title="Conversar"
              style={{ flex: 1 }}
              onPress={() => navigation.navigate('Chat', { conversationId: 'c1', producerId: active.id })}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#DDE7DA' },
  map: { ...StyleSheet.absoluteFillObject, backgroundColor: '#E3EDDF' },
  gridH: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: 'rgba(0,0,0,0.04)' },
  gridV: { position: 'absolute', top: 0, bottom: 0, width: 1, backgroundColor: 'rgba(0,0,0,0.04)' },
  userPin: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  userDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#2979FF', borderWidth: 3, borderColor: colors.white },
  userPulse: { position: 'absolute', width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(41,121,255,0.15)' },
  pin: { position: 'absolute', alignItems: 'center', marginLeft: -22, marginTop: -44 },
  pinBubble: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.card,
    borderWidth: 2,
    borderColor: colors.surface,
  },
  pinBubbleActive: { borderColor: colors.green, transform: [{ scale: 1.1 }] },
  pinTip: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.surface,
    marginTop: -1,
  },
  topBar: { position: 'absolute', top: 0, left: 0, right: 0, paddingHorizontal: spacing.lg },
  searchPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    height: 48,
    ...shadow.card,
  },
  searchText: { marginLeft: spacing.sm, color: colors.textMuted, fontSize: font.size.sm },
  locateBtn: {
    position: 'absolute',
    right: spacing.lg,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.card,
  },
  card: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.lg,
    ...shadow.card,
  },
  cardHead: { flexDirection: 'row', alignItems: 'center' },
  cardAvatar: { width: 56, height: 56, borderRadius: 28 },
  cardName: { fontSize: font.size.md, fontWeight: font.weight.bold, color: colors.text },
  cardMeta: { fontSize: font.size.xs, color: colors.textMuted },
  cardBio: { fontSize: font.size.sm, color: colors.textMuted, marginTop: spacing.md, lineHeight: 20 },
});
