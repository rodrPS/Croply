import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import { categories, getProduct } from '@/data/mock';
import { colors, font, radius, spacing } from '@/theme';
import { RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductForm'>;

export function ProductFormScreen({ route, navigation }: Props) {
  const insets = useSafeAreaInsets();
  const editing = route.params?.productId ? getProduct(route.params.productId) : undefined;

  const [name, setName] = useState(editing?.name ?? '');
  const [price, setPrice] = useState(editing ? String(editing.price) : '');
  const [unit, setUnit] = useState(editing?.unit ?? '');
  const [desc, setDesc] = useState(editing?.description ?? '');
  const [cat, setCat] = useState(editing?.categoryId ?? 'veggies');
  const [organic, setOrganic] = useState(editing?.organic ?? false);
  const [photos, setPhotos] = useState<string[]>(editing?.images ?? []);

  const addPhoto = () => setPhotos((p) => [...p, '#C8E6C9']);

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={26} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{editing ? 'Editar produto' : 'Novo produto'}</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {/* Photos */}
        <Text style={styles.label}>Fotos</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.addPhoto} onPress={addPhoto}>
            <Ionicons name="camera-outline" size={26} color={colors.green} />
            <Text style={styles.addPhotoText}>Adicionar</Text>
          </TouchableOpacity>
          {photos.map((c, i) => (
            <View key={i} style={[styles.photo, { backgroundColor: c }]}>
              <Text style={{ fontSize: 32 }}>📷</Text>
              <TouchableOpacity style={styles.removePhoto} onPress={() => setPhotos((p) => p.filter((_, j) => j !== i))}>
                <Ionicons name="close" size={14} color={colors.white} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <Field label="Nome do produto" value={name} onChangeText={setName} placeholder="Ex: Alface orgânica" />

        {/* Category */}
        <Text style={styles.label}>Categoria</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.filter((c) => c.id !== 'all').map((c) => (
            <TouchableOpacity
              key={c.id}
              style={[styles.catChip, cat === c.id && styles.catChipActive]}
              onPress={() => setCat(c.id)}
            >
              <Text style={[styles.catChipText, cat === c.id && { color: colors.white }]}>
                {c.icon} {c.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ flexDirection: 'row', gap: spacing.md }}>
          <View style={{ flex: 1 }}>
            <Field label="Preço (R$)" value={price} onChangeText={setPrice} placeholder="0,00" keyboardType="decimal-pad" />
          </View>
          <View style={{ flex: 1 }}>
            <Field label="Unidade" value={unit} onChangeText={setUnit} placeholder="kg, dúzia..." />
          </View>
        </View>

        <Field label="Descrição" value={desc} onChangeText={setDesc} placeholder="Conte sobre seu produto..." multiline />

        {/* Organic toggle */}
        <View style={styles.toggleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.toggleLabel}>🌱 Produto orgânico</Text>
            <Text style={styles.toggleHint}>Cultivado sem agrotóxicos</Text>
          </View>
          <Switch
            value={organic}
            onValueChange={setOrganic}
            trackColor={{ false: colors.border, true: colors.greenLight }}
            thumbColor={colors.white}
          />
        </View>

        {/* Location */}
        <TouchableOpacity style={styles.locRow}>
          <Ionicons name="location-outline" size={22} color={colors.green} />
          <View style={{ flex: 1, marginLeft: spacing.md }}>
            <Text style={styles.toggleLabel}>Localização</Text>
            <Text style={styles.toggleHint}>Vale Verde, SP</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </TouchableOpacity>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Button title="Salvar produto" onPress={() => navigation.goBack()} />
      </View>
    </KeyboardAvoidingView>
  );
}

function Field({
  label,
  multiline,
  ...rest
}: { label: string; multiline?: boolean } & React.ComponentProps<typeof TextInput>) {
  return (
    <View style={{ marginTop: spacing.lg }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && { height: 100, textAlignVertical: 'top' }]}
        placeholderTextColor={colors.textMuted}
        multiline={multiline}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: { fontSize: font.size.lg, fontWeight: font.weight.bold, color: colors.text },
  label: { fontSize: font.size.sm, fontWeight: font.weight.semibold, color: colors.text, marginBottom: spacing.sm },
  addPhoto: {
    width: 90,
    height: 90,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.green,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    backgroundColor: colors.greenSoft,
  },
  addPhotoText: { fontSize: font.size.xs, color: colors.green, marginTop: 4, fontWeight: font.weight.medium },
  photo: { width: 90, height: 90, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  removePhoto: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 52,
    fontSize: font.size.md,
    color: colors.text,
  },
  catChip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    marginRight: spacing.sm,
  },
  catChipActive: { backgroundColor: colors.green, borderColor: colors.green },
  catChipText: { fontSize: font.size.sm, color: colors.textMuted, fontWeight: font.weight.medium },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  toggleLabel: { fontSize: font.size.md, fontWeight: font.weight.semibold, color: colors.text },
  toggleHint: { fontSize: font.size.xs, color: colors.textMuted, marginTop: 2 },
  locRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  footer: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
