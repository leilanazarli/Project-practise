let name=document.querySelector("#name")
let price=document.querySelector("#price")
let add=document.querySelector(".add")
let photo=document.querySelector("#photo")
let form=document.querySelector("form")
let submitBtn=document.querySelector(".submitBtn")


let BASE_URL='http://localhost:7888/users'

let id= new URLSearchParams(window.location.search).get("id") 


async function createUser(){
    let obj={
        name:name.value,
        price:price.value,
        photo:`${photo.value.split("\\")[2]}`
    }
    await axios.post(`${BASE_URL}`,obj)
    window.location='index.html'
}

 if(id){
    async function forEdit(){
        await axios(`${BASE_URL}/${id}`).then(res=>{
            name.value=res.data.name
            price.value=res.data.price
        })
    }
    forEdit()
    submitBtn.innerHTML="Edit"
    add.innerHTML="Edit User"
 }

async function editUser(){
    let obj={
        name:name.value,
        price:price.value,
        photo:`${photo.value.split("\\")[2]}`
    }
    await axios.patch(`${BASE_URL}/${id}`,obj)
    window.location='index.html'

}

form.addEventListener("submit" ,async function(event){
    event.preventDefault();
     if(id){
        editUser()
     }
     else{
        createUser()
     }
})