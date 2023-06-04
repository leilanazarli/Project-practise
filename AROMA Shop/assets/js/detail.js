let row=document.querySelector(".row")

let id =new URLSearchParams(window.location.search).get("id")

let Base_url='http://localhost:1111/product'

async function getDetail(){
   let res= await axios(`${Base_url}/${id}`)
   let data=res.data
   row.innerHTML=`
   <img src="./assets/img/${data.image}" alt="" class="w-50">
   <div class=" card col col-3 w-50">
                               <div href="" class="allhover">
                                <a href=""><i class="fa-sharp fa-solid fa-magnifying-glass"></i></a>
                                <a href=""><i class="fa-sharp fa-solid fa-cart-shopping"></i></a>
                                <a href="#" onclick="addFav(${data.id})"><i class="fa-regular fa-heart"></i></a>
                               </div>
                               <div class="card-body d-flex justify-content-center flex-column gap-1">
                            <span>${data.category}</span>
                            <h2>${data.name}</h2>
                            <p>${data.price}</p>
                            <p class="text-center">${data.description}</p>
                        </div>
                    </div>
   `
}
getDetail()