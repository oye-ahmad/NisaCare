import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../stylesheets/SituationsStyles';

const SITUATIONS = [
  { id: '1', title: 'Sprain', icon: 'bandage', color: '#FF9800' }, // Orange
  { id: '2', title: 'Hypothermia', icon: 'thermometer', color: '#03A9F4' }, // Light Blue
  { id: '4', title: 'Choking', icon: 'alert-circle', color: '#E91E63' }, // Pink
  { id: '5', title: 'Heart Attack', icon: 'heart', color: '#D32F2F' }, // Dark Red
  { id: '6', title: 'Bleeding', icon: 'water', color: '#F44336' }, // Red
  { id: '7', title: 'Drowning', icon: 'water', color: '#2196F3' }, // Blue
  { id: '8', title: 'Electric Shock', icon: 'flash', color: '#FFC107' }, // Amber
  { id: '9', title: 'Eye Injury', icon: 'eye', color: '#9C27B0' }, // Purple
  { id: '10', title: 'Food Poisoning', icon: 'restaurant', color: '#795548' }, // Brown
  { id: '11', title: 'Fracture', icon: 'body', color: '#673AB7' }, // Deep Purple
  { id: '12', title: 'Heat Stroke', icon: 'sunny', color: '#FF5722' }, // Deep Orange
  { id: '13', title: 'Seizure', icon: 'pulse', color: '#607D8B' }, // Blue Grey
  { id: '14', title: 'Snakebite', icon: 'warning', color: '#4CAF50' }, // Green
  { id: '15', title: 'Animal Bite', icon: 'warning', color: '#06d4b9ff' }, // Green
  { id: '16', title: 'Asthma Attack', icon: 'alert-circle', color: '#d40633ff' }, // Green
  { id: '17', title: 'Nosebleed', icon: 'water', color: '#6606d4ff' }, // Green
  { id: '18', title: 'Hypothermia', icon: 'thermometer', color: '#d0d406ff' }, // Green
];

const SituationsScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate('SituationDetails', { title: item.title })}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={item.icon} size={32} color="white" />
      </View>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <View style={styles.chevronContainer}>
        <Ionicons name="chevron-forward" size={20} color="white" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Ionicons name="medkit" size={28} color="white" />
          <Text style={styles.headerTitle}>Nisa Care AI</Text>
        </View>
      </View>

      <View style={styles.subHeader}>
        <Text style={styles.subHeaderTitle}>Emergency Situations</Text>
        <Text style={styles.subHeaderSubtitle}>Select a situation for immediate guidance</Text>
      </View>

      <FlatList
        data={SITUATIONS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SituationsScreen;
