"use strict";
// DAT PHIM TAT
const todoList = document.getElementById("todo-list");
const inputTask = document.getElementById("input-task");

// TAO CLASS USER
class Todo {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

// KHAI BAO BIEN VA HAM
const todoArr = [];
let currentUser = [];
const userLogin = JSON.parse(localStorage.getItem("userLogin"));
if (JSON.parse(localStorage.getItem("todoList")) !== null) {
  let a = JSON.parse(localStorage.getItem("todoList"));
  a.forEach((i) => todoArr.push(new Todo(i.task, i.owner, i.isDone)));
}

// HAM HIEN THI BANG
const renderTable = function (a) {
  todoList.innerHTML = "";
  for (let i = 0; i < currentUser.length; i++) {
    const row = document.createElement("li");
    row.innerHTML = `${a[i].task}<span class="close">×</span>`;
    if (a[i].isDone === "Yes") {
      row.classList.value = "checked";
    }
    todoList.appendChild(row);
  }
};

// HIEN THI HOAT DONG THEO USER
if (userLogin === "") {
  todoList.innerHTML = "";
} else if (todoArr.find((i) => i.owner === userLogin.userName) === undefined) {
  todoList.innerHTML = "";
} else {
  todoList.innerHTML = "";
  currentUser = todoArr.filter((i) => i.owner === userLogin.userName);
  renderTable(currentUser);
}

// CHUC NANG THEM HOAT DONG
document.getElementById("btn-add").addEventListener("click", function () {
  if (userLogin === "") {
    alert("PLEASE LOG IN!");
  } else if (inputTask.value === "") {
    alert("PLEASE INPUT ACTIVITY!");
  } else if (currentUser.find((i) => i.task === inputTask.value)) {
    alert("ACTIVITY ALREADY SUBMIT!");
  } else {
    let a = new Todo(inputTask.value, userLogin.userName, "No");
    todoArr.push(a);
    localStorage.setItem("todoList", JSON.stringify(todoArr));
    currentUser = todoArr.filter((i) => i.owner === userLogin.userName);
    renderTable(currentUser);
  }
});

// CHUC NANG CHECK/UNCHECK HOAT DONG
todoList.addEventListener(
  "click",
  function (ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
    const text = ev.target.firstChild.data;
    if (ev.target.classList.value === "checked") {
      todoArr.find((i) => i.task === text).isDone = "Yes";
    } else if (ev.target.classList.value !== "close") {
      todoArr.find((i) => i.task === text).isDone = "No";
    }
    localStorage.setItem("todoList", JSON.stringify(todoArr));
  },
  false
);

// CHUC NANG XOA HOAT DONG
todoList.addEventListener(
  "click",
  function (ev) {
    if (ev.target.tagName === "SPAN") {
      console.log(ev.target.parentElement.firstChild.data);
      if (confirm("DO YOU WANT TO DELETE?")) {
        const text = ev.target.parentElement.firstChild.data;
        const index = todoArr.findIndex(
          (i) => i.task === text && i.owner === userLogin.userName
        );
        todoArr.splice(index, 1);
        currentUser = todoArr.filter((i) => i.owner === userLogin.userName);
        localStorage.setItem("todoList", JSON.stringify(todoArr));
        renderTable(currentUser);
      }
    }
  },
  false
);
