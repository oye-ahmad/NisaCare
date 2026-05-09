import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    StatusBar,
    Image
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../stylesheets/ItemDetailStyles';

const ItemDetailScreen = ({ route }) => {
    const { itemName } = route.params;
    const navigation = useNavigation();

    const [itemData, setItemData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchItemDetails = async () => {
        try {
            const response = await fetch("http://10.8.56.93:8000/item-details", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: itemName })
            });

            const json = await response.json();

            if (json.data) {
                setItemData(json.data);
            } else {
                console.log("No item data found");
            }
        } catch (error) {
            console.log("Error fetching item:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItemDetails();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4A90E2" />
                <Text style={styles.loadingText}>Loading item details...</Text>
            </View>
        );
    }

    if (!itemData) {
        return (
            <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={50} color="#ccc" />
                <Text style={styles.errorText}>No details found for this item.</Text>
                <TouchableOpacity style={styles.retryButton} onPress={navigation.goBack}>
                    <Text style={styles.retryButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{itemData.name}</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>

                {/* Hero Icon/Image Section */}
                <View style={styles.heroContainer}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="medkit" size={60} color="#4A90E2" />
                    </View>
                </View>

                {/* Description Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="information-circle" size={24} color="#4A90E2" />
                        <Text style={styles.cardTitle}>Description</Text>
                    </View>
                    <Text style={styles.cardContent}>{itemData.description}</Text>
                </View>

                {/* Usage Instructions Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="list" size={24} color="#4A90E2" />
                        <Text style={styles.cardTitle}>How to Use</Text>
                    </View>
                    <Text style={styles.cardContent}>{itemData.usage_instructions}</Text>
                </View>

                {/* Safety Tips Card */}
                <View style={[styles.card, styles.safetyCard]}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="shield-checkmark" size={24} color="#D32F2F" />
                        <Text style={[styles.cardTitle, { color: '#D32F2F' }]}>Safety Tips</Text>
                    </View>
                    <Text style={styles.cardContent}>{itemData.safety_tips}</Text>
                </View>

            </ScrollView>
        </View>
    );
};

export default ItemDetailScreen;
