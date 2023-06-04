let ul=document.querySelector("ul") 
let burger=document.querySelector(".burger") 
 
burger.addEventListener("click" , function(){
    ul.classList.toggle("show")
    burger.classList.contains("fa-bars")
    ?(this.classList="fa-solid fa-xmark")
    :(this.classList="fa-solid fa-bars")
}) 
 
let cards=document.querySelector(".row")
let id= new URLSearchParams(window.location.search).get("id")
let  Base_url=("http://localhost:1122/users")

async function getDetail(){
cards.innerHTML=""
   let res =await axios(`${Base_url}/${id}`)
   let data=res.data
   cards.innerHTML=`
   <div class="card d-flex justify-content-center" style="width: 50%;border:none;">
   <div class="img ">
   <img src="./assets/img/${data.photo}" class="card-img-top" alt="...">
   </div>
   <div class="card-body">
<h5 ><b>Name:</b><i><strong>${data.name}</strong></i></h5>
<h5 ><b>Year:</b>${data.price}</h5>
<p class="text w-100 pb-2"><b>About:</b>${data.about}</p>
</div>
</div>
   `
}
getDetail()

const header = document.querySelector('header')

function scrollFunction() {
    if (window.scrollY<100 ) {
    console.log(window.scrollY);
        header.style.background = 'transparent';
    
    } else {
        header.style.background = 'white';
    }
}
window.onscroll = function () { scrollFunction() }