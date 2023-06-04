let submitBtn=document.querySelector(".submitBtn")
let form=document.querySelector("form")
let add=document.querySelector(".add")
let name=document.querySelector("#name")
let username=document.querySelector("#username")
let price=document.querySelector("#price")
let photo=document.querySelector("#photo")
let about=document.querySelector("#floatingTextarea2")

let id=new URLSearchParams(window.location.search).get("id")
let Base_url='http://localhost:1111/product'

async function createUser(){
  let obj={
   category:name.value,
   name:username.value,
   image:`${photo.value.split("\\")[2]}`,
   price:price.value,
   description:about.value
  }
  await axios.post(Base_url ,obj)
  window.location="index.html"
}
async function editUser(){
    let obj={
        category:name.value,
        name:username.value,
        image:`${photo.value.split("\\")[2]}`,
        price:price.value,
        description:about.value
    }
    await axios.patch(`${Base_url}/${id}`,obj)
    window.location="index.html"
}
if(id){
    async function forEdit(){
    await axios(`${Base_url}/${id}`).then(res=>{
    name.value=res.data.category;
    username.value=res.data.name;
    about.value=res.data.description;
    price.value=res.data.price;
    })
    }
    forEdit()
    submitBtn.innerHTML="Edit"
    add.innerHTML="Edit Product"
}
form.addEventListener("submit", async function(event){
 event.preventDefault()
 if(id){
 editUser()
 }else{
 createUser()
 }

})