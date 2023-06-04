let cards= document.querySelector(".cards")
let bar = document.querySelector(".burger");
let ul = document.querySelector("ul");

bar.addEventListener("click" ,function(){
    ul.classList.toggle("show")
    bar.classList.contains("fa-bars")
    ?(this.classList="fa-solid fa-xmark")
    :(this.classList="fa-solid fa-bars")
})


let id= new URLSearchParams(window.location.search).get("id")
let BASE_URL=("http://localhost:6060/project")
async function getDetails(){
    cards.innerHTML=""
   let res = await axios(`${BASE_URL}/${id}`)
   let data=res.data
    cards.innerHTML=`
   <div class="d-flex  ">
   <img src="./assets/img/${data.photo}" class="card-img-top w-50" alt="...">
   <div class="card  " style="width: 50% ;border-radius:0;">
   <div class="card-body" >
     <h3 class="card-title "><i><strong>Name:</strong>${data.title}</i></h3><br>
     <p class="card-text"><b>Creator:</b> ${data.creator}</p>
     <p class="card-text"><b>Text:</b> ${data.text}</p>
     <p class="card-text"><b>Description:</b> ${data.description}</p>
     <p class="card-text"><b>Email:</b> ${data.email}</p>
     <p class="card-text"><b>Price:</b> ${data.price}</p>
   </div>
 </div>
   </div>
  `
}
getDetails()
