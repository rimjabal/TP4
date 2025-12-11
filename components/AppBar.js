import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native'; // Ajout de SafeAreaView si besoin, ou gestion via parent
import { AuthContext } from '../context/AuthContext';

export default function AppBar({ title }) {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.headerContainer}>
        <View style={styles.appBar}>
          <Text style={styles.title}>{title}</Text>
          <Button title="Logout" onPress={logout} color="#ff5c5c" />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#007AFF',
    paddingTop: 40, // Padding pour simuler la zone de status bar si pas dans une SafeAreaView globale
    paddingBottom: 10,
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});