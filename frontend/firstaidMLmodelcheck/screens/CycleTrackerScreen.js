
import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet,
  SafeAreaView, Alert, ActivityIndicator, Modal, TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://oye-ahmad1657-nisacare.hf.space';
const PRIMARY = '#D4537E';

// Anonymous user ID — stored locally, never sent to any server with identity
async function getAnonymousUserId() {
  let uid = await AsyncStorage.getItem('firstaid_uid');
  if (!uid) {
    uid = 'user_' + Math.random().toString(36).substring(2, 10);
    await AsyncStorage.setItem('firstaid_uid', uid);
  }
  return uid;
}

const MONTHS_UR = [
  'جنوری','فروری','مارچ','اپریل','مئی','جون',
  'جولائی','اگست','ستمبر','اکتوبر','نومبر','دسمبر'
];

const SYMPTOMS = [
  { key: 'cramps',    label: 'درد' },
  { key: 'bloating',  label: 'پیٹ پھولنا' },
  { key: 'headache',  label: 'سر درد' },
  { key: 'fatigue',   label: 'تھکاوٹ' },
  { key: 'mood',      label: 'موڈ خراب' },
  { key: 'backache',  label: 'کمر درد' },
];

const FLOW_OPTIONS = [
  { key: 'light',  label: 'کم',   color: '#FAC775' },
  { key: 'medium', label: 'درمیانہ', color: PRIMARY },
  { key: 'heavy',  label: 'زیادہ', color: '#A32D2D' },
];

function formatUrduDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return `${d.getDate()} ${MONTHS_UR[d.getMonth()]} ${d.getFullYear()}`;
}

function daysAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  if (diff === 0) return 'آج';
  if (diff === 1) return 'کل';
  return `${diff} دن پہلے`;
}

