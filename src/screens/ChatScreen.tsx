import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ImageBlock } from '@/components/common';
import { getProducer, messagesByConversation } from '@/data/mock';
import { Message } from '@/data/types';
import { colors, font, radius, spacing } from '@/theme';
import { RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export function ChatScreen({ route, navigation }: Props) {
  const insets = useSafeAreaInsets();
  const producer = getProducer(route.params.producerId);
  const [messages, setMessages] = useState<Message[]>(
    messagesByConversation[route.params.conversationId] ?? []
  );
  const [draft, setDraft] = useState('');
  const listRef = useRef<FlatList>(null);

  const send = (image?: string) => {
    if (!draft.trim() && !image) return;
    const msg: Message = {
      id: String(Date.now()),
      text: draft.trim(),
      fromMe: true,
      time: 'agora',
      image,
    };
    setMessages((prev) => [...prev, msg]);
    setDraft('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 80);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <ImageBlock color={producer.cover} emoji={producer.avatar} size={20} style={styles.avatar} />
        <View style={{ flex: 1, marginLeft: spacing.sm }}>
          <Text style={styles.hName}>{producer.name}</Text>
          <Text style={styles.hStatus}>{producer.online ? '● online' : 'visto há pouco'}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="call-outline" size={22} color={colors.white} />
        </TouchableOpacity>
      </View>

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ padding: spacing.lg, gap: spacing.sm }}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
        renderItem={({ item }) => (
          <View style={[styles.bubbleRow, item.fromMe ? styles.rowMe : styles.rowThem]}>
            <View style={[styles.bubble, item.fromMe ? styles.bubbleMe : styles.bubbleThem]}>
              {item.image && <ImageBlock color={item.image} emoji="🖼️" size={32} style={styles.bubbleImg} />}
              {!!item.text && (
                <Text style={[styles.bubbleText, item.fromMe && { color: colors.white }]}>{item.text}</Text>
              )}
              <Text style={[styles.bubbleTime, item.fromMe && { color: 'rgba(255,255,255,0.7)' }]}>
                {item.time}
              </Text>
            </View>
          </View>
        )}
      />

      {/* Composer */}
      <View style={[styles.composer, { paddingBottom: insets.bottom + spacing.sm }]}>
        <TouchableOpacity style={styles.attach} onPress={() => send('#C8E6C9')}>
          <Ionicons name="image-outline" size={22} color={colors.green} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Mensagem..."
          placeholderTextColor={colors.textMuted}
          value={draft}
          onChangeText={setDraft}
          onSubmitEditing={() => send()}
          returnKeyType="send"
          multiline
        />
        <TouchableOpacity style={styles.sendBtn} onPress={() => send()}>
          <Ionicons name="send" size={18} color={colors.greenDark} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.green,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginLeft: spacing.md },
  hName: { color: colors.white, fontSize: font.size.md, fontWeight: font.weight.bold },
  hStatus: { color: colors.wheatSoft, fontSize: font.size.xs, marginTop: 1 },
  bubbleRow: { flexDirection: 'row' },
  rowMe: { justifyContent: 'flex-end' },
  rowThem: { justifyContent: 'flex-start' },
  bubble: { maxWidth: '78%', borderRadius: radius.lg, padding: spacing.md },
  bubbleMe: { backgroundColor: colors.green, borderBottomRightRadius: 4 },
  bubbleThem: { backgroundColor: colors.surface, borderBottomLeftRadius: 4 },
  bubbleImg: { width: 160, height: 110, borderRadius: radius.md, marginBottom: 6 },
  bubbleText: { fontSize: font.size.sm, color: colors.text, lineHeight: 20 },
  bubbleTime: { fontSize: 10, color: colors.textMuted, marginTop: 4, alignSelf: 'flex-end' },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  attach: { padding: spacing.sm },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    maxHeight: 100,
    fontSize: font.size.sm,
    color: colors.text,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.wheat,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
});
