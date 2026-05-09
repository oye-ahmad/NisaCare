
// import React, { useState, useRef, useEffect } from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     FlatList,
//     StyleSheet,
//     KeyboardAvoidingView,
//     Platform,
//     ActivityIndicator,
//     StatusBar
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import { sendMessage } from '../services/ChatService';

// export default function ChatbotScreen({ navigation }) {
//     const [messages, setMessages] = useState([
//         { id: '1', text: "Hello! I'm your First Aid Assistant. How can I help you today?", sender: 'bot' }
//     ]);
//     const [inputText, setInputText] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const flatListRef = useRef(null);

//     const handleSend = async () => {
//         if (inputText.trim() === '') return;

//         const userMessage = {
//             id: Date.now().toString(),
//             text: inputText,
//             sender: 'user'
//         };

//         setMessages(prev => [...prev, userMessage]);
//         setInputText('');
//         setIsLoading(true);

//         try {
//             const responseText = await sendMessage(userMessage.text);
//             const botMessage = {
//                 id: (Date.now() + 1).toString(),
//                 text: responseText,
//                 sender: 'bot'
//             };
//             setMessages(prev => [...prev, botMessage]);
//         } catch (error) {
//             const errorMessage = {
//                 id: (Date.now() + 1).toString(),
//                 text: "Sorry, something went wrong. Please try again.",
//                 sender: 'bot'
//             };
//             setMessages(prev => [...prev, errorMessage]);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const renderMessage = ({ item }) => {
//         const isUser = item.sender === 'user';
//         return (
//             <View style={[
//                 styles.messageBubble,
//                 isUser ? styles.userBubble : styles.botBubble
//             ]}>
//                 {!isUser && (
//                     <View style={styles.botIconContainer}>
//                         <Ionicons name="medical" size={16} color="#fff" />
//                     </View>
//                 )}
//                 <Text style={[
//                     styles.messageText,
//                     isUser ? styles.userText : styles.botText
//                 ]}>
//                     {item.text}
//                 </Text>
//             </View>
//         );
//     };

//     return (
//         <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//                     <Ionicons name="arrow-back" size={24} color="#333" />
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>First Aid Assistant</Text>
//                 <View style={{ width: 24 }} />
//             </View>

//             <KeyboardAvoidingView
//                 behavior={Platform.OS === "ios" ? "padding" : "height"}
//                 style={styles.keyboardContainer}
//                 keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
//             >
//                 <FlatList
//                     ref={flatListRef}
//                     data={messages}
//                     renderItem={renderMessage}
//                     keyExtractor={item => item.id}
//                     contentContainerStyle={styles.messagesList}
//                     showsVerticalScrollIndicator={false}
//                     onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
//                 />

//                 {isLoading && (
//                     <View style={styles.loadingContainer}>
//                         <ActivityIndicator size="small" color="#4A90E2" />
//                         <Text style={styles.loadingText}>Typing...</Text>
//                     </View>
//                 )}

