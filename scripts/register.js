"use strict";
// DAT PHIM TAT
const inputFirstname = document.querySelector("#input-firstname");
const inputLastname = document.querySelector("#input-lastname");
const inputUsername = document.querySelector("#input-username");
const inputPassword = document.querySelector("#input-password");
const inputConfirmpassword = document.querySelector("#input-password-confirm");

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

// CHUC NANG REGISTER USER
document.getElementById("btn-submit").addEventListener("click", function () {
  const newUser = new User(
    inputFirstname.value,
    inputLastname.value,
    inputUsername.value,
    inputPassword.value
  );

  // KIEM TRA TINH HOP LE TAI KHOAN
  if (inputFirstname.value === "") {
    alert("PLEASE INPUT FIRST NAME!");
  } else if (inputLastname.value === "") {
    alert("PLEASE INPUT LAST NAME!");
  } else if (userArr.find((i) => i.userName === inputUsername.value)) {
    alert("USER NAME IS NOT AVAILABLE!");
  } else if (inputUsername.value === "") {
    alert("PLEASE INPUT USER NAME!");
  } else if (inputPassword.value === "") {
    alert("PLEASE INPUT PASSWORD!");
  } else if (inputPassword.value.length < 8) {
    alert("PASSWORD MUST LONGER THAN 8 CHARACTER!");
  } else if (inputPassword.value !== inputConfirmpassword.value) {
    alert("PASSWORD NOT MATCH!");
  } else {
    userArr.push(newUser);
    localStorage.setItem("userData", JSON.stringify(userArr));
    alert("WELCOME REGISTERED SUCCESSFULLY!");
    window.location.replace("../index.html");
  }
});
