

import { useEffect, useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity,
  ActivityIndicator, Modal, StatusBar, StyleSheet,
} from "react-native";
import axios from "axios";
import { Ionicons } from '@expo/vector-icons';

// ── Change to your backend IP ──────────────────────────────────────
const API_BASE_URL = 'http://10.8.56.117:8000';
// ──────────────────────────────────────────────────────────────────

// Map situation title → chatbot topic for "Ask AI" button
const TITLE_TO_TOPIC = {
  'Menstrual Pain':             'menstrual',
  'Heavy Menstrual Bleeding':   'menstrual',
  'Pregnancy Nausea':           'maternal',
  'Pregnancy Warning Signs':    'maternal',
  'Postpartum Depression':      'mental',
  'Anemia in Women':            'nutrition',
  'PCOS':                       'menstrual',
  'Mental Health Crisis':       'mental',
  'Domestic Violence Help':     'safety',
  'Vitamin D Deficiency':       'nutrition',
};

// Map situation title → Urdu display title
const TITLE_TO_URDU = {
  'Menstrual Pain':             'ماہواری کا درد',
  'Heavy Menstrual Bleeding':   'بہت زیادہ خون آنا',
  'Pregnancy Nausea':           'حمل میں متلی',
  'Pregnancy Warning Signs':    'حمل میں خطرناک علامات',
  'Postpartum Depression':      'زچگی کے بعد ڈپریشن',
  'Anemia in Women':            'خون کی کمی (انیمیا)',
  'PCOS':                       'پی سی او ایس',
  'Mental Health Crisis':       'ذہنی صحت کا بحران',
  'Domestic Violence Help':     'گھریلو تشدد — مدد',
  'Vitamin D Deficiency':       'وٹامن ڈی کی کمی',
};

// Topic accent colors
const TOPIC_COLORS = {
  menstrual:  '#D4537E',
  maternal:   '#1D9E75',
  mental:     '#7F77DD',
  nutrition:  '#D4A017',
  safety:     '#854F0B',
};

