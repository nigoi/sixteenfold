import { addLetter, removeLetter, chooseRandomTiles} from "./gameLogic.js";
import { renderGame, renderLetterPool, renderActiveWord} from "./render.js";

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

renderLetterPool(gameState);

// Register event listeners

letterPool.addEventListener("click", function (event) {
    // Get tile reference number
    const tile = Array.from(letterPool.children);
    const tileIndex = tile.indexOf(event.target.closest(".tile"));

    if (tile) {
        handleAddLetter(tileIndex);
    }
})

wordsBox.addEventListener("click", function (event) {
    // Check what clicked 
    const tile = event.target.closest(".tile");
    const activeWord = event.target.closest(".activeWord");

    if (tile) {
        const tileIndex = Number(tile.dataset.tileIndex);
        handleRemoveLetter(tileIndex);
    }

    else if (activeWord) {
        const container = activeWord.closest(".wordLineContainer");
        const index = Array.from(wordsBox.children).indexOf(container);

        handleActiveWord(index);
    }
})

// Functions

function handleAddLetter (index) {
    // Checks if tile is already in playerWords. Prevents duplication.
    if (!gameState["playerWords"].flat().includes(index)) {
        const newGameState = addLetter(gameState, index, dictionary);
        gameState = newGameState;

        renderGame(gameState, dictionary);
    }
}

function handleRemoveLetter (index) {
    const newGameState = removeLetter(gameState, index, dictionary);
    gameState = newGameState;
    renderGame(gameState, dictionary);
}   

function handleActiveWord (buttonIndex) {
    gameState["activeWord"] = buttonIndex;
    renderActiveWord(gameState);
}

// Helper functions

function debugList (extraInfo) {
    console.log(
        "playerWords: ", playerWords, 
        "activeWord: ", activeWord,
        extraInfo
    )
}