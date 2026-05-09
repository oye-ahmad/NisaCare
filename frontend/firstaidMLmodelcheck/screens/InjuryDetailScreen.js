import { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../stylesheets/InjuryDetailStyles';

const InjuryDetailScreen = ({ route }) => {
    const { data, related_items } = route.params;
    const [expandedCard, setExpandedCard] = useState(null);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{data.name}</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>

                {/* Description Section */}
                <View style={styles.sectionCard}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="information-circle" size={24} color="#4A90E2" />
                        <Text style={styles.sectionTitle}>Overview</Text>
                    </View>
                    <Text style={styles.descriptionText}>{data.description}</Text>
                </View>

                {/* Related Items Section */}
                {related_items && related_items.length > 0 && (
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionLabel}>Related Items</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
                            {related_items.map((item, index) => (
                                <View key={index} style={styles.itemCard}>
                                    <View style={styles.itemIconPlaceholder}>
                                        <Ionicons name="medkit-outline" size={24} color="#4A90E2" />
                                    </View>
                                    <Text style={styles.itemText} numberOfLines={2}>{item.name}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                )}

                {/* Action Cards */}
                <View style={styles.cardRow}>
                    <TouchableOpacity onPress={() => setExpandedCard('instructions')} style={[styles.actionCard, styles.instructionsCard]}>
                        <View style={styles.cardIconContainer}>
                            <Ionicons name="list" size={32} color="white" />
                        </View>
                        <Text style={styles.cardTitle}>Instructions</Text>
                        <Text style={styles.cardPreview} numberOfLines={3}>
                            Tap to view step-by-step guide
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setExpandedCard('safety')} style={[styles.actionCard, styles.safetyCard]}>
                        <View style={styles.cardIconContainer}>
                            <Ionicons name="shield-checkmark" size={32} color="white" />
                        </View>
                        <Text style={styles.cardTitle}>Safety Tips</Text>
                        <Text style={styles.cardPreview} numberOfLines={3}>
                            Tap to view precautions
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Modal for Expanded Content */}
                <Modal visible={expandedCard !== null} transparent animationType="fade">
                    <View style={styles.modalBackground}>
                        <View style={styles.expandedCard}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.expandedCardTitle}>
                                    {expandedCard === 'instructions' ? 'Step-by-Step Guide' : 'Safety Precautions'}
                                </Text>
                                <TouchableOpacity onPress={() => setExpandedCard(null)}>
                                    <Ionicons name="close-circle" size={28} color="#ccc" />
                                </TouchableOpacity>
                            </View>

                            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
                                {(expandedCard === 'instructions' ? data.instructions : data.precautions)
                                    ?.split(/\.+/)
                                    .filter(item => item.trim() !== '')
                                    .map((item, index) => (
                                        <View key={index} style={styles.bulletItem}>
                                            <Text style={styles.bullet}>•</Text>
                                            <Text style={styles.bulletText}>{item.trim()}</Text>
                                        </View>
                                    ))}
                                <View style={{ height: 20 }} />
                            </ScrollView>

                            <TouchableOpacity style={styles.closeButton} onPress={() => setExpandedCard(null)}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </ScrollView>
        </View>
    );
};

export default InjuryDetailScreen;
