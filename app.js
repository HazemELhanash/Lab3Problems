"use strict";
function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task" + (task.completed ? " completed" : "");
        li.innerHTML = `
      <div class="task-info">
        <div class="task-title">${task.title}</div>
        <div class="task-desc">${task.description}</div>
      </div>
      <div class="task-actions">
        <button onclick="markCompleted(${task.id})" title="Complete ✅">✔️</button>
        <button onclick="editTask(${task.id})" title="Edit ✏️">✏️</button>
        <button onclick="deleteTask(${task.id})" title="Delete ❌">🗑️</button>
      </div>
    `;
        taskList.appendChild(li);
    });
}
const taskForm = document.getElementById("taskForm");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const taskList = document.getElementById("taskList");
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
let isEditing = false;
let editingId = null;
renderTasks();
taskForm.onsubmit = (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    if (!title || !description)
        return;
    if (isEditing && editingId !== null) {
        const index = tasks.findIndex(t => t.id === editingId);
        tasks[index].title = title;
        tasks[index].description = description;
        isEditing = false;
        editingId = null;
        document.getElementById('submitBtn').textContent = "Add Task";
    }
    else {
        const newTask = {
            id: Date.now(),
            title,
            description,
            completed: false,
        };
        tasks.push(newTask);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    titleInput.value = '';
    descInput.value = '';
    renderTasks();
};
window.markCompleted = (id) => {
    tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
};
window.editTask = (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task)
        return;
    titleInput.value = task.title;
    descInput.value = task.description;
    isEditing = true;
    editingId = id;
    document.getElementById('submitBtn').textContent = "Save Task";
};
window.deleteTask = (id) => {
    tasks = tasks.filter(t => t.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
};