export default function CycleTrackerScreen({ navigation }) {
  const [userId, setUserId]       = useState('');
  const [history, setHistory]     = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading]     = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Log form state
  const [startDate, setStartDate]   = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate]       = useState('');
  const [flow, setFlow]             = useState('medium');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [notes, setNotes]           = useState('');
  const [saving, setSaving]         = useState(false);

  useEffect(() => {
    getAnonymousUserId().then(uid => {
      setUserId(uid);
      loadHistory(uid);
      loadPrediction(uid);
    });
  }, []);

  const loadHistory = async (uid) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/cycle/history/${uid}`);
      const data = await res.json();
      setHistory(data.cycles || []);
    } catch {
      // offline — show empty state
    } finally {
      setLoading(false);
    }
  };

  const loadPrediction = async (uid) => {
    try {
      const res = await fetch(`${API_BASE_URL}/cycle/predict/${uid}`);
      const data = await res.json();
      setPrediction(data);
    } catch {}
  };

  const toggleSymptom = (key) => {
    setSelectedSymptoms(prev =>
      prev.includes(key) ? prev.filter(s => s !== key) : [...prev, key]
    );
  };

  const saveLog = async () => {
    if (!startDate) { Alert.alert('', 'شروع کی تاریخ درج کریں'); return; }
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/cycle/log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          start_date: startDate,
          end_date: endDate || null,
          flow_intensity: flow,
          symptoms: selectedSymptoms.join(','),
          notes,
        }),
      });
      const data = await res.json();
      Alert.alert('✓', data.message || 'محفوظ ہو گیا');
      setModalVisible(false);
      setSelectedSymptoms([]);
      setNotes('');
      loadHistory(userId);
      loadPrediction(userId);
    } catch {
      Alert.alert('خطا', 'محفوظ نہیں ہو سکا، انٹرنیٹ چیک کریں');
    } finally {
      setSaving(false);
    }
  };

  const cycleLength = (item) => {
    if (!item.end_date) return null;
    const diff = Math.floor(
      (new Date(item.end_date) - new Date(item.start_date)) / 86400000
    );
    return diff + 1;
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ماہواری ٹریکر</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Prediction card */}
        {prediction?.predicted_next ? (
          <View style={styles.predCard}>
            <Text style={styles.predLabel}>اگلی ماہواری متوقع ہے</Text>
            <Text style={styles.predDate}>{formatUrduDate(prediction.predicted_next)}</Text>
            <Text style={styles.predSub}>اوسط دورانیہ: {prediction.avg_cycle_days} دن</Text>
          </View>
        ) : (
          <View style={[styles.predCard, { backgroundColor: '#FFF3F7' }]}>
            <Text style={styles.predLabel}>پیشگوئی کے لیے</Text>
            <Text style={styles.predSub}>کم از کم 2 ماہواری کا ریکارڈ درج کریں</Text>
          </View>
        )}

        {/* Log button */}
        <TouchableOpacity style={styles.logBtn} onPress={() => setModalVisible(true)}>
          <Text style={styles.logBtnText}>+ نئی ماہواری درج کریں</Text>
        </TouchableOpacity>

        {/* History */}
        <Text style={styles.sectionTitle}>پچھلا ریکارڈ</Text>
        {loading ? (
          <ActivityIndicator color={PRIMARY} style={{ marginTop: 20 }} />
        ) : history.length === 0 ? (
          <Text style={styles.emptyText}>ابھی کوئی ریکارڈ نہیں ہے۔ اوپر بٹن سے شروع کریں۔</Text>
        ) : (
          history.map((item, i) => (
            <View key={item.id || i} style={styles.histCard}>
              <View style={styles.histRow}>
                <View style={[styles.flowDot, {
                  backgroundColor: FLOW_OPTIONS.find(f => f.key === item.flow_intensity)?.color || PRIMARY
                }]} />
                <Text style={styles.histDate}>{formatUrduDate(item.start_date)}</Text>
                <Text style={styles.histAgo}>{daysAgo(item.start_date)}</Text>
              </View>
              {item.end_date && (
                <Text style={styles.histDetail}>دورانیہ: {cycleLength(item)} دن</Text>
              )}
              {item.symptoms ? (
                <Text style={styles.histDetail}>
                  علامات: {item.symptoms.split(',').map(s => {
                    const found = SYMPTOMS.find(x => x.key === s.trim());
                    return found ? found.label : s;
                  }).join('، ')}
                </Text>
              ) : null}
              {item.notes ? (
                <Text style={styles.histNote}>{item.notes}</Text>
              ) : null}
            </View>
          ))
        )}

        {/* Tip card */}
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>ڈاکٹر سے ملیں اگر:</Text>
          <Text style={styles.tipItem}>• ماہواری 21 دن سے پہلے یا 35 دن بعد آئے</Text>
          <Text style={styles.tipItem}>• بہت زیادہ درد یا بہت زیادہ خون آئے</Text>
          <Text style={styles.tipItem}>• 3 ماہ سے ماہواری بند ہو (اور حاملہ نہ ہوں)</Text>
          <TouchableOpacity
            style={styles.tipBtn}
            onPress={() => navigation.navigate('Chat', { topic: 'menstrual' })}
          >
            <Text style={styles.tipBtnText}>AI سے سوال کریں ←</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Log Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>ماہواری درج کریں</Text>

            <Text style={styles.fieldLabel}>شروع کی تاریخ (YYYY-MM-DD)</Text>
            <TextInput
              style={styles.fieldInput}
              value={startDate}
              onChangeText={setStartDate}
              placeholder="مثال: 2025-05-01"
              placeholderTextColor="#bbb"
              textAlign="right"
            />

            <Text style={styles.fieldLabel}>ختم کی تاریخ (اختیاری)</Text>
            <TextInput
              style={styles.fieldInput}
              value={endDate}
              onChangeText={setEndDate}
              placeholder="مثال: 2025-05-06"
              placeholderTextColor="#bbb"
              textAlign="right"
            />

            <Text style={styles.fieldLabel}>خون کا بہاؤ</Text>
            <View style={styles.flowRow}>
              {FLOW_OPTIONS.map(f => (
                <TouchableOpacity
                  key={f.key}
                  style={[styles.flowChip, flow === f.key && { backgroundColor: f.color }]}
                  onPress={() => setFlow(f.key)}
                >
                  <Text style={[styles.flowChipText, flow === f.key && { color: '#fff' }]}>
                    {f.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.fieldLabel}>علامات (ایک سے زیادہ منتخب کریں)</Text>
            <View style={styles.symptomsGrid}>
              {SYMPTOMS.map(s => (
                <TouchableOpacity
                  key={s.key}
                  style={[styles.symptomChip,
                    selectedSymptoms.includes(s.key) && styles.symptomChipSelected]}
                  onPress={() => toggleSymptom(s.key)}
                >
                  <Text style={[styles.symptomText,
                    selectedSymptoms.includes(s.key) && { color: '#fff' }]}>
                    {s.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.fieldLabel}>نوٹ (اختیاری)</Text>
            <TextInput
              style={[styles.fieldInput, { height: 70 }]}
              value={notes}
              onChangeText={setNotes}
              multiline
              placeholder="کوئی اور بات لکھیں…"
              placeholderTextColor="#bbb"
              textAlign="right"
            />

            <View style={styles.modalBtns}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>منسوخ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveBtn, saving && { opacity: 0.6 }]}
                onPress={saveLog}
                disabled={saving}
              >
                {saving
                  ? <ActivityIndicator color="#fff" size="small" />
                  : <Text style={styles.saveBtnText}>محفوظ کریں</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: '#FFF8FA' },
  header:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                  padding: 14, backgroundColor: PRIMARY },
  backBtn:      { padding: 4 , marginTop: 20},
  backArrow:    { color: '#fff', fontSize: 20, fontWeight: '600' },
  headerTitle:  { color: '#fff', fontSize: 17, fontWeight: '700', marginTop: 20 },
  scroll:       { padding: 16, paddingBottom: 40 },

  predCard:     { backgroundColor: '#FFF0F5', borderRadius: 14, padding: 18, marginBottom: 16,
                  alignItems: 'center', borderWidth: 1, borderColor: '#F4C0D1' },
  predLabel:    { fontSize: 13, color: '#993556', marginBottom: 6, textAlign: 'center' },
  predDate:     { fontSize: 22, fontWeight: '700', color: PRIMARY, textAlign: 'center' },
  predSub:      { fontSize: 12, color: '#993556', marginTop: 4, textAlign: 'center' },

  logBtn:       { backgroundColor: PRIMARY, borderRadius: 12, padding: 14,
                  alignItems: 'center', marginBottom: 20 },
  logBtnText:   { color: '#fff', fontSize: 16, fontWeight: '700' },

  sectionTitle: { fontSize: 15, fontWeight: '600', color: '#333', textAlign: 'right',
                  marginBottom: 10 },
  emptyText:    { textAlign: 'center', color: '#aaa', fontSize: 14, marginTop: 20 },

  histCard:     { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 10,
                  borderLeftWidth: 3, borderLeftColor: PRIMARY,
                  shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  histRow:      { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  flowDot:      { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  histDate:     { fontSize: 14, fontWeight: '600', color: '#222', flex: 1, textAlign: 'right' },
  histAgo:      { fontSize: 12, color: '#aaa', marginLeft: 8 },
  histDetail:   { fontSize: 12, color: '#666', textAlign: 'right', marginTop: 2 },
  histNote:     { fontSize: 12, color: '#999', textAlign: 'right', marginTop: 4,
                  fontStyle: 'italic' },

  tipCard:      { backgroundColor: '#FFF8E7', borderRadius: 12, padding: 16, marginTop: 10,
                  borderWidth: 1, borderColor: '#FAC775' },
  tipTitle:     { fontSize: 14, fontWeight: '700', color: '#633806', textAlign: 'right', marginBottom: 8 },
  tipItem:      { fontSize: 13, color: '#633806', textAlign: 'right', marginBottom: 4, lineHeight: 20 },
  tipBtn:       { marginTop: 10, alignSelf: 'flex-end', backgroundColor: '#EF9F27',
                  paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  tipBtnText:   { color: '#fff', fontSize: 13, fontWeight: '600' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalCard:    { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20,
                  padding: 20, maxHeight: '90%' },
  modalTitle:   { fontSize: 17, fontWeight: '700', color: '#1a1a1a', textAlign: 'center',
                  marginBottom: 16 },
  fieldLabel:   { fontSize: 13, fontWeight: '600', color: '#555', textAlign: 'right',
                  marginBottom: 6, marginTop: 12 },
  fieldInput:   { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 10,
                  fontSize: 14, backgroundColor: '#f9f9f9' },
  flowRow:      { flexDirection: 'row', gap: 8, justifyContent: 'flex-end' },
  flowChip:     { borderWidth: 1, borderColor: PRIMARY, borderRadius: 20,
                  paddingHorizontal: 16, paddingVertical: 8 },
  flowChipText: { fontSize: 13, color: PRIMARY },
  symptomsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'flex-end' },
  symptomChip:  { borderWidth: 1, borderColor: '#ddd', borderRadius: 20,
                  paddingHorizontal: 12, paddingVertical: 6 },
  symptomChipSelected: { backgroundColor: PRIMARY, borderColor: PRIMARY },
  symptomText:  { fontSize: 13, color: '#555' },
  modalBtns:    { flexDirection: 'row', gap: 10, marginTop: 20 },
  cancelBtn:    { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 10,
                  padding: 12, alignItems: 'center' },
  cancelBtnText: { fontSize: 14, color: '#666' },
  saveBtn:      { flex: 2, backgroundColor: PRIMARY, borderRadius: 10,
                  padding: 12, alignItems: 'center' },
  saveBtnText:  { fontSize: 14, color: '#fff', fontWeight: '700' },
});
