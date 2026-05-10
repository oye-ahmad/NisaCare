import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StatusBar, StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../stylesheets/SituationsStyles';   // keep your existing styles

// ── Situations list ────────────────────────────────────────────────
// title      → must EXACTLY match the `name` column in your situations DB table
// titleUrdu  → displayed on the card in Urdu
// icon       → Ionicons name
// color      → card background color

const SITUATIONS = [
  {
    id: '1',
    title: 'Menstrual Pain',
    titleUrdu: 'ماہواری کا درد',
    icon: 'calendar',
    color: '#D4537E',
  },
  {
    id: '2',
    title: 'Heavy Menstrual Bleeding',
    titleUrdu: 'زیادہ خون آنا',
    icon: 'water',
    color: '#C0392B',
  },
  {
    id: '3',
    title: 'Pregnancy Nausea',
    titleUrdu: 'حمل میں متلی',
    icon: 'heart',
    color: '#1D9E75',
  },
  {
    id: '4',
    title: 'Pregnancy Warning Signs',
    titleUrdu: 'حمل میں خطرناک علامات',
    icon: 'alert-circle',
    color: '#E67E22',
  },
  {
    id: '5',
    title: 'Postpartum Depression',
    titleUrdu: 'زچگی کے بعد ڈپریشن',
    icon: 'cloudy',
    color: '#7F77DD',
  },
  {
    id: '6',
    title: 'Anemia in Women',
    titleUrdu: 'خون کی کمی',
    icon: 'fitness',
    color: '#A93226',
  },
  {
    id: '7',
    title: 'PCOS',
    titleUrdu: 'پی سی او ایس',
    icon: 'medical',
    color: '#8E44AD',
  },
  {
    id: '8',
    title: 'Mental Health Crisis',
    titleUrdu: 'ذہنی صحت کا بحران',
    icon: 'brain',
    color: '#2980B9',
  },
  {
    id: '9',
    title: 'Domestic Violence Help',
    titleUrdu: 'گھریلو تشدد، مدد',
    icon: 'shield',
    color: '#854F0B',
  },
  {
    id: '10',
    title: 'Vitamin D Deficiency',
    titleUrdu: 'وٹامن ڈی کی کمی',
    icon: 'sunny',
    color: '#D4A017',
  },
];

// ── Component ──────────────────────────────────────────────────────
const SituationsScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[localStyles.card, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate('SituationDetails', { title: item.title })}
      activeOpacity={0.85}
    >
      {/* Icon */}
      <View style={localStyles.iconContainer}>
        <Ionicons name={item.icon} size={28} color="white" />
      </View>

      {/* Urdu title (primary, larger) */}
      <Text style={localStyles.cardTitleUrdu}>{item.titleUrdu}</Text>

      {/* English title (secondary, smaller) */}
      <Text style={localStyles.cardTitleEn}>{item.title}</Text>

      {/* Arrow */}
      <View style={localStyles.chevronContainer}>
        <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.7)" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={localStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#C03870" />

      {/* Header */}
      <View style={localStyles.header}>
        <View style={localStyles.headerContent}>
          <Ionicons name="heart" size={26} color="white" />
          <Text style={localStyles.headerTitle}>NisaCare</Text>
        </View>
        <Text style={localStyles.headerSub}>آپ کی صحت، آپ کی نجی ساتھی</Text>
      </View>

      {/* Sub-header */}
      <View style={localStyles.subHeader}>
        <Text style={localStyles.subHeaderTitle}>خواتین کی صحت</Text>
        <Text style={localStyles.subHeaderSub}>کوئی بھی موضوع منتخب کریں</Text>
      </View>

      {/* Grid */}
      <FlatList
        data={SITUATIONS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={localStyles.listContainer}
        columnWrapperStyle={localStyles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// ── Local styles (supplement your existing SituationsStyles) ───────
const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F8',
  },
  header: {
    backgroundColor: '#C03870',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 10
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    // marginTop: 20,
  },
  headerSub: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginTop: 2,
    textAlign: 'right',
  },
  subHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF0F5',
    borderBottomWidth: 1,
    borderBottomColor: '#F4C0D1',
  },
  subHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#C03870',
    textAlign: 'right',
  },
  subHeaderSub: {
    fontSize: 12,
    color: '#993556',
    textAlign: 'right',
    marginTop: 2,
  },
  listContainer: {
    padding: 12,
    paddingBottom: 30,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card: {
    width: '48%',
    borderRadius: 14,
    padding: 14,
    alignItems: 'flex-end',       // right-align for Urdu RTL
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    minHeight: 110,
    justifyContent: 'space-between',
  },
  iconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    padding: 6,
    alignSelf: 'flex-end',
  
  },
  cardTitleUrdu: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
    marginTop: 8,
    lineHeight: 20,
  },
  cardTitleEn: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 10,
    textAlign: 'right',
    marginTop: 2,
  },
  chevronContainer: {
    alignSelf: 'flex-end',
    marginTop: 6,
  },
});

export default SituationsScreen;