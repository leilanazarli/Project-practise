let cards = document.querySelector(".cards")
let darkbtn=document.querySelector(".darkmode")


let BASE_URL=("https://restcountries.com/v3.1/name")
let name = new URLSearchParams(window.location.search).get("name")

async function getDetail(){
     cards.innerHTML=''
  let res=  await axios(`${BASE_URL}/${name}`)
  let data = res.data
  console.log(data);
  data.forEach(element => {
        cards.innerHTML=`
        <div class="card d-flex">
        <div class="card-head w-50">
        <img src="${element.flags.svg}" class="w-50"  alt="">
        </div>
        <div class="card-body w-50">
            <h5 class="card-title">${element.name.common}</h5>
            <p class="card-text"><b>Native Name:</b>${Object.keys(element.name.nativeName)[0]}</p>
            <p class="card-text"><b>Population:</b>${element.population}</p>
            <p class="card-text"><b>Region:</b>${element.region}</p>
            <p class="card-text"><b>Capital:</b>${element.capital}</p> 
            <p class="card-text"><b>Top level Domain:</b>${element.capital}</p> 
            <p class="card-text"><b>Currencies:</b>${Object.keys(element.currencies)[0]}</p> 
            <p class="card-text"><b>Languages:</b>${Object.keys(element.languages)}</p> 
        </div>
        </div>`
  });

}
getDetail()

window.addEventListener("load" ,function(){
    localStorage.getItem("dark") && document.body.classList.add("dark")
    if(localStorage.getItem("dark")){
        localStorage.removeItem("dark")
        this.document.body.remove(dark)
    }else{
        localStorage.setItem("mode" ,"dark")
        document.body.classList.add("dark")
    }
})