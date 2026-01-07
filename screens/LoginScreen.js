import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // AuthContext gérera automatiquement la connexion via onAuthStateChanged
    } catch (error) {
      Alert.alert("Erreur de connexion", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Succès", "Compte créé avec succès !");
    } catch (error) {
      Alert.alert("Erreur d'inscription", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion Firebase</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoComplete="password"
      />
      
      <View style={styles.buttonContainer}>
        <Button 
          title={isLoading ? "Chargement..." : "Se connecter"} 
          onPress={handleLogin}
          disabled={isLoading}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Créer un compte" 
          onPress={handleRegister}
          disabled={isLoading}
          color="#34C759"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: { 
    fontSize: 28, 
    marginBottom: 30, 
    textAlign: "center",
    fontWeight: "bold",
    color: "#007AFF",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
  },
});