"use strict";

const elForm = document.querySelector(".form");
const elInput = document.querySelector(".input");
const elList = document.querySelector(".list");
const elStatusInput = document.querySelector(".statusInput");
const elTodosAll = document.querySelector(".all");
const elCompletedTotal = document.querySelector(".completed");
const elUncompletedTotal = document.querySelector(".uncompleted");

// Arrays
let todoArr = [];
let completedTodoArr = [];

elList.addEventListener("click", (evt) => {
  const deleteBtnId = evt.target.dataset.deleteBtnId * 1;
  const foundTodoIndex = todoArr.findIndex((todo) => todo.id === deleteBtnId);
  const checkBtnId = evt.target.dataset.checkBtnId * 1;
  const foundTodoChecked = todoArr.find((todo) => todo.id === checkBtnId);
  if (evt.target.matches(".delete-btn")) {
    todoArr.splice(foundTodoIndex, 1);
    elList.innerHTML = null;
    renderTodos(todoArr, elList);
    updateCounts();
  } else if (evt.target.matches(".checkbox-btn")) {
    foundTodoChecked.isCompleted = !foundTodoChecked.isCompleted;
    elList.innerHTML = null;

    if (foundTodoChecked.isCompleted) {
      completedTodoArr.push(foundTodoChecked);
    } else {
      completedTodoArr.splice(completedTodoArr.indexOf(foundTodoChecked), 1);
    }

    renderTodos(todoArr, elList);
    updateCounts();
  }
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
  elUncompletedTotal.textContent = `(${todoArr.length - completedTodoArr.length})`;
};

renderTodos(todoArr, elList);
updateCounts();
