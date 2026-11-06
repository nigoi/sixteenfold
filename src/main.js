import {
  addLetter,
  removeLetter,
  changeActiveWord,
  chooseRandomTiles,
} from "./gameLogic.js";

import { renderGame, renderActiveWord } from "./render.js";

// Start

const errorBox = document.querySelector("#error");
const errorRetry = document.querySelector("#retry");
const mainContainer = document.querySelector("#mainContainer");
const wordsBox = document.querySelector("#wordsBox");
const letterPool = document.querySelector("#letterPool");

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

    gameState["chosenTiles"] = chooseRandomTiles(gameState);

    renderGame(null, gameState, dictionary);

    mainContainer.style.display = "flex";

    console.log(gameState);
  } catch (error) {
    console.error("failed", error);
    errorBox.style.display = "flex";
  }
}

async function getDictionary() {
  const response = await fetch("./assets/40k.txt");

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
  oldGameState = structuredClone(gameState);
  const newGameState = addLetter(gameState, index, dictionary);

  gameState = newGameState;

  renderGame(oldGameState, gameState, dictionary);

  console.log("add", gameState);
}

function handleRemoveLetter(index) {
  oldGameState = structuredClone(gameState);
  const newGameState = removeLetter(gameState, index, dictionary);

  gameState = newGameState;

  renderGame(oldGameState, gameState, dictionary);

  console.log("remove", gameState);
}

function handleActiveWord(buttonIndex) {
  gameState = changeActiveWord(gameState, buttonIndex);

  renderActiveWord(gameState);
}
