import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import { colors, font, spacing } from '@/theme';
import { RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const { width } = Dimensions.get('window');

const slides = [
  {
    emoji: '🌱',
    title: 'Venda seus produtos',
    text: 'Cadastre seus produtos, defina seus preços e alcance compradores em toda a região sem precisar de intermediários.',
  },
  {
    emoji: '🛒',
    title: 'Compre direto do produtor',
    text: 'Encontre alimentos frescos e orgânicos perto de você, com preço justo e qualidade garantida.',
  },
  {
    emoji: '💬',
    title: 'Converse e combine',
    text: 'Fale direto com o produtor pelo chat, combine a entrega ou retirada e feche negócio com confiança.',
  },
];

export function OnboardingScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList>(null);

  const next = () => {
    if (index < slides.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1 });
    } else {
      navigation.replace('Auth');
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TouchableOpacity style={styles.skip} onPress={() => navigation.replace('Auth')}>
        <Text style={styles.skipText}>Pular</Text>
      </TouchableOpacity>

      <FlatList
        ref={listRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => String(i)}
        onMomentumScrollEnd={(e) =>
          setIndex(Math.round(e.nativeEvent.contentOffset.x / width))
        }
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <View style={styles.emojiCircle}>
              <Text style={styles.emoji}>{item.emoji}</Text>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
      />

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>
        <Button
          title={index === slides.length - 1 ? 'Começar' : 'Próximo'}
          onPress={next}
          icon={<Ionicons name="arrow-forward" size={18} color={colors.greenDark} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.green },
  skip: { alignSelf: 'flex-end', padding: spacing.lg },
  skipText: { color: colors.wheatSoft, fontSize: font.size.md, fontWeight: font.weight.medium },
  slide: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl },
  emojiCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
  },
  emoji: { fontSize: 80 },
  title: {
    fontSize: font.size.xxl,
    fontWeight: font.weight.bold,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  text: {
    fontSize: font.size.md,
    color: colors.wheatSoft,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: { paddingHorizontal: spacing.xl },
  dots: { flexDirection: 'row', justifyContent: 'center', marginBottom: spacing.lg },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 4,
  },
  dotActive: { width: 24, backgroundColor: colors.wheat },
});
