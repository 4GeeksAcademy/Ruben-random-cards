import "bootstrap";
import "./style.css";


import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

let interval=0;
let pointInterval=0;
let cartasTotales=0;
let cardHistory=[];

//FUNCIONES
function getRandomNumber(max){
  return Math.floor(Math.random() *max)
}

function getNewCard(){
  let cardOptions=[
    {'symbol': '♠', 'color': 'black'},
    {'symbol': '♦', 'color': 'red'},
    {'symbol': '♥', 'color': 'red'},
    {'symbol': '♣', 'color': 'black'}
  ]
  const totalCards= document.querySelector('#totalCards');
  let data={'number':(getRandomNumber(13) + 1)}

  data.card = cardOptions[getRandomNumber((cardOptions.length)-1)];  

  console.log(cardHistory);
  
  cardHistory.unshift(data)
  if(cardHistory.length>6){
    cardHistory.pop();
  }

  cartasTotales++;
  totalCards.textContent='Cartas totales: '+cartasTotales;

  renderCard(data)
}  

function renderCard(card){
  const symbols = document.querySelectorAll('.top-suit, .bottom-suit');
  const number = document.querySelector('.number');
  const historyContainer= document.querySelector('#historyContainer')

  symbols[0].textContent=card.card.symbol;
  symbols[0].className = "";
  symbols[0].classList.add('top-suit',card.card.color);

  symbols[1].textContent=card.card.symbol;
  symbols[1].className = "";
  symbols[1].classList.add('bottom-suit',card.card.color);

    
  switch(card.number){
    case 1:
      number.textContent= "A"
      cardHistory[0].number="A"
      break;
    case 11:
      number.textContent= "J"
      cardHistory[0].number="J"
      break;
    case 12:
      number.textContent= "Q"
      cardHistory[0].number="Q"
      break;
    case 13:
      number.textContent= "K"
      cardHistory[0].number="K"
      break;
    default:
      number.textContent=card.number
  }
  

  for(let i=1;i<cardHistory.length;i++){

    if(i==1){
      historyContainer.innerHTML=`<div class="card xs">
              <div class="top-suit ${cardHistory[i].card.color}">${cardHistory[i].card.symbol}</div>
            <div class="number">${cardHistory[i].number}</div>
            <div class="bottom-suit ${cardHistory[i].card.color}">${cardHistory[i].card.symbol}</div>
            </div>`;
            continue;
    }
     historyContainer.innerHTML+=`<div class="card xs">
              <div class="top-suit ${cardHistory[i].card.color}">${cardHistory[i].card.symbol}</div>
            <div class="number">${cardHistory[i].number}</div>
            <div class="bottom-suit ${cardHistory[i].card.color}">${cardHistory[i].card.symbol}</div>
            </div>`; 
    }

}

//EVENTOS
window.onload = function() {
  //write your code here

  getNewCard();

  const btnGenerate = this.document.querySelector('#btnGenerate');
  const btnAuto = this.document.querySelector('#btnAuto');
  const btnStop = this.document.querySelector('#btnStop');
  const btnClear = this.document.querySelector('#btnClear');
  

  btnGenerate.addEventListener('click',getNewCard);
  btnAuto.addEventListener('click', function() {
    if (interval) {return;}
    let intervalTime= prompt('Indica cada cuantos segundos quieres nueva carta');
    interval = setInterval(getNewCard, (intervalTime*1000));
    btnAuto.style.opacity=0.75;
    btnAuto.textContent="Generando."
    btnStop.style.opacity=1;
    btnStop.textContent="Parar generacion"
    let seconds = 0;
    pointInterval = setInterval(function(){
      if(seconds==2){
        btnAuto.textContent="Generando.";
        seconds=0;
        return;
      }
      btnAuto.textContent+='.'; 
      seconds++
    },(intervalTime*1000)/3)
});
btnStop.addEventListener('click',function(){
  clearInterval(interval);
  clearInterval(pointInterval);
  btnAuto.textContent="Generacion automática";
  btnAuto.style.opacity=1;
  pointInterval=0;
  interval=0;
  btnStop.style.opacity=0.75;
  btnStop.textContent="Generacion parada";
})
btnClear.addEventListener('click',function(){
  clearInterval(interval);
  clearInterval(pointInterval);
  btnAuto.textContent="Generacion automática";
  btnAuto.style.opacity=1;
  btnStop.style.opacity=1;
  btnStop.textContent="Parar generacion"  
  pointInterval=0;
  interval=0;
  historyContainer.innerHTML="";
  cardHistory=[];
  cartasTotales=0;
  getNewCard();
})
};
