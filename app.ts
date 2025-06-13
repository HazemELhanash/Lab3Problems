interface Task{
    id:number;
    title:string;
    description:string;
    completed:boolean;
}
function renderTasks() {
  const taskList = document.getElementById("taskList") as HTMLUListElement;
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

const taskForm=document.getElementById("taskForm")as HTMLFormElement;
const titleInput=document.getElementById("title")as HTMLInputElement;
const descInput=document.getElementById("description")as HTMLInputElement;
const taskList=document.getElementById("taskList")as HTMLLIElement;
let tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
let isEditing = false;
let editingId: number | null = null;
renderTasks();
taskForm.onsubmit = (e) => {
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
};
(window as any).markCompleted = (id: number) => {
  tasks = tasks.map(task => 
    task.id === id ? {...task, completed: !task.completed} : task
  );
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
};

(window as any).editTask = (id: number) => {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  titleInput.value = task.title;
  descInput.value = task.description;
  isEditing = true;
  editingId = id;
  (document.getElementById('submitBtn') as HTMLButtonElement).textContent = "Save Task";
};

(window as any).deleteTask = (id: number) => {
  tasks = tasks.filter(t => t.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
};
