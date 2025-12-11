import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AppStack from "./AppStack";
import ProfileScreen from "../screens/ProfileScreen";

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator>
        {/* On cache le header du Drawer pour laisser la main au Stack ou à l'AppBar */}
      <Drawer.Screen name="Tâches" component={AppStack} options={{ headerShown: false }} />
      <Drawer.Screen name="Profil" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}