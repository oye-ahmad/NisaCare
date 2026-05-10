/**
 * BreastCancerScreen.js  —  NisaCare Breast Cancer Awareness Hub
 *
 * REPLACES: KitInfoScreen.js
 *
 * HOW TO INTEGRATE:
 *   1. Copy this file to frontend/screens/
 *   2. Copy BreastCancerDetailScreen.js to frontend/screens/
 *   3. In your navigator, replace:
 *        <Stack.Screen name="KitInfo" component={KitInfoScreen} />
 *      with:
 *        <Stack.Screen name="KitInfo" component={BreastCancerScreen} options={{ headerShown: false }} />
 *        <Stack.Screen name="BreastCancerDetail" component={BreastCancerDetailScreen} options={{ headerShown: false }} />
 *   4. The bottom tab that previously said "Kit Info" now opens this screen.
 *      No other tab changes needed.
 */

import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StatusBar, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// ── Section cards that navigate to detail screen ───────────────────
const SECTIONS = [
  {
    id: 'what',
    title: 'چھاتی کا سرطان کیا ہے؟',
    titleEn: 'What is Breast Cancer?',
    icon: 'information-circle',
    color: '#C03870',
    desc: 'بنیادی معلومات، اقسام اور وجوہات',
  },
  {
    id: 'symptoms',
    title: 'علامات',
    titleEn: 'Symptoms',
    icon: 'search',
    color: '#8E44AD',
    desc: 'کیا محسوس کریں — جلد پہچانیں',
  },
  {
    id: 'selfexam',
    title: 'خود معائنہ',
    titleEn: 'Self-Examination',
    icon: 'hand-left',
    color: '#1D9E75',
    desc: 'گھر میں خود معائنہ کا طریقہ',
  },
  {
    id: 'riskfactors',
    title: 'خطرے کے عوامل',
    titleEn: 'Risk Factors',
    icon: 'warning',
    color: '#D85A30',
    desc: 'کسے زیادہ خطرہ ہے اور کیوں',
  },
  {
    id: 'prevention',
    title: 'بچاؤ',
    titleEn: 'Prevention',
    icon: 'shield-checkmark',
    color: '#185FA5',
    desc: 'خطرہ کم کرنے کے طریقے',
  },
  {
    id: 'stages',
    title: 'مراحل اور علاج',
    titleEn: 'Stages & Treatment',
    icon: 'medkit',
    color: '#854F0B',
    desc: 'مرحلے، علاج اور صحت یابی',
  },
  {
    id: 'myths',
    title: 'غلط فہمیاں',
    titleEn: 'Myths & Facts',
    icon: 'close-circle',
    color: '#2980B9',
    desc: 'عام غلط فہمیاں دور کریں',
  },
  {
    id: 'support',
    title: 'مدد اور ہیلپ لائن',
    titleEn: 'Support & Helplines',
    icon: 'heart',
    color: '#D4537E',
    desc: 'پاکستان میں مدد کے ذرائع',
  },
];

