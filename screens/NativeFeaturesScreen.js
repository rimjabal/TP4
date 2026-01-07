import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AppBar from "../components/AppBar";

export default function NativeFeaturesScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <AppBar title="Fonctionnalités natives" />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Caméra")}
        >
          <Text style={styles.buttonText}>📷 Caméra</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Localisation")}
        >
          <Text style={styles.buttonText}>📍 Localisation</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Contacts")}
        >
          <Text style={styles.buttonText}>👥 Contacts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Text style={styles.buttonText}>🔔 Notifications</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 15,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
