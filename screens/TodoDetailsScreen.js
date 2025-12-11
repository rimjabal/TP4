import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TodoDetailsScreen({ route }) {
  const { id, title } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>ID: {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 30, fontWeight: "bold" },
  subtitle: { fontSize: 20, marginTop: 10, color: "gray" },
});