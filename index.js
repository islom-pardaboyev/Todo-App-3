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

elUncompletedBtn.addEventListener("click", (e) => {
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
    elStatusInput.textContent = "Inputni to'ldiring";
    elStatusInput.classList.add("text-[red]", "text-[12px]");
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
      newPTitle.classList.add("line-through", "text-[gray]");
    }

    newLi.setAttribute(
      "class",
      "bg-[#F6F6F6] border rounded-md m-[1rem] flex items-center justify-between py-[10px] text-[1.3rem] px-[10px]"
    );

    newDeleteBtn.setAttribute(
      "class",
      "bg-[#ea2f2f] text-[white] border rounded-md px-[10px] py-[5px]"
    );

    newLiDiv.setAttribute("class", "flex items-center gap-[.5rem]");

    // Datasets
    newDeleteBtn.classList.add("delete-btn");
    newDeleteBtn.dataset.deleteBtnId = todo.id;
    newCheckBtn.dataset.checkBtnId = todo.id;

    htmlElement.appendChild(newLi);
    newLi.append(newLiDiv, newDeleteBtn);
    newLiDiv.append(newPTitle, newCheckBtn);
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
