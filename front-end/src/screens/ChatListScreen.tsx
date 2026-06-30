import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ImageBlock } from '@/components/common';
import { conversations, getProducer } from '@/data/mock';
import { colors, font, radius, spacing } from '@/theme';
import { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function ChatListScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.flex, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Mensagens</Text>
      <FlatList
        data={conversations}
        keyExtractor={(c) => c.id}
        contentContainerStyle={{ paddingBottom: 90 }}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        renderItem={({ item }) => {
          const producer = getProducer(item.producerId);
          return (
            <TouchableOpacity
              style={styles.row}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Chat', { conversationId: item.id, producerId: producer.id })}
            >
              <View>
                <ImageBlock color={producer.cover} emoji={producer.avatar} size={26} style={styles.avatar} />
                {producer.online && <View style={styles.online} />}
              </View>
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <Text style={styles.name}>{producer.name}</Text>
                <Text numberOfLines={1} style={styles.last}>{item.lastMessage}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.time}>{item.time}</Text>
                {item.unread > 0 && (
                  <View style={styles.unread}>
                    <Text style={styles.unreadText}>{item.unread}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  title: {
    fontSize: font.size.xxl,
    fontWeight: font.weight.bold,
    color: colors.text,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  sep: { height: 1, backgroundColor: colors.border, marginLeft: 80 },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  online: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.online,
    borderWidth: 2,
    borderColor: colors.background,
  },
  name: { fontSize: font.size.md, fontWeight: font.weight.semibold, color: colors.text },
  last: { fontSize: font.size.sm, color: colors.textMuted, marginTop: 2 },
  time: { fontSize: font.size.xs, color: colors.textMuted },
  unread: {
    marginTop: 6,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  unreadText: { color: colors.white, fontSize: font.size.xs, fontWeight: font.weight.bold },
});
