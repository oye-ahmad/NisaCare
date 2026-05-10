import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';


import ChatScreen from './screens/ChatScreen';
import BreastCancerDetailScreen from './screens/BreastCancerDetailScreen';
import BreastCancerScreen from './screens/BreastCancerScreen';
import CycleTrackerScreen from './screens/CycleTrackerScreen';
import NutritionTrackerScreen from './screens/NutritionTrackerScreen';

import HomeScreen from "./screens/HomeScreen";

import SituationsScreen from "./screens/SituationsScreen";
import SituationDetailsScreen from "./screens/SituationDetailsScreen";

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
        component={BreastCancerScreen}
        options={{ title: 'Breast Cancer' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="BreastCancerDetail" component={BreastCancerDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SituationDetails" component={SituationDetailsScreen} />
        <Stack.Screen name="KitInfo" component={BreastCancerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Chatbot" component={ChatbotScreen} />

        <Stack.Screen
  name="Home"
  component={HomeScreen}
  options={{ headerShown: false }}
/>
<Stack.Screen
  name="Chat"
  component={ChatScreen}
  options={{ headerShown: false }}
/>
<Stack.Screen
  name="CycleTracker"
  component={CycleTrackerScreen}
  options={{ headerShown: false }}
/>
<Stack.Screen
  name="NutritionTracker"
  component={NutritionTrackerScreen}
  options={{ headerShown: false }}
/>


      </Stack.Navigator>
    </NavigationContainer>
  );
}
