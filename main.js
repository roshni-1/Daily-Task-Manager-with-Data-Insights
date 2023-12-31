// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAyoMLk6ArIj254bVSV177BZuONnklJWzc",
  authDomain: "task-manager-with-datainsights.firebaseapp.com",
  projectId: "task-manager-with-datainsights",
  storageBucket: "task-manager-with-datainsights.appspot.com",
  messagingSenderId: "392890802846",
  appId: "1:392890802846:web:d28de35273457ab767518f",
  measurementId: "G-RJ6CQ8ZEMG"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

function addTask() {
    const taskInput = document.getElementById('task');
    const taskText = taskInput.value;

    if (taskText.trim() !== '') {
        // Add task to Firebase (Firestore)
        db.collection("tasks").add({
            text: taskText,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then((docRef) => {
            console.log("Task added with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding task: ", error);
        });

        // Update the UI
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;
        taskList.appendChild(taskItem);

        // Clear input
        taskInput.value = '';
    }
}
