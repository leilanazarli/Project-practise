 let bar =document.querySelector(".burger")
 let btn =document.querySelector(".ascbtn")
 let search =document.querySelector("#search")
 let cards =document.querySelector(".cards-dinamic")
 let ul =document.querySelector("ul")

bar.addEventListener("click", function(){
    ul.classList.toggle("show")
    this.classList.contains("fa-bars")
    ?(this.classList="fa-solid fa-xmark")
    :(this.classList="fa-solid fa-bars")
})

let fav=[]
let searchArr=[]
let allData=[]
let BASE_URL='http://localhost:7888/users'

async function getData() {
    cards.innerHTML=""
    const res = await axios(BASE_URL)
    searchArr=res.data
    allData=res.data
    fav = fav.length || search.value ? fav : res.data;
   fav.forEach(element => {
    cards.innerHTML+=`
    <div class="card bg-transparent " style="width: 18rem; border: none;">
    <img src="./assets/img/${element.photo}" class="card-img-top" style="width:250px;height:250px;" alt="...">
    <div class="card-body ">
      <h5 class="card-title" style="color: #0c5b47;font-size: 25px;font-weight: 200;text-align: center;">${element.name}</h5>
      <p class="card-text mt-3 mb-3" style="font-style: italic;color: #1b745e;text-align: center;">${element.price}</p>
      <div class="d-flex justify-content-center gap-1 flex-wrap">
      <a href="./adduser.html?id=${element.id}" class="btn btn-success">Edit</a>
      <a href="./detail.html?id=${element.id}" class="btn btn-success">Details</a>
      <a href="#" class="btn btn-success" onclick="deleteBtn(${element.id})">Delete</a>
      <a href="#" class="btn btn-success" onclick="addBtn(${element.id})">Add to Basket</a>
      </div>
    </div>
  </div>
    `
   });

}
getData()

async function deleteBtn(userid){
   await axios.delete(`${BASE_URL}/${userid}`)
   fav=allData.filter(item=>item.id!=userid)
   getData()
}

btn.innerHTML="Ascending"
btn.addEventListener("click", function(){
  if(btn.innerHTML==="Ascending"){
    fav.sort((a,b)=>a.price-b.price)
    console.log(fav);
    btn.innerHTML="Descending"
  }
  else if(btn.innerHTML==="Descending"){
    fav.sort((a,b)=>b.price-a.price)
    btn.innerHTML="Default"
    console.log(fav);

  }
  else{
    btn.innerHTML="Ascending"
    console.log(fav);
  }
  getData()
})
search.addEventListener("input",function(event){
    fav=searchArr
    fav=fav.filter(item=>item.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
    getData()
})

async function addBtn(id){
   let res=await axios(`${BASE_URL}/${id}`)
   let obj=await res.data
   await axios.post('http://localhost:7888/fav',obj)
}