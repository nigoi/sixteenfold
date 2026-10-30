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
    removeTileFromWordLine(elemtentref);
    restoreTileToActiveTiles(tileref);
}

function addWord () {

}

function removeWord () {

}

function updateActiveWord () {

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

function removeTileFromWordLine (tile) {
    tile.remove();
}

function restoreTileToActiveTiles (tile) {
    displayedTiles[tile].style.opacity = 1;
}

function removeTileFromPlayerWords (tileref) {
    const tileIndexes = getWordIndexes(tileref);
    console.log(tileIndexes);
    playerWords[tileIndexes["wordIndex"]].splice(tileIndexes["tileIndex"], 1);
    console.log(playerWords);
}

function getWordIndexes (tileref) {
    let x = 0;
    const tileIndexes = {}
    while (x < playerWords.length) {
        if (playerWords[x].includes(tileref)) {
            tileIndexes["tileIndex"] = playerWords[x].indexOf(tileref);
            tileIndexes["wordIndex"] = x;
            return tileIndexes
        }
        x++;
    }
}   

// Event listener registration

for (let i = 0; i < displayedTiles.length; i++) {
    displayedTiles[i].addEventListener("click", function () {
        addLetter(i);
    })
}

// JAVSCRIPT RUNTIME

const chosenTiles = chooseRandomTiles();
populateGridTiles(chosenTiles);