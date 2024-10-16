const taskList = document.querySelector('.to-do');
const taskInProgress = document.querySelector('.in-progress');
const taskCompleted = document.querySelector('.completed');
const taskTemplate = document.querySelector('#task-template').content;
const addBtn = document.querySelector('.add-task');
const taskInput = document.querySelector('#add-task-input');

// Загрузка задач из LocalStorage при загрузке страницы
const loadItems = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || { toDo: [], inProgress: [], completed: [] };
    tasks.toDo.forEach(task => createItem(task, taskList));
    tasks.inProgress.forEach(task => createItem(task, taskInProgress));
    tasks.completed.forEach(task => createItem(task, taskCompleted, true));
};

// Сохранение задач в LocalStorage
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

// Проверка значений и создание задачи, если поле не пустое
const valueExamination = () => {
    const taskInputTrim = taskInput.value.trim();
    if (taskInputTrim === '') {
        alert('Пожалуйста, заполните поле');
    } else {
        createItem(taskInputTrim, taskList);
        saveItems();
    }
};

// Удаление задачи и обновление LocalStorage
const deleteItem = (item) => {
    item.remove();
    saveItems();
};

// Перемещение задачи между списками
const moveItem = (item) => {
    if (item.parentElement === taskList) {
        taskInProgress.append(item);
    } else if (item.parentElement === taskInProgress) {
        taskCompleted.append(item);
        item.querySelector('.move-to').remove(); // Удалить кнопку после завершения задачи
    }
    saveItems();
};

// Создание новой задачи
const createItem = (taskText, list, isCompleted = false) => {
    const taskItem = taskTemplate.querySelector('.task-item').cloneNode(true);
    taskItem.querySelector('.task-description').textContent = taskText;

    const deleteBtn = taskItem.querySelector('.delete-task');
    deleteBtn.addEventListener('click', () => deleteItem(taskItem));

    const moveBtn = taskItem.querySelector('.move-to');
    moveBtn.addEventListener('click', () => moveItem(taskItem));

    if (isCompleted) {
        moveBtn.remove(); // Удалить кнопку перемещения, если задача завершена
    }

    list.append(taskItem);
    taskInput.value = '';
};

// Добавление задачи через кнопку
addBtn.addEventListener('click', () => {
    valueExamination();
});

// Загрузка задач при загрузке страницы
document.addEventListener('DOMContentLoaded', loadItems);




    /*const taskItem = taskTemplate.querySelector('.task-item').cloneNode(true);

    const inputValue = taskInput.value;

    if(inputValue.trim() === '') {
        alert('Пожалуйста, заполните поле');
    }
    else{
        taskItem.querySelector('.task-description').textContent = inputValue;
        const deleteBtn = taskItem.querySelector('.delete-task');
        const moveBtn = taskItem.querySelector('.move-to');
        const svgContainer = moveBtn.querySelector('#svg-id')
        taskList.append(taskItem);
        taskInput.value = '';

        moveBtn.addEventListener('click', () => {
            if (taskItem.parentNode === taskList) {
                taskInProgress.append(taskItem);
                svgContainer.href = './'
            } else if (taskItem.parentNode === taskInProgress) {
                taskCompleted.append(taskItem);
                moveBtn.remove();
            }
        
        })

        deleteBtn.addEventListener('click', () => {
            taskItem.remove();
        })

    }
    */


