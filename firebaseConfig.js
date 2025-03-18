// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDusVvsDTkrMh8T9N7s9YhcoRBvIRzRQEI",
  authDomain: "golfapp-33b10.firebaseapp.com",
  projectId: "golfapp-33b10",
  storageBucket: "golfapp-33b10.firebasestorage.app",
  messagingSenderId: "430598349534",
  appId: "1:430598349534:web:98da3aaf67feee8547984f",
  measurementId: "G-0W4HKN44NG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});