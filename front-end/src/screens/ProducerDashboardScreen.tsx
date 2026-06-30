import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ImageBlock, SectionTitle } from '@/components/common';
import { getProductsByProducer, producerOrders, revenueByMonth } from '@/data/mock';
import { Order } from '@/data/types';
import { colors, font, radius, shadow, spacing } from '@/theme';
import { RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ProducerDashboard'>;

const statusInfo: Record<Order['status'], { label: string; color: string; bg: string }> = {
  pending: { label: 'Pendente', color: colors.wheatDark, bg: colors.wheatSoft },
  confirmed: { label: 'Confirmado', color: colors.greenLight, bg: colors.greenSoft },
  delivered: { label: 'Entregue', color: colors.textMuted, bg: colors.border },
};

export function ProducerDashboardScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const myProducts = getProductsByProducer('p1');
  const maxRevenue = Math.max(...revenueByMonth.map((r) => r.value));
  const totalRevenue = revenueByMonth.reduce((s, r) => s + r.value, 0);

  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Painel do Produtor</Text>
          <Ionicons name="settings-outline" size={22} color={colors.white} />
        </View>

        <View style={{ paddingHorizontal: spacing.lg, marginTop: -spacing.xl }}>
          {/* KPI cards */}
          <View style={styles.kpiRow}>
            <Kpi icon="cash-outline" value={`R$ ${(totalRevenue / 1000).toFixed(1)}k`} label="Receita (6m)" />
            <Kpi icon="cube-outline" value={String(myProducts.length)} label="Produtos" />
          </View>
          <View style={styles.kpiRow}>
            <Kpi icon="receipt-outline" value={String(producerOrders.length)} label="Pedidos" />
            <Kpi icon="star-outline" value="4.9" label="Avaliação" />
          </View>

          {/* Revenue chart */}
          <View style={styles.chartCard}>
            <View style={styles.chartHead}>
              <Text style={styles.chartTitle}>Receita mensal</Text>
              <Text style={styles.chartValue}>R$ {totalRevenue.toLocaleString('pt-BR')}</Text>
            </View>
            <View style={styles.chart}>
              {revenueByMonth.map((r) => (
                <View key={r.label} style={styles.barCol}>
                  <View style={styles.barTrack}>
                    <View style={[styles.bar, { height: `${(r.value / maxRevenue) * 100}%` }]} />
                  </View>
                  <Text style={styles.barLabel}>{r.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* My products */}
          <SectionTitle title="Meus produtos" action="Gerenciar" />
          {myProducts.map((p) => (
            <View key={p.id} style={styles.prodRow}>
              <ImageBlock color={p.images[0]} emoji={p.emoji} size={24} style={styles.prodImg} />
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <Text style={styles.prodName}>{p.name}</Text>
                <Text style={styles.prodMeta}>R$ {p.price.toFixed(2)} / {p.unit}</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('ProductForm', { productId: p.id })}>
                <Ionicons name="create-outline" size={22} color={colors.green} />
              </TouchableOpacity>
            </View>
          ))}

          {/* Recent orders */}
          <SectionTitle title="Pedidos recentes" />
          {producerOrders.map((o) => {
            const s = statusInfo[o.status];
            return (
              <View key={o.id} style={styles.orderRow}>
                <Text style={{ fontSize: 28 }}>{o.emoji}</Text>
                <View style={{ flex: 1, marginLeft: spacing.md }}>
                  <Text style={styles.prodName}>{o.productName}</Text>
                  <Text style={styles.prodMeta}>{o.buyerName} · {o.qty} {o.unit} · {o.date}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.orderTotal}>R$ {o.total.toFixed(2)}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: s.bg }]}>
                    <Text style={[styles.statusText, { color: s.color }]}>{s.label}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, { bottom: insets.bottom + spacing.lg }]}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('ProductForm', {})}
      >
        <Ionicons name="add" size={28} color={colors.greenDark} />
      </TouchableOpacity>
    </View>
  );
}

function Kpi({ icon, value, label }: { icon: keyof typeof Ionicons.glyphMap; value: string; label: string }) {
  return (
    <View style={styles.kpi}>
      <View style={styles.kpiIcon}>
        <Ionicons name={icon} size={20} color={colors.green} />
      </View>
      <Text style={styles.kpiValue}>{value}</Text>
      <Text style={styles.kpiLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.green,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl + spacing.sm,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  headerTitle: { color: colors.white, fontSize: font.size.lg, fontWeight: font.weight.bold },
  kpiRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
  kpi: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, ...shadow.card },
  kpiIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  kpiValue: { fontSize: font.size.xl, fontWeight: font.weight.bold, color: colors.text },
  kpiLabel: { fontSize: font.size.xs, color: colors.textMuted, marginTop: 2 },
  chartCard: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, marginTop: spacing.sm, ...shadow.card },
  chartHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  chartTitle: { fontSize: font.size.md, fontWeight: font.weight.semibold, color: colors.text },
  chartValue: { fontSize: font.size.md, fontWeight: font.weight.bold, color: colors.green },
  chart: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 140 },
  barCol: { flex: 1, alignItems: 'center' },
  barTrack: { width: 24, height: 110, justifyContent: 'flex-end', backgroundColor: colors.background, borderRadius: radius.sm },
  bar: { width: 24, backgroundColor: colors.wheat, borderRadius: radius.sm },
  barLabel: { fontSize: font.size.xs, color: colors.textMuted, marginTop: 6 },
  prodRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.sm, ...shadow.card },
  prodImg: { width: 48, height: 48, borderRadius: radius.md },
  prodName: { fontSize: font.size.sm, fontWeight: font.weight.semibold, color: colors.text },
  prodMeta: { fontSize: font.size.xs, color: colors.textMuted, marginTop: 2 },
  orderRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.sm, ...shadow.card },
  orderTotal: { fontSize: font.size.sm, fontWeight: font.weight.bold, color: colors.text },
  statusBadge: { marginTop: 6, borderRadius: radius.pill, paddingHorizontal: 8, paddingVertical: 2 },
  statusText: { fontSize: font.size.xs, fontWeight: font.weight.semibold },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.wheat,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.card,
  },
});
