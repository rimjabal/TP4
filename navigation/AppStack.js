import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoListScreen from "../screens/TodoListScreen";
import TodoDetailsScreen from "../screens/TodoDetailsScreen";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      {/* On cache le header ici car on utilise notre AppBar perso dans TodoListScreen */}
      <Stack.Screen 
        name="Liste" 
        component={TodoListScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen name="Details" component={TodoDetailsScreen} />
    </Stack.Navigator>
  );
}