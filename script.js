const gameName = "fifteenfold";
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const puzzleLength = 15;

console.log(gameName);

function generateLetters() {
    let randomLetters = [];
    let x = 0;
    while (x < puzzleLength) {
        randomLetters.push(letters[Math.floor(Math.random() * letters.length)]);
        x++;
    }
    return randomLetters;
}

function fillTiles() {
    const tiles = document.querySelectorAll(".tile");
    let x = 0;
    while (x < tiles.length) {
        tiles[x].textContent = puzzle[x];
        x++;
    }
}

const puzzle = generateLetters();
fillTiles();

addEventListener()
