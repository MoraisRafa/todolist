'use strict';

const getData = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setData = (data) => localStorage.setItem('todoList', JSON.stringify(data));

const createTask = (toDo, status, indice) => {
    const task = document.createElement('div');
    task.classList.add('todo_items');
    task.innerHTML = `
    <input type="checkbox" ${status} data-indice=${indice}>
    <div>${toDo}</div>
    <input type="image" src="assets/trash-2.svg" data-indice=${indice}>
    `

    document.getElementById('todoList').appendChild(task);
}

const clearTasks = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const render = () => {
    clearTasks();
    const data = getData();
    data.forEach((task, indice) => createTask(task.toDo, task.status, indice));
}

const addTask = (event) => {
    const key = event.key;
    const text = event.target.value;
    if (key === 'Enter') {
        const data = getData();
        data.push({ 'toDo': text, 'status': '' })
        setData(data);
        render();
        event.target.value = '';
    }

}

const removeItem = (indice) => {
    const data = getData();
    data.splice(indice, 1);
    setData(data);
    render();
}

const updateItem = (indice) => {
    const data = getData();
    data[indice].status = data[indice].status === '' ? 'checked' : '';
    setData(data);
    render();
}

const clickItem = (event) => {
    const element = event.target;
    if (element.type === 'image') {
        const indice = element.dataset.indice;
        removeItem(indice);
    } else if (element.type === 'checkbox') {
        const indice = element.dataset.indice;
        updateItem(indice);
    }
}

document.getElementById('newTask').addEventListener('keypress', addTask);
document.getElementById('todoList').addEventListener('click', clickItem);

render();
