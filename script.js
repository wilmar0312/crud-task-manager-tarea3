document.addEventListener('DOMContentLoaded', loadTasks);
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

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
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
    updateTaskCount(); // si ya tienes esta función
  }
}
