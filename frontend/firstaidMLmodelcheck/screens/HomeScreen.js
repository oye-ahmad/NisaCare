// import React, { useState, useRef, useEffect } from "react";
// import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList, StatusBar, ScrollView, Animated } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { useNavigation } from "@react-navigation/native";
// import * as FileSystem from "expo-file-system/legacy";
// import axios from "axios";
// import { Ionicons } from '@expo/vector-icons';

// const { width, height } = Dimensions.get('window');

// const CAROUSEL_DATA = [
//     {
//         id: '1',
//         title: 'First Aid Kit',
//         image: require('../assets/first_aid_kit.png'),
//         description: 'Essentials for emergencies'
//     },
//     {
//         id: '2',
//         title: 'Medical Care',
//         image: require('../assets/medical_care.png'),
//         description: 'Professional guidance'
//     },
//     {
//         id: '3',
//         title: 'Diagnosis',
//         image: require('../assets/stethoscope.png'),
//         description: 'Check symptoms fast'
//     },
// ];

// const HomeScreen = () => {
//     const navigation = useNavigation();
//     const scrollX = useRef(new Animated.Value(0)).current;

//     // For auto-slide
//     const flatListRef = useRef(null);
//     const [currentIndex, setCurrentIndex] = useState(0);

//     // Auto Slide Logic
//     useEffect(() => {
//         const interval = setInterval(() => {
//             let nextIndex = currentIndex + 1;

//             if (nextIndex >= CAROUSEL_DATA.length) {
//                 nextIndex = 0;
//             }

//             flatListRef.current?.scrollToIndex({
//                 index: nextIndex,
//                 animated: true,
//             });

//             setCurrentIndex(nextIndex);
//         }, 3000);

//         return () => clearInterval(interval);
//     }, [currentIndex]);

//     const openCamera = async () => {
//         const { status } = await ImagePicker.requestCameraPermissionsAsync();
//         if (status !== "granted") {
//             alert("Camera permission is required");
//             return;
//         }

//         const result = await ImagePicker.launchCameraAsync({
//             quality: 0.7,
//             base64: false,
//         });

//         if (!result.canceled) {
//             const uri = result.assets[0].uri;
//             detectInjury(uri);
//         }
//     };

//     const openGallery = async () => {
//         const result = await ImagePicker.launchImageLibraryAsync({
//             quality: 0.7,
//             base64: false,
//         });

//         if (!result.canceled) {
//             const uri = result.assets[0].uri;
//             detectInjury(uri);
//         }
//     };

//     const detectInjury = async (imageUri) => {
//         try {
//             const fileInfo = await FileSystem.getInfoAsync(imageUri);
//             const fileUri = fileInfo.uri;

//             const formData = new FormData();
//             formData.append("image", {
//                 uri: fileUri,
//                 name: "injury.jpg",
//                 type: "image/jpeg"
//             });

//             const response = await axios.post(
//                 "http://10.8.56.93:8000/classify-injury",
//                 formData,
//                 {
//                     headers: { "Content-Type": "multipart/form-data" }
//                 }
//             );

//             const predictedInjury = response.data.injury;

//             navigation.navigate("DetectedInjury", {
//                 imageUri,
//                 injury: predictedInjury
//             });

//         } catch (error) {
//             console.log(error);
//             alert("Error detecting injury. Either injury details are missing or image is wrong");
//         }
//     };

//     const renderCarouselItem = ({ item }) => {
//         return (
//             <View style={styles.carouselItem}>
//                 <Image source={item.image} style={styles.carouselImage} />
//                 <View style={styles.carouselTextContainer}>
//                     <Text style={styles.carouselTitle}>{item.title}</Text>
//                     <Text style={styles.carouselDesc}>{item.description}</Text>
//                 </View>
//             </View>
//         );
//     };

//     return (
//         <View style={styles.container}>
//             <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

//             {/* Header */}
//             <View style={styles.header}>
//                 <View style={styles.headerContent}>
//                     <Ionicons name="medkit" size={32} color="white" />
//                     <Text style={styles.headerTitle}>Nisa Care AI</Text>
//                 </View>
//             </View>

//             <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

//                 {/* Carousel Section */}
//                 <View style={styles.sectionContainer}>
//                     <Text style={styles.sectionTitle}>First Aid Resources</Text>

//                     <Animated.FlatList
//                         ref={flatListRef}
//                         data={CAROUSEL_DATA}
//                         renderItem={renderCarouselItem}
//                         keyExtractor={item => item.id}
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         pagingEnabled
//                         snapToInterval={width * 0.85}
//                         decelerationRate="fast"
//                         contentContainerStyle={styles.carouselList}
//                         onScroll={Animated.event(
//                             [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//                             { useNativeDriver: false }
//                         )}
//                         onMomentumScrollEnd={(event) => {
//                             const index = Math.round(
//                                 event.nativeEvent.contentOffset.x / (width * 0.85)
//                             );
//                             setCurrentIndex(index);
//                         }}
//                     />
//                 </View>

