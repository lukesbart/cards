import {createDeck} from './content.js';
let deck;

let button     = document.getElementById('start')
let zeroCard   = document.getElementById('zero_card')
let start_card = document.getElementById('start_card')
let cards      = document.getElementById('cards').children
let currentCard = 1

function startWorkout() {
  deck = createDeck()
  button.removeEventListener("click", startWorkout, false)
  button.addEventListener("click", resetWorkout, false)

  deck_size = document.getElementById('deck_size').value ? parseInt(document.getElementById('deck_size').value) : 20
  document.getElementById("start_text").innerText = `Start (0/${deck_size})`
  fillCards(deck_size)

  button.innerHTML = "Reset"
  button.id = "Reset"

  zeroCard.classList.toggle('hide')
  start_card.classList.toggle('hide')
  handleCard(cards[currentCard])
}

function handleCard(currentCard) {
  let oneButton = currentCard.getElementsByTagName("a")[0]
  if (oneButton.innerText === "PREVIOUS") {
    oneButton.onclick = function() {changeCard(-1)}
    if (currentCard.getElementsByTagName("a")[1]) {
      let twoButton = currentCard.getElementsByTagName("a")[1]
      twoButton.onclick = function() {changeCard(+1)}
    }
  } else if (oneButton.innerText === "NEXT") {
    oneButton.onclick = function() {changeCard(+1)}
  }
}

function changeCard(dir) {
  if (dir === -1) {
    cards[currentCard].classList.toggle('hide')
    cards[currentCard-1].classList.toggle('hide')
    currentCard--
  } else if (dir === +1) {
    cards[currentCard].classList.toggle('hide')
    cards[currentCard+1].classList.toggle('hide')
    currentCard++
  }
  handleCard(cards[currentCard])
}

function resetWorkout() {
  button.innerHTML = "Start"
  button.id = "start"
  cards[currentCard].classList.toggle('hide')
  zeroCard.classList.toggle('hide')
  currentCard = 1
  document.querySelectorAll('.created').forEach(function(a){
    a.remove()
  })
  button.removeEventListener("click", resetWorkout, false)
  button.addEventListener("click", startWorkout, false)
}

function fillCards (deck_size) {
  for (let step = 0; step < deck_size; step++){
    let newNode = document.createElement("div")
    newNode.classList.add('section', 'hide', 'created')

    let exercises = ''
    for (let exercise of deck[step]['exercises']) {
      exercises += `<p>${exercise}</p>`
    }

    newNode.innerHTML = `
          <div class="row">
            <div class="col s1 m3 push-s7 hide-on-small-only"></div>
            <div class="col s12 m5">
              <div class="card">
                <div class="card-image">
                  <img src="https://images.unsplash.com/photo-1587644771479-5214e1579af2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80">
                  <span class="card-title black">${deck[step]['description']} (${step+1}/${deck_size})</span>
                </div>
                <div class="card-content">
                  ${exercises}
                </div>
                <div class="card-action">
                  <a href="#cards/">Previous</a>
                  <a href="#cards/" class="right">Next</a>
                </div>
              </div>
            </div>
          </div>`
    cards[1].parentNode.insertBefore(newNode, cards[1+step].nextSibling);
  }
}

button.addEventListener("click", startWorkout, false)
