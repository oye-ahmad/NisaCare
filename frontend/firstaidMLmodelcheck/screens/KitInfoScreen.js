import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../stylesheets/KitInfoStyles';

const KitInfoScreen = () => {
    const navigation = useNavigation();

    const handleCardPress = (kitType) => {
        navigation.navigate('KitDetail', { kitType });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Kit Information</Text>
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Home')}>
                    <View style={styles.textContainer}>
                        <Text style={styles.heading}>Home Kit</Text>
                        <Text style={styles.description}>Essential items for household emergencies.</Text>
                    </View>
                    <View style={styles.cardIcon}>
                        <Ionicons name="home" size={32} color="#4A90E2" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Travel')}>
                    <View style={styles.textContainer}>
                        <Text style={styles.heading}>Travel Kit</Text>
                        <Text style={styles.description}>Compact kits for trips and journeys.</Text>
                    </View>
                    <View style={styles.cardIcon}>
                        <Ionicons name="airplane" size={32} color="#4A90E2" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Workplace')}>
                    <View style={styles.textContainer}>
                        <Text style={styles.heading}>Workplace Kit</Text>
                        <Text style={styles.description}>Items to handle workplace incidents.</Text>
                    </View>
                    <View style={styles.cardIcon}>
                        <Ionicons name="briefcase" size={32} color="#4A90E2" />
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default KitInfoScreen;
