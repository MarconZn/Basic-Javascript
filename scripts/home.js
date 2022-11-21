"use strict";
// DAT PHIM TAT
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMess = document.getElementById("welcome-message");

// TAO CLASS USER
class User {
  constructor(firstName, lastName, userName, passWord) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.passWord = passWord;
  }
}

// KHAI BAO BIEN VA HAM
const userArr = [];
if (JSON.parse(localStorage.getItem("userData")) !== null) {
  let a = JSON.parse(localStorage.getItem("userData"));
  a.forEach((i) =>
    userArr.push(new User(i.firstName, i.lastName, i.userName, i.passWord))
  );
}
let userLogin = JSON.parse(localStorage.getItem("userLogin"));

// HIEN THI THEO THONG TIN LOG IN
if (userLogin === undefined || userLogin === "" || userLogin === null) {
  mainContent.style.display = "none";
  loginModal.style.display = "block";
} else {
  loginModal.style.display = "none";
  mainContent.style.display = "block";
  welcomeMess.innerText = `Welcome ${userLogin.userName}`;
}

// CHUC NANG LOG OUT
document.getElementById("btn-logout").addEventListener("click", function () {
  let userLogin = "";
  localStorage.setItem("userLogin", JSON.stringify(userLogin));
  alert("LOG OUT SUCCESSFULLY!");
  window.location.replace("./pages/login.html");
});
