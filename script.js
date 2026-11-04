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

const wordsBox = document.querySelector("#wordsBox");
const letterPool = document.querySelector("#letterPool");

const displayedLetters = document.querySelectorAll(".letter");
const displayedScore = document.querySelectorAll(".score");
const displayedTiles = document.querySelectorAll(".tile");
const playerScoreBox = document.querySelector(".playerScore");

const puzzleLength = 16;
let score = 0;
const playerWords = [[]]
let activeWord = playerWords[0];

// On start up 

const testdictionary = await getDictionary();

const chosenTiles = chooseRandomTiles();

renderLetterPool(chosenTiles);

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

// Action Functions

function handleAddLetter (tileIndex, playerWord = activeWord) {
    // Checks if tile is already in playerWords. Prevents duplication.
    if (!playerWords.flat().includes(tileIndex)) {
        // Update game state
        playerWord.push(tileIndex);
        // Update DOM
        renderPlayerLetters();
        renderLetterPool();

        if (checkForEmptyWord().length <= 0) {
            // Update game state
            playerWords.push([]);
            // Update Dom
            renderNewWord();
        }     
        
        // Update DOM
        renderValidation();

        // Update game state
        score = calculateScore();
        // Update DOM
        playerScoreBox.textContent = score;
    }
}

function handleRemoveLetter (tileRef) {
    const indexes = getIndexes(tileRef);
    // Update game state 
    playerWords[indexes["word"]].splice([indexes["letter"]], 1);
    // Update DOM
    renderPlayerLetters();
    renderLetterPool();

    const emptyWords = checkForEmptyWord();
    if (emptyWords.length > 1) {
        for (let empty of emptyWords) {
            if (empty != activeWord) {
                const emptyIndex = playerWords.indexOf(empty);
                // Update game state
                playerWords.splice(emptyIndex, 1);
                // Update DOM
                const wordLines = document.querySelectorAll(".wordLineContainer");
                wordLines[emptyIndex].remove();
                break
            }
        }
    }

    // Update DOM
    renderValidation();

    // Update game state
    score = calculateScore();
    // Update DOM
    playerScoreBox.textContent = score;
}   

function handleActiveWord (buttonIndex) {
    activeWord = playerWords[buttonIndex];
    renderActiveWord();
}

// Functions 

async function getDictionary() {
    const response = await fetch("40k.txt");
    const dictionary = await response.text();

    const splitDictionary = dictionary.split("\n").map(word => word.trim().toLowerCase());

    return new Set(splitDictionary);
}

function chooseRandomTiles (tileArray = letterDictionary) {
    // Create an array of 16 letters using weight probability
    const randomTiles = [];

    for (let x = 0; x < puzzleLength; x++) {
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
        const letters = Object.keys(tileArray[randomRange]);
        const letter = letters[(Math.floor(Math.random() * letters.length))];

        randomTiles.push({
            "letter": letter,
            "score": tileArray[randomRange][letter]
        }); 
    }
    // Add check function that calls this function again if it fails
    return randomTiles; 
}

function updateActiveWord (newWordArrayRef) {
    let activeWordCurrent = playerWords[0];
    if (playerWords.includes(newWordArrayRef)) {
        activeWordCurrent = newWordArrayRef;
    }
    activeWord = activeWordCurrent; 
}

// DOM update functions

function renderLetterPool (tileArray = chosenTiles) {
    // Takes data from chosenTiles and fills DOM tiles
    for (let i = 0; i < displayedLetters.length; i++) {
    displayedLetters[i].textContent = tileArray[i]["letter"];
    displayedScore[i].textContent = tileArray[i]["score"];
    displayedTiles[i].style.opacity = 1;
    if (playerWords.flat().includes(i)) {
        displayedTiles[i].style.opacity = 0.25;
    }
    }
}

function renderPlayerLetters (words = playerWords) {
    // update player words
    const wordsDisplay = document.querySelectorAll(".wordLine");

    for (let i = 0; i < wordsDisplay.length; i++) {
        wordsDisplay[i].replaceChildren();

        for (let x = 0; x < words[i].length; x++) {
            const tileClone = displayedTiles[words[i][x]].cloneNode(true);
            wordsDisplay[i].appendChild(tileClone);
            tileClone.style.opacity = 1;
            tileClone.style.marginRight = "3px";
            tileClone.dataset.tileIndex = words[i][x];
        } 
    }
}

function renderNewWord () {
    // Add word container
    const newWordContainer = document.createElement("div");
    newWordContainer.className = "wordLineContainer";
    wordsBox.appendChild(newWordContainer);

    // Add active word button
    const newActiveWordButton = document.querySelector(".activeWord").cloneNode(true);
    newWordContainer.appendChild(newActiveWordButton);
    newActiveWordButton.style.opacity = 0.5;

    // Add word line
    const newWordLine = document.createElement("div");
    newWordLine.className = "wordLine";
    newWordContainer.appendChild(newWordLine);
}

function renderValidation (arrayRef = playerWords) {
    const validationDisplays = document.querySelectorAll(".activeWord");

    for (let word of arrayRef) {
        if (!validateWord(word)) {
        validationDisplays[arrayRef.indexOf(word)].style.color = "#ff161a";
        }
        else {
            validationDisplays[arrayRef.indexOf(word)].style.color = "#161aff";
        }
    }
        
}

function renderActiveWord (ref = activeWord, wordsArray = playerWords) {
    const buttons = document.querySelectorAll(".activeWord");
    let x = 0;
    while (x < buttons.length) {
        buttons[x].style.opacity = 0.5;
        x++;
    }
    buttons[wordsArray.indexOf(ref)].style.opacity = 1;
}


// Pure functions

function checkForEmptyWord(wordList = playerWords) {
    let emptyWords = [];

    for (let i = 0; i < wordList.length; i++) {
        if (wordList[i].length === 0) {
            emptyWords.push(wordList[i]);
            
        }
    }
    return emptyWords;
}

function validateWord (arrayRef, tilset = chosenTiles) {
    const letterArray = []

    for (let x = 0; x < arrayRef.length; x++) {
        letterArray.push(tilset[arrayRef[x]]["letter"]);
    }

    const fullWord = letterArray.join("").toLowerCase();
    const isValid = testdictionary.has(fullWord);

    return isValid;
}

function calculateScore (refArray = playerWords, tilset = chosenTiles) {
    let totalScore = 0;
    let x = 0;
    while (x < refArray.length) {
        let wordScore = 0;
        if (validateWord(refArray[x])) {
            let y = 0;
            while (y < refArray[x].length) {
                wordScore += tilset[refArray[x][y]]["score"];
                y++;
            }
            const multiplier = 1 + (0.1 * (refArray[x].length - 1));
            totalScore += wordScore * multiplier;
        }
        x++;
    }
    return Math.round(totalScore * 10) / 10;
}

function getIndexes (refIndex, wordsArray = playerWords) {
    const indexes = {};

    for (let x = 0; x < wordsArray.length; x++) {
        if (wordsArray[x].includes(refIndex)) {
            indexes["word"] = x;
            indexes["letter"] = wordsArray[x].indexOf(refIndex);
            break
        }
    }
    return indexes;
}

// Helper functions

function debugList (extraInfo) {
    console.log(
        "playerWords: ", playerWords, 
        "activeWord: ", activeWord,
        extraInfo
    )
}