const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


const dropdowns =document.querySelectorAll(".dropdown select");
let btn=document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let  select of dropdowns)
{
  for ( let currcode in countryList )
{
   let newoption=document.createElement("option");
   newoption.innerText =currcode;
   newoption.value= currcode;
if(select.name =="from" && currcode =="USD" )
{
  newoption.selected="selected";
}
else if(select.name =="to" && currcode =="INR")
{
  newoption.selected="selected";
}
    
   select.append(newoption);


}
select.addEventListener("change",(evt)=>
{
  updateflag(evt.target);
});
}

const updateExchnageRate =async()=>
{
 let amount = document.querySelector(".amount input")
  let amtVal= amount.value;
  if(amtVal =="" || amtVal < 1 )
  {
   amtVal=1;
   amount.value="1";
  }

 const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
 let response = await fetch(URL);
 let data =await response.json();
 let rate =data[toCurr.value.toLowerCase()];

 let finalAmount= amtVal *rate;
 msg.innerText=`${amtVal} ${fromCurr.value}=${finalAmount}${toCurr.value}`
}


const updateflag=(element)=>
{
let currcode= element.value;
let countrycode= countryList[currcode];
let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
let img=element.parentElement.querySelector("img");
img.src=newsrc;
};

btn.addEventListener("click",(evt)=>
{
   evt.preventDefault();
    updateExchnageRate();
});


window.addEventListener("load",()=>
{
 updateExchnageRate();
});