export default function SituationDetailScreen({ route, navigation }) {
  const { title } = route.params;
  const [data, setData]               = useState(null);
  const [loading, setLoading]         = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);

  const topic      = TITLE_TO_TOPIC[title] || 'general';
  const urduTitle  = TITLE_TO_URDU[title]  || title;
  const accentColor = TOPIC_COLORS[topic]  || '#C03870';

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post(`${API_BASE_URL}/situation-details`, { title });
        setData(response.data);
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [title]);

  if (loading) {
    return (
      <View style={localStyles.centerScreen}>
        <ActivityIndicator size="large" color={accentColor} />
        <Text style={localStyles.loadingText}>لوڈ ہو رہا ہے…</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={localStyles.centerScreen}>
        <Ionicons name="alert-circle-outline" size={40} color="#ccc" />
        <Text style={localStyles.errorText}>معلومات نہیں ملیں۔ دوبارہ کوشش کریں۔</Text>
        <TouchableOpacity
          style={[localStyles.retryBtn, { backgroundColor: accentColor }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={localStyles.retryBtnText}>واپس جائیں</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Parse bullet points from period-separated text
  const parseBullets = (text) =>
    text
      ?.split(/\.+/)
      .map(s => s.trim())
      .filter(s => s.length > 2) || [];

  return (
    <View style={localStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={accentColor} />

      {/* Header */}
      <View style={[localStyles.header, { backgroundColor: accentColor }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={localStyles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={localStyles.headerTitle}>{urduTitle}</Text>
          <Text style={localStyles.headerSub}>{title}</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={localStyles.scroll}
        showsVerticalScrollIndicator={false}
      >

        {/* Description card */}
        <View style={localStyles.sectionCard}>
          <View style={localStyles.sectionHeader}>
            <Text style={[localStyles.sectionTitle, { color: accentColor }]}>جائزہ</Text>
            <Ionicons name="information-circle" size={22} color={accentColor} />
          </View>
          <Text style={localStyles.descText}>{data.description}</Text>
        </View>

        {/* Required items */}
        {data.items && data.items.length > 0 && (
          <View style={localStyles.sectionCard}>
            <View style={localStyles.sectionHeader}>
              <Text style={[localStyles.sectionTitle, { color: accentColor }]}>ضروری اشیاء</Text>
              <Ionicons name="medkit-outline" size={22} color={accentColor} />
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={localStyles.itemsRow}
            >
              {data.items.map((item, i) => (
                <View key={i} style={[localStyles.itemChip, { borderColor: accentColor }]}>
                  <Ionicons name="medkit-outline" size={18} color={accentColor} />
                  <Text style={[localStyles.itemText, { color: accentColor }]}>{item.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Action cards — Instructions & Safety */}
        <View style={localStyles.cardRow}>
          <TouchableOpacity
            style={[localStyles.actionCard, { backgroundColor: accentColor }]}
            onPress={() => setExpandedCard('instructions')}
            activeOpacity={0.85}
          >
            <Ionicons name="list" size={28} color="white" />
            <Text style={localStyles.actionCardTitle}>ہدایات</Text>
            <Text style={localStyles.actionCardSub}>مرحلہ وار رہنمائی دیکھیں</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[localStyles.actionCard, { backgroundColor: '#555' }]}
            onPress={() => setExpandedCard('safety')}
            activeOpacity={0.85}
          >
            <Ionicons name="shield-checkmark" size={28} color="white" />
            <Text style={localStyles.actionCardTitle}>احتیاطی تدابیر</Text>
            <Text style={localStyles.actionCardSub}>کیا نہ کریں — پڑھیں</Text>
          </TouchableOpacity>
        </View>

        {/* Ask AI button */}
        <TouchableOpacity
          style={[localStyles.aiBtn, { backgroundColor: accentColor }]}
          onPress={() => navigation.navigate('Chat', { topic })}
          activeOpacity={0.85}
        >
          <Ionicons name="chatbubble-ellipses" size={20} color="white" />
          <Text style={localStyles.aiBtnText}>اردو میں AI سے سوال کریں</Text>
          <Text style={localStyles.aiBtnSub}>🔒 مکمل نجی</Text>
        </TouchableOpacity>

        {/* Safety helplines — show only for relevant topics */}
        {(topic === 'safety' || topic === 'mental') && (
          <View style={localStyles.helplineCard}>
            <Text style={localStyles.helplineTitle}>ہیلپ لائنز — ابھی کال کریں</Text>
            <Text style={localStyles.helplineLine}>🛡️ Rozan: 051-2890505</Text>
            <Text style={localStyles.helplineLine}>💜 Umang: 0317-4288665</Text>
            <Text style={localStyles.helplineLine}>📞 Madadgaar: 1098</Text>
            <Text style={localStyles.helplineLine}>🚨 پولیس: 15</Text>
          </View>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Modal for instructions / safety */}
      <Modal visible={expandedCard !== null} transparent animationType="slide">
        <View style={localStyles.modalOverlay}>
          <View style={localStyles.modalCard}>

            {/* Modal header */}
            <View style={[localStyles.modalHeader, { backgroundColor: expandedCard === 'instructions' ? accentColor : '#555' }]}>
              <TouchableOpacity onPress={() => setExpandedCard(null)}>
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
              <Text style={localStyles.modalTitle}>
                {expandedCard === 'instructions' ? 'مرحلہ وار ہدایات' : 'احتیاطی تدابیر'}
              </Text>
            </View>

            {/* Modal content */}
            <ScrollView
              style={localStyles.modalScroll}
              showsVerticalScrollIndicator={false}
            >
              {parseBullets(
                expandedCard === 'instructions' ? data.instructions : data.precautions
              ).map((item, i) => (
                <View key={i} style={localStyles.bulletRow}>
                  <Text style={[localStyles.bulletDot,
                    { color: expandedCard === 'instructions' ? accentColor : '#555' }]}>
                    •
                  </Text>
                  <Text style={localStyles.bulletText}>{item}</Text>
                </View>
              ))}
              <View style={{ height: 20 }} />
            </ScrollView>

            <TouchableOpacity
              style={[localStyles.closeBtn,
                { backgroundColor: expandedCard === 'instructions' ? accentColor : '#555' }]}
              onPress={() => setExpandedCard(null)}
            >
              <Text style={localStyles.closeBtnText}>بند کریں</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: '#FFF5F8' },
  centerScreen:   { flex: 1, alignItems: 'center', justifyContent: 'center',
                    backgroundColor: '#FFF5F8', padding: 20 },
  loadingText:    { marginTop: 10, color: '#888', fontSize: 14 },
  errorText:      { marginTop: 10, color: '#888', fontSize: 14, textAlign: 'center' },
  retryBtn:       { marginTop: 16, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 20 },
  retryBtnText:   { color: '#fff', fontWeight: '600' },

  // Header
  header:         { flexDirection: 'row', alignItems: 'center', padding: 14, paddingTop: 16, marginTop: 20 },
  backButton:     { marginRight: 10, padding: 4 },
  headerTitle:    { color: '#fff', fontSize: 17, fontWeight: '700', textAlign: 'right' },
  headerSub:      { color: 'rgba(255,255,255,0.7)', fontSize: 11, textAlign: 'right', marginTop: 2 },

  scroll:         { padding: 14 },

  // Section cards
  sectionCard:    { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 12,
                    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  sectionHeader:  { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',
                    marginBottom: 10, gap: 6 },
  sectionTitle:   { fontSize: 15, fontWeight: '700' },
  descText:       { fontSize: 14, color: '#333', lineHeight: 24, textAlign: 'right',
                    writingDirection: 'rtl' },

  // Items row
  itemsRow:       { paddingVertical: 4, gap: 8 },
  itemChip:       { flexDirection: 'row', alignItems: 'center', gap: 6,
                    borderWidth: 1, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  itemText:       { fontSize: 13, fontWeight: '500' },

  // Action cards
  cardRow:        { flexDirection: 'row', gap: 10, marginBottom: 12 },
  actionCard:     { flex: 1, borderRadius: 14, padding: 14, alignItems: 'center',
                    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2,
                    minHeight: 100, justifyContent: 'center', gap: 6 },
  actionCardTitle: { color: '#fff', fontSize: 14, fontWeight: '700', textAlign: 'center' },
  actionCardSub:  { color: 'rgba(255,255,255,0.75)', fontSize: 11, textAlign: 'center' },

  // AI button
  aiBtn:          { borderRadius: 14, padding: 16, flexDirection: 'row',
                    alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: 12,
                    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  aiBtnText:      { color: '#fff', fontSize: 15, fontWeight: '700', flex: 1,
                    textAlign: 'right', marginHorizontal: 10 },
  aiBtnSub:       { color: 'rgba(255,255,255,0.8)', fontSize: 11 },

  // Helplines
  helplineCard:   { backgroundColor: '#FFF8E7', borderRadius: 12, padding: 14,
                    marginBottom: 12, borderWidth: 1, borderColor: '#FAC775' },
  helplineTitle:  { fontSize: 14, fontWeight: '700', color: '#633806',
                    textAlign: 'right', marginBottom: 8 },
  helplineLine:   { fontSize: 14, color: '#633806', textAlign: 'right', marginBottom: 6,
                    fontWeight: '500' },

  // Modal
  modalOverlay:   { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'flex-end' },
  modalCard:      { backgroundColor: '#fff', borderTopLeftRadius: 20,
                    borderTopRightRadius: 20, maxHeight: '80%' },
  modalHeader:    { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12,
                    borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  modalTitle:     { color: '#fff', fontSize: 16, fontWeight: '700', flex: 1,
                    textAlign: 'right' },
  modalScroll:    { padding: 16, maxHeight: 400 },
  bulletRow:      { flexDirection: 'row', marginBottom: 12, alignItems: 'flex-start' },
  bulletDot:      { fontSize: 18, fontWeight: '700', marginRight: 8, lineHeight: 24 },
  bulletText:     { flex: 1, fontSize: 14, color: '#333', lineHeight: 24,
                    textAlign: 'right', writingDirection: 'rtl' },
  closeBtn:       { margin: 16, borderRadius: 12, padding: 14, alignItems: 'center' },
  closeBtnText:   { color: '#fff', fontSize: 15, fontWeight: '700' },
});
