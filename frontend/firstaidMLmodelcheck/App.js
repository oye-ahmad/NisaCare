import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from "./screens/HomeScreen";
import DetectedInjuryScreen from "./screens/DetectedInjuryScreen";
import InjuryDetailScreen from "./screens/InjuryDetailScreen";
import SituationsScreen from "./screens/SituationsScreen";
import SituationDetailsScreen from "./screens/SituationDetailsScreen";
import KitInfoScreen from "./screens/KitInfoScreen";
import KitDetailScreen from "./screens/KitDetailScreen";
import ItemDetailScreen from "./screens/ItemDetailScreen";
import ChatbotScreen from "./screens/ChatbotScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'SituationalGuidance') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'KitInfo') {
            iconName = focused ? 'medkit' : 'medkit-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5
        }
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="SituationalGuidance"
        component={SituationsScreen}
        options={{ title: 'Guidance' }}
      />
      <Tab.Screen
        name="KitInfo"
        component={KitInfoScreen}
        options={{ title: 'Kit Info' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="DetectedInjury" component={DetectedInjuryScreen} />
        <Stack.Screen name="InjuryDetail" component={InjuryDetailScreen} />
        <Stack.Screen name="SituationDetails" component={SituationDetailsScreen} />
        <Stack.Screen name="KitDetail" component={KitDetailScreen} />
        <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
        <Stack.Screen name="Chatbot" component={ChatbotScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
