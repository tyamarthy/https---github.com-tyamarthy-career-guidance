// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlzCd-NRfDCvedy4m8aTOEcGUFx0UDkbU",
  authDomain: "career-guidance-16f8e.firebaseapp.com",
  projectId: "career-guidance-16f8e",
  storageBucket: "career-guidance-16f8e.firebasestorage.app",
  messagingSenderId: "898343983707",
  appId: "1:898343983707:web:25bc1a2b3ab5ac9f153d7e",
  measurementId: "G-CK007BE1VB"
};


console.log("Firebase Config Loaded:", firebaseConfig);  // Check if this prints correctly

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
