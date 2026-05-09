import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2; // 20 padding on sides, 20 gap in middle

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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        alignItems: 'center',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 23,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10,
    },
    subHeader: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#F5F7FA',
    },
    subHeaderTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    subHeaderSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    card: {
        width: cardWidth,
        height: cardWidth * 1.1, // Slightly taller than wide
        borderRadius: 20,
        padding: 15,
        marginBottom: 20,
        justifyContent: 'space-between',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10,
    },
    chevronContainer: {
        alignSelf: 'flex-end',
    },
});

export default styles;
