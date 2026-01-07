import React, { useState, useEffect, useContext } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet,
  ActivityIndicator 
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { subscribeToUserTodos, addTodo, toggleTodo, deleteTodo } from "../services/todosService";
import AppBar from "../components/AppBar";

export default function TodoListFirebaseScreen() {
  const { user } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Écouter les todos en temps réel
    const unsubscribe = subscribeToUserTodos(user.uid, (fetchedTodos) => {
      setTodos(fetchedTodos);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      await addTodo(user.uid, newTodo.trim());
      setNewTodo("");
    } catch (error) {
      alert("Erreur lors de l'ajout");
    }
  };

  const handleToggle = async (todo) => {
    try {
      await toggleTodo(todo.id, todo.completed);
    } catch (error) {
      alert("Erreur lors de la mise à jour");
    }
  };

  const handleDelete = async (todoId) => {
    try {
      await deleteTodo(todoId);
    } catch (error) {
      alert("Erreur lors de la suppression");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <AppBar title="Todos Firebase" />
        <ActivityIndicator size="large" style={{ marginTop: 50 }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppBar title="Todos Firebase" />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nouvelle tâche..."
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <Button title="Ajouter" onPress={handleAddTodo} />
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity 
              style={styles.todoContent}
              onPress={() => handleToggle(item)}
            >
              <Text style={item.completed ? styles.completedText : styles.todoText}>
                {item.completed ? "✓ " : "○ "}
                {item.title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.deleteButton}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aucune tâche. Ajoutez-en une !</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  todoContent: {
    flex: 1,
  },
  todoText: {
    fontSize: 16,
  },
  completedText: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "#888",
  },
  deleteButton: {
    fontSize: 20,
    padding: 5,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#888",
  },
});
