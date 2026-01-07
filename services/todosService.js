import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  onSnapshot,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "./firebase";

const TODOS_COLLECTION = "todos";

// Écouter les todos d'un utilisateur en temps réel
export const subscribeToUserTodos = (userId, callback) => {
  const q = query(
    collection(db, TODOS_COLLECTION),
    where("userId", "==", userId)
  );

  return onSnapshot(q, (snapshot) => {
    const todos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(todos);
  });
};

// Ajouter un todo
export const addTodo = async (userId, title) => {
  try {
    const docRef = await addDoc(collection(db, TODOS_COLLECTION), {
      title,
      completed: false,
      userId,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Erreur ajout todo:", error);
    throw error;
  }
};

// Mettre à jour un todo
export const updateTodo = async (todoId, updates) => {
  try {
    const todoRef = doc(db, TODOS_COLLECTION, todoId);
    await updateDoc(todoRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Erreur mise à jour todo:", error);
    throw error;
  }
};

// Supprimer un todo
export const deleteTodo = async (todoId) => {
  try {
    await deleteDoc(doc(db, TODOS_COLLECTION, todoId));
  } catch (error) {
    console.error("Erreur suppression todo:", error);
    throw error;
  }
};

// Basculer le statut completed
export const toggleTodo = async (todoId, currentStatus) => {
  await updateTodo(todoId, { completed: !currentStatus });
};
