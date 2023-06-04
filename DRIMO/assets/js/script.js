let cards = document.querySelector(".data");
let search = document.querySelector("#search");
let sortBtn = document.querySelector(".sorted");
let loadmore = document.querySelector(".loadmore");
let bar = document.querySelector(".burger");
let ul = document.querySelector("ul");

bar.addEventListener("click" ,function(){
  ul.classList.toggle("show")
  bar.classList.contains('fa-bars')
  ?(this.classList="fa-solid fa-xmark")
  :(this.classList="fa-solid fa-bars")
})

let BASE_URL=("http://localhost:6060/project")

let num=2
let fav=[]
let allData=[]
let searchArr=[]
let copyArr=[]
 async function getData(){
  cards.innerHTML=''
  let res= await axios(BASE_URL)
  let data= res.data
  searchArr=data
  allData=data
  copyArr=data
  fav=fav.length ||search.value ?fav.slice(0,num) :data.slice(0,num)
  fav.forEach(element => {
    cards.innerHTML+=`
    <div class="card  " style="width: 18rem ;">
    <img src="./assets/img/${element.photo}" class="card-img-top" alt="...">
    <div class="card-body">
      <h4 class="card-title "><b>Name:</b>${element.title}</h4>
      <p class="card-text"><b>Text:</b> ${element.text}</p>
      <p class="card-text"><b>Price:</b> ${element.price}</p>
      <a href="#" class="btn btn-danger mt-1" onclick="deleteBtn(${element.id})">Delete</a>
      <a href="./adduser.html?id=${element.id}" class="btn btn-warning mt-1" >Edit</a>
      <a href="./detail.html?id=${element.id}" class="btn btn-info mt-1" >Details</a>
      <a href="#" class="btn btn-light mt-1" onclick=favBtn("${element.id}")>Add to Basket</a>
    </div>
  </div>
    `;
  });

 }
 getData()
  
 async function deleteBtn(id){
  await axios.delete(`${BASE_URL}/${id}`)
  fav = allData.filter((item) => item.id != id);
  getData()
 }
 
 
   loadmore.addEventListener("click" , async function(){
     num=num+2
     fav=copyArr
     getData()
    //  console.log(num);
     console.log(copyArr.length);
     if(fav.length===num){
      loadmore.innerHTML="Unload"
    }
  
    })
   
   
     
     
 search.addEventListener("input" ,async function(event){
  fav=searchArr
  fav=fav.filter(item=>item.title.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
  getData()
 })


 sortBtn.innerHTML="Ascending"
 sortBtn.addEventListener("click" , async function(){
   if(sortBtn.innerHTML==="Ascending"){
    fav.sort((a,b)=>a.price-b.price)
    sortBtn.innerHTML="Descending"
  }
  else if(sortBtn.innerHTML==="Descending"){
    fav.sort((a,b)=>b.price-a.price)
    sortBtn.innerHTML="Default"
  }
  else{
    sortBtn.innerHTML="Ascending"
  }
  getData()
 })
 
async function favBtn(id){
  let res= await axios(`${BASE_URL}/${id}`)
  let obj=res.data
  await axios.post("http://localhost:6060/fav",obj)
 }
 