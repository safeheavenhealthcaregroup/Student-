// auth.js
import { auth, db } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Sign Up
async function signUpUser(name, email, password) {
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", userCred.user.uid), {
      name,
      email,
      attendance: [],
      class: "Not Assigned"
    });
    alert("Sign up successful!");
    window.location.href = "student.html";
  } catch (error) {
    alert("Error: " + error.message);
  }
}

// Login
async function loginUser(email, password) {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const adminRef = doc(db, "admins", userCred.user.uid);
    const snapshot = await getDoc(adminRef);

    if (snapshot.exists()) {
      window.location.href = "admin.html";
    } else {
      window.location.href = "student.html";
    }
  } catch (error) {
    alert("Login failed: " + error.message);
  }
}

// Attach to buttons
window.signUpUser = signUpUser;
window.loginUser = loginUser;
