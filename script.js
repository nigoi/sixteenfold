// Set data

const letterDictionary = {
    //  > 0 <= 0.38
    rangeOne: {
        A: 1,
        E: 1,
        I: 1,
        O: 1
    },
    // > 0.38 <= 0.56
    rangeTwo: {
        N: 1,
        T: 1,
        R: 1
    },
    // > 0.56 <= 0.75
    rangeThree: {
        L: 1,
        S: 1,
        U: 1,
        D: 2,
        G: 2
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
        Y: 4
    },
    // > 0.93
    rangeFive: {
        J: 8,
        K: 5,
        Q: 10,
        X: 8,
        Z: 10
    }
}

const testdictionary = await getDictionary();

const puzzleLength = 16;
let score = 0;

const displayedLetters = document.querySelectorAll(".letter");
const displayedScore = document.querySelectorAll(".score");
const displayedTiles = document.querySelectorAll(".tile");
const playerScoreBox = document.querySelector(".playerScore");
const wordsBox = document.querySelector("#wordsBox");
const activeWordButton = document.querySelector(".activeWord");

const addWordButton = document.querySelector(".addWord");

const playerWords = [[]]

let activeWord = playerWords[0];

// Action Functions

function addLetter (chosenTilesRefInt) {
    // Checks if tile is already in playerWords. Prevents duplication.
    if (!playerWords.flat().includes(chosenTilesRefInt)) {
        // Add to playerWords
        activeWord.push(chosenTilesRefInt);
        score = calculateScore();

        // DOM
        playerScoreBox.textContent = score;
        addTileCopyToActiveWord(chosenTilesRefInt);
        // Make tile transp to show inactive
        displayedTiles[chosenTilesRefInt].style.opacity = 0.25;
        updateValidationDisplay(activeWord);
    }
}

function removeLetter (playerWordArrayRef, chosenTilesRefInt) {
    // Find current index and remove letter
    const indexes = getWordIndexes(playerWordArrayRef, chosenTilesRefInt);
    playerWords[indexes["wordIndex"]].splice(indexes["letterIndex"], 1);
    score = calculateScore();

    // DOM
    playerScoreBox.textContent = score;
    const wordLines = document.querySelectorAll(".wordLine");
    wordLines[indexes["wordIndex"]].children[indexes["letterIndex"]].remove();
    // Make tile opaque to show active
    displayedTiles[indexes["displayedLettersIndex"]].style.opacity = 1;

    updateValidationDisplay(playerWordArrayRef);
    
    // If word is empty remove word
    if (playerWords[indexes["wordIndex"]].length === 0) {
        removeWord(indexes);
    }
}

function addWord () {
    // Only adds word if all words full
    if (!checkForEmptyWord()) {
        playerWords[playerWords.length] = [];
        const newWordArrayRef = playerWords[playerWords.length - 1];

        // DOM
        addWordToWordsBox(newWordArrayRef);

        // Update active word
        updateActiveWord(newWordArrayRef);
        updateActiveWordVisuals();
    }
}

function removeWord (playerWordsLetterIndexes) {
    if (playerWords.length > 1) {
        playerWords.splice(playerWordsLetterIndexes["wordIndex"], 1);
        
        // DOM
        removeWordFromWordBox(playerWordsLetterIndexes);

        // Update active word
        updateActiveWord(activeWord);
        updateActiveWordVisuals();
        debugList();
    }
}

function calculateScore () {
    let totalScore = 0;
    let x = 0;
    while (x < playerWords.length) {
        let wordScore = 0;
        if (validateWord(playerWords[x])) {
            let y = 0;
            while (y < playerWords[x].length) {
                wordScore += chosenTiles[playerWords[x][y]]["score"];
                y++;
            }
            const multiplier = 1 + (0.1 * (playerWords[x].length - 1));
            totalScore += wordScore * multiplier;
        }
        x++;
    }
    return Math.round(totalScore * 10) / 10;
}

// Functions 

