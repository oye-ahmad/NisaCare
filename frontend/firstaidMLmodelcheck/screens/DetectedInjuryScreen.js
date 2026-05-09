import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../stylesheets/DetectedInjuryStyles';

const DetectedInjuryScreen = ({ route }) => {
    const navigation = useNavigation();
    const { imageUri, injury } = route.params;
    const [loading, setLoading] = useState(false);
    const detectedInjury = injury;

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleViewDetails = async () => {
        setLoading(true);
        try {
            const res = await fetch(`http://http://10.8.56.93:8000/injury-details`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: detectedInjury }),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.detail || 'Failed to load injury details');
            }
            const json = await res.json();
            navigation.navigate('InjuryDetail', {
                data: json.data,
                related_items: json.related_items,
            });
        } catch (e) {
            Alert.alert('Error', e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Analysis Result</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.card}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: imageUri }} style={styles.image} />
                    </View>

                    <View style={styles.resultContainer}>
                        <Text style={styles.label}>Detected Condition:</Text>
                        <Text style={styles.injuryText}>{detectedInjury}</Text>
                    </View>

                    {detectedInjury && detectedInjury.trim().toLowerCase() !== 'background' && detectedInjury.trim().toLowerCase() !== 'normal' && (
                        <TouchableOpacity
                            style={styles.viewDetailsButton}
                            onPress={handleViewDetails}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <>
                                    <Text style={styles.buttonText}>View Treatment Guide</Text>
                                    <Ionicons
                                        name="arrow-forward"
                                        size={20}
                                        color="white"
                                        style={styles.buttonIcon}
                                    />
                                </>
                            )}
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

export default DetectedInjuryScreen;
