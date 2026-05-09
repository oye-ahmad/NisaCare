/**
 * ChatScreen.js  —  NisaCare Anonymous Urdu Chatbot
 *
 * HOW TO USE:
 *   1. Copy this file to your frontend/screens/ folder
 *   2. In your navigation file, add:
 *        import ChatScreen from './screens/ChatScreen';
 *        <Stack.Screen name="Chat" component={ChatScreen} />
 *   3. Navigate to it with:
 *        navigation.navigate('Chat', { topic: 'menstrual' })
 *      OR just 'Chat' without topic for general chat
 *   4. Change API_BASE_URL below to your backend IP/URL
 */

import React, { useState, useRef, useCallback } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  KeyboardAvoidingView, Platform, StyleSheet, ActivityIndicator,
  SafeAreaView, Alert, I18nManager,
} from 'react-native';

// ── Change this to your backend URL ─────────────────
const API_BASE_URL = 'http://10.8.56.93:8000';
// ────────────────────────────────────────────────────

// Force RTL for Urdu text
I18nManager.forceRTL(false); // keep false — we handle RTL per-message

const TOPIC_COLORS = {
  menstrual:  '#D4537E',
  maternal:   '#1D9E75',
  mental:     '#7F77DD',
  nutrition:  '#3B6D11',
  safety:     '#854F0B',
  general:    '#185FA5',
};

const TOPIC_LABELS = {
  menstrual:  'ماہواری کی صحت',
  maternal:   'حمل کی دیکھ بھال',
  mental:     'ذہنی صحت',
  nutrition:  'غذا اور صحت',
  safety:     'حفاظت اور مدد',
  general:    'عمومی صحت',
};

const WELCOME_MESSAGES = {
  menstrual:  'السلام علیکم! میں NisaCare AI ہوں۔\nماہواری سے متعلق کوئی بھی سوال بلا جھجھک پوچھیں — یہ بات چیت مکمل طور پر نجی ہے۔ 🌸',
  maternal:   'السلام علیکم! آپ کا NisaCare میں خیر مقدم ہے۔\nحمل اور زچگی سے متعلق کوئی بھی سوال پوچھیں — میں آپ کی مدد کے لیے حاضر ہوں۔ 💚',
  mental:     'السلام علیکم! آپ اکیلی نہیں ہیں۔\nاپنے دل کی بات بتائیں — یہاں کوئی جج نہیں کرے گا، بس سنا اور سمجھا جائے گا۔ 💜',
  nutrition:  'السلام علیکم! غذائی صحت کے بارے میں سوال کریں۔\nمیں آپ کو پاکستانی کھانوں کے ذریعے صحت مند رہنے کے طریقے بتاؤں گی۔ 🥗',
  safety:     'السلام علیکم! آپ کی حفاظت سب سے اہم ہے۔\nاگر آپ کسی مشکل میں ہیں، بتائیں — میں مدد کروں گی۔\nایمرجنسی ہو تو Rozan: 051-2890505 🛡️',
  general:    'السلام علیکم! میں NisaCare AI ہوں — آپ کی صحت کی ساتھی۔\nکوئی بھی سوال پوچھیں، یہ گفتگو مکمل طور پر نجی ہے۔ ✨',
};

