"use strict";
const elForm = document.querySelector(".form");
const elInput = document.querySelector(".input");
const elList = document.querySelector(".todos-list");

const todos = [];

const renderTodos = function (arr, htmlElement){
  htmlElement.innerHTML = "";
  arr.forEach((todo) => {
    const newLi = document.createElement("li");
    const newCheckBox = document.createElement("input");
    const newDeleteBtn = document.createElement("button");

    newCheckBox.type = "checkbox";
    newDeleteBtn.textContent = 'Delete';
    newLi.innerHTML = todo.title;

    htmlElement.appendChild(newLi);
    newLi.appendChild(newCheckBox);
    newLi.appendChild(newDeleteBtn);
  });
}
elForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = elInput.value;

  const newTodo = {
    id: todos.length,
    title: inputValue,
    isCompleted: false,
  };

  todos.push(newTodo);

  elInput.value = null
  renderTodos(todos,elList)
});
