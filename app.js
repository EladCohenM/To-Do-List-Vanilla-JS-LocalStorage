//Selectors
const todoInput = document.querySelector(".todo-input");
const todobutton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getLocalTodos);
todobutton.addEventListener("click", addTodo);
todoList.addEventListener("click", check);
filterOption.addEventListener("click", filterTodo);

//Functions
function addTodo(event) {
    //Prevent submiting
    event.preventDefault();
    //Only if input is not empty
    if (todoInput.value !== "") {
        //Create Todo Div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Create li
        const newTodo = document.createElement("li");
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        //Save Todo to LocalStorage
        saveLocalTodos(todoInput.value);
        //Check Mark Button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-button");
        todoDiv.appendChild(completedButton);
        //Trush Button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-button");
        todoDiv.appendChild(trashButton);
        //Append To List
        todoList.appendChild(todoDiv);
        //Clear Todo Input
        todoInput.value = "";
    };
};

function check(event) {
    const item = event.target;
    //Delete Todo
    if (item.classList.contains("trash-button")) {
        const todo = item.closest(".todo");
        const text = todo.childNodes[0].value;
        todo.classList.add("fall");
        removeLocalTodos(text);
        todo.addEventListener("transitionend", () => {
            todo.remove();
        })
    };

    if (item.classList.contains("complete-button")) {
        item.closest(".todo").classList.toggle("completed");
    };
};

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                };
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                };
        };
    })
};

//Checking if there's todos in LocalStorage
function checkLocalTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    };
    return todos;
};

//Saving Todos to LocalStorage
function saveLocalTodos(todo) {
    let todos;
    todos = checkLocalTodos();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
};

//Loading Todos on Reload
function getLocalTodos() {
    let todos;
    todos = checkLocalTodos();
    todos.forEach(todo => {
        //Create Todo Div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Create li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        //Check Mark Button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-button");
        todoDiv.appendChild(completedButton);
        //Trush Button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-button");
        todoDiv.appendChild(trashButton);
        //Append To List
        todoList.appendChild(todoDiv);
    });
};

//Removing todo when deleted
function removeLocalTodos(todo) {
    let todos = checkLocalTodos();
    todos.splice(todos.indexOf(todo), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
