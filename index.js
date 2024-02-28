"use strict";
// Variables
const elForm = document.querySelector(".form");
const elInput = document.querySelector(".input");
const elList = document.querySelector(".todos-list");

// Arrays
const todos = [];

// Render Todos function
const renderTodos = function (arr, htmlElement) {
  htmlElement.innerHTML = "";
  arr.forEach((todo) => {
    const newLi = document.createElement("li");
    const newCheckBox = document.createElement("input");
    const newDeleteBtn = document.createElement("button");

    newCheckBox.type = "checkbox";
    newDeleteBtn.textContent = "Delete";
    newLi.innerHTML = todo.title;

    // ClassName
    newDeleteBtn.classList.add("delete-btn");
    newCheckBox.classList.add("checkbox-btn");

    // DataSet
    newDeleteBtn.dataset.deleteBtnId = todo.id;
    newCheckBox.dataset.checkboxBtnId = todo.id;

    if (todo.isCompleted) {
      newCheckBox.checked = true;
      newLi.style.textDecoration = "line-through";
      newLi.style.color = "gray";
    }

    // Appends
    htmlElement.appendChild(newLi);
    newLi.appendChild(newCheckBox);
    newLi.appendChild(newDeleteBtn);
  });
};

// DOM
elList.addEventListener("click", (e) => {
  const deleteBtnId = e.target.dataset.deleteBtnId * 1;
  const foundTodoIndex = todos.findIndex((todo) => todo.id === deleteBtnId);

  if (e.target.matches(".delete-btn")) {
    todos.splice(foundTodoIndex, 1);
    elList.innerHTML = null;
    renderTodos(todos, elList);
  } else if (e.target.matches(".checkbox-btn")) {
    const checkboxBtnId = e.target.dataset.checkboxBtnId * 1;
    const foundTodo = todos.find((todo) => todo.id === checkboxBtnId);
    foundTodo.isCompleted = !foundTodo.isCompleted;
    renderTodos(todos, elList);
  }
});

elForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = elInput.value;

  const newTodo = {
    id: todos[todos.length - 1]?.id + 1 || 0,
    title: inputValue,
    isCompleted: false,
  };

  todos.push(newTodo);

  elInput.value = null;
  renderTodos(todos, elList);
});