async function getDictionary() {
    const response = await fetch("40k.txt");
    const dictionary = await response.text();

    const splitDictionary = dictionary.split("\n").map(word => word.trim().toLowerCase());

    return new Set(splitDictionary);
}

function chooseRandomTiles () {
    // Create an array of 26 letters 
    const randomTiles = [];

    let i = 0;
    while (i < puzzleLength) {
        let randomNumber = Math.random();
        if (randomNumber <= 0.38) {
            const letters = Object.keys(letterDictionary["rangeOne"]);
            let letter = letters[(Math.floor(Math.random() * letters.length))];

            randomTiles.push({
                "letter": letter,
                "score": letterDictionary["rangeOne"][letter],
            });
        }
        if (randomNumber > 0.38 && randomNumber <= 0.56) {
            const letters = Object.keys(letterDictionary["rangeTwo"]);
            let letter = letters[(Math.floor(Math.random() * letters.length))];

            randomTiles.push({
                "letter": letter,
                "score": letterDictionary["rangeTwo"][letter],
            });
        }
        if (randomNumber > 0.56 && randomNumber <= 0.75) {
            const letters = Object.keys(letterDictionary["rangeThree"]);
            let letter = letters[(Math.floor(Math.random() * letters.length))];

            randomTiles.push({
                "letter": letter,
                "score": letterDictionary["rangeThree"][letter],
            });
        }        
        if (randomNumber > 0.75 && randomNumber <= 0.93) {
            const letters = Object.keys(letterDictionary["rangeFour"]);
            let letter = letters[(Math.floor(Math.random() * letters.length))];

            randomTiles.push({
                "letter": letter,
                "score": letterDictionary["rangeFour"][letter],
            });
        }
        if (randomNumber > 0.93) {
            const letters = Object.keys(letterDictionary["rangeFive"]);
            let letter = letters[(Math.floor(Math.random() * letters.length))];

            randomTiles.push({
                "letter": letter,
                "score": letterDictionary["rangeFive"][letter],
            });            
        }
        i++;
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

function validateWord (playerWordArrayRef) {
    const letterArray = []
    let x = 0;
    while (x < playerWordArrayRef.length) {
        letterArray.push(chosenTiles[playerWordArrayRef[x]]["letter"]);
        x++;
    }
    const fullWord = letterArray.join("").toLowerCase();
    let isValid = testdictionary.has(fullWord);
    if (!fullWord) {
        isValid = false;
    }
    console.log(
    "Word:", fullWord,
    "In dictionary:", testdictionary.has(fullWord),
    );
    return isValid;
}


function addTileCopyToActiveWord(chosenTilesRefInt) {
    // Uses reference to update DOM wih cloned tile
    const tileClone = displayedTiles[chosenTilesRefInt].cloneNode(true);
    const wordLines = document.querySelectorAll(".wordLine");

    const indexes = getWordIndexes(activeWord, chosenTilesRefInt);
    const currentActiveWord = activeWord;

    wordLines[indexes["wordIndex"]].appendChild(tileClone);
    tileClone.style.marginRight = "3px";
    tileClone.addEventListener("click", function () {
        // Give func direct reference to current array
        removeLetter(currentActiveWord, chosenTilesRefInt);
    })
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
    if (playerWords.includes(newWordArrayRef)) {
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

function removeWordFromWordBox (playerWordsLetterIndexes) {
    const wordContainers = document.querySelectorAll(".wordLineContainer");
    wordContainers[playerWordsLetterIndexes["wordIndex"]].remove();
}

function updateValidationDisplay (playerWordArrayRef) {
        const validationDisplays = document.querySelectorAll(".activeWord");
        if (!validateWord(playerWordArrayRef)) {
            validationDisplays[playerWords.indexOf(playerWordArrayRef)].style.color = "#ff161a";
        }
        else {
            validationDisplays[playerWords.indexOf(playerWordArrayRef)].style.color = "#161aff";
        }
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
console.log(chosenTiles);
populateGridTiles(chosenTiles);
