import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList, StatusBar, ScrollView, Animated } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system/legacy";
import axios from "axios";
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const CAROUSEL_DATA = [
    {
        id: '1',
        title: 'First Aid Kit',
        image: require('../assets/first_aid_kit.png'),
        description: 'Essentials for emergencies'
    },
    {
        id: '2',
        title: 'Medical Care',
        image: require('../assets/medical_care.png'),
        description: 'Professional guidance'
    },
    {
        id: '3',
        title: 'Diagnosis',
        image: require('../assets/stethoscope.png'),
        description: 'Check symptoms fast'
    },
];

const HomeScreen = () => {
    const navigation = useNavigation();
    const scrollX = useRef(new Animated.Value(0)).current;

    // For auto-slide
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto Slide Logic
    useEffect(() => {
        const interval = setInterval(() => {
            let nextIndex = currentIndex + 1;

            if (nextIndex >= CAROUSEL_DATA.length) {
                nextIndex = 0;
            }

            flatListRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true,
            });

            setCurrentIndex(nextIndex);
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const openCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            alert("Camera permission is required");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            quality: 0.7,
            base64: false,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            detectInjury(uri);
        }
    };

    const openGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            quality: 0.7,
            base64: false,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            detectInjury(uri);
        }
    };

    const detectInjury = async (imageUri) => {
        try {
            const fileInfo = await FileSystem.getInfoAsync(imageUri);
            const fileUri = fileInfo.uri;

            const formData = new FormData();
            formData.append("image", {
                uri: fileUri,
                name: "injury.jpg",
                type: "image/jpeg"
            });

            const response = await axios.post(
                "http://10.8.56.93:8000/classify-injury",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" }
                }
            );

            const predictedInjury = response.data.injury;

            navigation.navigate("DetectedInjury", {
                imageUri,
                injury: predictedInjury
            });

        } catch (error) {
            console.log(error);
            alert("Error detecting injury. Either injury details are missing or image is wrong");
        }
    };

    const renderCarouselItem = ({ item }) => {
        return (
            <View style={styles.carouselItem}>
                <Image source={item.image} style={styles.carouselImage} />
                <View style={styles.carouselTextContainer}>
                    <Text style={styles.carouselTitle}>{item.title}</Text>
                    <Text style={styles.carouselDesc}>{item.description}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Ionicons name="medkit" size={32} color="white" />
                    <Text style={styles.headerTitle}>Nisa Care AI</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Carousel Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>First Aid Resources</Text>

                    <Animated.FlatList
                        ref={flatListRef}
                        data={CAROUSEL_DATA}
                        renderItem={renderCarouselItem}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        snapToInterval={width * 0.85}
                        decelerationRate="fast"
                        contentContainerStyle={styles.carouselList}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: false }
                        )}
                        onMomentumScrollEnd={(event) => {
                            const index = Math.round(
                                event.nativeEvent.contentOffset.x / (width * 0.85)
                            );
                            setCurrentIndex(index);
                        }}
                    />
                </View>

                {/* Analyze Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Analyze Your Situation</Text>
                    <View style={styles.analyzeCard}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="images-outline" size={60} color="#4A90E2" />
                        </View>
                        <Text style={styles.analyzeText}>
                            Take or select a photo of injury to get aid guidance
                        </Text>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.actionButton} onPress={openCamera}>
                                <Ionicons name="camera" size={24} color="white" />
                                <Text style={styles.actionButtonText}>Camera</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.actionButton, styles.galleryButton]} onPress={openGallery}>
                                <Ionicons name="image" size={24} color="white" />
                                <Text style={styles.actionButtonText}>Gallery</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </ScrollView>

            {/* Floating Action Button for Chatbot */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('Chatbot')}
            >
                <Ionicons name="chatbubbles" size={28} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    header: {
        backgroundColor: '#4A90E2',
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 5,
        alignItems: 'center',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10,
    },
    scrollContent: {
        paddingBottom: 80,
    },
    sectionContainer: {
        marginTop: 35,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
    },
    carouselList: {
        paddingRight: 20,
    },
    carouselItem: {
        width: width * 0.85,
        height: 200,
        marginRight: 15,
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: 'white',
        elevation: 3,
    },
    carouselImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    carouselTextContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
    },
    carouselTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    carouselDesc: {
        color: '#eee',
        fontSize: 12,
    },
    analyzeCard: {
        backgroundColor: '#E3F2FD',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#BBDEFB',
    },
    iconContainer: {
        marginBottom: 15,
    },
    analyzeText: {
        fontSize: 16,
        color: '#1565C0',
        textAlign: 'center',
        marginBottom: 25,
        lineHeight: 22,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    actionButton: {
        flexDirection: 'row',
        backgroundColor: '#4A90E2',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.48,
        elevation: 2,
    },
    galleryButton: {
        backgroundColor: '#1976D2',
    },
    actionButtonText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 8,
        fontSize: 14,
    },
    fab: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#4A90E2',
        borderRadius: 30,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        zIndex: 999,
    },
});

export default HomeScreen;
