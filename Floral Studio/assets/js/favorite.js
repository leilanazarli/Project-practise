let cards=document.querySelector(".cards")


let BASE_URL='http://localhost:7888/fav'


let favo=[]

async function addFav(){
    cards.innerHTML=""
    const res= await axios(BASE_URL)
    const data=await res.data
    favo=data
    favo.forEach(element => {
        cards.innerHTML+=`
        <div class="card bg-transparent " style="width: 18rem; border: none;">
    <img src="./assets/img/${element.photo}" class="card-img-top" style="width:250px;height:250px;" alt="...">
    <div class="card-body ">
      <h5 class="card-title" style="color: #0c5b47;font-size: 25px;font-weight: 200;text-align: center;">${element.name}</h5>
      <p class="card-text mt-3 mb-3" style="font-style: italic;color: #1b745e;text-align: center;">${element.price}</p>
      <div class="d-flex justify-content-center">
      <a href="#" class="btn btn-success" onclick="deleteBtn(${element.id})">Delete to Fav</a>
    </div>
    </div>
  </div>
        `
    });
}
addFav()

async function deleteBtn(id){
    await axios.delete(`${BASE_URL}/${id}`)
    
    addFav()
}
 