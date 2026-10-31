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

let activeWord = 0;

const playerWords = [[]]

// Action Functions

function addLetter (ref) {
    if (!playerWords.flat().includes(ref)) {
        addTileToPlayerWords(ref);
        addTileCopyToActiveWord(ref);
        removeTileFromActiveTiles(ref);
    }
}

function removeLetter (elemtentref, tileref) {
    removeTileFromPlayerWords(tileref);
    removeTileFromWordLine(elemtentref, tileref);
    restoreTileToActiveTiles(tileref);
}

function addWord (newWordIndex) {
    if (!checkForEmptyWord()) {
        addWordToPlayerWords(newWordIndex);
        addWordToWordsBox(newWordIndex);
        updateActiveWord(playerWords[newWordIndex]);
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

function addTileToPlayerWords (tileref) {
    if (playerWords[activeWord]) {
        playerWords[activeWord].push(tileref);
    }
    else {
        playerWords.push([activeWord]);
        playerWords[activeWord].push(tileref);
    }
}

function addTileCopyToActiveWord(tileref) {
    const tileClone = displayedTiles[tileref].cloneNode(true);
    const wordLines = document.querySelectorAll(".wordLine");
    wordLines[activeWord].appendChild(tileClone);
    tileClone.style.marginRight = "3px";
    tileClone.addEventListener("click", function () {
        removeLetter(tileClone, tileref);
    })
}

function removeTileFromActiveTiles(tile) {
    displayedTiles[tile].style.opacity = 0.25;
}

function removeTileFromWordLine (tile, tileref) {
    tile.remove();
}

function restoreTileToActiveTiles (tile) {
    displayedTiles[tile].style.opacity = 1;
}

function removeTileFromPlayerWords (tileref) {
    const tileIndexes = getWordIndexes(tileref);
    playerWords[tileIndexes["wordIndex"]].splice(tileIndexes["tileIndex"], 1);
    if (playerWords[tileIndexes["wordIndex"]].length === 0) {
        removeWord(tileIndexes);
    }
}

function getWordIndexes (tileref) {
    let x = 0;
    const tileIndexes = {}
    while (x < playerWords.length) {
        if (playerWords[x].includes(tileref)) {
            tileIndexes["tileIndex"] = playerWords[x].indexOf(tileref);
            tileIndexes["wordIndex"] = x;
            return tileIndexes;
        }
        x++;
    }
}   

function addWordToPlayerWords (newWordIndex) {
    playerWords[newWordIndex] = [];
}

function addWordToWordsBox (newWordIndex) {
    // Add word container
    const newWordContainer = document.createElement("div");
    newWordContainer.className = "wordLineContainer";
    wordsBox.appendChild(newWordContainer);

    // Add active word button
    const newActiveWordButton = document.querySelector(".activeWord").cloneNode(true);
    newWordContainer.appendChild(newActiveWordButton);
    const currentWordRef = playerWords[newWordIndex];
    newActiveWordButton.addEventListener("click", function () {
        updateActiveWord(currentWordRef);
    })

    // Add word line
    const newWordLine = document.createElement("div");
    newWordLine.className = "wordLine";
    newWordContainer.appendChild(newWordLine);
}

function updateActiveWord (activeWordPlayerWordRef) {
    let activeWordCurrentIndex = 0;
    if (activeWordPlayerWordRef) {
        activeWordCurrentIndex = playerWords.indexOf(activeWordPlayerWordRef);
    }
    activeWord = activeWordCurrentIndex; 
    console.log("new", activeWord)
    updateActiveWordVisuals();
}

function updateActiveWordVisuals () {
    const activeWordDOM = document.querySelectorAll(".activeWord");
    let x = 0;
    while (x < activeWordDOM.length) {
        activeWordDOM[x].style.opacity = 0.5;
        x++;
    }
    activeWordDOM[activeWord].style.opacity = 1;
}

function removeWordFromPlayerWords (indexes) {
    playerWords.splice(indexes["wordIndex"], 1);
}

function removeWordFromWordBox (indexes) {
    const wordContainers = document.querySelectorAll(".wordLineContainer");
    wordContainers[indexes["wordIndex"]].remove();
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

// Event listener registration

for (let i = 0; i < displayedTiles.length; i++) {
    displayedTiles[i].addEventListener("click", function () {
        addLetter(i);
    })
}

addWordButton.addEventListener("click", function () {
    console.log("current", activeWord);
    addWord(playerWords.length);
})

activeWordButton.addEventListener("click", function () {
    updateActiveWord(playerWords[0]);
}) 

// JAVSCRIPT RUNTIME

const chosenTiles = chooseRandomTiles();
populateGridTiles(chosenTiles);