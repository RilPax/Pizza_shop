const taskList = document.querySelector('.to-do');
const taskInProgress = document.querySelector('.in-progress');
const taskCompleted = document.querySelector('.completed');
const taskTemplate = document.querySelector('#task-template').content;
const addBtn = document.querySelector('.add-task');
const taskInput = document.querySelector('#add-task-input');

const loadItems = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || { toDo: [], inProgress: [], completed: [] };
    tasks.toDo.forEach(task => createItem(task, taskList));
    tasks.inProgress.forEach(task => createItem(task, taskInProgress));
    tasks.completed.forEach(task => createItem(task, taskCompleted, true));
};

const saveItems = () => {
    const tasks = { toDo: [], inProgress: [], completed: [] };

    taskList.querySelectorAll('.task-item').forEach(taskItem => {
        tasks.toDo.push(taskItem.querySelector('.task-description').textContent);
    });
    taskInProgress.querySelectorAll('.task-item').forEach(taskItem => {
        tasks.inProgress.push(taskItem.querySelector('.task-description').textContent);
    });
    taskCompleted.querySelectorAll('.task-item').forEach(taskItem => {
        tasks.completed.push(taskItem.querySelector('.task-description').textContent);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const valueExamination = () => {
    const taskInputTrim = taskInput.value.trim();
    if (taskInputTrim === '') {
        alert('Пожалуйста, заполните поле');
    } else {
        createItem(taskInputTrim, taskList);
        saveItems();
    }
};

const deleteItem = (item) => {
    item.remove();
    saveItems();
};

const moveItem = (item) => {
    if (item.parentElement === taskList) {
        taskInProgress.append(item);
    } else if (item.parentElement === taskInProgress) {
        taskCompleted.append(item);
        item.querySelector('.move-to').remove();
    }
    saveItems();
};

const createItem = (taskText, list, isCompleted = false) => {
    const taskItem = taskTemplate.querySelector('.task-item').cloneNode(true);
    taskItem.querySelector('.task-description').textContent = taskText;

    const deleteBtn = taskItem.querySelector('.delete-task');
    deleteBtn.addEventListener('click', () => deleteItem(taskItem));

    const moveBtn = taskItem.querySelector('.move-to');
    moveBtn.addEventListener('click', () => moveItem(taskItem));

    if (isCompleted) {
        moveBtn.remove(); 
    }

    list.append(taskItem);
    taskInput.value = '';
};

addBtn.addEventListener('click', () => {
    valueExamination();
});

document.addEventListener('DOMContentLoaded', loadItems);