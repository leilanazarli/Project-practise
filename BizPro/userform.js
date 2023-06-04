let title = document.querySelector("#title");
let text = document.querySelector("#text");
let photo = document.querySelector("#photo");
let add = document.querySelector(".add");
let submitBtn = document.querySelector("#submitBtn");
let form = document.querySelector("form");
const BASE_URL = "http://localhost:8080/user";

let id = new URLSearchParams(window.location.search).get("id");
console.log(id);

async function createUser() {
  let obj = {
    title: title.value,
    text: text.value,
    photo: `${photo.value.split("\\")[2]}`,
  };

  await axios.post(`${BASE_URL}`, obj);
  window.location = "index.html";
}

if (id) {
  async function forEdit() {
    await axios(`${BASE_URL}/${id}`).then((res) => {
      title.value = res.data.title;
      text.value = res.data.text;
    });
  }
  forEdit();
  add.innerHTML = "Edit User";
  submitBtn.value = "Edit";
}

async function editUser() {
  let obj = {
    title: title.value,
    text: text.value,
    photo: `${photo.value.split("\\")[2]}`,
  };
  await axios.patch(`${BASE_URL}/${id}`, obj);
  window.location = "index.html";
}
form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (id) {
    editUser();
  } else {
    createUser();
  }
});
