let carousel_item=document.querySelector(".cor")
let ascBtn=document.querySelector(".asc")
let loadmore=document.querySelector(".loadmore")
let spinner=document.querySelector(".spinner")
let bar=document.querySelector(".burger")
let ul=document.querySelector("ul")
let search=document.querySelector("#search")

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

let Base_url=("http://localhost:1111/users")

let num=2
let fav=[]
let allData=[]
let searchArr=[]
async function getData(){
    carousel_item.innerHTML=""
    let response=await axios(Base_url)
    let data=await response.data
    searchArr=data
    allData=data
    fav=fav.length || search.value ?fav.slice(0,num) :data.slice(0,num)
    fav.forEach(element => {
        carousel_item.innerHTML+=`
            <div class="card" style="width: 18rem;">
            <img src="./assets/img/${element.photo}" class="card-img-top" alt="...">
            <div class="card-body">
            <a href="#" class="btn btn-warning" onclick="addFav(${element.id})" ><i class="fa-regular fa-heart"></i></a>
        <h5 class="card-title"><b>Name:</b>${element.name}</h5>
        <h5 class="card-title"><b>Surname:</b>${element.username}</h5>
        <h5 class="card-title"><b>Year:</b>${element.years}</h5>
        <p class="text w-100"><b>About:</b>${element.about}</p>
        <a href="./adduser.html?id=${element.id}" class="btn btn-success">Edit</a>
        <a href="#" class="btn btn-warning" onclick="deleteBtn(${element.id})">Delete</a>
        <a href="./detail.html?id=${element.id}" class="btn btn-success">Detail</a>
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
    await axios.post('http://localhost:1111/fav',obj)
}

ascBtn.innerHTML="Ascending"
ascBtn.addEventListener("click" , async function(){
    if(ascBtn.innerHTML=="Ascending"){
        fav.sort((a,b)=>a.years-b.years)
        ascBtn.innerHTML="Descending"
    }
    else if(ascBtn.innerHTML=="Descending"){
        fav.sort((a,b)=>b.years-a.years)
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

