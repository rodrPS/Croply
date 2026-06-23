import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SectionTitle } from '@/components/common';
import { useStore } from '@/context/store';
import { purchaseHistory } from '@/data/mock';
import { colors, font, radius, shadow, spacing } from '@/theme';
import { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function UserProfileScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const { user, logout } = useStore();
  const [notif, setNotif] = React.useState(true);

  const doLogout = () => {
    logout();
    navigation.reset({ index: 0, routes: [{ name: 'Auth' }] });
  };

  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + spacing.lg }]}>
          <View style={styles.avatar}>
            <Text style={{ fontSize: 36 }}>🧑</Text>
          </View>
          <Text style={styles.name}>{user?.name ?? 'Visitante'}</Text>
          <Text style={styles.email}>{user?.email ?? 'voce@croply.com'}</Text>
          <View style={styles.profileTag}>
            <Text style={styles.profileTagText}>
              {user?.profile === 'producer' ? '🌱 Produtor' : '🛒 Comprador'}
            </Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: spacing.lg }}>
          {/* Producer panel access */}
          <TouchableOpacity
            style={styles.producerBanner}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('ProducerDashboard')}
          >
            <View style={styles.producerIcon}>
              <Ionicons name="stats-chart" size={22} color={colors.greenDark} />
            </View>
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={styles.producerTitle}>Painel do Produtor</Text>
              <Text style={styles.producerSub}>Gerencie produtos, vendas e pedidos</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.greenDark} />
          </TouchableOpacity>

          {/* Purchase history */}
          <SectionTitle title="Histórico de compras" action="Ver tudo" />
          {purchaseHistory.map((h) => (
            <View key={h.id} style={styles.histRow}>
              <Text style={{ fontSize: 28 }}>{h.emoji}</Text>
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <Text style={styles.histName}>{h.productName}</Text>
                <Text style={styles.histMeta}>{h.qty} {h.unit} · {h.date}</Text>
              </View>
              <Text style={styles.histTotal}>R$ {h.total.toFixed(2)}</Text>
            </View>
          ))}

          {/* Settings */}
          <SectionTitle title="Configurações" />
          <View style={styles.menu}>
            <View style={styles.menuRow}>
              <Ionicons name="notifications-outline" size={22} color={colors.text} />
              <Text style={styles.menuText}>Notificações</Text>
              <Switch
                value={notif}
                onValueChange={setNotif}
                trackColor={{ false: colors.border, true: colors.greenLight }}
                thumbColor={colors.white}
              />
            </View>
            <MenuItem icon="heart-outline" label="Favoritos" />
            <MenuItem icon="location-outline" label="Endereços" />
            <MenuItem icon="card-outline" label="Pagamentos" />
            <MenuItem icon="help-circle-outline" label="Ajuda e suporte" />
            <MenuItem icon="shield-checkmark-outline" label="Privacidade (LGPD)" last />
          </View>

          <TouchableOpacity style={styles.logout} onPress={doLogout}>
            <Ionicons name="log-out-outline" size={20} color={colors.danger} />
            <Text style={styles.logoutText}>Sair da conta</Text>
          </TouchableOpacity>
          <Text style={styles.version}>Croply v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

function MenuItem({
  icon,
  label,
  last,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  last?: boolean;
}) {
  return (
    <TouchableOpacity style={[styles.menuRow, !last && styles.menuBorder]}>
      <Ionicons name={icon} size={22} color={colors.text} />
      <Text style={styles.menuText}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.green,
    alignItems: 'center',
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontSize: font.size.xl, fontWeight: font.weight.bold, color: colors.white, marginTop: spacing.md },
  email: { fontSize: font.size.sm, color: colors.wheatSoft, marginTop: 2 },
  profileTag: {
    marginTop: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  profileTagText: { color: colors.white, fontSize: font.size.sm, fontWeight: font.weight.semibold },
  producerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.wheatSoft,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.wheat,
  },
  producerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.wheat,
    alignItems: 'center',
    justifyContent: 'center',
  },
  producerTitle: { fontSize: font.size.md, fontWeight: font.weight.bold, color: colors.text },
  producerSub: { fontSize: font.size.xs, color: colors.textMuted, marginTop: 2 },
  histRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadow.card,
  },
  histName: { fontSize: font.size.sm, fontWeight: font.weight.semibold, color: colors.text },
  histMeta: { fontSize: font.size.xs, color: colors.textMuted, marginTop: 2 },
  histTotal: { fontSize: font.size.sm, fontWeight: font.weight.bold, color: colors.green },
  menu: { backgroundColor: colors.surface, borderRadius: radius.lg, paddingHorizontal: spacing.md, ...shadow.card },
  menuRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md },
  menuBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  menuText: { flex: 1, marginLeft: spacing.md, fontSize: font.size.md, color: colors.text },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
    padding: spacing.md,
  },
  logoutText: { color: colors.danger, fontSize: font.size.md, fontWeight: font.weight.semibold, marginLeft: spacing.sm },
  version: { textAlign: 'center', color: colors.textMuted, fontSize: font.size.xs, marginTop: spacing.sm },
});
