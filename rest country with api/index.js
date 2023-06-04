let spinner=document.querySelector(".spinner")
let search=document.querySelector("#search")
let select=document.querySelector(".form-select")
let darkbtn=document.querySelector(".darkmode")
let cards=document.querySelector(".cards")

let BASE_URL=(" https://restcountries.com/v2/all")
let fav = []
let searchArr=[]
let selectArr=[]

async function getData(){
    cards.innerHTML=''
   let res= await axios(BASE_URL)
   let data = res.data
//    console.log(data);
   searchArr=data
   selectArr=data
    fav=fav.length || search.value ?fav :data
    fav.forEach(element => {
        cards.innerHTML+=`
        <div class="card" style="width: 18rem;">
  <img src="${element.flags.svg}" class="card-img-top"  style="width: 285px;height:160px" alt="...">
  <div class="card-body">
    <h5 class="card-title">${element.name}</h5>
    <p class="card-text"><b>Population:</b>${element.population}</p>
    <p class="card-text"><b>Region:</b>${element.region}</p>
    <p class="card-text"><b>Capital:</b>${element.capital}</p>
    <a href="./detail.html?name=${element.name}" class="btn btn-primary" >Details</a>
  </div>
</div>
        `
    });

}
getData()

 search.addEventListener("input" , async function(event){
    spinner.style.display="flex"
    fav=searchArr
    fav=fav.filter(item=>item.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
    spinner.style.display="none"
    getData()
})
select.addEventListener("click" , async function(event){
    spinner.style.display="flex"
    fav=selectArr
    fav=fav.filter(item=>item.region.toLocaleLowerCase()===event.target.value.toLocaleLowerCase())
    spinner.style.display="none"
    getData()
})
window.addEventListener("load" ,async function(){
    cards.innerHTML=""
    spinner.style.display="flex"
    await axios(BASE_URL).then(res=>{
        spinner.style.display="none"
        getData()
    })
})

window.addEventListener("load" ,async function(){
    localStorage.getItem("dark") && document.body.classList.add("dark")
    darkbtn.addEventListener("click" , function(){
        if(localStorage.getItem("dark")){
            document.body.classList.remove("dark")
            localStorage.removeItem("dark")
        }
        else{
            document.body.classList.add("dark")
            localStorage.setItem("mode" ,"dark")
        }
    })
})

 