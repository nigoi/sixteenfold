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

let activeWord = 0;
const playerWords = [
    []
]

function chooseRandomTiles () {
    const letters = Object.keys(letterDictionary);
    const randomLetters = [];
    const chosenTiles = {};
    let x = 0;
    while (x < puzzleLength) {
        randomLetters.push(letters[(Math.floor(Math.random() * letters.length))])
        x++
    }
    for (const tile in randomLetters) {
        chosenTiles[tile] = {letter: randomLetters[tile], score: letterDictionary[randomLetters[tile]], selected: false}
    }
    return chosenTiles
}

function tileClicked (i) {
    if (chosenTiles[i].selected === false) {
        // Adds a key reference to the tile to the words array
        if (playerWords[activeWord]) {
            playerWords[activeWord].push(i);
        }
        else {
            playerWords[activeWord] = [i];
        }

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
            tileCopy.remove();
            const arrayPosition = Array.from(wordsBox.children).indexOf(parent.parentElement);
            if (arrayPosition !== -1) {
                playerWords[activeWord].splice(arrayPosition, 1);
            }

            if (parent.childNodes.length <= 0) {
                if (Array.from(wordsBox.children).length > 1) {
                    const parentPosition = Array.from(wordsBox.children).indexOf(parent.parentElement);
                    playerWords.splice(parentPosition, 1);
                    parent.parentElement.remove();
                    activeWord = 0;
                    const buttonList = document.querySelectorAll(".activeWord")
                    buttonList[activeWord].style.opacity = 1;
                    console.log(playerWords.length);
                    console.log(document.querySelectorAll(".wordLineContainer").length)
                }
            }
            
        });
    }
}

function updateActiveButton (buttonNumber) {
    const buttonList = document.querySelectorAll(".activeWord")
    if (activeWord != buttonNumber) {
        buttonList[activeWord].style.opacity = 0.25;
        activeWord = buttonNumber;
        buttonList[activeWord].style.opacity = 1;
    }
}

const chosenTiles = chooseRandomTiles();

activeWordButton.addEventListener("click", function () {
    updateActiveButton(0);
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
        const buttonNumber = activeWord; 
        
        newActiveWordButton.addEventListener("click", function () {
            updateActiveButton(buttonNumber);
        })

        const newWordLine = document.createElement("div");
        newWordLine.className = "wordLine";
        newWordLineContainer.appendChild(newWordLine);
        
        console.log(activeWord)
    }
})

for (let i = 0; i < displayedTiles.length; i++) {
    displayedTiles[i].addEventListener("click", function () {
    tileClicked(i);
    });
}
for (let i = 0; i < displayedLetters.length; i++) {
    displayedLetters[i].textContent = chosenTiles[i].letter;
    displayedScore[i].textContent = chosenTiles[i].score;
}

