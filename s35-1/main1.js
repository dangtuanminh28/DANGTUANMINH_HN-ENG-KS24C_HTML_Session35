let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

window.onload = function () {
    renderTasks();
};

function addTask() {
    let taskInput = document.getElementById('taskInput');
    let taskValue = taskInput.value;

    if (taskValue === '') {
        alert('Vui lòng nhập công việc!');
        return;
    }

    tasks.push(taskValue);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    renderTasks();
}

function renderTasks() {
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `
                    <span>${task}</span>
                    <div>
                        <button onclick="editTask(${index})">Sửa</button>
                        <button onclick="deleteTask(${index})">Xóa</button>
                    </div>
                `;
        taskList.appendChild(listItem);
    });
}

function deleteTask(index) {
    if (confirm('Bạn có chắc chắn muốn xóa công việc này không?')) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

function editTask(index) {
    let updatedTask = prompt('Chỉnh sửa công việc:', tasks[index]);

    if (updatedTask !== null && updatedTask.trim() !== '') {
        tasks[index] = updatedTask.trim();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}