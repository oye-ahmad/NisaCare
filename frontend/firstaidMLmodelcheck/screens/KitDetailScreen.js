import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StatusBar } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../stylesheets/KitDetailStyles';

const kitItemsData = {
    Home: [
        { id: "1", name: "Plasters", quantity: 20, icon: "bandage" },
        { id: "2", name: "Antibiotic Ointment", quantity: 1, icon: "water" },
        { id: "3", name: "Antiseptic Wipes", quantity: 10, icon: "medkit" },
        { id: "4", name: "Burn Cream", quantity: 1, icon: "flame" },
        { id: "5", name: "Elastic Bandage", quantity: 2, icon: "body" },
        { id: "6", name: "Gloves", quantity: 5, icon: "hand-left" },
        { id: "7", name: "Gauze Bandage", quantity: 5, icon: "bandage" },
        { id: "8", name: "Instant Coldpack", quantity: 2, icon: "snow" },
        { id: "9", name: "Medical Tape", quantity: 1, icon: "radio-button-on" },
        { id: "10", name: "Scissors", quantity: 1, icon: "cut" },
        { id: "11", name: "Sterile Cotton Balls", quantity: 10, icon: "ellipse" },
        { id: "12", name: "Thermometer", quantity: 1, icon: "thermometer" },
        { id: "13", name: "Tweezers", quantity: 1, icon: "construct" }
    ],
    Travel: [
        { id: "1", name: "Plasters", quantity: 10, icon: "bandage" },
        { id: "2", name: "Antibiotic Ointment", quantity: 1, icon: "water" },
        { id: "3", name: "Antiseptic Wipes", quantity: 5, icon: "medkit" },
        { id: "4", name: "Burn Cream", quantity: 1, icon: "flame" },
        { id: "5", name: "Elastic Bandage", quantity: 2, icon: "body" },
        { id: "6", name: "Gloves", quantity: 2, icon: "hand-left" },
        { id: "7", name: "Gauze Bandage", quantity: 3, icon: "bandage" },
        { id: "8", name: "Instant Coldpack", quantity: 1, icon: "snow" },
        { id: "9", name: "Medical Tape", quantity: 1, icon: "radio-button-on" },
        { id: "10", name: "Scissors", quantity: 1, icon: "cut" },
        { id: "11", name: "Sterile Cotton Balls", quantity: 5, icon: "ellipse" },
        { id: "12", name: "Thermometer", quantity: 1, icon: "thermometer" }
    ],
    Workplace: [
        { id: "1", name: "Plasters", quantity: 15, icon: "bandage" },
        { id: "2", name: "Antibiotic Ointment", quantity: 1, icon: "water" },
        { id: "3", name: "Antiseptic Wipes", quantity: 10, icon: "medkit" },
        { id: "4", name: "Burn Cream", quantity: 1, icon: "flame" },
        { id: "5", name: "Elastic Bandages", quantity: 3, icon: "body" },
        { id: "6", name: "Gloves", quantity: 5, icon: "hand-left" },
        { id: "7", name: "Gauze Bandages", quantity: 4, icon: "bandage" },
        { id: "8", name: "Instant Coldpack", quantity: 2, icon: "snow" },
        { id: "9", name: "Medical Tape", quantity: 1, icon: "radio-button-on" },
        { id: "10", name: "Scissors", quantity: 1, icon: "cut" },
        { id: "11", name: "Sterile Cotton Balls", quantity: 10, icon: "ellipse" },
        { id: "12", name: "Thermometer", quantity: 1, icon: "thermometer" }
    ],
};

const KitDetailScreen = ({ route }) => {
    const { kitType } = route.params;
    const navigation = useNavigation();

    const kitItems = kitItemsData[kitType] || [];

    const handleItemPress = (item) => {
        // Fetch details from backend or pass dummy data if backend not ready for specific item
        // For now, we will navigate and let ItemDetailScreen fetch data by name
        // Or we can pass the item object if we want to display static data first
        // The previous implementation fetched data by name.

        // We will pass the item name and let ItemDetailScreen fetch the full details
        // But ItemDetailScreen expects 'data' in route.params.
        // Wait, the user's ItemDetailScreen expects 'data' object directly.
        // "const { data } = route.params;"

        // So I need to fetch data here OR change ItemDetailScreen to fetch data.
        // The user's previous KitItemDetailScreen fetched data.
        // The user's NEW ItemDetailScreen expects data passed to it.

        // I should probably fetch data here or create a wrapper.
        // However, fetching here might delay navigation.
        // Let's modify ItemDetailScreen to fetch data if it's not provided, OR
        // I will fetch it here.

        // Actually, looking at the user's ItemDetailScreen, it just renders 'data'.
        // It does NOT fetch.
        // So I need to fetch it before navigating or pass a placeholder.
        // But I don't have the full data (description, usage, etc.) here in kitItemsData.

        // I will revert ItemDetailScreen to fetch data like the previous KitItemDetailScreen did,
        // but keep the user's UI structure.

        navigation.navigate('ItemDetail', { itemName: item.name });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{kitType} Kit Items</Text>
            </View>

            <View style={styles.contentContainer}>
                <FlatList
                    data={kitItems}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.card} onPress={() => handleItemPress(item)}>
                            <View style={styles.imageContainer}>
                                <Ionicons name={item.icon} size={40} color="#4A90E2" />
                            </View>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.quantity}>Qty: {item.quantity}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
};

export default KitDetailScreen;