export default function ChatScreen({ route, navigation }) {
  const topic = route?.params?.topic || 'general';
  const topicColor = TOPIC_COLORS[topic] || TOPIC_COLORS.general;

  const [messages, setMessages] = useState([
    {
      id: '0',
      role: 'bot',
      text: WELCOME_MESSAGES[topic] || WELCOME_MESSAGES.general,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);

  const sendMessage = useCallback(async (textOverride) => {
    const text = (textOverride || input).trim();
    if (!text || loading) return;

    const userMsg = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, topic }),
      });
      const data = await res.json();
      const botMsg = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: data.reply || 'معذرت، کوئی مسئلہ آ گیا۔ دوبارہ کوشش کریں۔',
      };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      setMessages(prev => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'bot',
          text: 'انٹرنیٹ کنکشن چیک کریں اور دوبارہ کوشش کریں۔' },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [input, loading, topic]);

  const renderMessage = ({ item }) => {
    const isBot = item.role === 'bot';
    return (
      <View style={[styles.msgRow, isBot ? styles.botRow : styles.userRow]}>
        <View style={[
          styles.bubble,
          isBot
            ? [styles.botBubble, { borderLeftColor: topicColor }]
            : styles.userBubble,
        ]}>
          <Text style={[
            styles.msgText,
            isBot ? styles.botText : styles.userText,
          ]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  const quickQuestions = {
    menstrual: ['ماہواری میں درد کیوں ہوتا ہے؟', 'PCOS کیا ہے؟', 'بے قاعدہ ماہواری کیوں ہوتی ہے؟'],
    maternal:  ['حمل میں کیا نہ کھائیں؟', 'فولک ایسڈ کب لیں؟', 'خطرناک علامات کون سی ہیں؟'],
    mental:    ['اداسی کم کرنے کا طریقہ؟', 'نیند کیوں نہیں آتی؟', 'تناؤ کم کیسے کریں؟'],
    nutrition: ['خون کی کمی کیا کھائیں؟', 'وٹامن ڈی کیسے پوری کریں؟', 'دودھ پلانے میں غذا؟'],
    safety:    ['مدد کا نمبر کیا ہے؟', 'گھریلو تشدد کیا ہے؟', 'محفوظ کیسے رہیں؟'],
    general:   ['عورتوں میں خون کی کمی', 'صحت مند رہنے کا طریقہ', 'ڈاکٹر کب ملنا چاہیے؟'],
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: topicColor }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>{TOPIC_LABELS[topic]}</Text>
          <Text style={styles.headerSub}>🔒 مکمل نجی · کوئی ریکارڈ نہیں</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {/* Loading indicator */}
        {loading && (
          <View style={styles.loadingRow}>
            <ActivityIndicator size="small" color={topicColor} />
            <Text style={[styles.loadingText, { color: topicColor }]}>جواب آ رہا ہے…</Text>
          </View>
        )}

        {/* Quick question chips (show only at start) */}
        {messages.length <= 1 && (
          <View style={styles.chipsContainer}>
            <Text style={styles.chipsLabel}>جلدی پوچھیں:</Text>
            <View style={styles.chips}>
              {(quickQuestions[topic] || quickQuestions.general).map((q, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.chip, { borderColor: topicColor }]}
                  onPress={() => sendMessage(q)}
                >
                  <Text style={[styles.chipText, { color: topicColor }]}>{q}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Input bar */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="اپنا سوال یہاں لکھیں…"
            placeholderTextColor="#aaa"
            multiline
            textAlign="right"
            onSubmitEditing={() => sendMessage()}
          />
          <TouchableOpacity
            style={[styles.sendBtn, { backgroundColor: topicColor }, (!input.trim() || loading) && styles.sendBtnDisabled]}
            onPress={() => sendMessage()}
            disabled={!input.trim() || loading}
          >
            <Text style={styles.sendIcon}>↑</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: '#FAFAFA' },
  header:        { flexDirection: 'row', alignItems: 'center', padding: 14, paddingTop: 16 },
  backBtn:       { marginRight: 10, padding: 4 },
  backArrow:     { color: '#fff', fontSize: 20, fontWeight: '600' },
  headerTitle:   { color: '#fff', fontSize: 16, fontWeight: '700', textAlign: 'right' },
  headerSub:     { color: 'rgba(255,255,255,0.8)', fontSize: 11, textAlign: 'right', marginTop: 2 },

  messageList:   { padding: 12, paddingBottom: 8 },
  msgRow:        { marginVertical: 4 },
  botRow:        { alignItems: 'flex-start' },
  userRow:       { alignItems: 'flex-end' },
  bubble:        { maxWidth: '82%', borderRadius: 14, padding: 12 },
  botBubble:     { backgroundColor: '#fff', borderLeftWidth: 3, borderLeftColor: '#ccc',
                   shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  userBubble:    { backgroundColor: '#E8F0FE' },
  msgText:       { fontSize: 15, lineHeight: 24, writingDirection: 'rtl', textAlign: 'right' },
  botText:       { color: '#1a1a1a' },
  userText:      { color: '#1a1a2e' },

  loadingRow:    { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 4, gap: 6 },
  loadingText:   { fontSize: 13 },

  chipsContainer: { paddingHorizontal: 12, paddingBottom: 8 },
  chipsLabel:    { fontSize: 12, color: '#888', textAlign: 'right', marginBottom: 6 },
  chips:         { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 6 },
  chip:          { borderWidth: 1, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  chipText:      { fontSize: 12 },

  inputBar:      { flexDirection: 'row', alignItems: 'flex-end',
                   padding: 10, borderTopWidth: 0.5, borderTopColor: '#e0e0e0',
                   backgroundColor: '#fff' },
  input:         { flex: 1, minHeight: 40, maxHeight: 100, borderWidth: 1, borderColor: '#ddd',
                   borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8,
                   fontSize: 15, backgroundColor: '#f9f9f9', marginRight: 8,
                   writingDirection: 'rtl' },
  sendBtn:       { width: 40, height: 40, borderRadius: 20,
                   alignItems: 'center', justifyContent: 'center' },
  sendBtnDisabled: { opacity: 0.4 },
  sendIcon:      { color: '#fff', fontSize: 18, fontWeight: '700' },
});
