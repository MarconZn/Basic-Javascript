"use strict";
// DAT PHIM TAT
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");

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
let userLogin = "";
localStorage.setItem("userLogin", JSON.stringify(userLogin));

// CHUC NANG LOG IN
document.getElementById("btn-submit").addEventListener("click", function () {
  userLogin = userArr.find((i) => i.userName === inputUsername.value);
  if (userLogin === undefined) {
    alert("WRONG USER NAME!");
  } else if (userLogin.passWord !== inputPassword.value) {
    alert("WRONG PASSWORD!");
  } else {
    localStorage.setItem("userLogin", JSON.stringify(userLogin));
    alert("LOG IN SUCCESSFULLY!");
    window.location.replace("../index.html");
  }
});
