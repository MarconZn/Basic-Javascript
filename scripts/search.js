"use strict";
// CAI DAT PHIM TAT
const news = document.getElementById("news-container");
const pageView = document.getElementById("pageview");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const currentNum = document.getElementById("page-num");
const searchText = document.getElementById("input-query");
const btnSearch = document.getElementById("btn-submit");

// KHAI BAO BIEN VA HAM
let totNumber = 1;
const userLogin = JSON.parse(localStorage.getItem("userLogin"));
const setArr =
  JSON.parse(localStorage.getItem("getSet")) !== null
    ? JSON.parse(localStorage.getItem("getSet"))
    : [];
const curUser = setArr.find((i) => i.userName === userLogin.userName);
let curPage = 1;
if (setArr.find((i) => i.userName === userLogin.userName)) {
} else {
  const data = {
    userName: userLogin.userName,
    page: 5,
    cat: "general",
  };
  setArr.push(data);
  localStorage.setItem("getSet", JSON.stringify(setArr));
}

const renderNews = function (data, page) {
  news.innerText = "";
  for (let i = 0; i < page; i++) {
    const row = document.createElement("div");
    row.innerHTML = `<div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
  <img
    style="width: 100%; height: 100%; object-fit: contain"
    src="${data.articles[i].urlToImage}" alt= "News Picture"
  />
</div>
<div class="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
  <h5>${data.articles[i].title}</h5>
  <p>${data.articles[i].description}</p>
  <button type="button" class="btn btn-primary" id="btn-view">
    <a href="${data.articles[i].url}" style="color: white" target="_blank">View</a>
  </button>
</div>`;
    row.classList.value = "newsdiv";
    news.appendChild(row);
  }
};

// LAY THONG TIN API
const request = async function (page, pageNum, search) {
  const res = await fetch(
    `https://newsapi.org/v2/everything?pageSize=${page}&page=${pageNum}&q=${search}&apiKey=bc2565cf28ce439ca5f3a779c11e6c69`
  );
  const data = await res.json();
  totNumber = data.totalResults;
  renderNews(data, page);
};

// CHUC NANG SEARCH
btnSearch.addEventListener("click", function () {
  if (userLogin === "") {
    alert("PLEASE LOG IN FIRST!");
  } else if (searchText.value === "") {
    alert("PLEASE INPUT SEARCH CONTENT!");
  } else {
    btnPrev.style.visibility = "hidden";
    request(curUser.page, curPage, searchText.value);
  }
});

//CHUC NANG NEXT
btnNext.addEventListener("click", function () {
  const limitPage = Math.ceil(totNumber / curUser.page);
  curPage++;
  if (curPage > limitPage) {
    curPage = limitPage;
    btnNext.style.visibility = "hidden";
    btnPrev.style.visibility = "visible";
  } else {
    btnPrev.style.visibility = "visible";
    btnNext.style.visibility = "visible";
  }
  currentNum.innerHTML = curPage;
  request(curUser.page, curPage, searchText.value);
});

// CHUC NANG PREV
btnPrev.addEventListener("click", function () {
  curPage--;
  if (curPage <= 1) {
    curPage = 1;
    btnNext.style.visibility = "visible";
    btnPrev.style.visibility = "hidden";
  } else {
    btnPrev.style.visibility = "visible";
    btnNext.style.visibility = "visible";
  }
  currentNum.innerHTML = curPage;
  request(curUser.page, curPage, searchText.value);
});
