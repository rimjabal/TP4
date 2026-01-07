import { useContext } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import AppDrawer from "./navigation/AppDrawer";
import LoginScreen from "./screens/LoginScreen";

function MainApp() {
  const { theme } = useContext(ThemeContext);
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppDrawer /> : <LoginScreen />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <MainApp />
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});