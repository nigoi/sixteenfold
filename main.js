import { addLetter, removeLetter, chooseRandomTiles, updateActiveWord} from "./gameLogic.js";
import { renderGame } from "./render.js";

// Set data
export async function getDictionary() {
    const response = await fetch("40k.txt");
    const dictionary = await response.text();

    const splitDictionary = dictionary.split("\n").map(word => word.trim().toLowerCase());

    return new Set(splitDictionary);
}

const dictionary = await getDictionary();
const wordsBox = document.querySelector("#wordsBox");
const letterPool = document.querySelector("#letterPool");
const letterTiles = document.querySelectorAll(".tile");

// On start up 

let gameState = {
    puzzleLength: 16,
    score: 0,
    playerWords: [[]],
    activeWord: 0,
}

gameState["chosenTiles"] = chooseRandomTiles(gameState);

renderGame(gameState, dictionary);

// Register event listeners

letterPool.addEventListener("click", function (event) {
    // Get tile reference number
    const tile = Array.from(letterPool.children);
    const tileIndex = tile.indexOf(event.target.closest(".tile"));

    if (tile) {
        handleAddLetter(gameState, tileIndex);
    }
})

wordsBox.addEventListener("click", function (event) {
    // Check what clicked 
    const tile = event.target.closest(".tile");
    const activeWord = event.target.closest(".activeWord");

    if (tile) {
        const tileIndex = Number(tile.dataset.tileIndex);
        handleRemoveLetter(gameState, tileIndex);
    }

    else if (activeWord) {
        const container = activeWord.closest(".wordLineContainer");
        const index = Array.from(wordsBox.children).indexOf(container);

        handleActiveWord(gameState, tileIndex);
    }
})

// Functions

function handleAddLetter (state, index) {
    // Checks if tile is already in playerWords. Prevents duplication.
    if (!gameState["playerWords"].flat().includes(index)) {
        gameState = addLetter(state, index, dictionary);
        renderGame(gameState, dictionary);
        console.log("gamestate", gameState);
    }
}

function handleRemoveLetter (state, index) {
    gameState = removeLetter(state, index);
    renderGame(state, letterTiles);
}   

function handleActiveWord (state, buttonIndex) {
    gameState["activeWord"] = playerWords[buttonIndex];
    renderActiveWord(state);
}

// Helper functions

function debugList (extraInfo) {
    console.log(
        "playerWords: ", playerWords, 
        "activeWord: ", activeWord,
        extraInfo
    )
}