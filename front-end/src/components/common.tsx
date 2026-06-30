import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { colors, font, radius, spacing } from '@/theme';

/* ---------- Rating stars ---------- */
export function RatingStars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name="star" size={size} color={colors.wheat} />
      <Text style={{ marginLeft: 3, fontSize: size, fontWeight: font.weight.semibold, color: colors.text }}>
        {rating.toFixed(1)}
      </Text>
    </View>
  );
}

/* ---------- Organic / generic badge ---------- */
export function Badge({
  label,
  color = colors.green,
  bg = colors.greenSoft,
  style,
}: {
  label: string;
  color?: string;
  bg?: string;
  style?: ViewStyle;
}) {
  return (
    <View style={[styles.badge, { backgroundColor: bg }, style]}>
      <Text style={[styles.badgeText, { color }]}>{label}</Text>
    </View>
  );
}

/* ---------- Image placeholder (color block + emoji) ---------- */
export function ImageBlock({
  color,
  emoji,
  style,
  size = 40,
}: {
  color: string;
  emoji?: string;
  style?: ViewStyle;
  size?: number;
}) {
  return (
    <View style={[{ backgroundColor: color, alignItems: 'center', justifyContent: 'center' }, style]}>
      {emoji ? <Text style={{ fontSize: size }}>{emoji}</Text> : null}
    </View>
  );
}

/* ---------- Section header with optional action ---------- */
export function SectionTitle({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.sectionRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? (
        <Text style={styles.sectionAction} onPress={onAction}>
          {action}
        </Text>
      ) : null}
    </View>
  );
}

/* ---------- Empty state ---------- */
export function EmptyState({ icon, text }: { icon: keyof typeof Ionicons.glyphMap; text: string }) {
  return (
    <View style={styles.empty}>
      <Ionicons name={icon} size={48} color={colors.border} />
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );
}

export const text: Record<string, TextStyle> = StyleSheet.create({
  h1: { fontSize: font.size.xxl, fontWeight: font.weight.bold, color: colors.text },
  h2: { fontSize: font.size.xl, fontWeight: font.weight.bold, color: colors.text },
  body: { fontSize: font.size.md, color: colors.text },
  muted: { fontSize: font.size.sm, color: colors.textMuted },
});

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  badgeText: { fontSize: font.size.xs, fontWeight: font.weight.semibold },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  sectionTitle: { fontSize: font.size.lg, fontWeight: font.weight.bold, color: colors.text },
  sectionAction: { fontSize: font.size.sm, fontWeight: font.weight.semibold, color: colors.greenLight },
  empty: { alignItems: 'center', justifyContent: 'center', padding: spacing.xxl },
  emptyText: { marginTop: spacing.md, color: colors.textMuted, textAlign: 'center' },
});
