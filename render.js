/* Game State Example

let gameState = {
    puzzleLength: 16,
    score: 0,
    playerWords: [[]],
    activeWord: 0,
    chosenTiles: {}
} 

*/
import { validateWord } from "./gameLogic.js";

// DOM update functions

export function renderGame(state, dictionary) {
    renderWordLine(state);
    renderActiveWord(state);
    renderPlayerLetters(state);
    renderValidation(state, dictionary);
    document.querySelector(".score").textContent = state["score"];
    renderLetterPool(state);
}

function renderLetterPool (state) {
    const letterTiles = document.querySelectorAll("#letterPool .tile");
    console.log(letterTiles);

    // Takes data from chosenTiles and fills DOM tile
    for (let i = 0; i < letterTiles.length; i++) {
    letterTiles[i].querySelector(".letter").textContent = state["chosenTiles"][i]["letter"];
    letterTiles[i].querySelector(".score").textContent = state["chosenTiles"][i]["score"];
    letterTiles[i].style.opacity = 1;
    if (state["playerWords"].flat().includes(i)) {
        letterTiles[i].style.opacity = 0.25;
        console.log("yes");
    }
    }
}

function renderPlayerLetters (state) {
    const words = state["playerWords"];
    const wordsDisplay = document.querySelectorAll(".wordLine");

    for (let i = 0; i < wordsDisplay.length; i++) {
        wordsDisplay[i].replaceChildren();
        const displayedTiles = document.querySelectorAll(".tile");

        for (let x = 0; x < words[i].length; x++) {
            const tileClone = displayedTiles[words[i][x]].cloneNode(true);
            wordsDisplay[i].appendChild(tileClone);
            tileClone.style.opacity = 1;
            tileClone.style.marginRight = "3px";
            tileClone.dataset.tileIndex = words[i][x];
        } 
    }
}

function renderWordLine (state) {
    const wordsBox = document.querySelector("#wordsBox");
    wordsBox.replaceChildren();

    for (let word of state["playerWords"]) {
        // Add word container
        const newWordContainer = document.createElement("div");
        newWordContainer.className = "wordLineContainer";
        wordsBox.appendChild(newWordContainer);

        // Add active word button
        const newActiveWordButton = document.createElement("button");
        newActiveWordButton.className = "activeWord";
        newActiveWordButton.textContent = "*";
        newActiveWordButton.style.opacity = 0.5;
        newWordContainer.appendChild(newActiveWordButton);

        // Add word line
        const newWordLine = document.createElement("div");
        newWordLine.className = "wordLine";
        newWordContainer.appendChild(newWordLine);
    }
}

function renderValidation (state, dictionary) {
    const words = state["playerWords"];
    const validationDisplays = document.querySelectorAll(".activeWord");

    for (let word of words) {
        if (!validateWord(state, word, dictionary)) {
            validationDisplays[words.indexOf(word)].style.color = "#ff161a";
        }
        else {
            validationDisplays[words.indexOf(word)].style.color = "#161aff";
        }
    }
        
}

function renderActiveWord (state) {
    const buttons = document.querySelectorAll(".activeWord");
    let x = 0;
    for (let x = 0; x < buttons.length; x++) {
        buttons[x].style.opacity = 0.5;
    }
    buttons[state["activeWord"]].style.opacity = 1;
}