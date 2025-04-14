
// Firebase configuration
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "promgine.firebaseapp.com",
  projectId: "promgine",
  storageBucket: "promgine.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnopqrstuv"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Helper function to check if a user is logged in
export const isLoggedIn = () => {
  return auth.currentUser !== null;
};
