//This is the web implementation of the shuffle file
function createDeck() {
  let cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace']
  let suites = ['Spades', 'Clubs', 'Hearts', 'Diamonds']
  let face = ['Jack', 'Queen', 'King']
  let suiteExercises = {
  'Spades': ["1. {} Push Ups or incline pushups", "2. {} Pike push ups or vertical pushups",
  "3. {} Standing milk jug dumbbell press (serious) [or standing dumbbell press if you have dumbbells",
  "4. {} Milk jug lateral raises or doorway lateral raises [or dumbbell/band laterals]"],

  'Clubs': ["1. {} Doorway pull ups or tree branch pull ups [or banded pulldowns]",
  "2. {} Table/Desk inverted row [or dumbbell row]", "3. {} Rear delt flyes with milk jugs [or dumbbell rear delt flyes]",
  "4. {} Backpack upright row or milk jug upright row [or dumbbell/band upright row]"],

  'Hearts': ["1. {} Walking lunges (+backpack for weight) [or dumbbell walking lunges]", "2. {} Bulgarian split squat",
  "3. {} Single leg hip thrust", "4. {} Nordic ham curl"],

  'Diamonds': ["1. {} Biceps: milk jug curl or weightless flex curls (squeeze your biceps as hard as possible with no weight) [or dumbbell curl]",
  "2. {} Triceps: Bodyweight skullcrushers against a tabletop or close grip pushups [or dumbbell floor skullcrushers]",
  "3. {} Abs: Bicycle crunch or reverse crunch", "4. {} Calves: Standing calf raise (use backpack, milk jug or dumbbell to load)"]
  }

  const deck = {}

  for (let suite in suites) {
    deck[suites[suite]] = cards
  }

  let shuffleDeck = []

  for (let step = 0; step < 52; step++) {
    shuffleDeck[step] = {}
    let suite = Object.keys(deck)[0]
    let suiteCards = deck[suite]
    let card = suiteCards[0]

    shuffleDeck[step]['suite'] = Object.keys(deck)[0]
    shuffleDeck[step]['card'] = card
    shuffleDeck[step]['exercises'] = []

    if (card == 'Ace') {
      shuffleDeck[step]['exercises'].push('Rest for One Minute.')
    } else {
      for (let exercise of suiteExercises[suite]) {
        let rep;
        if (face.includes(card)) {
          rep = exercise.replace('{}', 20)
        } else {
          rep = exercise.replace('{}', parseInt(card)+10)
        }
        shuffleDeck[step]['exercises'].push(rep)
      }
    }

    shuffleDeck[step]['description'] = `${card} of ${suite}`
    suiteCards = suiteCards.filter(el => el !== card)
    if (suiteCards.length) {
      deck[suite] = suiteCards
    } else {
      delete deck[suite]
    }
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }
  let shuffledDeck = shuffle(shuffleDeck)
  return shuffledDeck
}


export {createDeck}
