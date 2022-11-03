
const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


const generateRandomPairs = (reqRandomNumbers) => {
  let cardsArray = [];
  [...Array(reqRandomNumbers).keys()].forEach(item => {
    let isNumberPresent, randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * 100) + 1;
      isNumberPresent = cardsArray.includes(randomNumber);
      if (!isNumberPresent) {
        cardsArray.push(...[randomNumber, randomNumber]);
      }
    }
    while (isNumberPresent);
  })
  return shuffle(cardsArray);
}

const setCardsData = (reqRandomNumbers) => {
  const genArray = generateRandomPairs(reqRandomNumbers);
  return genArray.map(item => {
    return {
      cardNumber: item,
      cardRevealed: false,
    }
  })
}


export { setCardsData,generateRandomPairs,shuffle }