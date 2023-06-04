let cards= document.querySelector(".cards")
let bar = document.querySelector(".burger");
let ul = document.querySelector("ul");

bar.addEventListener("click" ,function(){
    ul.classList.toggle("show")
    bar.classList.contains("fa-bars")
    ?(this.classList="fa-solid fa-xmark")
    :(this.classList="fa-solid fa-bars")
})

let BASE_URL=("http://localhost:6060/fav")
let fav=[]

async function getFav(){
    cards.innerHTML=''
   let res= await axios(BASE_URL)
   fav=res.data
   fav.forEach(element => {
    cards.innerHTML+=`<div class="card  " style="width: 18rem ;">
    <img src="./assets/img/${element.photo}" class="card-img-top" alt="...">
    <div class="card-body">
      <h3 class="card-title "><b>Name:</b>${element.title}</h3>
      <p class="card-text"><b>Text:</b> ${element.text}</p>
      <p class="card-text"><b>Price:</b> ${element.price}</p>
      <a href="#" class="btn btn-danger mt-1" onclick=deleteBtn("${element.id}")>Delete</a>
    </div>
  </div>`
   });
}
 getFav()
  async function deleteBtn(id){
    await axios.delete(`${BASE_URL}/${id}`)
    getFav()
  }