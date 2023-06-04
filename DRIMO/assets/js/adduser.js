let title =document.querySelector("#title")
let text =document.querySelector("#text")
let photo =document.querySelector("#photo")
let price =document.querySelector("#price")
let submitbtn =document.querySelector(".submitbtn")
let add =document.querySelector(".add")
let form =document.querySelector("form")
let bar = document.querySelector(".burger");
let ul = document.querySelector("ul");

bar.addEventListener("click" , function(){
    ul.classList.toggle("show")
    bar.classList.contains("fa-bars")
    ?(this.classList="fa-solid fa-xmark")
    :(this.classList="fa-solid fa-bars")
})

let id= new URLSearchParams(window.location.search).get("id")

let BASE_URL=("http://localhost:6060/project")

async function createUser(){
    let obj={
        title:title.value,
        price:price.value,
        text:text.value,
        photo:`${photo.value.split("\\")[2]}`,
    }
    await axios.post(`${BASE_URL}`,obj)
    window.location="index.html"

}
if(id){
    async function forEdit(){
        await axios(`${BASE_URL}/${id}`).then(res=>{
            title.value=res.data.title 
            text.value=res.data.text 
            price.value=res.data.price 
        })
    }
    forEdit()
    submitbtn.innerHTML="Edit"
    add.innerHTML="Edit User"
}

async function EditUser(){
    let obj={
        title:title.value,
        text:text.value,
        price:price.value,
        photo:`${photo.value.split("\\")[2]}`,
    }
    await axios.patch(`${BASE_URL}/${id}`,obj)
    window.location="index.html"

}

form.addEventListener("submit" , async function(event){
    event.preventDefault()
    if(id){
        EditUser()
    }
    else{
        createUser()
    }
})