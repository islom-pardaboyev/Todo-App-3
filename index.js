"use strict";

const elForm = document.querySelector(".form");
const elInput = document.querySelector(".input");
const elList = document.querySelector(".list");
const elStatusInput = document.querySelector(".statusInput");
const elTodosAll = document.querySelector(".all");
const elCompletedTotal = document.querySelector(".completed");
const elUncompletedTotal = document.querySelector(".uncompleted");
const elCompletedBtn = document.querySelector(".completedbtn");
const elAllBtn = document.querySelector(".allbtn");
const elUncompletedBtn = document.querySelector(".uncompletedbtn");

// Arrays
let todoArr = [];
let completedTodoArr = [];
let trashArr = [];

// Function to update counts
const updateCounts = () => {
  elTodosAll.textContent = `(${todoArr.length})`;
  elCompletedTotal.textContent = `(${completedTodoArr.length})`;
  elUncompletedTotal.textContent = `(${
    todoArr.filter((todo) => !todo.isCompleted).length
  })`;
};

// Render todos
const renderTodos = (arr, htmlElement) => {
  htmlElement.innerHTML = "";

  arr.forEach((todo) => {
    const newLi = document.createElement("li");
    const newPTitle = document.createElement("p");
    const newLiDiv = document.createElement("div");
    const newDeleteBtn = document.createElement("button");
    const newCheckBtn = document.createElement("input");

    newPTitle.textContent = todo.title;
    newDeleteBtn.textContent = "Delete";
    newCheckBtn.classList.add("checkbox-btn");
    newCheckBtn.type = "checkbox";

    if (todo.isCompleted) {
      newCheckBtn.checked = true;
      newPTitle.classList.add("line-through", "text-gray");
    }

    newLi.setAttribute(
      "class",
      "item bg-gray-200 border rounded-md m-4 flex items-center justify-between py-2 text-lg px-4"
    );

    newDeleteBtn.setAttribute(
      "class",
      "bg-red-500 text-white border rounded-md px-4 py-2 delete-btn"
    );

    newLiDiv.setAttribute("class", "flex items-center gap-2");
    newLi.setAttribute("draggable", "true");

    // Datasets
    newDeleteBtn.dataset.deleteBtnId = todo.id;
    newCheckBtn.dataset.checkBtnId = todo.id;

    htmlElement.appendChild(newLi);
    newLi.append(newLiDiv, newDeleteBtn);
    newLiDiv.append(newPTitle, newCheckBtn);
  });
};

// Load data from local storage
function loadFromLocalStorage() {
  const todoArrString = localStorage.getItem('todoArr');
  const completedTodoArrString = localStorage.getItem('completedTodoArr');

  if (todoArrString) todoArr = JSON.parse(todoArrString);
  if (completedTodoArrString) completedTodoArr = JSON.parse(completedTodoArrString);
}

// Save data to local storage
function saveToLocalStorage() {
  localStorage.setItem('todoArr', JSON.stringify(todoArr));
  localStorage.setItem('completedTodoArr', JSON.stringify(completedTodoArr));
}

// Event listeners
elCompletedBtn.addEventListener("click", () => {
  elList.innerHTML = null;
  renderTodos(completedTodoArr, elList);
  updateCounts();
});

elAllBtn.addEventListener("click", () => {
  elList.innerHTML = null;
  renderTodos(todoArr, elList);
  updateCounts();
});

elUncompletedBtn.addEventListener("click", () => {
  elList.innerHTML = null;
  const uncompletedTodos = todoArr.filter((todo) => !todo.isCompleted);
  renderTodos(uncompletedTodos, elList);
  updateCounts();
});

elList.addEventListener("click", (evt) => {
  const deleteBtnId = +evt.target.dataset.deleteBtnId;
  const checkBtnId = +evt.target.dataset.checkBtnId;

  if (evt.target.matches(".delete-btn")) {
    const foundTodoIndex = todoArr.findIndex((todo) => todo.id === deleteBtnId);
    todoArr.splice(foundTodoIndex, 1);
    saveToLocalStorage();
  } else if (evt.target.matches(".checkbox-btn")) {
    const foundTodo = todoArr.find((todo) => todo.id === checkBtnId);
    foundTodo.isCompleted = !foundTodo.isCompleted;
    saveToLocalStorage();
  }

  renderTodos(todoArr, elList);
  updateCounts();
});

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const inputValue = elInput.value.trim();

  if (inputValue) {
    const todoObj = {
      title: inputValue,
      id: todoArr.length,
      isCompleted: false,
    };
    todoArr.push(todoObj);
    elInput.value = "";
    renderTodos(todoArr, elList);
    updateCounts();
    saveToLocalStorage();
  } else {
    elStatusInput.textContent = "Inputni to'ldiring";
    elStatusInput.classList.add("text-red-500", "text-sm");
  }
});

elInput.addEventListener("input", () => {
  if (elInput.value.trim() !== "") {
    elStatusInput.textContent = "";
    elStatusInput.classList.remove("text-red-500", "text-sm");
  }
});

// Load data from local storage when the page loads
loadFromLocalStorage();
renderTodos(todoArr, elList);
updateCounts();
