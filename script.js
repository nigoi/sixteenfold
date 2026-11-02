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

const displayedLetters = document.querySelectorAll(".letter");
const displayedScore = document.querySelectorAll(".score");
const displayedTiles = document.querySelectorAll(".tile");
const playerScoreBox = document.querySelector(".playerScore");
const wordsBox = document.querySelector("#wordsBox");
const activeWordButton = document.querySelector(".activeWord");
const addWordButton = document.querySelector(".addWord");

const puzzleLength = 16;
let score = 0;
const playerWords = [[]]
let activeWord = playerWords[0];

// Action Functions

function addLetter (chosenTilesRefInt) {
    // Checks if tile is already in playerWords. Prevents duplication.
    if (!playerWords.flat().includes(chosenTilesRefInt)) {
        // Add letter to array
        activeWord.push(chosenTilesRefInt);
        // Update letters DOM
        updatePlayerLettersDOM();
        updateLetterPoolDOM();
        
        if (!checkForEmptyWord()) {
            // Update empty word
            playerWords[playerWords.length] = [];
            // Update empty word DOM
            addWordToWordsBox();
        }

        // Update score
        score = calculateScore();
        // Update score DOM
        playerScoreBox.textContent = score;

        // Update validation DOM
        updateValidationDisplay();
    }
}

function removeLetter (playerWordArrayRef, chosenTilesRefInt) {
    // Remove letter from array
    const indexes = getWordIndexes(playerWordArrayRef, chosenTilesRefInt);
    playerWords[indexes["wordIndex"]].splice(indexes["letterIndex"], 1);
    // Update letters DOM
    updateLettersDOM();
    score = calculateScore();

    // DOM
    playerScoreBox.textContent = score;

    // Make tile opaque to show active
    

    updateValidationDisplay(playerWordArrayRef);
    
    // If word is empty remove word
    if (playerWords[indexes["wordIndex"]].length === 0) {
        if (checkForEmptyWord() > 1) {
            removeWord(indexes);
        }
    }
}

function updatePlayerLettersDOM () {
    // update player words
    const playerWordsDisplay = document.querySelectorAll(".wordLine");
    for (let i = 0; i < playerWordsDisplay.length; i++) {
        playerWordsDisplay[i].replaceChildren();
        for (let x = 0; x < playerWords[i].length; x++) {
            const tileClone = displayedTiles[playerWords[i][x]].cloneNode(true);
            tileClone.style.opacity = 1;
            tileClone.style.marginRight = "3px";

            tileClone.addEventListener("click", function () {
                // Give func direct reference to current array
                removeLetter(currentActiveWord, chosenTilesRefInt);
            })

            playerWordsDisplay[i].appendChild(tileClone);
        } 
    }
}

function updateLetterPoolDOM () {
    // update pool
    for (let x = 0; x < displayedTiles.length; x++) {
        displayedTiles[x].style.opacity = 1;
        if (playerWords.flat().includes(x)) {
            displayedTiles[x].style.opacity = 0.25;
        }
    }
}

// Functions 

async function getDictionary() {
    const response = await fetch("40k.txt");
    const dictionary = await response.text();

    const splitDictionary = dictionary.split("\n").map(word => word.trim().toLowerCase());

    return new Set(splitDictionary);
}

function chooseRandomTiles () {
    // Create an array of 16 letters using weight probability
    const randomTiles = [];

    let i = 0;
    while (i < puzzleLength) {
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
        const letter = letters[(Math.floor(Math.random() * letters.length))];

        randomTiles.push({
            "letter": letter,
            "score": letterDictionary[randomRange][letter]
        }); 

        i++;
    }
    // Add check function that calls this function again if it fails
    return randomTiles; 
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

function updateActiveWord (newWordArrayRef) {
    let activeWordCurrent = playerWords[0];
    if (playerWords.includes(newWordArrayRef)) {
        activeWordCurrent = newWordArrayRef;
    }
    activeWord = activeWordCurrent; 
}


// DOM update functions

function populateGridTiles () {
    // Takes data from chosenTiles and fills DOM tiles
    for (let i = 0; i < displayedLetters.length; i++) {
    displayedLetters[i].textContent = chosenTiles[i]["letter"];
    displayedScore[i].textContent = chosenTiles[i]["score"];
}
}

function addWordToWordsBox (arrayRef = playerWords[playerWords.length - 1]) {
    // Add word container
    const newWordContainer = document.createElement("div");
    newWordContainer.className = "wordLineContainer";
    wordsBox.appendChild(newWordContainer);

    // Add active word button
    const newActiveWordButton = document.querySelector(".activeWord").cloneNode(true);
    newWordContainer.appendChild(newActiveWordButton);
    newActiveWordButton.style.opacity = 0.5;

    newActiveWordButton.addEventListener("click", function () {
        updateActiveWord(arrayRef);
        updateActiveWordVisuals();
    })

    // Add word line
    const newWordLine = document.createElement("div");
    newWordLine.className = "wordLine";
    newWordContainer.appendChild(newWordLine);
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

function updateValidationDisplay (arrayRef = activeWord) {
        const validationDisplays = document.querySelectorAll(".activeWord");
        if (!validateWord(arrayRef)) {
            validationDisplays[playerWords.indexOf(arrayRef)].style.color = "#ff161a";
        }
        else {
            validationDisplays[playerWords.indexOf(arrayRef)].style.color = "#161aff";
        }
}

// Helper functions

function validateWord (arrayRef = activeWord) {
    const letterArray = []
    let x = 0;
    while (x < arrayRef.length) {
        letterArray.push(chosenTiles[arrayRef[x]]["letter"]);
        x++;
    }
    const fullWord = letterArray.join("").toLowerCase();
    let isValid = testdictionary.has(fullWord);
    if (!fullWord) {
        isValid = false;
    }
    return isValid;
}

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
    let emptyWords = 0;
    while (x < playerWords.length) {
        if (playerWords[x].length === 0) {
            emptyWords += 1; 
        }
        x++;
    }
    return emptyWords;
}

function debugList (extraInfo) {
    console.log(
        "playerWords: ", playerWords, 
        "activeWord: ", activeWord,
        extraInfo
    )
}

// Event listener registration

for (let i = 0; i < displayedTiles.length; i++) {
    displayedTiles[i].addEventListener("click", function () {
        addLetter(i);
    })
}

activeWordButton.addEventListener("click", function () {
    updateActiveWord(playerWords[0]);
    updateActiveWordVisuals();
}) 

// JAVSCRIPT RUNTIME

const chosenTiles = chooseRandomTiles();
populateGridTiles(chosenTiles);
