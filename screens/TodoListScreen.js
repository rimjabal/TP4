import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import AppBar from "../components/AppBar";
import { useTodoStore } from "../store/useTodoStore";

export default function TodoListScreen({ navigation }) {
  const { todos, addTodo } = useTodoStore();

  useEffect(() => {
    addTodo({ id: 1, title: "Faire les courses" });
    addTodo({ id: 2, title: "Sortir le chien" });
    addTodo({ id: 3, title: "Coder une app RN" });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <AppBar title="Mes tâches" />
      
      <View style={styles.content}>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate("Détails", item)}
            >
              <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  content: { flex: 1, padding: 20 },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
    borderRadius: 5,
  },
  itemText: { fontSize: 18 },
});