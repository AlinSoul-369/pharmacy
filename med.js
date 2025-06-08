// catch all html items
let medName=document.getElementById('medName');
let comName=document.getElementById('comName');
let indications=document.getElementById('Indications');
let fabYear=document.getElementById('fabYear');
let expYear=document.getElementById('expYear');
let quantity=document.getElementById('quantity');
let add=document.getElementById('add');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let discounts=document.getElementById('discounts');
let total=document.getElementById('total');
let quan=document.getElementById('quan');
let search=document.getElementById('search');
let d1=document.getElementById('D1');
let tbody=document.getElementById('tbody');
let mood="create";
let temp;
let searchMood;
let show1='';
let num=0;
let temp1;


// 1- calculate total price
function calTotalPrice(){
    if(price.value != ''){
       let result= (+price.value + +taxes.value ) - +discounts.value;
       total.innerHTML= result;
       total.style.backgroundColor=" rgb(51, 227, 51)" ;
    }
    else{
        total.innerHTML='';
        total.style.backgroundColor="rgb(231, 12, 12)";
    }
}



// 2- create new medicine


let medArray;
if(localStorage.medicins != null){
    medArray=JSON.parse(localStorage.medicins);
}
else{
    medArray=[];
}


add.onclick=function createMedicine(){
  if(medName.value != '' && comName.value != '' && price.value != '' ){
    let newMed ={
     medName : medName.value,
     comName : comName.value,
     indications : indications.value,
     fabYear : fabYear.value,
     expYear : expYear.value,
     quantity : quantity.value,
     price : price.value,
     taxes : taxes.value,
     discounts: discounts.value,
     total : total.innerHTML
    };
    if(mood ==="create"){
        if(newMed.quantity > 1 ){
            for(let i=0 ; i< newMed.quantity ; i++){
               medArray.push(newMed);
            }
        }
        else{
                medArray.push(newMed);
            }
    }else{
        medArray[temp]=newMed;
        add.innerHTML="Add Medicine";
        mood="create";
        quantity.style.display="block";
        quan.style.display="block";
    }
    
     // save medicine array into local storage
   localStorage.setItem('medicins',JSON.stringify(medArray));
       
  }
  
  showMedicine();
  clearInputs();       
}


// 3- show medicins

function showMedicine(){
    let show='';
    for(var j=0 ; j<medArray.length ; j++){
        show += `<tr>
                <td> ${j+1}</td>
                <td> ${medArray[j].medName} </td>
                <td> ${medArray[j].comName} </td>
                <td> ${medArray[j].indications}</td>
                <td> ${medArray[j].fabYear} </td>
                <td> ${medArray[j].expYear} </td> 
                <td> ${medArray[j].price} </td>
                <td> ${medArray[j].taxes} </td>
                <td> ${medArray[j].discounts} </td>
                <td> ${medArray[j].total} </td>
                <td class="u"> <button id="update" onclick="updateMedicine(${j})" >Update</button></td> 
                <td class="d"> <button id="delete" onclick="deleteMedicine(${j})">Delete</button></td>
                </tr>
        `
    }

tbody.innerHTML = show;
if(show.length > 0){
    d1.innerHTML=`<button onclick="deleteAllMedicins()"> Delete all (${j}) medicins </button>`;
}
else{
    d1.innerHTML='';
}


}
showMedicine();

// 4- delete all medicins
function deleteAllMedicins(){
    let test=prompt('Enter Y to delete');
    if(test == 'Y'){
    localStorage.clear();
    medArray.splice(0);
    }
    else{
        window.prompt('can not delete all medicins!')
    }
    showMedicine();
}
// 5- clear inputs 
function clearInputs(){
    medName.value = '';
    comName.value = '';
    indications.value = '';
    fabYear.value = '';
    expYear.value = '';
    quantity.value = '';
    price.value = '';
    taxes.value = '';
    discounts.value = '';
    total.innerHTML = '';
}

// 6- update medicine
function updateMedicine(j){
medName.value = medArray[j].medName;
comName.value = medArray[j].comName;
indications.value = medArray[j].indications;
fabYear.value = medArray[j].fabYear;
expYear.value = medArray[j].expYear;
price.value = medArray[j].price;
taxes.value = medArray[j].taxes;
discounts.value = medArray[j].discounts;

calTotalPrice();
mood ="update";
temp=j;
quantity.style.display="none";
quan.style.display="none";
add.innerHTML="Update Medicine";
scroll(
    {
    top:0,
    behavior:"smooth",
    }
)
}
// 7-  delete one medicine
function deleteMedicine(j){
   medArray.splice(j,1);
   localStorage.medicins=JSON.stringify(medArray);
   showMedicine(); 
}


// 8- search medicine 
function searchMedicine(searchMood){
 let key=search.value; 
        if(searchMood === 'SearchByName'){
            temp1='name';
            for(let n=0 ; n<medArray.length ; n++){
            if(medArray[n].medName === key){
                num+=1;
                show1 +=  ` <tr>
                            <td> ${n+1} </td>
                            <td> ${medArray[n].medName} </td>
                            <td> ${medArray[n].comName} </td>
                            <td> ${medArray[n].indications}</td>
                            <td> ${medArray[n].fabYear} </td>
                            <td> ${medArray[n].expYear} </td> 
                            <td> ${medArray[n].price} </td>
                            <td> ${medArray[n].taxes} </td>
                            <td> ${medArray[n].discounts} </td>
                            <td> ${medArray[n].total} </td>
                            <td class="u"> <button id="update" onclick="updateMedicine(${n})" >Update</button></td> 
                            <td class="d"> <button id="delete" onclick="deleteMedicine(${n})">Delete</button></td>
                           </tr>
                    `
                
                
                }
            }
        }else{
            temp1='company';
            for(let n=0 ; n<medArray.length ; n++){
                if(medArray[n].comName === key){
                    num+=1;
                    show1 +=  `<tr>
                                <td> ${n+1} </td>
                                <td> ${medArray[n].medName} </td>
                                <td> ${medArray[n].comName} </td>
                                <td> ${medArray[n].indications}</td>
                                <td> ${medArray[n].fabYear} </td>
                                <td> ${medArray[n].expYear} </td> 
                                <td> ${medArray[n].price} </td>
                                <td> ${medArray[n].taxes} </td>
                                <td> ${medArray[n].discounts} </td>
                                <td> ${medArray[n].total} </td>
                                <td class="u"> <button id="update" onclick="updateMedicine(${n})" >Update</button></td> 
                                <td class="d"> <button id="delete" onclick="deleteMedicine(${n})">Delete</button></td>
                                </tr>
                        `
                    
                    
                    }
                }
        }
       
    tbody.innerHTML = show1;
  
        d1.innerHTML='';
   
    
    }
    
    
    