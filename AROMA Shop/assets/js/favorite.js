let row=document.querySelector(".row")

let Base_url="http://localhost:1111/favorite"


let fav=[]
let allData=[]
async function getFav(){
    row.innerHTML=""
    let res=await axios(`${Base_url}`)
    let data=res.data
    allData=data
    fav=data
    fav.forEach(element => {
        row.innerHTML+=`
        <div class=" card col col-3">
                        <img src="./assets/img/${element.image}" alt="">
                               <div href="" class="allhover">
                                <a href=""><i class="fa-sharp fa-solid fa-magnifying-glass"></i></a>
                                <a href=""><i class="fa-sharp fa-solid fa-cart-shopping"></i></a>
                                <a href="#"><i class="fa-solid fa-heart"></i></a>
                               </div>
                               <div class="card-body d-flex justify-content-center flex-column gap-1">
                            <span>${element.category}</span>
                            <h2>${element.name}</h2>
                            <p>${element.price}</p>
                            <div class="d-flex gap-1 justify-content-center">
                            <a href="#" onclick="deleteBtn(${element.id})" class="btn btn-outline-primary">Delete</a>
                            </div>
                        </div>
                    </div>
        `
    });
}
getFav()

async function deleteBtn(id){
 await axios.delete(`${Base_url}/${id}`)
 fav=allData.filter(item=>item.id!=id)
 getFav()
}