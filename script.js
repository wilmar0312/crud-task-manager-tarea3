document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  updateTaskCount();
});

document.getElementById('task-form').addEventListener('submit', addTask);

let editIndex = null;

function addTask(e) {
  e.preventDefault();
  const taskInput = document.getElementById('task-input');
  const task = taskInput.value.trim();

  if (task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (editIndex !== null) {
      tasks[editIndex] = task;
      editIndex = null;
    } else {
      tasks.push(task);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    loadTasks();
    updateTaskCount();
  }
}

function loadTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${task} 
      <button onclick="editTask(${index})">Editar</button>
      <button onclick="deleteTask(${index})">Eliminar</button>
    `;
    taskList.appendChild(li);
  });
}

function updateTaskCount() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  document.getElementById('task-count').textContent = `Total tareas: ${tasks.length}`;
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
  updateTaskCount();
}

function editTask(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  document.getElementById('task-input').value = tasks[index];
  editIndex = index;
}

function deleteAllTasks() {
  if (confirm('¿Estás seguro de eliminar todas las tareas?')) {
    localStorage.removeItem('tasks');
    loadTasks();
    updateTaskCount();
  }
}
