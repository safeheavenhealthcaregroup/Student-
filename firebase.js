// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBC-go9YTEF1o15fcYUigCtzMv8yMBZois",
  authDomain: "student-8ee94.firebaseapp.com",
  projectId: "student-8ee94",
  storageBucket: "student-8ee94.firebasestorage.app",
  messagingSenderId: "877165909465",
  appId: "1:877165909465:web:ce5c05f9295547f4c2b5c8",
  measurementId: "G-KRSM7QDXMY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
