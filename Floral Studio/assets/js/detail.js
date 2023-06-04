let cards=document.querySelector(".cards")

let BASE_URL='http://localhost:7888/users'
let id=new URLSearchParams(window.location.search).get("id")

async function getDetail(){
    cards.innerHTML=""
   let res= await axios(`${BASE_URL}/${id}`)
   let data=res.data
   cards.innerHTML=`
  <div class="d-flex ">
  <div >
  <img src="./assets/img/${data.photo}" class="card-img-top" alt="...">
  </div>
  <div class="card bg-transparent " style=" border: none;">
   <div class="card-body ">
     <h5 class="card-title" style="color: #0c5b47;font-size: 25px;font-weight: 200;text-align: center;"><b>Name:</b>${data.name}</h5>
     <p class="card-text mt-3 mb-3" style="font-style: italic;color: #1b745e;text-align: center;"><b>Price:</b>${data.price}</p>
     <p class="card-text mt-3 mb-3" style="font-style: italic;color: #1b745e;text-align: center;"><b>Desc:</b>${data.description}</p>
   </div>
 </div>
  </div>
    `
}
getDetail()