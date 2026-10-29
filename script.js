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
const wordLines = document.querySelectorAll(".wordLine");
const wordsBox = document.querySelector("#wordsBox");
const activeWordButton = document.querySelector(".activeWord");

const deleteWord = document.querySelector(".deleteWord");
const addWord = document.querySelector(".addWord");

let activeWord = 0;

const playerWords = [[]]

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
    console.log(randomTiles);
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
        playerWords.push(activeWord);
        playerWords[activeWord].push([tileref]);
    }

}

function addTileCopyToActiveWord(tileref) {
    const tileClone = displayedTiles[tileref].cloneNode(true);
    wordLines[activeWord].appendChild(tileClone);
    tileClone.style.marginRight = "3px";
    tileClone.addEventListener("click", function () {
        removeTileFromPlayerWords(tileClone);
        removeTileFromWordLine(tileClone);
        restoreTileToActiveTiles(tileref);
    })
}

function removeTileFromActiveTiles(tile) {
    displayedTiles[tile].style.opacity = 0.5;
}

function removeTileFromWordLine (tile) {
    tile.remove();
}

function restoreTileToActiveTiles (tile) {
    console.log(displayedTiles[tile])
    displayedTiles[tile].style.opacity = 1;
}

function removeTileFromPlayerWords (tile) {
    const tileIndexes = getWordIndexes(tile);
    playerWords[tileIndexes["wordIndex"]].splice(tileIndexes["tileIndex"], 1);
}

function getWordIndexes (tile) {
    const parent = tile.parentElement;
    const indexes = {
        wordIndex:  Array.from(wordLines).indexOf(parent),
        tileIndex: Array.from(parent.children).indexOf(tile)
    }
    return indexes;
}   

// Event listener registration

for (let i = 0; i < displayedTiles.length; i++) {
    displayedTiles[i].addEventListener("click", function () {
        if (!playerWords.flat().includes(i)) {
            addTileToPlayerWords(i);
            addTileCopyToActiveWord(i);
            removeTileFromActiveTiles(i);
        }
    })
}


function updateActiveButton (button) {
    const parent = button.parentElement;
    let position = Array.from(document.querySelectorAll(".wordLineContainer")).indexOf(parent);
    console.log(position);
    const buttonList = document.querySelectorAll(".activeWord")
    if (activeWord != position) {
        buttonList[activeWord].style.opacity = 0.25;
        activeWord = position;
        buttonList[activeWord].style.opacity = 1;
    }
}

activeWordButton.addEventListener("click", function () {
    updateActiveButton(activeWordButton);
})

addWord.addEventListener("click", function () {
    if (playerWords[playerWords.length - 1].length != 0) {
        const newWordLineContainer = document.createElement("div");
        newWordLineContainer.className = "wordLineContainer";
        wordsBox.appendChild(newWordLineContainer);

        const newActiveWordButton = document.createElement("button");
        newActiveWordButton.className = "activeWord";
        newActiveWordButton.textContent = "*";
        newWordLineContainer.appendChild(newActiveWordButton);
        
        const buttonList = document.querySelectorAll(".activeWord");
        buttonList[activeWord].style.opacity = 0.25;
        activeWord = playerWords.length;
        
        newActiveWordButton.addEventListener("click", function () {
            updateActiveButton(newActiveWordButton);
        })

        const newWordLine = document.createElement("div");
        newWordLine.className = "wordLine";
        newWordLineContainer.appendChild(newWordLine);
        
  
        playerWords[activeWord] = [];

        console.log(playerWords)
    }
})

// JAVSCRIPT RUNTIME

const chosenTiles = chooseRandomTiles();
populateGridTiles(chosenTiles);