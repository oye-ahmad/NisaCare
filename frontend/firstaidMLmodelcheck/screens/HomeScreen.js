import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, StatusBar,
} from 'react-native';

const API_BASE_URL = 'https://oye-ahmad1657-nisacare.hf.space';

const TOPIC_ICONS = {
  menstrual:  '🌸',
  maternal:   '💚',
  mental:     '💜',
  nutrition:  '🥗',
  safety:     '🛡️',
};

const TOPIC_COLORS = {
  menstrual:  '#D4537E',
  maternal:   '#1D9E75',
  mental:     '#7F77DD',
  nutrition:  '#3B6D11',
  safety:     '#854F0B',
};

export default function HomeScreen({ navigation }) {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/health-topics`)
      .then(r => r.json())
      .then(d => setTopics(d.topics || []))
      .catch(() => {
        // Fallback if server unreachable
        setTopics([
          { id: 'menstrual', title: 'ماہواری کی صحت',  description: 'ماہواری، درد، PCOS' },
          { id: 'maternal',  title: 'حمل کی دیکھ بھال', description: 'حمل، زچگی، نشوونما' },
          { id: 'mental',    title: 'ذہنی صحت',         description: 'اضطراب، ڈپریشن' },
          { id: 'nutrition', title: 'غذا اور صحت',       description: 'آئرن، وٹامن ڈی' },
          { id: 'safety',    title: 'حفاظت اور مدد',    description: 'گھریلو تشدد، ہیلپ لائن' },
        ]);
      });
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#C03870" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appName}>NisaCare</Text>
        <Text style={styles.tagline}>آپ کی صحت، آپ کی نجی ساتھی</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>

        {/* MAIN CTA — Anonymous chatbot entry */}
        <TouchableOpacity
          style={styles.mainCta}
          onPress={() => navigation.navigate('Chat', { topic: 'general' })}
          activeOpacity={0.85}
        >
          <View>
            <Text style={styles.ctaUrdu}>سوال پوچھیں</Text>
            <Text style={styles.ctaEn}>Ask Anonymously</Text>
          </View>
          <View style={styles.ctaBadge}>
            <Text style={styles.ctaBadgeText}>🔒 نجی</Text>
          </View>
        </TouchableOpacity>

        {/* Topic cards */}
        <Text style={styles.sectionTitle}>موضوع منتخب کریں</Text>
        <View style={styles.topicGrid}>
          {topics.map(topic => (
            <TouchableOpacity
              key={topic.id}
              style={[styles.topicCard, { borderTopColor: TOPIC_COLORS[topic.id] || '#888', borderTopWidth: 3 }]}
              onPress={() => navigation.navigate('Chat', { topic: topic.id })}
              activeOpacity={0.8}
            >
              <Text style={styles.topicIcon}>{TOPIC_ICONS[topic.id] || '❓'}</Text>
              <Text style={styles.topicTitle}>{topic.title}</Text>
              <Text style={styles.topicDesc}>{topic.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tools section */}
        <Text style={styles.sectionTitle}>میرے ٹولز</Text>
        <View style={styles.toolsRow}>
          <TouchableOpacity
            style={styles.toolCard}
            onPress={() => navigation.navigate('CycleTracker')}
          >
            <Text style={styles.toolIcon}>📅</Text>
            <Text style={styles.toolTitle}>ماہواری ٹریکر</Text>
            <Text style={styles.toolDesc}>تاریخ اور علامات درج کریں</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toolCard}
            onPress={() => navigation.navigate('NutritionTracker')}
          >
            <Text style={styles.toolIcon}>🥗</Text>
            <Text style={styles.toolTitle}>غذائی ٹریکر</Text>
            <Text style={styles.toolDesc}>آئرن اور وٹامن ڈی چیک کریں</Text>
          </TouchableOpacity>
        </View>

        {/* Privacy note */}
        {/* <View style={styles.privacyNote}>
          <Text style={styles.privacyText}>
            🔒 NisaCare میں آپ کی شناخت محفوظ ہے — کوئی لاگ ان نہیں، کوئی نام نہیں، کوئی ریکارڈ باہر نہیں جاتا۔
          </Text>
        </View> */}

        {/* Emergency numbers */}
        <View style={styles.emergencyCard}>
          <Text style={styles.emergencyTitle}>ہیلپ لائنز</Text>
          <Text style={styles.emergencyLine}>Rozan: 051-2890505</Text>
          <Text style={styles.emergencyLine}>Umang: 0317-4288665</Text>
          <Text style={styles.emergencyLine}>Madadgaar: 1098</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:           { flex: 1, backgroundColor: '#FFF5F8' },
  header:         { backgroundColor: '#C03870', padding: 20, paddingBottom: 24 },
  appName:        { color: '#fff', fontSize: 26, fontWeight: '800', textAlign: 'right', marginTop:10 },
  tagline:        { color: 'rgba(255,255,255,0.85)', fontSize: 13, textAlign: 'right', marginTop: 4 },
  scroll:         { padding: 16, paddingBottom: 40 },

  mainCta:        { backgroundColor: '#D4537E', borderRadius: 16, padding: 20, marginBottom: 20,
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                    shadowColor: '#D4537E', shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  ctaUrdu:        { color: '#fff', fontSize: 22, fontWeight: '800' },
  ctaEn:          { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 2 },
  ctaBadge:       { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20,
                    paddingHorizontal: 12, paddingVertical: 6 },
  ctaBadgeText:   { color: '#fff', fontSize: 13, fontWeight: '600' },

  sectionTitle:   { fontSize: 15, fontWeight: '700', color: '#333', textAlign: 'right',
                    marginBottom: 12, marginTop: 8 },
  topicGrid:      { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16,
                    justifyContent: 'flex-end' },
  topicCard:      { backgroundColor: '#fff', borderRadius: 12, padding: 14,
                    width: '47%', alignItems: 'flex-end',
                    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  topicIcon:      { fontSize: 24, marginBottom: 6 },
  topicTitle:     { fontSize: 14, fontWeight: '700', color: '#1a1a1a', textAlign: 'right', marginBottom: 4 },
  topicDesc:      { fontSize: 11, color: '#888', textAlign: 'right' },

  toolsRow:       { flexDirection: 'row', gap: 10, marginBottom: 16 },
  toolCard:       { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 14,
                    alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  toolIcon:       { fontSize: 26, marginBottom: 6 },
  toolTitle:      { fontSize: 13, fontWeight: '700', color: '#1a1a1a', textAlign: 'center', marginBottom: 4 },
  toolDesc:       { fontSize: 11, color: '#888', textAlign: 'center' },

  privacyNote:    { backgroundColor: '#F0FFF4', borderRadius: 10, padding: 12, marginBottom: 14,
                    borderWidth: 1, borderColor: '#C0DD97' },
  privacyText:    { fontSize: 12, color: '#27500A', textAlign: 'right', lineHeight: 18 },

  emergencyCard:  { backgroundColor: '#FFF8E7', borderRadius: 12, padding: 14,
                    borderWidth: 1, borderColor: '#FAC775' },
  emergencyTitle: { fontSize: 13, fontWeight: '700', color: '#633806', textAlign: 'right', marginBottom: 8 },
  emergencyLine:  { fontSize: 13, color: '#633806', textAlign: 'right', marginBottom: 4 },
});
