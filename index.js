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

elCompletedBtn.addEventListener("click", () => {
  elList.innerHTML = null;

  renderTodos(completedTodoArr, elList);
});

elAllBtn.addEventListener("click", () => {
  elList.innerHTML = null;

  renderTodos(todoArr, elList);
});

elUncompletedBtn.addEventListener("click", (e) => {
  elList.innerHTML = null;

  const uncompletedTodos = todoArr.filter((todo) => !todo.isCompleted);
  renderTodos(uncompletedTodos, elList);
});

elList.addEventListener("click", (evt) => {
  const deleteBtnId = +evt.target.dataset.deleteBtnId;
  const checkBtnId = +evt.target.dataset.checkBtnId;

  if (evt.target.matches(".delete-btn")) {
    const foundTodoIndex = todoArr.findIndex((todo) => todo.id === deleteBtnId);
    todoArr.splice(foundTodoIndex, 1);
  } else if (evt.target.matches(".checkbox-btn")) {
    const foundTodo = todoArr.find((todo) => todo.id === checkBtnId);
    foundTodo.isCompleted = !foundTodo.isCompleted;
    if (foundTodo.isCompleted) {
      completedTodoArr.push(foundTodo);
    } else {
      const index = completedTodoArr.indexOf(foundTodo);
      completedTodoArr.splice(index, 1);
    }
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
  } else {
    elStatusInput.textContent = "Please fill out this field";
    elStatusInput.classList.add("text-red", "text-12");
  }
});

elInput.addEventListener("input", () => {
  if (elInput.value.trim() !== "") {
    elStatusInput.textContent = "";
    elStatusInput.classList.remove("text-red", "text-12");
  }
});

const renderTodos = (arr, htmlElement) => {
  htmlElement.innerHTML = "";

  arr.forEach((todo) => {
    const newLi = document.createElement("li");
    const newDeleteBtn = document.createElement("button");
    const newCheckBtn = document.createElement("input");

    newLi.textContent = todo.title;
    newDeleteBtn.textContent = "Delete";
    newCheckBtn.classList.add("checkbox-btn");
    newCheckBtn.type = "checkbox";

    if (todo.isCompleted) {
      newCheckBtn.checked = true;
      newLi.classList.add("line-through");
    }

    // Datasets
    newDeleteBtn.classList.add("delete-btn");
    newDeleteBtn.dataset.deleteBtnId = todo.id;
    newCheckBtn.dataset.checkBtnId = todo.id;

    htmlElement.appendChild(newLi);
    newLi.append(newCheckBtn, newDeleteBtn);
  });
};

const updateCounts = () => {
  elTodosAll.textContent = `(${todoArr.length})`;
  elCompletedTotal.textContent = `(${completedTodoArr.length})`;
  elUncompletedTotal.textContent = `(${
    todoArr.filter((todo) => !todo.isCompleted).length
  })`;
};

renderTodos(todoArr, elList);
updateCounts();
