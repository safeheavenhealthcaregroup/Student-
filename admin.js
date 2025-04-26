import { auth, db } from './firebase.js';
import {
  collection, getDocs, updateDoc, doc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const container = document.getElementById("students-container");

auth.onAuthStateChanged(async (user) => {
  if (user) {
    const tokenResult = await user.getIdTokenResult();
    const isAdmin = tokenResult.claims.admin;

    if (isAdmin) {
      loadStudents();
    } else {
      alert("Access Denied. Not an admin.");
      window.location.href = "student.html";
    }
  } else {
    window.location.href = "login.html";
  }
});

async function loadStudents() {
  const snapshot = await getDocs(collection(db, "users"));
  container.innerHTML = "";

  snapshot.forEach(docSnap => {
    const student = docSnap.data();
    const uid = docSnap.id;

    const div = document.createElement("div");
    div.classList.add("student-card");
    div.innerHTML = `
      <h3>${student.name || 'Unnamed Student'}</h3>
      <label>Name:</label>
      <input type="text" id="name-${uid}" value="${student.name || ''}" />

      <label>Class:</label>
      <input type="text" id="class-${uid}" value="${student.class || ''}" />

      <label>Attendance (comma-separated):</label>
      <textarea id="attendance-${uid}">${(student.attendance || []).join(", ")}</textarea>

      <label>Attended Classes:</label>
      <textarea id="classes-${uid}">${(student.attendedClasses || []).join(", ")}</textarea>

      <label>Teachers:</label>
      <textarea id="teachers-${uid}">${(student.teachers || []).join(", ")}</textarea>

      <button onclick="updateStudent('${uid}')">Update</button>
    `;
    container.appendChild(div);
  });
}

window.updateStudent = async function(uid) {
  const name = document.getElementById(`name-${uid}`).value.trim();
  const className = document.getElementById(`class-${uid}`).value.trim();
  const attendance = document.getElementById(`attendance-${uid}`).value.split(',').map(d => d.trim()).filter(Boolean);
  const classes = document.getElementById(`classes-${uid}`).value.split(',').map(d => d.trim()).filter(Boolean);
  const teachers = document.getElementById(`teachers-${uid}`).value.split(',').map(d => d.trim()).filter(Boolean);

  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    name,
    class: className,
    attendance,
    attendedClasses: classes,
    teachers
  });

  alert("Student updated successfully!");
};
