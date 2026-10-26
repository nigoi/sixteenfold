const puzzleLength = 15;

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
        chosenTiles[tile] = {letter: randomLetters[tile], score: letterDictionary[randomLetters[tile]]}
    }
    return chosenTiles
}

const chosenTiles = chooseRandomTiles();
console.log(chosenTiles)

const displayedTiles = document.querySelectorAll(".tile")
console.log(displayedTiles)

for (const tile in displayedTiles) {
    displayedTiles[tile].textContent = chosenTiles[tile].letter;
}