/* Game State Example

let gameState = {
    puzzleLength: 16,
    score: 0,
    playerWords: [[]],
    activeWord: playerWords[0],
    chosenTiles: chooseRandomTiles()
} 

*/

const letterDictionary = {
  //  > 0 <= 0.38
  rangeOne: {
    A: 1,
    E: 1,
    I: 1,
    O: 1,
  },
  // > 0.38 <= 0.56
  rangeTwo: {
    N: 1,
    T: 1,
    R: 1,
  },
  // > 0.56 <= 0.75
  rangeThree: {
    L: 1,
    S: 1,
    U: 1,
    D: 2,
    G: 2,
  },
  // > 0.75 <= 0.93
  rangeFour: {
    B: 3,
    C: 3,
    M: 3,
    P: 3,
    F: 4,
    H: 4,
    V: 4,
    W: 4,
    Y: 4,
  },
  // > 0.93
  rangeFive: {
    J: 8,
    K: 5,
    Q: 10,
    X: 8,
    Z: 10,
  },
};

// Main functions

export function addLetter(gameState, tileIndex, dictionary) {
  // Confirm that tile is not already in use
  if (!gameState["playerWords"].flat().includes(tileIndex)) {
    const state = structuredClone(gameState);

    state["playerWords"][state["activeWord"]].push(tileIndex);

    state["playerWords"] = manageEmptyWords(state);

    state["score"] = calculateScore(state, dictionary);

    return state;
  } else {
    return gameState;
  }
}

export function removeLetter(gameState, tileIndex, dictionary) {
  if (gameState["playerWords"].flat().includes(tileIndex)) {
    const state = structuredClone(gameState);

    const indexes = getIndexes(tileIndex, state["playerWords"]);

    state["playerWords"][indexes["word"]].splice(indexes["letter"], 1);

    state["playerWords"] = manageEmptyWords(state);

    state["score"] = calculateScore(state, dictionary);

    return state;
  } else {
    return gameState;
  }
}

export function changeActiveWord(gameState, buttonIndex) {
  const state = structuredClone(gameState);

  state["activeWord"] = 0;

  if (state["playerWords"][buttonIndex]) {
    state["activeWord"] = buttonIndex;
  }
  return state;
}

// Functions

export function chooseRandomTiles(state) {
  // Create an array of 16 letters using weight probability
  const randomTiles = [];

  for (let x = 0; x < state["puzzleLength"]; x++) {
    let randomNumber = Math.random();
    let randomRange;
    if (randomNumber <= 0.38) {
      randomRange = "rangeOne";
    }
    if (randomNumber > 0.38 && randomNumber <= 0.56) {
      randomRange = "rangeTwo";
    }
    if (randomNumber > 0.56 && randomNumber <= 0.75) {
      randomRange = "rangeThree";
    }
    if (randomNumber > 0.75 && randomNumber <= 0.93) {
      randomRange = "rangeFour";
    }
    if (randomNumber > 0.93) {
      randomRange = "rangeFive";
    }
    const letters = Object.keys(letterDictionary[randomRange]);
    const letter = letters[Math.floor(Math.random() * letters.length)];

    randomTiles.push({
      letter: letter,
      score: letterDictionary[randomRange][letter],
    });
  }
  // Add check function that calls this function again if it fails

  return randomTiles;
}

function manageEmptyWords(state) {
  const words = state["playerWords"];
  const activeWord = words[state["activeWord"]];
  const emptyWords = checkForEmptyWord(words);

  if (emptyWords.length <= 0) {
    words.push([]);
  } else if (emptyWords.length > 1) {
    for (let empty of emptyWords) {
      if (empty != activeWord) {
        const emptyIndex = words.indexOf(empty);
        words.splice(emptyIndex, 1);
        if (emptyIndex < state.activeWord) {
          state["activeWord"]--;
        }
        break;
      }
    }
  }

  return words;
}

// Helper functions

function checkForEmptyWord(words) {
  let emptyWords = [];

  for (let i = 0; i < words.length; i++) {
    if (words[i].length === 0) {
      emptyWords.push(words[i]);
    }
  }
  return emptyWords;
}

export function validateWord(state, word, dictionary) {
  const chosenTiles = state["chosenTiles"];
  const letterArray = [];

  for (let x = 0; x < word.length; x++) {
    letterArray.push(chosenTiles[word[x]]["letter"]);
  }

  const fullWord = letterArray.join("").toLowerCase();
  const isValid = dictionary.has(fullWord);

  return isValid;
}

function calculateScore(state, dictionary) {
  let totalScore = 0;
  let x = 0;
  while (x < state["playerWords"].length) {
    let wordScore = 0;
    if (validateWord(state, state["playerWords"][x], dictionary)) {
      let y = 0;
      while (y < state["playerWords"][x].length) {
        wordScore += state["chosenTiles"][state["playerWords"][x][y]]["score"];
        y++;
      }
      const multiplier = 1 + 0.1 * (state["playerWords"][x].length - 1);
      totalScore += wordScore * multiplier;
    }
    x++;
  }
  return Math.round(totalScore * 10) / 10;
}

export function getIndexes(refIndex, wordsArray) {
  const indexes = {};

  for (let x = 0; x < wordsArray.length; x++) {
    if (wordsArray[x].includes(refIndex)) {
      indexes["word"] = x;
      indexes["letter"] = wordsArray[x].indexOf(refIndex);
      break;
    }
  }
  return indexes;
}
