import {
  addLetter,
  removeLetter,
  changeActiveWord,
  generateValidTiles,
} from "./gameLogic.js";

import { renderGame, renderActiveWord, renderResults } from "./render.js";

// Start

const errorBox = document.querySelector("#error");
const errorRetry = document.querySelector("#retry");
const mainContainer = document.querySelector("#mainContainer");
const wordsBox = document.querySelector("#wordsBox");
const letterPool = document.querySelector("#letterPool");
const submit = document.querySelector("#submit");

let oldGameState;
let gameState;
let dictionary;

startGame();

// Register event listeners

errorRetry.addEventListener("click", function () {
  startGame();
});

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

submit.addEventListener("click", function () {
  renderResults(gameState, dictionary);
});

// Functions

async function startGame() {
  try {
    dictionary = await getDictionary();

    gameState = {
      puzzleLength: 16,
      score: 0,
      playerWords: [[]],
      activeWord: 0,
    };

    gameState["chosenTiles"] = generateValidTiles(gameState);

    renderGame(null, gameState, dictionary);

    mainContainer.hidden = false;
    errorBox.hidden = true;

    console.log(gameState);
  } catch (error) {
    console.error("failed", error);
    errorBox.hidden = false;
  }
}

async function getDictionary() {
  const response = await fetch("./assets/dictionary.txt");

  if (!response.ok) {
    throw new Error(`Dictionary request failure: ${response.status}`);
  }

  const dictionary = await response.text();

  const splitDictionary = dictionary
    .split("\n")
    .map((word) => word.trim().toLowerCase())
    .filter(Boolean);

  if (splitDictionary.length === 0) {
    throw new Error("Dictionary empty");
  }

  return new Set(splitDictionary);
}

function handleAddLetter(index) {
  oldGameState = gameState;
  gameState = addLetter(gameState, index, dictionary);
  renderGame(oldGameState, gameState, dictionary);
}

function handleRemoveLetter(index) {
  oldGameState = gameState;
  gameState = removeLetter(gameState, index, dictionary);
  renderGame(oldGameState, gameState, dictionary);
}

function handleActiveWord(buttonIndex) {
  gameState = changeActiveWord(gameState, buttonIndex);

  renderActiveWord(gameState);
}
