import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Importation de vos écrans et composants
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SettingsScreen from './screens/SettingsScreen';
import AppBar from './screens/AppBar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- Navigation par pile (Stack) pour l'onglet Maison ---
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Accueil" 
        component={HomeScreen} 
        options={{ headerShown: false }} // On cache le header car on a notre AppBar perso
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen} 
        options={{ title: 'Mes Détails' }} 
      />
    </Stack.Navigator>
  );
}

// --- Application Principale ---
export default function App() {
  return (
    <SafeAreaProvider>
      {/* SafeAreaView avec flex: 1 assure que l'app prend tout l'écran en respectant les encoches */}
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        
        <NavigationContainer>
          {/* Votre barre d'application personnalisée fixe en haut */}
          <AppBar />

          {/* Navigation par onglets (Tabs) */}
          <Tab.Navigator
            screenOptions={{
              headerShown: false,           // Cacher le header par défaut des Tabs
              tabBarActiveTintColor: 'blue', // Couleur active
              tabBarInactiveTintColor: 'gray', // Couleur inactive
              tabBarStyle: { backgroundColor: '#f0f0f0' },
            }}
          >
            <Tab.Screen 
              name="Maison" 
              component={HomeStack} 
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" size={size} color={color} />
                ),
              }} 
            />
            <Tab.Screen 
              name="Paramètres" 
              component={SettingsScreen} 
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="settings" size={size} color={color} />
                ),
              }} 
            />
          </Tab.Navigator>
        </NavigationContainer>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}