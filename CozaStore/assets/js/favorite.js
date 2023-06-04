let ul=document.querySelector("ul") 
let burger=document.querySelector(".burger") 
 
burger.addEventListener("click" , function(){
    ul.classList.toggle("show")
    burger.classList.contains("fa-bars")
    ?(this.classList="fa-solid fa-xmark")
    :(this.classList="fa-solid fa-bars")
}) 
let cards=document.querySelector(".cards")

let  Base_url=("http://localhost:1122/fav")

let fav=[]
let allData=[]
async function getFav(){
    cards.innerHTML=''
    let response=await axios(Base_url)
    let data=await response.data
    allData=data
    fav=data
    fav.forEach(element => {
        cards.innerHTML+=`
        <div class="card" style="width: 18rem;border:none;">
            <img src="./assets/img/${element.photo}" class="card-img-top" alt="...">
            <div class="card-body">
            <a href="#" class="btn btn-danger" onclick="addFav(${element.id})" style="position: absolute;top:10px"><i class="fa-solid fa-heart"></i></a>
        <h5 class="text-center"><b>Name:</b>${element.name}</h5>
        <h5  class="text-center"><b>Price:</b>${element.price}</h5>
        <p class="text w-100  text-center"><b>About:</b>${element.about}</p>
    <div class="d-flex justify-content-center">
    <a href="#" class="btn btn-dark mt-2" onclick="deleteBtn(${element.id})">Delete</a>
    
    </div>
    </div>
    </div>`
    });

}
getFav()

async function deleteBtn(id){
    await axios.delete(`${Base_url}/${id}`)
    fav=allData.filter(item=>item.id!=id)
    getFav()
}

const header = document.querySelector('header')

function scrollFunction() {
    if (window.scrollY<40 ) {
    console.log(window.scrollY);
        header.style.background = 'transparent';
    
    } else {
        header.style.background = 'white';
    }
}
window.onscroll = function () { scrollFunction() }