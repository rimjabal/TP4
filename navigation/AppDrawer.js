import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppStack from "./AppStack";
import NativeStack from "./NativeStack";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function AppDrawer() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Tâches" 
        component={AppStack}
        options={{
          tabBarLabel: "Tâches",
          tabBarIcon: () => "📝",
        }}
      />
      <Tab.Screen 
        name="Fonctionnalités natives" 
        component={NativeStack}
        options={{
          tabBarLabel: "Natif",
          tabBarIcon: () => "📱",
        }}
      />
      <Tab.Screen 
        name="Profil" 
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profil",
          tabBarIcon: () => "👤",
        }}
      />
    </Tab.Navigator>
  );
}