// Selectors

const todoInput = document.querySelector(".todo_input");
const todoButton = document.querySelector(".todo_button");
const todoList = document.querySelector(".todo_list");
const filterOption = document.querySelector(".filter_todo");

// Event Listenrs
/**The DOMContentLoaded fires when the DOM content is loaded,
 * without waiting for images and stylesheets to finish loading. */
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions

function addTodo(event) {
  // Prevent from submitting  form
  event.preventDefault();

  // Todo DIV
  const todoDiv = document.createElement("div");

  // Add class into tags
  todoDiv.classList.add("todo_div");

  // Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo_item");
  todoDiv.appendChild(newTodo);

  // ADD TODO TO LOCAL STORAGE
  saveLocalTodos(todoInput.value);

  // Check Button
  const completeButton = document.createElement("button");
  // It add an icon into the button
  completeButton.innerHTML = "<i class = 'fas fa-check'></i>";
  completeButton.classList.add("complete_button");
  todoDiv.appendChild(completeButton);

  // Delete Button
  const deleteButton = document.createElement("button");
  // It add an icon into the button
  deleteButton.innerHTML = "<i  class = 'fas fa-trash'></i>";
  deleteButton.classList.add("delete_button");
  todoDiv.appendChild(deleteButton);

  // APPEND TO TODOLIST
  todoList.appendChild(todoDiv);

  // Clear Todo INPUT value
  todoInput.value = "";
}

// Delete list
function deleteCheck(event) {
  const item = event.target;

  //DELETE TODO
  if (item.classList[0] === "delete_button") {
    const todo = item.parentElement;
    console.log(item.parentElement);
    // Animation
    todo.classList.add("fall");
    removeLocalStorage(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  // CHECK MARK
  if (item.classList[0] === "complete_button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // CHECK -- HEY Do I already have thing in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  // CHECK -- HEY Do I already have thing in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    // Todo DIV
    const todoDiv = document.createElement("div");

    // Add class into tags
    todoDiv.classList.add("todo_div");

    // Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo_item");
    todoDiv.appendChild(newTodo);

    // Check Button
    const completeButton = document.createElement("button");
    // It add an icon into the button
    completeButton.innerHTML = "<i class = 'fas fa-check'></i>";
    completeButton.classList.add("complete_button");
    todoDiv.appendChild(completeButton);

    // Delete Button
    const deleteButton = document.createElement("button");
    // It add an icon into the button
    deleteButton.innerHTML = "<i  class = 'fas fa-trash'></i>";
    deleteButton.classList.add("delete_button");
    todoDiv.appendChild(deleteButton);

    // APPEND TO TODOLIST
    todoList.appendChild(todoDiv);
  });
}

function removeLocalStorage(todo) {
  // CHECK -- HEY Do I already have thing in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
