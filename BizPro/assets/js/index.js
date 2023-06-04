let bottom = document.querySelector(".sec2-bottom");
let arrowup = document.querySelector(".arrowup");
let arrowdown = document.querySelector(".arrowdown");
let search = document.querySelector("#search");
let menuIcon = document.querySelector(".burger");
let mobileUl = document.querySelector("ul");

menuIcon.addEventListener("click", function () {
  mobileUl.classList.toggle("show");
  this.classList.contains("fa-bars")
    ? (this.classList = "fa-solid fa-xmark")
    : (this.classList = "fa-solid fa-bars");
});

let BASE_URL = "http://localhost:8080/user";
axios(BASE_URL).then((res) => {
  getData(res.data);
});

function getData(arr) {
  bottom.innerHTML = "";
  arr.forEach((element) => {
    bottom.innerHTML += `
    <div class="card" style="width: 18rem;">
    <div class="d-flex justify-content-center" style="border-radius: 50%; border: 3px solid;">
    <img src="./assets/img/${element.photo}" alt=""  style="width: 3rem;">
    </div>
     <div class="card-body">
       <h5 class="card-title">${element.title}</h5>
       <p class="card-text">${element.text}</p>
       <a href="./userForm.html?id=${element.id}" class="btn btn-primary" onclick=editBtn("${element.id}")>Edit</a>
         <a href="#" class="btn btn-danger mt-1" onclick=deleteBtn("${element.id}",this)>Delete</a>
       <a href="#" class="btn btn-success" onclick=addFav("${element.id}")>Add to Basket</a>
     
       </div>
   </div>
    `;
  });
}

async function deleteBtn(id, btn) {
  await axios.delete(`${BASE_URL}/${id}`);
  btn.closest(".card").remove();
}

async function addFav(userid) {
  const res = await axios(`${BASE_URL}/${userid}`);
  const obj = await res.data;
  console.log(obj);
  await axios.post("http://localhost:8080/fav", obj);
  window.location.href='favorite.html'
}

arrowup.addEventListener("click", function () {
  axios(BASE_URL).then((res) => {
    let sortedArr = res.data.sort((a, b) => a.price - b.price);
    getData(sortedArr);
  });
});
arrowdown.addEventListener("click", function () {
  axios(BASE_URL).then((res) => {
    let sortedArr = res.data.sort((a, b) => b.price - a.price);
    getData(sortedArr);
  });
});

let arr = [];
search.addEventListener("input", async function (event) {
  arr.innerHTML = "";
  await axios(BASE_URL).then((res) => {
    arr = res.data.filter((item) =>
      item.title
        .toLocaleLowerCase()
        .includes(event.target.value.toLocaleLowerCase())
    );
    console.log(arr);
    getData(arr);
  });
});
