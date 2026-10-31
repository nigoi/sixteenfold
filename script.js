// Set data

const letterDictionary = {
    A: 1,
    B: 3,
    C: 3,
    D: 2,
    E: 1,
    F: 4,
    G: 2,
    H: 4,
    I: 1,
    J: 8,
    K: 5,
    L: 1,
    M: 3,
    N: 1,
    O: 1,
    P: 3,
    Q: 10,
    R: 1,
    S: 1,
    T: 1,
    U: 1,
    V: 4,
    W: 4,
    X: 8,
    Y: 4,
    Z: 10
}

const puzzleLength = 15;

const displayedLetters = document.querySelectorAll(".letter");
const displayedScore = document.querySelectorAll(".score");
const displayedTiles = document.querySelectorAll(".tile");
const wordsBox = document.querySelector("#wordsBox");
const activeWordButton = document.querySelector(".activeWord");

const deleteWordButton = document.querySelector(".deleteWord");
const addWordButton = document.querySelector(".addWord");

const playerWords = [[]]

let activeWord = playerWords[0];

// Action Functions

function addLetter (chosenTilesRefInt) {
    // Checks if tile is already in playerWords. Prevents duplication.
    if (!playerWords.flat().includes(chosenTilesRefInt)) {
        // Add to playerWords
        activeWord.push(chosenTilesRefInt);
        
        // DOM
        addTileCopyToActiveWord(chosenTilesRefInt);
        // Make tile transp to show inactive
        displayedTiles[chosenTilesRefInt].style.opacity = 0.25;
    }
}

function removeLetter (playerWordsLetterIndexes) {
    removeTileFromPlayerWords(playerWordsLetterIndexes);

    // DOM
    const wordLines = document.querySelectorAll(".wordLine");
    wordLines[playerWordsLetterIndexes["wordIndex"]].children[playerWordsLetterIndexes["letterIndex"]].remove();
    // Make tile opaque to show active
    displayedTiles[playerWordsLetterIndexes["displayedLettersIndex"]].style.opacity = 1;
}

function addWord () {
    if (!checkForEmptyWord()) {
        playerWords[playerWords.length] = [];
        const newWordArrayRef = playerWords[playerWords.length - 1];

        // DOM
        addWordToWordsBox(newWordArrayRef);

        updateActiveWord(newWordArrayRef);
        updateActiveWordVisuals();
        debugList(newWordArrayRef);
    }
}

function removeWord (indexes) {
    if (playerWords.length > 1) {
        const currentActiveWord = playerWords[activeWord];
        removeWordFromPlayerWords(indexes);
        removeWordFromWordBox(indexes);
        updateActiveWord(playerWords[playerWords.indexOf(currentActiveWord)]);
    }
}

// Functions 

function chooseRandomTiles () {
    // Create an array of 26 letters 
    const letters = Object.keys(letterDictionary);

    const randomTiles = [];

    // Fills array with letter data
    let x = 0;
    while (x < puzzleLength) {
        let letter = letters[(Math.floor(Math.random() * letters.length))];

        randomTiles.push({
            "letter": letter,
            "score": letterDictionary[letter],
        })
        x++
    }
    return randomTiles; 
}

function populateGridTiles (chosenTiles) {
    // Takes data from chosenTiles and fills DOM tiles
    for (let i = 0; i < displayedLetters.length; i++) {
    displayedLetters[i].textContent = chosenTiles[i]["letter"];
    displayedScore[i].textContent = chosenTiles[i]["score"];
}
}

function addTileCopyToActiveWord(chosenTilesRefInt) {
    // Uses reference to update DOM wih cloned tile
    const tileClone = displayedTiles[chosenTilesRefInt].cloneNode(true);
    const wordLines = document.querySelectorAll(".wordLine");

    const indexes = getWordIndexes(activeWord, chosenTilesRefInt);

    wordLines[indexes["wordIndex"]].appendChild(tileClone);
    tileClone.style.marginRight = "3px";
    tileClone.addEventListener("click", function () {
        // Give func direct reference to current array
        removeLetter(indexes);
    })
}

function removeTileFromPlayerWords (playerWordsLetterIndexes) {
    playerWords[playerWordsLetterIndexes["wordIndex"]].splice(playerWordsLetterIndexes["letterIndex"], 1);
    if (playerWords[playerWordsLetterIndexes["wordIndex"]].length === 0) {
        removeWord(playerWordsLetterIndexes);
    }
}

function addWordToWordsBox (newWordArrayRef) {
    // Add word container
    const newWordContainer = document.createElement("div");
    newWordContainer.className = "wordLineContainer";
    wordsBox.appendChild(newWordContainer);

    // Add active word button
    const newActiveWordButton = document.querySelector(".activeWord").cloneNode(true);
    newWordContainer.appendChild(newActiveWordButton);
    const currentWordRef = newWordArrayRef;
    newActiveWordButton.addEventListener("click", function () {
        updateActiveWord(currentWordRef);
        updateActiveWordVisuals();
    })

    // Add word line
    const newWordLine = document.createElement("div");
    newWordLine.className = "wordLine";
    newWordContainer.appendChild(newWordLine);
}

function updateActiveWord (newWordArrayRef) {
    let activeWordCurrent = playerWords[0];
    if (newWordArrayRef) {
        activeWordCurrent = newWordArrayRef;
    }
    activeWord = activeWordCurrent; 
}

function updateActiveWordVisuals () {
    const activeWordDOM = document.querySelectorAll(".activeWord");
    let x = 0;
    while (x < activeWordDOM.length) {
        activeWordDOM[x].style.opacity = 0.5;
        x++;
    }
    activeWordDOM[playerWords.indexOf(activeWord)].style.opacity = 1;
}

function removeWordFromPlayerWords (indexes) {
    playerWords.splice(indexes["wordIndex"], 1);
}

function removeWordFromWordBox (indexes) {
    const wordContainers = document.querySelectorAll(".wordLineContainer");
    wordContainers[indexes["wordIndex"]].remove();
}

// Helper functions


function getWordIndexes (playerWordsArrayRef, chosenTilesRefInt) {
    // uses fixed array id to get current array indexes
    const derivedWordIndex = playerWords.indexOf(playerWordsArrayRef);
    const currentIndex = {
        wordIndex: derivedWordIndex,
        letterIndex: playerWords[derivedWordIndex].indexOf(chosenTilesRefInt),
        displayedLettersIndex: chosenTilesRefInt
    }
    return currentIndex;
}  

function getDOMRef (playerWordsArrayRef) {
    const indexes = getWordIndexes(playerWordsArrayRef);
    const wordLines = document.querySelectorAll(".wordLine");
    const elementRef = wordLines[indexes["wordIndex"]].children[indexes["letterIndex"]]; 
    return elementRef;
}

function checkForEmptyWord() {
    let x = 0;
    while (x < playerWords.length) {
        if (playerWords[x].length === 0) {
            return true; 
        }
        x++;
    }
    return false;
}

function debugList (extraInfo) {
    console.log("playerWords: ", playerWords, "activeWord: ", activeWord, extraInfo)
}

// Event listener registration

for (let i = 0; i < displayedTiles.length; i++) {
    displayedTiles[i].addEventListener("click", function () {
        addLetter(i);
    })
}

addWordButton.addEventListener("click", function () {
    addWord();
})

activeWordButton.addEventListener("click", function () {
    updateActiveWord(playerWords[0]);
    updateActiveWordVisuals();
}) 

// JAVSCRIPT RUNTIME

const chosenTiles = chooseRandomTiles();
populateGridTiles(chosenTiles);