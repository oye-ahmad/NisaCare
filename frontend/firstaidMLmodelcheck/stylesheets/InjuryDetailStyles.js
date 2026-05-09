import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#4A90E2',
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        flex: 1,
        textAlign: 'center',
    },
    backButton: {
        padding: 5,
    },
    contentContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    sectionCard: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        marginBottom: 25,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 10,
    },
    descriptionText: {
        fontSize: 15,
        color: '#555',
        lineHeight: 22,
        textAlign: 'justify',
    },
    sectionContainer: {
        marginBottom: 25,
    },
    sectionLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    listContainer: {
        paddingRight: 20,
    },
    itemCard: {
        width: 100,
        marginRight: 15,
        alignItems: 'center',
    },
    itemIconPlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#E3F2FD',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#BBDEFB',
    },
    itemText: {
        fontSize: 12,
        color: '#555',
        textAlign: 'center',
        fontWeight: '500',
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionCard: {
        width: '48%',
        borderRadius: 15,
        padding: 20,
        height: 160,
        justifyContent: 'space-between',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    instructionsCard: {
        backgroundColor: '#4A90E2',
    },
    safetyCard: {
        backgroundColor: '#FF7043',
    },
    cardIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    cardPreview: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 12,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    expandedCard: {
        backgroundColor: 'white',
        width: '100%',
        maxHeight: '80%',
        borderRadius: 20,
        padding: 20,
        elevation: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 15,
    },
    expandedCardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    modalScroll: {
        marginBottom: 20,
    },
    bulletItem: {
        flexDirection: 'row',
        marginBottom: 12,
        paddingRight: 10,
    },
    bullet: {
        fontSize: 18,
        color: '#4A90E2',
        marginRight: 10,
        lineHeight: 24,
    },
    bulletText: {
        fontSize: 16,
        color: '#444',
        lineHeight: 24,
        flex: 1,
    },
    closeButton: {
        backgroundColor: '#4A90E2',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;
