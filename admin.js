// admin.js
import { auth, db } from './firebase.js';
import {
  collection,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Display all users
async function showAllStudents() {
  const userRef = collection(db, "users");
  const snapshot = await getDocs(userRef);

  const container = document.getElementById("student-list");
  container.innerHTML = "";

  snapshot.forEach((docSnap) => {
    const student = docSnap.data();
    container.innerHTML += `
      <div>
        <h4>${student.name}</h4>
        <p>Email: ${student.email}</p>
        <p>Class: ${student.class}</p>
        <p>Attendance: ${student.attendance?.length || 0} days</p>
      </div>
      <hr/>
    `;
  });
}

window.onload = showAllStudents;
