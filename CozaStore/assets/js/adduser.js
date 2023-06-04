let name=document.querySelector("#name") 
let price=document.querySelector("#price") 
let photo=document.querySelector("#photo") 
let about=document.querySelector("#about") 
let form=document.querySelector("form") 
let submitBtn=document.querySelector(".submitBtn") 
let edith1=document.querySelector(".add") 
let ul=document.querySelector("ul") 
let burger=document.querySelector(".burger") 
 
burger.addEventListener("click" , function(){
    ul.classList.toggle("show")
    burger.classList.contains("fa-bars")
    ?(this.classList="fa-solid fa-xmark")
    :(this.classList="fa-solid fa-bars")
}) 
 
 
let id= new URLSearchParams(window.location.search).get("id")
let Base_url="http://localhost:1122/users"

async function createUser(){
   let obj={
   name:name.value,
   about:about.value,
   price:price.value,
   photo:`${photo.value.split("\\")[2]}`
   }
   await axios.post(Base_url,obj)
   window.location="index.html"
}

async function editUser(){
   let obj={
    name:name.value,
    about:about.value,
    price:price.value,
    photo:`${photo.value.split("\\")[2]}`
   }
   await axios.patch(`${Base_url}/${id}`,obj)
   window.location="index.html"
}

 if(id){
    async function forEdit(){
        await axios(`${Base_url}/${id}`).then(res=>{
        name.value=res.data.name
        price.value=res.data.price
        about.value=res.data.about
        })
     }
     forEdit()
     submitBtn.innerHTML="Edit"
     edith1.innerHTML="Edit User"
 }
 
 
 form.addEventListener("submit" ,async function(event){
    event.preventDefault()
    if(id){
    editUser()
    }else{
    createUser()
    }
    
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