// src/firebase/chatService.js
import { collection, addDoc, updateDoc, doc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { db } from './firebaseConfig';

// Function to create a new chat document in Firestore
export const createChat = async (studentId, mentorId) => {
  try {
    const chatRef = await addDoc(collection(db, "chats"), {
      studentId: studentId,
      mentorId: mentorId,
      messages: [],  // Initially empty
      status: "active",  // Initially active
      createdAt: serverTimestamp(),
    });
    console.log("Chat created with ID:", chatRef.id);
    return chatRef.id;  // Return the chat ID for further use
  } catch (e) {
    console.error("Error creating chat:", e);
  }
};

// Function to add a message to an existing chat
export const addMessage = async (chatId, sender, text) => {
  try {
    const chatRef = doc(db, "chats", chatId);
    await updateDoc(chatRef, {
      messages: arrayUnion({
        sender: sender,
        text: text,
        timestamp: serverTimestamp(),
      }),
    });
    console.log("Message added to chat:", chatId);
  } catch (e) {
    console.error("Error adding message:", e);
  }
};