//                 <View style={styles.inputContainer}>
//                     <TextInput
//                         style={styles.input}
//                         value={inputText}
//                         onChangeText={setInputText}
//                         placeholder="Type your question..."
//                         placeholderTextColor="#999"
//                         returnKeyType="send"
//                         onSubmitEditing={handleSend}
//                     />
//                     <TouchableOpacity
//                         style={[styles.sendButton, { opacity: inputText.trim() ? 1 : 0.6 }]}
//                         onPress={handleSend}
//                         disabled={!inputText.trim()}
//                     >
//                         <Ionicons name="send" size={20} color="#fff" />
//                     </TouchableOpacity>
//                 </View>
//             </KeyboardAvoidingView>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F5F7FA',
//     },
//     keyboardContainer: {
//         flex: 1,
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingHorizontal: 16,
//         paddingVertical: 12,
//         backgroundColor: '#fff',
//         borderBottomWidth: 1,
//         borderBottomColor: '#E0E0E0',
//     },
//     headerTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#333',
//     },
//     backButton: {
//         padding: 4,
//     },
//     messagesList: {
//         paddingHorizontal: 16,
//         paddingBottom: 20,
//         paddingTop: 20,
//     },
//     messageBubble: {
//         maxWidth: '85%',
//         padding: 12,
//         borderRadius: 20,
//         marginBottom: 12,
//         flexDirection: 'row',
//         alignItems: 'flex-start',
//     },
//     userBubble: {
//         alignSelf: 'flex-end',
//         backgroundColor: '#4A90E2',
//         borderBottomRightRadius: 4,
//     },
//     botBubble: {
//         alignSelf: 'flex-start',
//         backgroundColor: '#fff',
//         borderBottomLeftRadius: 4,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.1,
//         shadowRadius: 2,
//         elevation: 2,
//         marginRight: 40,
//     },
//     botIconContainer: {
//         width: 24,
//         height: 24,
//         borderRadius: 12,
//         backgroundColor: '#FF6B6B',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginRight: 8,
//         marginTop: 0,
//     },
//     messageText: {
//         fontSize: 16,
//         lineHeight: 22,
//         flexShrink: 1,
//     },
//     userText: {
//         color: '#fff',
//     },
//     botText: {
//         color: '#333',
//     },
//     loadingContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginLeft: 20,
//         marginBottom: 10,
//     },
//     loadingText: {
//         fontSize: 12,
//         color: '#888',
//         marginLeft: 6,
//     },
//     inputContainer: {
//         flexDirection: 'row',
//         padding: 12,
//         backgroundColor: '#fff',
//         borderTopWidth: 1,
//         borderTopColor: '#E0E0E0',
//         alignItems: 'center',
//     },
//     input: {
//         flex: 1,
//         backgroundColor: '#F0F2F5',
//         borderRadius: 24,
//         paddingHorizontal: 16,
//         paddingVertical: 10,
//         fontSize: 16,
//         maxHeight: 100,
//         marginRight: 10,
//         color: '#333',
//     },
//     sendButton: {
//         width: 44,
//         height: 44,
//         borderRadius: 22,
//         backgroundColor: '#4A90E2',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });

// Updated Code

import React, { useState, useRef } from 'react';

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';

import { sendMessage } from '../services/ChatService';


