// student.js
import { auth, db } from './firebase.js';
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Mark Attendance
async function markAttendance() {
  const user = auth.currentUser;
  if (!user) return alert("User not logged in.");

  const today = new Date().toISOString().split('T')[0];
  const userRef = doc(db, "users", user.uid);
  await updateDoc(userRef, {
    attendance: arrayUnion(today)
  });

  alert("Attendance marked for " + today);
  loadAttendance();
}

// Show attendance
async function loadAttendance() {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);
  const data = docSnap.data();

  document.getElementById("student-name").innerText = data.name;
  document.getElementById("class-info").innerText = "Class: " + data.class;

  const list = document.getElementById("attendance-list");
  list.innerHTML = data.attendance.map(d => `<li>${d}</li>`).join("");
}

window.onload = () => {
  auth.onAuthStateChanged(user => {
    if (user) loadAttendance();
  });
};

window.markAttendance = markAttendance;