//                 {/* Analyze Section */}
//                 <View style={styles.sectionContainer}>
//                     <Text style={styles.sectionTitle}>Analyze Your Situation</Text>
//                     <View style={styles.analyzeCard}>
//                         <View style={styles.iconContainer}>
//                             <Ionicons name="images-outline" size={60} color="#4A90E2" />
//                         </View>
//                         <Text style={styles.analyzeText}>
//                             Take or select a photo of injury to get aid guidance
//                         </Text>

//                         <View style={styles.buttonRow}>
//                             <TouchableOpacity style={styles.actionButton} onPress={openCamera}>
//                                 <Ionicons name="camera" size={24} color="white" />
//                                 <Text style={styles.actionButtonText}>Camera</Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity style={[styles.actionButton, styles.galleryButton]} onPress={openGallery}>
//                                 <Ionicons name="image" size={24} color="white" />
//                                 <Text style={styles.actionButtonText}>Gallery</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </View>

//             </ScrollView>

//             {/* Floating Action Button for Chatbot */}
//             <TouchableOpacity
//                 style={styles.fab}
//                 onPress={() => navigation.navigate('Chatbot')}
//             >
//                 <Ionicons name="chatbubbles" size={28} color="#fff" />
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F5F7FA',
//     },
//     header: {
//         backgroundColor: '#4A90E2',
//         paddingTop: 50,
//         paddingBottom: 20,
//         paddingHorizontal: 20,
//         borderBottomLeftRadius: 20,
//         borderBottomRightRadius: 20,
//         elevation: 5,
//         alignItems: 'center',
//     },
//     headerContent: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     headerTitle: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         color: 'white',
//         marginLeft: 10,
//     },
//     scrollContent: {
//         paddingBottom: 80,
//     },
//     sectionContainer: {
//         marginTop: 35,
//         paddingHorizontal: 20,
//     },
//     sectionTitle: {
//         fontSize: 18,
//         fontWeight: '600',
//         color: '#333',
//         marginBottom: 15,
//     },
//     carouselList: {
//         paddingRight: 20,
//     },
//     carouselItem: {
//         width: width * 0.85,
//         height: 200,
//         marginRight: 15,
//         borderRadius: 15,
//         overflow: 'hidden',
//         backgroundColor: 'white',
//         elevation: 3,
//     },
//     carouselImage: {
//         width: '100%',
//         height: '100%',
//         resizeMode: 'cover',
//     },
//     carouselTextContainer: {
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         backgroundColor: 'rgba(0,0,0,0.5)',
//         padding: 10,
//     },
//     carouselTitle: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     carouselDesc: {
//         color: '#eee',
//         fontSize: 12,
//     },
//     analyzeCard: {
//         backgroundColor: '#E3F2FD',
//         borderRadius: 20,
//         padding: 25,
//         alignItems: 'center',
//         borderWidth: 1,
//         borderColor: '#BBDEFB',
//     },
//     iconContainer: {
//         marginBottom: 15,
//     },
//     analyzeText: {
//         fontSize: 16,
//         color: '#1565C0',
//         textAlign: 'center',
//         marginBottom: 25,
//         lineHeight: 22,
//     },
//     buttonRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '100%',
//     },
//     actionButton: {
//         flexDirection: 'row',
//         backgroundColor: '#4A90E2',
//         paddingVertical: 12,
//         paddingHorizontal: 20,
//         borderRadius: 12,
//         alignItems: 'center',
//         justifyContent: 'center',
//         flex: 0.48,
//         elevation: 2,
//     },
//     galleryButton: {
//         backgroundColor: '#1976D2',
//     },
//     actionButtonText: {
//         color: 'white',
//         fontWeight: 'bold',
//         marginLeft: 8,
//         fontSize: 14,
//     },
//     fab: {
//         position: 'absolute',
//         width: 60,
//         height: 60,
//         alignItems: 'center',
//         justifyContent: 'center',
//         right: 20,
//         bottom: 20,
//         backgroundColor: '#4A90E2',
//         borderRadius: 30,
//         elevation: 8,
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 4,
//         },
//         shadowOpacity: 0.30,
//         shadowRadius: 4.65,
//         zIndex: 999,
//     },
// });

// export default HomeScreen;







/**
 * HomeScreen.js  —  NisaCare Main Home Screen
 *
 * HOW TO USE:
 *   1. Copy to your frontend/screens/ folder
 *   2. Replace your existing HomeScreen with this file
 *   3. Make sure you have these screens registered in your navigator:
 *        Chat, CycleTracker, NutritionTracker
 *   4. Change API_BASE_URL below
 */

import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, StatusBar,
} from 'react-native';

const API_BASE_URL = 'http://10.8.56.93:8000';

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
        <View style={styles.privacyNote}>
          <Text style={styles.privacyText}>
            🔒 NisaCare میں آپ کی شناخت محفوظ ہے — کوئی لاگ ان نہیں، کوئی نام نہیں، کوئی ریکارڈ باہر نہیں جاتا۔
          </Text>
        </View>

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
  appName:        { color: '#fff', fontSize: 26, fontWeight: '800', textAlign: 'right' },
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
