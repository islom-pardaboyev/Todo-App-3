"use strict";

const elForm = document.querySelector(".form");
const elInput = document.querySelector(".input");
const elList = document.querySelector(".list");
const elStatusInput = document.querySelector(".statusInput");

// Arrays
const todoArr = [];

elList.addEventListener("click", (evt) => {
  const deleteBtnId = evt.target.dataset.deleteBtnId;
  if (evt.target.matches(".delete-btn")) {
    console.log(evt.target.dataset);
  }
});

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const inputValue = elInput.value;

  if (inputValue) {
    const todoObj = {
      title: inputValue,
      id: todoArr.length,
      isCompleted: false,
    };
    todoArr.push(todoObj);
  } else {
    elStatusInput.innerHTML = "iltimos To'ldiring";
    elStatusInput.classList.add("text-[red]", "text-[12px]");
  }

  elInput.addEventListener("input", () => {
    if (elInput.value !== "") {
      elStatusInput.innerHTML = "";
      elStatusInput.classList.remove("text-[red]", "text-[12opx]");
    }
  });

  elInput.value = "";
  renderTodos(todoArr, elList);
});

const renderTodos = (arr, htmlElement) => {
  htmlElement.innerHTML = ""; // Clearing the list before rendering

  arr.forEach((todo) => {
    const newLi = document.createElement("li");
    const newDeleteBtn = document.createElement("button");
    const newCheckBtn = document.createElement("input");

    newLi.innerHTML = todo.title;
    newDeleteBtn.innerHTML = "Delete";

    newCheckBtn.type = "checkbox";

    // Datasets
    newDeleteBtn.classList.add("delete-btn");
    newDeleteBtn.dataset.deleteBtnId = todo.id; // Fixed dataset assignment

    htmlElement.appendChild(newLi);
    newLi.append(newCheckBtn, newDeleteBtn);
  });
};

renderTodos(todoArr, elList);
