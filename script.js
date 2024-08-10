document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const now = new Date();
    const taskDate = now.toLocaleDateString();
    const taskTime = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <div class="task-info">
            <span>Date&Time: ${taskDate} ${taskTime}</span>
        </div>
        <button class="edit-btn" onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
        <input type="checkbox" onclick="toggleComplete(this)">
    `;
    taskList.appendChild(li);

    taskInput.value = '';
    saveTasks();
}

function editTask(button) {
    const li = button.parentElement;
    const span = li.querySelector('span');
    const taskInput = document.getElementById('task-input');
    const taskText = span.textContent;

    taskInput.value = taskText;
    li.remove();
    saveTasks();
}

function deleteTask(button) {
    const li = button.parentElement;
    li.remove();
    saveTasks();
}

function toggleComplete(checkbox) {
    const li = checkbox.parentElement;
    if (checkbox.checked) {
        li.classList.add('completed');
    } else {
        li.classList.remove('completed');
    }
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    const taskListItems = document.querySelectorAll('#task-list li');

    taskListItems.forEach(item => {
        const task = {
            text: item.querySelector('span').textContent,
            date: item.querySelector('.task-info').querySelector('span').textContent,
            completed: item.classList.contains('completed')
        };
        tasks.push(task);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const taskList = document.getElementById('task-list');
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text}</span>
            <div class="task-info">
                <span>${task.date}</span>
            </div>
            <button class="edit-btn" onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
            <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleComplete(this)">
        `;
        if (task.completed) {
            li.classList.add('completed');
        }
        taskList.appendChild(li);
    });
}
