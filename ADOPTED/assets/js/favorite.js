let cards=document.querySelector(".cards")

let  Base_url=("http://localhost:1111/fav")

let fav=[]
let allData=[]
async function getFav(){
    cards.innerHTML=''
    let response=await axios(Base_url)
    let data=await response.data
    allData=data
    fav=data
    fav.forEach(element => {
        cards.innerHTML+=`
        <div class="card" style="width: 18rem;">
            <img src="./assets/img/${element.photo}" class="card-img-top" alt="...">
            <div class="card-body">
            <a href="#" class="btn btn-warning"><i class="fa-solid fa-heart text-danger"></i></a>
        <h5 class="card-title"><b>Name:</b>${element.name}</h5>
        <h5 class="card-title"><b>Surname:</b>${element.username}</h5>
        <h5 class="card-title"><b>Year:</b>${element.years}</h5>
        <p class="text w-100"><b>About:</b>${element.about}</p>
        <a href="#" class="btn btn-warning" onclick="deleteBtn(${element.id})">Delete</a>
    </div>
    </div>`
    });

}
getFav()

async function deleteBtn(id){
    await axios.delete(`${Base_url}/${id}`)
    fav=allData.filter(item=>item.id!=id)
    getFav()
}