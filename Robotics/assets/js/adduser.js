let name=document.querySelector("#name")
let price=document.querySelector("#price")
let photo=document.querySelector("#photo")
let submitbtn=document.querySelector(".submit")
let form=document.querySelector("form")
let bar=document.querySelector(".burger")
let ul=document.querySelector(".disp")

bar.addEventListener("click" ,function(){
    ul.classList.toggle("show")
    bar.classList.contains("fa-bars")
    ?(this.classList="fa-solid fa-xmark")
    :(this.classList="fa-solid fa-bars")
})
let id= new URLSearchParams(window.location.search).get("id")
let BASE_URL=('http://localhost:6085/users')


async function createUser(){
    let obj={
        name:name.value,
        price:price.value,
        photo:`${photo.value.split("\\")[2]}`
    }
    await axios.post(`${BASE_URL}`, obj)
    window.location="index.html"
}

if(id){
    async function forEdit(){
        await axios(`${BASE_URL}/${id}`).then(res=>{
            name.value=res.data.name
            price.value=res.data.price
        })
    }
    forEdit()
    submitbtn.value="Edit"
    
}
async function editUser(){
    let obj={
        name:name.value,
        price:price.value,
        photo:`${photo.value.split("\\")[2]}`
    }
    await axios.patch(`${BASE_URL}/${id}`, obj)
    window.location="index.html"
}

form.addEventListener("submit" ,function(event){
    event.preventDefault()
    if(id){
        editUser()
    }
    else{
        createUser()
    }
})