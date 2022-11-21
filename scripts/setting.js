"use strict";
// DAT PHIM TAT
const pageSize = document.getElementById("input-page-size");
const cate = document.getElementById("input-category");

// KHAI BAO BIEN VA HAM
const setArr =
  JSON.parse(localStorage.getItem("getSet")) !== null
    ? JSON.parse(localStorage.getItem("getSet"))
    : [];
const userLogin = JSON.parse(localStorage.getItem("userLogin"));

// CHUC NANG DOI SETTING
document.getElementById("btn-submit").addEventListener("click", function () {
  if (userLogin === "") {
    alert("PLEASE LOG IN!");
  } else if (pageSize.value === "") {
    alert("PLEASE INPUT NUMBER NEWS FOR EACH PAGE!");
  } else if (pageSize.value < 1) {
    alert("PAGE NUMBER MUST HIGHER THAN 1");
  } else if (confirm("DO YOU WANT TO SAVE THIS SETTING?")) {
    let currentUser = setArr.find((i) => i.userName === userLogin.userName);
    if (currentUser === undefined) {
      currentUser = {
        userName: userLogin.userName,
        page: pageSize.value,
        cat: cate.value.toLocaleLowerCase(),
      };
      setArr.push(currentUser);
      localStorage.setItem("getSet", JSON.stringify(setArr));
    } else {
      currentUser.page = pageSize.value;
      currentUser.cat = cate.value;
      localStorage.setItem("getSet", JSON.stringify(setArr));
    }
    alert("SAVE SUCCESSFULLY!");
  }
});