export default function ChatbotScreen({ navigation }) {

    const [messages, setMessages] = useState([
        {
            id: '1',
            text:
                "السلام علیکم! میں آپ کی صحت کی معاون ہوں۔ آپ مجھ سے خواتین کی صحت، غذائیت، یا فرسٹ ایڈ کے بارے میں سوال پوچھ سکتی ہیں۔",
            sender: 'bot'
        }
    ]);

    const [inputText, setInputText] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const flatListRef = useRef(null);


    // ==========================================
    // SEND TEXT MESSAGE
    // ==========================================

    const handleSend = async () => {

        if (inputText.trim() === '') return;

        const userMessage = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user'
        };

        setMessages(prev => [...prev, userMessage]);

        setInputText('');

        setIsLoading(true);

        try {

            const responseText =
                await sendMessage(userMessage.text);

            const botMessage = {
                id: (Date.now() + 1).toString(),
                text: responseText,
                sender: 'bot'
            };

            setMessages(prev => [
                ...prev,
                botMessage
            ]);

        } catch (error) {

            const errorMessage = {
                id: (Date.now() + 1).toString(),
                text: "معذرت، کچھ غلط ہو گیا۔",
                sender: 'bot'
            };

            setMessages(prev => [
                ...prev,
                errorMessage
            ]);

        } finally {

            setIsLoading(false);
        }
    };


    // ==========================================
    // RENDER MESSAGE
    // ==========================================

    const renderMessage = ({ item }) => {

        const isUser = item.sender === 'user';

        return (

            <View
                style={[
                    styles.messageBubble,
                    isUser
                        ? styles.userBubble
                        : styles.botBubble
                ]}
            >

                {
                    !isUser && (

                        <View style={styles.botIconContainer}>
                            <Ionicons
                                name="medical"
                                size={16}
                                color="#fff"
                            />
                        </View>
                    )
                }

                <Text
                    style={[
                        styles.messageText,
                        isUser
                            ? styles.userText
                            : styles.botText
                    ]}
                >
                    {item.text}
                </Text>

            </View>
        );
    };


    // ==========================================
    // UI
    // ==========================================

    return (

        <SafeAreaView
            style={styles.container}
            edges={['top', 'left', 'right']}
        >

            {/* HEADER */}

            <View style={styles.header}>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >

                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color="#333"
                    />

                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                    Nisa Care AI
                </Text>

                <View style={{ width: 24 }} />

            </View>


            {/* CHAT AREA */}

            <KeyboardAvoidingView
                behavior={
                    Platform.OS === "ios"
                        ? "padding"
                        : "height"
                }

                style={styles.keyboardContainer}

                keyboardVerticalOffset={
                    Platform.OS === "ios"
                        ? 0
                        : 20
                }
            >

                <FlatList
                    ref={flatListRef}

                    data={messages}

                    renderItem={renderMessage}

                    keyExtractor={item => item.id}

                    contentContainerStyle={
                        styles.messagesList
                    }

                    showsVerticalScrollIndicator={false}

                    onContentSizeChange={() =>
                        flatListRef.current?.scrollToEnd({
                            animated: true
                        })
                    }
                />


                {/* LOADING */}

                {
                    isLoading && (

                        <View style={styles.loadingContainer}>

                            <ActivityIndicator
                                size="small"
                                color="#4A90E2"
                            />

                            <Text style={styles.loadingText}>
                                Typing...
                            </Text>

                        </View>
                    )
                }


                {/* INPUT AREA */}

                <View style={styles.inputContainer}>

                    <TextInput
                        style={styles.input}

                        value={inputText}

                        onChangeText={setInputText}

                        placeholder="اپنا سوال لکھیں..."

                        placeholderTextColor="#999"

                        returnKeyType="send"

                        onSubmitEditing={handleSend}
                    />

                    {/* SEND BUTTON */}

                    <TouchableOpacity

                        style={[
                            styles.sendButton,
                            {
                                opacity:
                                    inputText.trim()
                                        ? 1
                                        : 0.6
                            }
                        ]}

                        onPress={handleSend}

                        disabled={!inputText.trim()}
                    >

                        <Ionicons
                            name="send"
                            size={20}
                            color="#fff"
                        />

                    </TouchableOpacity>

                </View>

            </KeyboardAvoidingView>

        </SafeAreaView>
    );
}



// ==========================================
// STYLES
// ==========================================

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },

    keyboardContainer: {
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },

    backButton: {
        padding: 4,
    },

    messagesList: {
        paddingHorizontal: 16,
        paddingBottom: 20,
        paddingTop: 20,
    },

    messageBubble: {
        maxWidth: '85%',
        padding: 12,
        borderRadius: 20,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#4A90E2',
        borderBottomRightRadius: 4,
    },

    botBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        marginRight: 40,
    },

    botIconContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FF6B6B',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
        marginTop: 0,
    },

    messageText: {
        fontSize: 16,
        lineHeight: 22,
        flexShrink: 1,
    },

    userText: {
        color: '#fff',
    },

    botText: {
        color: '#333',
    },

    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginBottom: 10,
    },

    loadingText: {
        fontSize: 12,
        color: '#888',
        marginLeft: 6,
    },

    inputContainer: {
        flexDirection: 'row',
        padding: 12,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        alignItems: 'center',
    },

    input: {
        flex: 1,
        backgroundColor: '#F0F2F5',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 16,
        maxHeight: 100,
        marginRight: 10,
        color: '#333',
    },

    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#4A90E2',
        alignItems: 'center',
        justifyContent: 'center',
    },
});