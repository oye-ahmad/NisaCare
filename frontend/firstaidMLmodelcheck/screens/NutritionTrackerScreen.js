/**
 * NutritionTrackerScreen.js  —  NisaCare Iron & Vitamin D Tracker
 *
 * HOW TO USE:
 *   1. Copy to your frontend/screens/ folder
 *   2. Add to navigation:
 *        import NutritionTrackerScreen from './screens/NutritionTrackerScreen';
 *        <Stack.Screen name="NutritionTracker" component={NutritionTrackerScreen} />
 *   3. Change API_BASE_URL below to your backend IP
 */

import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet,
  SafeAreaView, Alert, ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://10.8.56.93:8000';
const IRON_COLOR   = '#D85A30';
const VITD_COLOR   = '#185FA5';

async function getAnonymousUserId() {
  let uid = await AsyncStorage.getItem('nisacare_uid');
  if (!uid) {
    uid = 'user_' + Math.random().toString(36).substring(2, 10);
    await AsyncStorage.setItem('nisacare_uid', uid);
  }
  return uid;
}

function ProgressBar({ pct, color }) {
  const clamped = Math.min(pct, 100);
  return (
    <View style={{ height: 10, backgroundColor: '#eee', borderRadius: 5, overflow: 'hidden' }}>
      <View style={{ width: `${clamped}%`, height: 10, backgroundColor: color, borderRadius: 5 }} />
    </View>
  );
}

export default function NutritionTrackerScreen({ navigation }) {
  const [userId, setUserId]     = useState('');
  const [foods, setFoods]       = useState([]);
  const [selected, setSelected] = useState([]);
  const [saving, setSaving]     = useState(false);
  const [history, setHistory]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [todayResult, setTodayResult] = useState(null);

  useEffect(() => {
    getAnonymousUserId().then(uid => {
      setUserId(uid);
      loadData(uid);
    });
  }, []);

  const loadData = async (uid) => {
    setLoading(true);
    try {
      const [foodsRes, histRes] = await Promise.all([
        fetch(`${API_BASE_URL}/nutrition/foods`),
        fetch(`${API_BASE_URL}/nutrition/history/${uid}`),
      ]);
      const foodsData = await foodsRes.json();
      const histData  = await histRes.json();
      setFoods(foodsData.foods || []);
      setHistory(histData.logs || []);
    } catch {
      Alert.alert('', 'انٹرنیٹ کنکشن چیک کریں');
    } finally {
      setLoading(false);
    }
  };

  const toggleFood = (key) => {
    setSelected(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const saveLog = async () => {
    if (selected.length === 0) {
      Alert.alert('', 'کم از کم ایک کھانا منتخب کریں');
      return;
    }
    setSaving(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const res = await fetch(`${API_BASE_URL}/nutrition/log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          date: today,
          food_items: selected.join(','),
        }),
      });
      const data = await res.json();
      setTodayResult(data);
      setFeedback(data.feedback || []);
      setSelected([]);
      loadData(userId);
    } catch {
      Alert.alert('خطا', 'محفوظ نہیں ہو سکا');
    } finally {
      setSaving(false);
    }
  };

  const selectedIron = selected.reduce((sum, key) => {
    const f = foods.find(x => x.key === key);
    return sum + (f?.iron_mg || 0);
  }, 0);

  const selectedVitD = selected.reduce((sum, key) => {
    const f = foods.find(x => x.key === key);
    return sum + (f?.vitamin_d_iu || 0);
  }, 0);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>غذائی ٹریکر</Text>
        <View style={{ width: 32 }} />
      </View>

      {loading ? (
        <ActivityIndicator color={IRON_COLOR} style={{ marginTop: 40 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.scroll}>

          {/* Daily targets info */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>روزانہ کی ضرورت (خواتین)</Text>
            <View style={styles.infoRow}>
              <View style={[styles.badge, { backgroundColor: '#FFF0E8' }]}>
                <Text style={[styles.badgeVal, { color: IRON_COLOR }]}>18 mg</Text>
                <Text style={[styles.badgeLbl, { color: IRON_COLOR }]}>آئرن</Text>
              </View>
              <View style={[styles.badge, { backgroundColor: '#E8F1FB' }]}>
                <Text style={[styles.badgeVal, { color: VITD_COLOR }]}>600 IU</Text>
                <Text style={[styles.badgeLbl, { color: VITD_COLOR }]}>وٹامن ڈی</Text>
              </View>
              <View style={styles.factBubble}>
                <Text style={styles.factText}>
                  پاکستان میں 50% خواتین میں آئرن کی کمی ہے
                </Text>
              </View>
            </View>
          </View>

          {/* Today's result after saving */}
          {todayResult && (
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>آج کا نتیجہ</Text>
              <View style={{ marginBottom: 8 }}>
                <View style={styles.nutriRow}>
                  <Text style={[styles.nutriLabel, { color: IRON_COLOR }]}>
                    آئرن: {todayResult.iron_mg} mg ({todayResult.iron_pct_rda}%)
                  </Text>
                </View>
                <ProgressBar pct={todayResult.iron_pct_rda} color={IRON_COLOR} />
              </View>
              <View>
                <View style={styles.nutriRow}>
                  <Text style={[styles.nutriLabel, { color: VITD_COLOR }]}>
                    وٹامن ڈی: {todayResult.vitamin_d_iu} IU ({todayResult.vitamin_d_pct_rda}%)
                  </Text>
                </View>
                <ProgressBar pct={todayResult.vitamin_d_pct_rda} color={VITD_COLOR} />
              </View>
              {feedback.map((f, i) => (
                <View key={i} style={styles.feedbackRow}>
                  <Text style={styles.feedbackText}>⚠️ {f}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Food selector */}
          <Text style={styles.sectionTitle}>آج کیا کھایا؟</Text>
          <Text style={styles.sectionSub}>جو کھانے کھائے ہیں انھیں منتخب کریں:</Text>
          <View style={styles.foodGrid}>
            {foods.map(food => {
              const isSelected = selected.includes(food.key);
              return (
                <TouchableOpacity
                  key={food.key}
                  style={[styles.foodCard, isSelected && styles.foodCardSelected]}
                  onPress={() => toggleFood(food.key)}
                >
                  <Text style={[styles.foodName, isSelected && { color: '#fff' }]}>
                    {food.name_urdu}
                  </Text>
                  <View style={styles.foodStats}>
                    {food.iron_mg > 0 && (
                      <Text style={[styles.foodStat,
                        { color: isSelected ? 'rgba(255,255,255,0.8)' : IRON_COLOR }]}>
                        Fe {food.iron_mg}
                      </Text>
                    )}
                    {food.vitamin_d_iu > 0 && (
                      <Text style={[styles.foodStat,
                        { color: isSelected ? 'rgba(255,255,255,0.8)' : VITD_COLOR }]}>
                        D {food.vitamin_d_iu}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Live preview */}
          {selected.length > 0 && (
            <View style={styles.previewCard}>
              <Text style={styles.previewTitle}>منتخب کھانوں کا مجموعہ:</Text>
              <Text style={[styles.previewStat, { color: IRON_COLOR }]}>
                آئرن: {selectedIron.toFixed(1)} mg / 18 mg
              </Text>
              <ProgressBar pct={(selectedIron / 18) * 100} color={IRON_COLOR} />
              <Text style={[styles.previewStat, { color: VITD_COLOR, marginTop: 8 }]}>
                وٹامن ڈی: {selectedVitD.toFixed(0)} IU / 600 IU
              </Text>
              <ProgressBar pct={(selectedVitD / 600) * 100} color={VITD_COLOR} />
            </View>
          )}

          <TouchableOpacity
            style={[styles.saveBtn, (saving || selected.length === 0) && { opacity: 0.5 }]}
            onPress={saveLog}
            disabled={saving || selected.length === 0}
          >
            {saving
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.saveBtnText}>محفوظ کریں</Text>}
          </TouchableOpacity>

          {/* History */}
          {history.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, { marginTop: 24 }]}>پچھلے 7 دن</Text>
              {history.map((log, i) => (
                <View key={log.id || i} style={styles.histCard}>
                  <Text style={styles.histDate}>{log.date}</Text>
                  <View style={styles.histBars}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                      <Text style={[styles.histLabel, { color: IRON_COLOR }]}>
                        آئرن {log.iron_mg}mg
                      </Text>
                      <ProgressBar pct={(log.iron_mg / 18) * 100} color={IRON_COLOR} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.histLabel, { color: VITD_COLOR }]}>
                        D {log.vitamin_d_iu}IU
                      </Text>
                      <ProgressBar pct={(log.vitamin_d_iu / 600) * 100} color={VITD_COLOR} />
                    </View>
                  </View>
                </View>
              ))}
            </>
          )}

          {/* Ask AI button */}
          <TouchableOpacity
            style={styles.aiBtn}
            onPress={() => navigation.navigate('Chat', { topic: 'nutrition' })}
          >
            <Text style={styles.aiBtnText}>غذا کے بارے میں AI سے پوچھیں ←</Text>
          </TouchableOpacity>

        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: '#F8FBFF' },
  header:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                  padding: 14, backgroundColor: '#185FA5' },
  backBtn:      { padding: 4 },
  backArrow:    { color: '#fff', fontSize: 20, fontWeight: '600' },
  headerTitle:  { color: '#fff', fontSize: 17, fontWeight: '700', marginTop: 20 },
  scroll:       { padding: 16, paddingBottom: 40 },

  infoCard:     { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 16,
                  borderWidth: 1, borderColor: '#e8e8e8' },
  infoTitle:    { fontSize: 13, fontWeight: '600', color: '#555', textAlign: 'right', marginBottom: 12 },
  infoRow:      { flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'flex-end' },
  badge:        { borderRadius: 10, padding: 10, alignItems: 'center', minWidth: 70 },
  badgeVal:     { fontSize: 16, fontWeight: '700' },
  badgeLbl:     { fontSize: 11, marginTop: 2 },
  factBubble:   { flex: 1, backgroundColor: '#FFF8E7', borderRadius: 10, padding: 8 },
  factText:     { fontSize: 11, color: '#633806', textAlign: 'right', lineHeight: 16 },

  resultCard:   { backgroundColor: '#F0FFF6', borderRadius: 14, padding: 16, marginBottom: 16,
                  borderWidth: 1, borderColor: '#C0DD97' },
  resultTitle:  { fontSize: 14, fontWeight: '700', color: '#27500A', textAlign: 'right', marginBottom: 12 },
  nutriRow:     { marginBottom: 4 },
  nutriLabel:   { fontSize: 13, fontWeight: '600', textAlign: 'right', marginBottom: 4 },
  feedbackRow:  { marginTop: 8, backgroundColor: '#FFF8E7', borderRadius: 8, padding: 8 },
  feedbackText: { fontSize: 12, color: '#633806', textAlign: 'right' },

  sectionTitle: { fontSize: 15, fontWeight: '600', color: '#333', textAlign: 'right', marginBottom: 4 },
  sectionSub:   { fontSize: 12, color: '#888', textAlign: 'right', marginBottom: 12 },
  foodGrid:     { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16,
                  justifyContent: 'flex-end' },
  foodCard:     { backgroundColor: '#fff', borderRadius: 12, padding: 10, minWidth: 80,
                  borderWidth: 1, borderColor: '#ddd', alignItems: 'center' },
  foodCardSelected: { backgroundColor: '#1D9E75', borderColor: '#1D9E75' },
  foodName:     { fontSize: 14, fontWeight: '600', color: '#222', textAlign: 'center' },
  foodStats:    { flexDirection: 'row', gap: 4, marginTop: 4 },
  foodStat:     { fontSize: 10 },

  previewCard:  { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 16,
                  borderWidth: 1, borderColor: '#ddd' },
  previewTitle: { fontSize: 13, fontWeight: '600', color: '#333', textAlign: 'right', marginBottom: 8 },
  previewStat:  { fontSize: 13, fontWeight: '600', textAlign: 'right', marginBottom: 4 },

  saveBtn:      { backgroundColor: '#1D9E75', borderRadius: 12, padding: 14,
                  alignItems: 'center', marginBottom: 8 },
  saveBtnText:  { color: '#fff', fontSize: 16, fontWeight: '700' },

  histCard:     { backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 8,
                  borderWidth: 1, borderColor: '#eee' },
  histDate:     { fontSize: 12, color: '#888', textAlign: 'right', marginBottom: 8 },
  histBars:     { flexDirection: 'row' },
  histLabel:    { fontSize: 11, fontWeight: '600', textAlign: 'right', marginBottom: 4 },

  aiBtn:        { marginTop: 8, backgroundColor: '#0C447C', borderRadius: 12,
                  padding: 14, alignItems: 'center' },
  aiBtnText:    { color: '#fff', fontSize: 14, fontWeight: '600' },
});
