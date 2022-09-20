const cards = document.querySelectorAll('.content-game-card-open');
const letters = ['a','a','b','b','c','c','d','d','e','e','f','f','g','g','h','h','i','i','j','j','k','k','l','l','m','m','n','n','o','o','p','p','q','q','r','r','s','s','t','t','u','u','v','v','w','w','x','x','y','y','z','z'];
const container = document.querySelector('.content-game-container');

function createTheCards(count){

}

function fillInTheCards(){

}

let arrOfNumbers = [];
for (let i = 0; i < 36; i++) {
  arrOfNumbers.push(i);
}

for(countCycles = 0; countCycles <= 35; countCycles++){
    let numberOfCard = arrOfNumbers.splice(Math.random()*arrOfNumbers.length,1)[0];
    let value = letters[countCycles];
    cards[numberOfCard].innerText = value;
}

container.addEventListener('click', (e) =>{
  if (!e.target.classList.contains('content-game-container')){
    theTarget = e.target.classList.remove('content-game-card-close');
    console.log(theTarget);
  }
});

function blockAnotherCards(e){
  e.currentTarget.setAttribute()
}

function checkTheCards(firstCard, secondCard){
  if (firstCard.value === secondCard.value){
    firstCard.setAttribute('disabled', 'disabled');
    secondCard.setAttribute('disabled', 'disabled');
  }else{
    firstCard.classList.add('content-game-card-close');
    secondCard.classList.add('content-game-card-close');
  }
}
