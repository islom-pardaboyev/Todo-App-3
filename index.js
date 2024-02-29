"use strict";

// Variables
const elForm = document.querySelector(".form");
const elInput = document.querySelector(".input");
const elList = document.querySelector(".todos-list");
const elCompleted = document.querySelector("#Completed");
const elUncompleted = document.querySelector("#Uncompleted");
const elCompletedText = document.querySelector(".completed");
const elUncompletedText = document.querySelector(".uncompleted");

// Arrays
const todos = [];
const completed = [];
const uncompleted = [];

// Functions
const renderTodos = function (arr, htmlElement) {
  htmlElement.innerHTML = "";
  arr.forEach((todo) => {
    const newLi = document.createElement("li");
    const newP = document.createElement("p");
    const newDiv = document.createElement("div");
    const newCheckBox = document.createElement("input");
    const newDeleteBtn = document.createElement("button");

    newCheckBox.type = "checkbox";
    newP.textContent = todo.title;

    // ClassName
    newDeleteBtn.className =
      "fa-solid fa-xmark delete-btn rounded-md px-[10px] py-[10px] bg-[red] text-[white]";
    newCheckBox.className = "checkbox-btn w-[30px] h-[30px] mr-[1rem]";
    newDiv.className = "flex flex-row-reverse";
    newLi.className =
      "flex bg-[white] items-center px-[15px] py-[10px] mt-[10px] text-[black] rounded-md justify-between";
    newP.className = "text-[20px]";

    document.querySelector(".all").textContent = `All(${todos.length})`;

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

elForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = elInput.value.trim();

  if (!inputValue) return;

  const newTodoObj = {
    id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 0,
    title: inputValue,
    isCompleted: false,
  };

  todos.push(newTodoObj);

  elInput.value = "";
  renderTodos(todos, elList);
  saveToLocalStorage(todos);
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

// DOM
elList.addEventListener("click", (e) => {
  const deleteBtnId = e.target.dataset.deleteBtnId * 1;
  const foundTodoIndex = todos.findIndex((todo) => todo.id === deleteBtnId);

  if (e.target.matches(".delete-btn")) {
    todos.splice(foundTodoIndex, 1);
    renderTodos(todos, elList);
    saveToLocalStorage(todos);
  } else if (e.target.matches(".checkbox-btn")) {
    const checkboxBtnId = e.target.dataset.checkboxBtnId * 1;
    const foundTodo = todos.find((todo) => todo.id === checkboxBtnId);
    foundTodo.isCompleted = !foundTodo.isCompleted;

    updateCompletedAndUncompletedArrays(todos);

    renderTodos(todos, elList);
    saveToLocalStorage(todos);
  }
});

function updateCompletedAndUncompletedArrays(todos) {
  completed.length = 0;
  uncompleted.length = 0;

  todos.forEach((todo) => {
    if (todo.isCompleted === true) {
      completed.push(todo.title);
    } else if (todo.isCompleted === false) {
      uncompleted.push(todo.title);
    }

    elCompletedText.textContent = `Completed(${completed.length})`;
    elUncompletedText.textContent = `Uncompleted(${uncompleted.length})`;
  });
  elCompleted.innerHTML = completed.join("<br>");
  elUncompleted.innerHTML = uncompleted.join("<br>");
}

todos.push(...loadFromLocalStorage());
renderTodos(todos, elList);

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
