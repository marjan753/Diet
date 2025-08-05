// services/FirebaseConfig.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5A_Ql6pJ7voL7oylWAwUI0IENI9GBZeU",
  authDomain: "diet-ffef9.firebaseapp.com",
  projectId: "diet-ffef9",
  storageBucket: "diet-ffef9.firebasestorage.app",
  messagingSenderId: "59709752454",
  appId: "1:59709752454:web:93e7b44b8f9e0cae2abd07",
  measurementId: "G-Q4H2M9665Q",
};

const app = initializeApp(firebaseConfig);

// استفاده از AsyncStorage برای ذخیره‌سازی وضعیت ورود
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };
