let cards=document.querySelector(".cards")
let bar=document.querySelector(".burger")
let ul=document.querySelector("ul")

bar.addEventListener("click" ,function(){
    ul.classList.toggle("show")
    bar.classList.contains("fa-bars")
    ?(this.classList="fa-solid fa-xmark")
    :(this.classList="fa-solid fa-bars")
})


let id = new URLSearchParams(window.location.search).get("id")
let Base_url=("http://localhost:1111/users")


async function getDetail(){
    let res= await axios(`${Base_url}/${id}`)
    let data=res.data
        cards.innerHTML=`
        <div class="card w-50 " >
        <img src="./assets/img/${data.photo}" class="card-img-top" alt="...">
        </div>
            <div class="card-body w-50">
        <h5 class="card-title"><b>Name:</b>${data.name}</h5>
        <h5 class="card-title"><b>Surname:</b>${data.username}</h5>
        <h5 class="card-title"><b>Year:</b>${data.years}</h5>
        <p class="text w-100"><b>About:</b>${data.about}</p>
    </div>
        `
}
getDetail()