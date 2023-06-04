let cards=document.querySelector(".cards")
let bar=document.querySelector(".burger")
let ul=document.querySelector(".disp")

bar.addEventListener("click" ,function(){
    ul.classList.toggle("show")
    bar.classList.contains("fa-bars")
    ?(this.classList="fa-solid fa-xmark")
    :(this.classList="fa-solid fa-bars")
})
let BASE_URL=('http://localhost:6085/users')
let id= new URLSearchParams(window.location.search).get("id")

let fav=[]


async function getData(){
    cards.innerHTML=''
    let res=await axios(BASE_URL)
    fav=res.data
    fav.forEach(element => {
        cards.innerHTML=  `
        <div class="card" style="width: 18rem;">
        <div class="d-flex justify-content-center p-2">
         <img src="./assets/img/${element.photo}" style="width: 150px;height:250px;" alt="">
        </div>
         <div class="card-body ">
           <h5 class="card-title" style="font-size: 18px;font-weight: 700;text-align:center;">${element.name}</h5>
           <p class="card-text mb-2" style="text-align:center;">${element.title}</p>
         </div>
       </div>`
    });
}
getData()

