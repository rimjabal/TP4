import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import AppDrawer from "./navigation/AppDrawer";
import LoginScreen from "./screens/LoginScreen";

// Le navigateur racine qui décide quoi afficher (Login ou App)
function RootNavigator() {
  const { user } = useContext(AuthContext);
  
  // Si user existe (connecté) -> Affiche le Drawer (AppDrawer)
  // Sinon -> Affiche l'écran de Login (LoginScreen)
  return user ? <AppDrawer /> : <LoginScreen />;
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}