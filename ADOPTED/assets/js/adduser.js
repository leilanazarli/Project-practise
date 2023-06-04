let submitBtn=document.querySelector(".submitBtn")
let form=document.querySelector("form")
let add=document.querySelector(".add")
let name=document.querySelector("#name")
let username=document.querySelector("#username")
let years=document.querySelector("#years")
let photo=document.querySelector("#photo")
let about=document.querySelector("#floatingTextarea2")

let id= new URLSearchParams(window.location.search).get("id")

let Base_url="http://localhost:1111/users"

async function createUser(){
    let obj={
        username:username.value,
        name:name.value,
        years:years.value,
        photo:`${photo.value.split("\\")[2]}`,
        about:about.value
    }
    await axios.post(`${Base_url}`,obj)
    window.location="index.html"
}
async function editUser(){
     let obj={
        username:username.value,
        name:name.value,
        years:years.value,
        photo:`${photo.value.split("\\")[2]}`,
        about:about.value
     }
     await axios.patch(`${Base_url}/${id}`,obj)
     window.location="index.html"
}
 if(id){
    async function forEdit(){
     await axios(`${Base_url}/${id}`).then(res=>{
        username.value=res.data.username
        name.value=res.data.name
        years.value=res.data.years
        about.value=res.data.about
     })
    }
    forEdit()
    add.innerHTML="Edit User"
    submitBtn.innerHTML="Edit"
 }
 form.addEventListener("submit" , async function(event){
    event.preventDefault()
    if(id){
        editUser()
    }
    else{
        createUser()
    }
 })