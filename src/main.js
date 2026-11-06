import {
  addLetter,
  removeLetter,
  changeActiveWord,
  chooseRandomTiles,
} from "./gameLogic.js";

import { renderGame, renderActiveWord, renderLetterPool } from "./render.js";

// Set data
async function getDictionary() {
  const response = await fetch("./assets/40k.txt");
  const dictionary = await response.text();

  const splitDictionary = dictionary
    .split("\n")
    .map((word) => word.trim().toLowerCase());

  return new Set(splitDictionary);
}

const dictionary = await getDictionary();
const wordsBox = document.querySelector("#wordsBox");
const letterPool = document.querySelector("#letterPool");

// On start up

let gameState = {
  puzzleLength: 16,
  score: 0,
  playerWords: [[]],
  activeWord: 0,
};

gameState["chosenTiles"] = chooseRandomTiles(gameState);

renderLetterPool(gameState);

// Register event listeners

letterPool.addEventListener("click", function (event) {
  // Get tile reference number
  const tile = Array.from(letterPool.children);
  const tileIndex = tile.indexOf(event.target.closest(".tile"));

  if (tileIndex !== -1) {
    handleAddLetter(tileIndex);
  }
});

wordsBox.addEventListener("click", function (event) {
  // Check what clicked
  const tile = event.target.closest(".tile");
  const activeWord = event.target.closest(".activeWord");

  if (tile) {
    const tileIndex = Number(tile.dataset.tileIndex);
    handleRemoveLetter(tileIndex);
  } else if (activeWord) {
    const container = activeWord.closest(".wordLineContainer");
    const index = Array.from(wordsBox.children).indexOf(container);

    handleActiveWord(index);
  }
});

// Functions

function handleAddLetter(index) {
  const oldGameState = structuredClone(gameState);
  const newGameState = addLetter(gameState, index, dictionary);

  gameState = newGameState;

  renderGame(oldGameState, gameState, dictionary);

  console.log("add", gameState);
}

function handleRemoveLetter(index) {
  const oldGameState = structuredClone(gameState);
  const newGameState = removeLetter(gameState, index, dictionary);
  gameState = newGameState;
  renderGame(oldGameState, gameState, dictionary);
  console.log("remove", gameState);
}

function handleActiveWord(buttonIndex) {
  gameState = changeActiveWord(gameState, buttonIndex);
  renderActiveWord(gameState);
}
