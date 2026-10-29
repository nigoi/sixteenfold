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

const deleteWord = document.querySelector(".deleteWord");
const addWord = document.querySelector(".addWord");

const chosenTiles = [];

let activeWord = 0;

const playerWords = [[]]

// Functions 

function chooseRandomTiles () {
    // Create an array of 26 letters 
    const letters = Object.keys(letterDictionary);

    // Fills array with letter data
    let x = 0;
    while (x < puzzleLength) {
        let letter = letters[(Math.floor(Math.random() * letters.length))];

        chosenTiles.push({
            "letter": letter,
            "score": letterDictionary[letter],
        })
        x++
    }
    console.log(chosenTiles)
}

function populateTiles (chosenTiles) {
    // Takes data from chosenTiles and fills DOM tiles
    for (let i = 0; i < displayedLetters.length; i++) {
    displayedLetters[i].textContent = chosenTiles[i]["letter"];
    displayedScore[i].textContent = chosenTiles[i]["score"];
}
}

// Event listener registration



function tileClicked (i) {
    if (chosenTiles[i].selected === false) {
        // Adds a key reference to the tile to the words array
  
        playerWords[activeWord].push(i);

        // Create a copy of the tile and add to the active word
        const tileCopy = displayedTiles[i].cloneNode(true);
        tileCopy.style.marginRight = "2px";
        const wordLines = document.querySelectorAll(".wordLine");
        wordLines[activeWord].appendChild(tileCopy);
        chosenTiles[i].selected = true;
        displayedTiles[i].style.opacity = 0.5;

        // Connect on click function that removes tile from active word
        tileCopy.addEventListener("click", function () {
            const parent = tileCopy.parentElement;
            chosenTiles[i].selected = false;
            displayedTiles[i].style.opacity = 1;
            const wordIndex = Array.from(wordsBox.children).indexOf(parent.parentElement);
            const tileIndex = Array.from(parent.children).indexOf(tileCopy);
            if (wordIndex !== -1) {
                playerWords[wordIndex].splice(tileIndex, 1);
            }

            tileCopy.remove();

            if (parent.childNodes.length <= 0) {
                if (Array.from(wordsBox.children).length > 1) {
                    const parentPosition = Array.from(wordsBox.children).indexOf(parent.parentElement);
                    playerWords.splice(parentPosition, 1);
                    parent.parentElement.remove();
                    activeWord = 0;
                    const buttonList = document.querySelectorAll(".activeWord")
                    buttonList[activeWord].style.opacity = 1;
                }
            }
            
            console.log(playerWords);
        });
    }
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

chooseRandomTiles();
populateTiles(chosenTiles);
