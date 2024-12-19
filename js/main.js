let apiKey="6ae03f1519c2447eb96105937241912";

let BaseUrl="https://api.weatherapi.com/v1/";
// https://api.weatherapi.com/v1/forecast.json?key=6ae03f1519c2447eb96105937241912&q=london&days=3
let weatherdata={};
let container=document.querySelector(`#container`)

let searchInput=document.querySelector("#search-input")


function getdate(dates){
    
let dateDetails=new Date(dates)
let weekday=dateDetails.toLocaleString("en-us",{weekday: "long"})
let day=dateDetails.toLocaleString("en-us",{day: "2-digit"})
let month=dateDetails.toLocaleString("en-us",{month: "long"})

    return {weekday , day ,month}
}


async function displayData(array) {
   let str=``;
   for(i=0 ;i< array.length;i++){
   let {weekday,day,month}= getdate(array[i].date);
   
   
str+=`<div class="col-lg-4  sec-bg">
  <div class="">
<div class="d-flex justify-content-evenly th-bg head" >
${i===0? `<p>${weekday}</p>
  <p>${day} ${month}</p>`:`${weekday}`}

  
 
</div>
${i===0 ?` <p>${weatherdata.location.name}</p>`:``}
   ${i===0?`   <p class="fs-90 fw-bold"> ${weatherdata.current.temp_c} &deg;c</p>
   <img src="images/176.png" alt="">`:`
<div class="my-3 text-center">    
<p>${array[i].day.maxtemp_c} &deg;C</p>
                                    <p>${array[i].day.mintemp_c} &deg;C</p>
                                    <img src="images/113.png" alt=""></div>
    `}
 
  




<span class="f-color ">${i==0? `${weatherdata.current.condition.text}`:`
  
  ${array[i].day.condition.text}`}</span>
      ${i==0?`<div class="d-flex justify-content-between my-3">
 <p> <img src="images/icon-umberella.png" alt=""> 20%</p>
 <p> <img src="images/icon-wind.png" alt=""> 18km/h</p>
 <p> <img src="images/icon-compass.png" alt="">East</p>
</div>`:``}


  </div>
</div>

</div>

</div>`

   }
   container.innerHTML=str;
    
}





async function getData(city ="cairo"){
  if(city.length===0){
    getData()
  }
  if(city.length<3)return;
 let response=await  fetch(`https://api.weatherapi.com/v1/forecast.json?key=6ae03f1519c2447eb96105937241912&q=${city}&days=3`)
let data= await response.json()   

weatherdata=data
displayData(weatherdata.forecast.forecastday)



}

getData("cairo")

searchInput.addEventListener("input",function(e){
  getData(e.target.value)
})