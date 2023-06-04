let cards = document.querySelector(".carda");
let ascbtn = document.querySelector(".ascbtn");
let search = document.querySelector("#search");
let loadmore = document.querySelector("#loadmore");

let bar = document.querySelector(".burger");
let ul = document.querySelector(".disp");

bar.addEventListener("click", function () {
  ul.classList.toggle("show");
  bar.classList.contains("fa-bars")
    ? (this.classList = "fa-solid fa-xmark")
    : (this.classList = "fa-solid fa-bars");
});

let BASE_URL = "http://localhost:6085/users";
let fav = [];
let searchArr = [];
let copyArr = [];
let num = 2;


async function getData() {
  cards.innerHTML = "";
  let res = await axios(BASE_URL);
  let data = res.data;
  searchArr = data;
  console.log(num);
  fav = fav.length || search.value ? fav.slice(0, num) : data.slice(0, num);
  copyArr = data;
  console.log('fav',fav);
  console.log('data',data);
  fav.forEach((element) => {
    cards.innerHTML += `
        <div class="card" style="width: 18rem;">
             <div class="d-flex justify-content-center p-2">
              <img src="./assets/img/${element.photo}" style="width: 150px;height:250px;" alt="">
             </div>
              <div class="card-body ">
                <h5 class="card-title" style="font-size: 18px;font-weight: 700;text-align:center;">${element.name}</h5>
                <p class="card-text mb-2" style="text-align:center;">${element.title}</p>
             <div class="d-flex flex-wrap">
             <a href="./detail.html?id=${element.id}" class="button"  >View details</a>
             <a href="#" class="button" onclick="addBtn(${element.id})" >Add to Basket</a>
             <a href="#" class="button" onclick="deleteBtn(${element.id})">Delete</a>
             <a href="./adduser.html?id=${element.id}" class="button">Edit</a>
             </div>
              </div>
            </div>`;
  });
}
getData();

loadmore.addEventListener("click", function () {
  num = num + 4;
//   copyArr.slice(0, num);
  fav = copyArr;
console.log('loading',num);
getData()
});

async function deleteBtn(id) {
  await axios.delete(`${BASE_URL}/${id}`);
  getData();
}

ascbtn.innerHTML = "Ascending";
ascbtn.addEventListener("click", async function () {
  if (ascbtn.innerHTML === "Ascending") {
    fav.sort((a, b) => a.years - b.years);
    ascbtn.innerHTML = "Descending";
  } else if (ascbtn.innerHTML === "Descending") {
    fav.sort((a, b) => b.years - a.years);
    ascbtn.innerHTML = "Default";
  } else {
    ascbtn.innerHTML = "Ascending";
  }
  getData();
});

search.addEventListener("input", function (event) {
  fav = searchArr;
  fav = fav.filter((item) =>
    item.name
      .toLocaleLowerCase()
      .includes(event.target.value.toLocaleLowerCase())
  );
  getData();
});

async function addBtn(id) {
  let res = await axios(`${BASE_URL}/${id}`);
  let obj = res.data;
  await axios.post("http://localhost:6085/fav", obj);
}
