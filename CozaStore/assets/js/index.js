
let cards=document.querySelector(".data")
let ascBtn=document.querySelector(".asc")
let loadmore=document.querySelector(".loadmore")
let spinner=document.querySelector(".spinner")
let bar=document.querySelector(".burger")
let ul=document.querySelector("ul")
let search=document.querySelector(".search")

bar.addEventListener("click", function(){
    ul.classList.toggle("show")
    bar.classList.contains("fa-bars")
    ?(this.classList="fa-solid fa-xmark")
    :(this.classList="fa-solid fa-bars")
})
spinner.style.display="none"
window.addEventListener("load", async function(){
    spinner.style.display="flex"

    await axios(Base_url).then(res=>{
        spinner.style.display="none"

    })

})

let Base_url=("http://localhost:1122/users")

let num=4
let fav=[]
let allData=[]
let searchArr=[]
async function getData(){
    cards.innerHTML=""
    let response=await axios(Base_url)
    let data=await response.data
    searchArr=data
    allData=data
    fav=fav.length || search.value ?fav.slice(0,num) :data.slice(0,num)
    fav.forEach(element => {
        cards.innerHTML+=`
            <div class="card" style="width: 18rem;border:none;">
            <div class="img">
            <img src="./assets/img/${element.photo}" class="card-img-top" alt="...">
            </div>
            <div class="buttonhover  ">
            <button class="buttonwhite">Quick View</button>
            </div>
            <div class="card-body">
            <a href="#" class="btn btn-danger" onclick="addFav(${element.id})" ><i class="fa-regular fa-heart"></i></a>
        <h5 ><b>Name:</b>${element.name}</h5>
        <h5 ><b>Year:</b>${element.price}</h5>
        <p class="text w-100 pb-2"><b>About:</b>${element.about}</p>
        <a href="./adduser.html?id=${element.id}" class="btn btn-dark">Edit</a>
        <a href="#" class="btn btn-primary" onclick="deleteBtn(${element.id})">Delete</a>
        <a href="./detail.html?id=${element.id}" class="btn btn-dark">Detail</a>
    </div>
    </div>
        `
    });
}
getData()
loadmore.addEventListener("click" , async function(){
    num=num+2
    fav=allData
    getData()
})
async function deleteBtn(id){
    await axios.delete(`${Base_url}/${id}`)
    fav=allData.filter(item=>item.id!=id)
    getData()
}

async function addFav(id){
    let res=await axios(`${Base_url}/${id}`)
    let obj=res.data
    getData()
    await axios.post('http://localhost:1122/fav',obj)
}

ascBtn.innerHTML="Ascending"
ascBtn.addEventListener("click" , async function(){
    if(ascBtn.innerHTML=="Ascending"){
        fav.sort((a,b)=>a.price-b.price)
        ascBtn.innerHTML="Descending"
    }
    else if(ascBtn.innerHTML=="Descending"){
        fav.sort((a,b)=>b.price-a.price)
        ascBtn.innerHTML="Default"
    }
    else{
        fav=allData
        ascBtn.innerHTML="Ascending"
    }
    getData()
})
search.addEventListener("input" , async function(event){

    fav=searchArr
    fav=fav.filter(item=>item.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
   getData()
})

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


let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.addEventListener("scroll", scrolFunction) 

function scrolFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
