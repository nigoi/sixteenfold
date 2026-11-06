export const testDictionary = new Set([
  "cat",
  "foe",
  "hello",
  "world",
  "at",
  "a",
  "tame",
  "bite",
  "bet",
  "fame",
]);

export const testTiles = [
  { letter: "F", score: 4 },
  { letter: "O", score: 1 },
  { letter: "E", score: 1 },
  { letter: "A", score: 1 },
  { letter: "T", score: 1 },
  { letter: "B", score: 3 },
  { letter: "C", score: 3 },
  { letter: "M", score: 3 },
  { letter: "P", score: 3 },
  { letter: "I", score: 1 },
  { letter: "E", score: 1 },
  { letter: "T", score: 1 },
];

export let blankGameState = {
  puzzleLength: 16,
  score: 0,
  playerWords: [[]],
  activeWord: 0,
  chosenTiles: testTiles,
};
