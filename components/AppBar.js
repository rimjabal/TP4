import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function AppBar({ title, back }) {
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
        <View style={styles.appBar}>
          {back && (
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={styles.backText}>← Retour</Text>
            </TouchableOpacity>
          )}
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
  backButton: {
    paddingRight: 10,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
});