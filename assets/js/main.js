const letters = ["a", "a", "b", "b", "c", "c", "d", "d", "e", "e", "f", "f", "g", "g", "h", "h", "i", "i", "j", "j", "k", "k", "l", "l", "m", "m", "n", "n", "o", "o", "p", "p", "q", "q", "r", "r", "s", "s", "t", "t", "u", "u", "v", "v", "w", "w", "x", "x", "y", "y", "z", "z"];
const game = document.getElementById('game');
let countOfNumbers = 36;
let pair = [];

function handleCards(){
  const stack = letters.splice(0, countOfNumbers);
  const shuffleStack = stack.sort(() => Math.random() - 0.5);

  shuffleStack.forEach((item, index) => {
    const button = document.createElement('button');
    button.classList.add('card');
    button.id = index;
    button.innerText = item;
    game.appendChild(button);
    console.log(item);
  })
}

handleCards();

const cards = document.querySelectorAll('.card');
cards.forEach(c => {
  c.addEventListener('click', () =>{
    c.classList.add('open');
    pair.push({id: c.id, value: c.innerText});
    c.setAttribute('disabled', 'disabled');
    if(pair.length === 2){
      cards.forEach(item =>{
        if(!item.classList.contains('open')){
          item.setAttribute('disabled', 'disabled')
        }
        if(pair[0].value === pair[1].value){
          pair.forEach(el =>{
            cards[el.id].classList.remove('card', 'open');
            cards[el.id].setAttribute('disabled', 'disabled');
          })
          if(item.classList.contains('card')) {
            item.removeAttribute('disabled');
          }
        }else{
          setTimeout(()=>{
            item.removeAttribute('disabled');
            item.classList.remove('open');
          }, 1500)
        }
      })
      pair = [];
    }
  })
})

