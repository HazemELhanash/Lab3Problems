interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const taskForm = document.getElementById("taskForm") as HTMLFormElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const descInput = document.getElementById("description") as HTMLInputElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;

let tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
let isEditing = false;
let editingId: number | null = null;

renderTasks();

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const description = descInput.value.trim();

  if (!title || !description) return;

  if (isEditing && editingId !== null) {
    const index = tasks.findIndex(t => t.id === editingId);
    tasks[index].title = title;
    tasks[index].description = description;
    isEditing = false;
    editingId = null;
    (document.getElementById('submitBtn') as HTMLButtonElement).textContent = "Add Task";
  } else {
    const newTask: Task = {
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
});

function renderTasks(): void {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task" + (task.completed ? " completed" : "");

    const infoDiv = document.createElement("div");
    infoDiv.className = "task-info";

    const titleDiv = document.createElement("div");
    titleDiv.className = "task-title";
    titleDiv.textContent = task.title;

    const descDiv = document.createElement("div");
    descDiv.className = "task-desc";
    descDiv.textContent = task.description;

    infoDiv.appendChild(titleDiv);
    infoDiv.appendChild(descDiv);

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "task-actions";

    // Mark Completed Button
    const completeBtn = document.createElement("button");
    completeBtn.title = "Complete ✅";
    completeBtn.textContent = "✔️";
    completeBtn.addEventListener("click", () => {
      markCompleted(task.id);
    });

    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.title = "Edit ✏️";
    editBtn.textContent = "✏️";
    editBtn.addEventListener("click", () => {
      editTask(task.id);
    });

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.title = "Delete ❌";
    deleteBtn.textContent = "🗑️";
    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id);
    });

    actionsDiv.appendChild(completeBtn);
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(infoDiv);
    li.appendChild(actionsDiv);
    taskList.appendChild(li);
  });
}

// Mark completed
function markCompleted(id: number): void {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Edit task
function editTask(id: number): void {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  titleInput.value = task.title;
  descInput.value = task.description;
  isEditing = true;
  editingId = id;
  (document.getElementById('submitBtn') as HTMLButtonElement).textContent = "Save Task";
}

// Delete task
function deleteTask(id: number): void {
  tasks = tasks.filter(t => t.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}
