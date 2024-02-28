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
    const newP = document.createElement("p");
    const newDiv = document.createElement("div");
    const newCheckBox = document.createElement("input");
    const newDeleteBtn = document.createElement("button");

    newCheckBox.type = "checkbox";
    newP.innerHTML = todo.title;

    document.querySelector(".all").textContent = `All(${todos.length})`;

    // ClassName
    newDeleteBtn.setAttribute(
      "class",
      "fa-solid fa-xmark delete-btn rounded-md px-[10px] py-[10px] bg-[red] text-[white]"
    );
    newCheckBox.setAttribute(
      "class",
      "checkbox-btn w-[30px] h-[30px] mr-[1rem]"
    );
    newDiv.setAttribute("class", "flex flex-row-reverse");
    newLi.setAttribute(
      "class",
      "flex bg-[white] items-center px-[15px] py-[10px] mt-[10px] text-[black] rounded-md justify-between"
    );
    newP.setAttribute("class", "text-[20px]");

    // DataSet
    newDeleteBtn.dataset.deleteBtnId = todo.id;
    newCheckBox.dataset.checkboxBtnId = todo.id;

    if (todo.isCompleted) {
      newCheckBox.checked = true;
      newP.classList.add("text-[gray]", "line-through");
    }

    // Appends
    htmlElement.appendChild(newLi);
    newLi.append(newDiv, newDeleteBtn);
    newDiv.append(newP, newCheckBox);
  });
};

// DOM
elList.addEventListener("click", (e) => {
  const deleteBtnId = e.target.dataset.deleteBtnId * 1;
  const foundTodoIndex = todos.findIndex((todo) => todo.id === deleteBtnId);

  document.querySelector(".all").textContent = todos.length;

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

// Save to local storage
function saveToLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Load from local storage
function loadFromLocalStorage() {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    return JSON.parse(savedTodos);
  }
  return [];
}
todos.push(...loadFromLocalStorage());


renderTodos(todos, elList);

elList.addEventListener("click", (e) => {
  saveToLocalStorage(todos);
});

elForm.addEventListener("submit", (e) => {
  saveToLocalStorage(todos);
});
