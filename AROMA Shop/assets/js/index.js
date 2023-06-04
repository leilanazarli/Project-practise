let cards=document.querySelector(".data")
let loadmore=document.querySelector(".loadmore")
let ascBtn=document.querySelector(".asc")
let search=document.querySelector("#search")
// let burger=document.querySelector(".burger")
// let ul=document.querySelector(".all")

// burger.addEventListener("click" ,function(){
//     ul.classList.toggle("show")
//     burger.classList.contains("fa-bars")
//     ?(this.classList="fa-solid fa-xmark")
//     :(this.classList="fa-solid fa-bars")
// })

let Base_url='http://localhost:1111/product'

let fav=[]
let searchArr=[]
let allData=[]
let num=2

async function getData(){
cards.innerHTML=""
    let res =await axios(Base_url)
    let data=res.data
    searchArr=data
    allData=data
    fav=fav.length || search.value ?fav.slice(0,num) :data.slice(0,num)
    fav.forEach(element => {
       cards.innerHTML+=`
       <div class=" card col col-3">
                        <img src="./assets/img/${element.image}" alt="">
                               <div href="" class="allhover">
                                <a href=""><i class="fa-sharp fa-solid fa-magnifying-glass"></i></a>
                                <a href=""><i class="fa-sharp fa-solid fa-cart-shopping"></i></a>
                                <a href="#" onclick="addFav(${element.id})"><i class="fa-regular fa-heart"></i></a>
                               </div>
                               <div class="card-body d-flex justify-content-center flex-column gap-1">
                            <span>${element.category}</span>
                            <h2>${element.name}</h2>
                            <p>${element.price}</p>
                            <div class="d-flex gap-1">
                            <a href="#" onclick="deleteBtn(${element.id})" class="btn btn-outline-primary">Delete</a>
                            <a href="./detail.html?id=${element.id}"  class="btn btn-outline-warning">Details</a>
                            <a href="./adduser.html?id=${element.id}" class="btn btn-outline-primary">Edit</a>
                            </div>
                        </div>
                    </div>
       ` 
    });
}  
getData()

loadmore.addEventListener("click" ,async function(){
 num=num+2
 fav=allData
 getData()
})
async function deleteBtn(id){
    await axios.delete(`${Base_url}/${id}`)
    fav=allData.filter(item=>item.id!=id)
    getData()
}
ascBtn.innerHTML="Ascending"
ascBtn.addEventListener("click" ,async function(){
    if(ascBtn.innerHTML=="Ascending"){
    fav.sort((a,b)=>a.price-b.price)
    ascBtn.innerHTML="Descending"
}
else if(ascBtn.innerHTML=="Descending"){
    fav.sort((a,b)=>b.price-a.price)
    ascBtn.innerHTML="Default"
}else{
   fav=[...allData]
   ascBtn.innerHTML="Ascending"
}
getData()
})
search.addEventListener("input" , async function(event){
   fav=searchArr
   fav=fav.filter(item=>item.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
    getData()
})
async function addFav(id){
    let res=await axios(`${Base_url}/${id}`)
    let obj=res.data
    await axios.post("http://localhost:1111/favorite",obj)
}