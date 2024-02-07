
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1zaWu4NcZa_Wt7rk__dK36iptPDkE2-c",
  authDomain: "chatapp-ad920.firebaseapp.com",
  projectId: "chatapp-ad920",
  storageBucket: "chatapp-ad920.appspot.com",
  messagingSenderId: "404082397966",
  appId: "1:404082397966:web:5be61dce3ad378c82b7d5f",
  measurementId: "G-DLB16X1TQ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app)