export default function BreastCancerScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#C03870" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Ionicons name="ribbon" size={26} color="white" />
          <Text style={styles.headerTitle}>چھاتی کا سرطان</Text>
        </View>
        <Text style={styles.headerSub}>
          Breast Cancer Awareness · آگاہی، بچاؤ اور مدد
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Awareness banner */}
        <View style={styles.banner}>
          <Ionicons name="ribbon" size={32} color="#C03870" />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.bannerTitle}>جلد پہچانیں — زندگی بچائیں</Text>
            <Text style={styles.bannerSub}>
              چھاتی کا سرطان قابلِ علاج ہے — خاص طور پر اگر جلد پکڑا جائے۔
              ہر عورت کو آگاہ ہونا چاہیے۔
            </Text>
          </View>
        </View>

        {/* Quick stat row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>1 in 9</Text>
            <Text style={styles.statLabel}>پاکستانی خواتین متاثر</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNum, { color: '#1D9E75' }]}>95%</Text>
            <Text style={styles.statLabel}>جلد پکڑنے پر صحت یابی</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNum, { color: '#185FA5' }]}>40+</Text>
            <Text style={styles.statLabel}>سال سے باقاعدہ معائنہ</Text>
          </View>
        </View>

        {/* Section grid */}
        <Text style={styles.sectionLabel}>موضوعات</Text>
        <View style={styles.grid}>
          {SECTIONS.map(sec => (
            <TouchableOpacity
              key={sec.id}
              style={[styles.card, { borderTopColor: sec.color }]}
              onPress={() => navigation.navigate('BreastCancerDetail', { sectionId: sec.id })}
              activeOpacity={0.82}
            >
              <View style={[styles.iconCircle, { backgroundColor: sec.color + '18' }]}>
                <Ionicons name={sec.icon} size={24} color={sec.color} />
              </View>
              <Text style={styles.cardTitle}>{sec.title}</Text>
              <Text style={styles.cardTitleEn}>{sec.titleEn}</Text>
              <Text style={styles.cardDesc}>{sec.desc}</Text>
              <View style={styles.cardArrow}>
                <Ionicons name="chevron-forward" size={14} color={sec.color} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Emergency reminder */}
        <View style={styles.emergencyCard}>
          <Text style={styles.emergencyTitle}>⚠️ فوری ڈاکٹر سے ملیں اگر:</Text>
          <Text style={styles.emergencyItem}>• چھاتی میں کوئی نئی گلٹی یا سختی محسوس ہو</Text>
          <Text style={styles.emergencyItem}>• نپل سے خون یا غیر معمولی مائع نکلے</Text>
          <Text style={styles.emergencyItem}>• چھاتی یا بغل کی جلد میں تبدیلی آئے</Text>
          <Text style={styles.emergencyItem}>• بغل میں سوجی ہوئی گلٹی ہو</Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: '#FFF5F8' },

  header:         { backgroundColor: '#C03870', padding: 16, paddingBottom: 20 , marginTop: 20 },
  headerRow:      { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerTitle:    { color: '#fff', fontSize: 22, fontWeight: '800' },
  headerSub:      { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 4, textAlign: 'right' },

  scroll:         { padding: 14 },

  banner:         { flexDirection: 'row', alignItems: 'flex-start',
                    backgroundColor: '#FFF0F5', borderRadius: 14, padding: 14,
                    borderWidth: 1, borderColor: '#F4C0D1', marginBottom: 14 },
  bannerTitle:    { fontSize: 14, fontWeight: '700', color: '#C03870',
                    textAlign: 'right', marginBottom: 4 },
  bannerSub:      { fontSize: 12, color: '#993556', textAlign: 'right', lineHeight: 18 },

  statsRow:       { flexDirection: 'row', gap: 8, marginBottom: 20 },
  statCard:       { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 12,
                    alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  statNum:        { fontSize: 18, fontWeight: '800', color: '#C03870' },
  statLabel:      { fontSize: 10, color: '#888', textAlign: 'center', marginTop: 4, lineHeight: 14 },

  sectionLabel:   { fontSize: 14, fontWeight: '700', color: '#333',
                    textAlign: 'right', marginBottom: 10 },

  grid:           { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 14 },
  card:           { width: '47%', backgroundColor: '#fff', borderRadius: 14,
                    padding: 12, borderTopWidth: 3,
                    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  iconCircle:     { width: 42, height: 42, borderRadius: 21,
                    alignItems: 'center', justifyContent: 'center',
                    alignSelf: 'flex-end', marginBottom: 8 },
  cardTitle:      { fontSize: 14, fontWeight: '700', color: '#1a1a1a',
                    textAlign: 'right', marginBottom: 2 },
  cardTitleEn:    { fontSize: 10, color: '#aaa', textAlign: 'right', marginBottom: 4 },
  cardDesc:       { fontSize: 11, color: '#888', textAlign: 'right', lineHeight: 16 },
  cardArrow:      { alignSelf: 'flex-end', marginTop: 8 },

  emergencyCard:  { backgroundColor: '#FFF8E7', borderRadius: 12, padding: 14,
                    borderWidth: 1, borderColor: '#FAC775' },
  emergencyTitle: { fontSize: 14, fontWeight: '700', color: '#633806',
                    textAlign: 'right', marginBottom: 8 },
  emergencyItem:  { fontSize: 13, color: '#633806', textAlign: 'right',
                    marginBottom: 5, lineHeight: 20 },
});
