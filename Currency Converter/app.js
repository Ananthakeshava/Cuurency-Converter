//const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/eur.json";
const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";;
const dropdown=document.querySelectorAll(".dropdown select");

const btn=document.querySelector("#btn");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");

const msg=document.querySelector(".msg");



for (let select of dropdown){
for (currCode in countryList){
    // console.log(currCode,countryList[currCode]);//optional0
    
    let newOption=document.createElement("option");
    newOption.innerText=currCode;
    newOption.value=currCode;
    if(select.name==="from" && currCode==="INR"){
        newOption.selected="selected";
    }
    else if(select.name==="to" && currCode==="USD"){
            newOption.selected="selected";
        }
    
    select.appendChild(newOption);
    }   

    select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
});

}


const updateFlag=(element)=>{
    let currCode=element.value;
    //console.log(currCode);
    let countrycode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    element.parentElement.querySelector("img").src=newSrc;


    


}


btn.addEventListener("click",async (evt)=>{  
    evt.preventDefault();
    updateExchangeRate();

    
});

const updateExchangeRate= async()=>{
        let amt=document.querySelector(".amount input");
    let amt_val=amt.value;
    console.log(amt_val);
    if( amt_val===""|| amt_val<1){
        amt_val=1;
        amt.value="1";
    }

    //console.log(fromCurr.value,"to",toCurr.value);    
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];;
    console.log(rate);

    let final_amt=amt_val*rate;
    msg.innerText=`${amt_val} ${fromCurr.value} = ${final_amt} ${toCurr.value}`;

}
