import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import { useStore } from '@/context/store';
import { ProfileType } from '@/data/types';
import { colors, font, radius, spacing } from '@/theme';
import { RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

export function AuthScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { login } = useStore();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [profile, setProfile] = useState<ProfileType>('buyer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    login({
      name: name || 'Visitante',
      email: email || 'voce@croply.com',
      profile,
    });
    navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.flex}
    >
      <ScrollView contentContainerStyle={[styles.container, { paddingTop: insets.top + spacing.xl }]}>
        <View style={styles.logoRow}>
          <View style={styles.logoCircle}>
            <Text style={{ fontSize: 32 }}>🌿</Text>
          </View>
          <Text style={styles.brand}>Croply</Text>
        </View>

        <Text style={styles.title}>
          {mode === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta'}
        </Text>
        <Text style={styles.subtitle}>
          {mode === 'login'
            ? 'Entre para continuar comprando e vendendo'
            : 'Comece a vender ou comprar direto do campo'}
        </Text>

        {/* Tabs login / signup */}
        <View style={styles.switch}>
          {(['login', 'signup'] as const).map((m) => (
            <TouchableOpacity
              key={m}
              style={[styles.switchBtn, mode === m && styles.switchBtnActive]}
              onPress={() => setMode(m)}
            >
              <Text style={[styles.switchText, mode === m && styles.switchTextActive]}>
                {m === 'login' ? 'Entrar' : 'Cadastrar'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {mode === 'signup' && (
          <>
            <Text style={styles.label}>Eu sou</Text>
            <View style={styles.profileRow}>
              <ProfileCard
                active={profile === 'buyer'}
                onPress={() => setProfile('buyer')}
                icon="basket"
                label="Comprador"
                desc="Quero comprar"
              />
              <ProfileCard
                active={profile === 'producer'}
                onPress={() => setProfile('producer')}
                icon="leaf"
                label="Produtor"
                desc="Quero vender"
              />
            </View>

            <Field label="Nome" value={name} onChangeText={setName} placeholder="Seu nome" icon="person-outline" />
          </>
        )}

        <Field
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="voce@email.com"
          icon="mail-outline"
          keyboardType="email-address"
        />
        <Field
          label="Senha"
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          icon="lock-closed-outline"
          secure
        />

        {mode === 'login' && (
          <Text style={styles.forgot}>Esqueceu a senha?</Text>
        )}

        <Button
          title={mode === 'login' ? 'Entrar' : 'Criar conta'}
          onPress={submit}
          style={{ marginTop: spacing.lg }}
        />

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.divider} />
        </View>

        <Button title="Continuar com Google" variant="outline" onPress={submit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function ProfileCard({
  active,
  onPress,
  icon,
  label,
  desc,
}: {
  active: boolean;
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  desc: string;
}) {
  return (
    <TouchableOpacity
      style={[styles.profileCard, active && styles.profileCardActive]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Ionicons name={icon} size={26} color={active ? colors.green : colors.textMuted} />
      <Text style={[styles.profileLabel, active && { color: colors.green }]}>{label}</Text>
      <Text style={styles.profileDesc}>{desc}</Text>
    </TouchableOpacity>
  );
}

function Field({
  label,
  icon,
  secure,
  ...rest
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  secure?: boolean;
} & React.ComponentProps<typeof TextInput>) {
  return (
    <View style={{ marginTop: spacing.md }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrap}>
        <Ionicons name={icon} size={18} color={colors.textMuted} />
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={secure}
          autoCapitalize="none"
          {...rest}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.xl, paddingBottom: spacing.xxl },
  logoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xl },
  logoCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: { marginLeft: spacing.md, fontSize: font.size.xl, fontWeight: font.weight.bold, color: colors.green },
  title: { fontSize: font.size.xxl, fontWeight: font.weight.bold, color: colors.text },
  subtitle: { fontSize: font.size.sm, color: colors.textMuted, marginTop: 6, marginBottom: spacing.lg },
  switch: {
    flexDirection: 'row',
    backgroundColor: colors.greenSoft,
    borderRadius: radius.md,
    padding: 4,
    marginBottom: spacing.md,
  },
  switchBtn: { flex: 1, paddingVertical: 10, borderRadius: radius.sm, alignItems: 'center' },
  switchBtnActive: { backgroundColor: colors.surface },
  switchText: { fontSize: font.size.sm, fontWeight: font.weight.semibold, color: colors.textMuted },
  switchTextActive: { color: colors.green },
  label: { fontSize: font.size.sm, fontWeight: font.weight.medium, color: colors.text, marginBottom: 6 },
  profileRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.sm },
  profileCard: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  profileCardActive: { borderColor: colors.green, backgroundColor: colors.greenSoft },
  profileLabel: { fontSize: font.size.md, fontWeight: font.weight.bold, color: colors.text, marginTop: 6 },
  profileDesc: { fontSize: font.size.xs, color: colors.textMuted, marginTop: 2 },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 52,
  },
  input: { flex: 1, marginLeft: spacing.sm, fontSize: font.size.md, color: colors.text },
  forgot: {
    alignSelf: 'flex-end',
    marginTop: spacing.sm,
    color: colors.greenLight,
    fontSize: font.size.sm,
    fontWeight: font.weight.medium,
  },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: spacing.lg },
  divider: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { marginHorizontal: spacing.md, color: colors.textMuted, fontSize: font.size.sm },
});
