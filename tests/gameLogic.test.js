import test from "node:test";
import assert from "node:assert/strict";

const testDictionary = new Set(["cat", "foe", "hello", "world", "at", "a"]);

// Add letter

import { addLetter } from "../gameLogic.js";

test("Correctly adds tile and calculate score", () => {
  const gameState = {
    puzzleLength: 16,
    score: 0,
    playerWords: [[0, 1]],
    activeWord: 0,
    chosenTiles: [
      { letter: "F", score: 4 },
      { letter: "O", score: 1 },
      { letter: "E", score: 1 },
    ],
  };

  const originalState = structuredClone(gameState);

  const result = addLetter(gameState, 2, testDictionary);

  assert.deepEqual(result, {
    puzzleLength: 16,
    score: 7.2,
    playerWords: [[0, 1, 2], []],
    activeWord: 0,
    chosenTiles: [
      { letter: "F", score: 4 },
      { letter: "O", score: 1 },
      { letter: "E", score: 1 },
    ],
  });
  assert.deepEqual(gameState, originalState);
});

test("Correctly adds tile, calculate score and adds empty word", () => {
  const gameState = {
    puzzleLength: 16,
    score: 0,
    playerWords: [[]],
    activeWord: 0,
    chosenTiles: [
      { letter: "F", score: 4 },
      { letter: "O", score: 1 },
      { letter: "E", score: 1 },
      { letter: "A", score: 1 },
      { letter: "T", score: 1 },
    ],
  };

  const originalState = structuredClone(gameState);

  const result = addLetter(gameState, 3, testDictionary);

  assert.deepEqual(result, {
    puzzleLength: 16,
    score: 1,
    playerWords: [[3], []],
    activeWord: 0,
    chosenTiles: [
      { letter: "F", score: 4 },
      { letter: "O", score: 1 },
      { letter: "E", score: 1 },
      { letter: "A", score: 1 },
      { letter: "T", score: 1 },
    ],
  });
  assert.deepEqual(gameState, originalState);
});

test("Correctly adds tile to second word", () => {
  const gameState = {
    puzzleLength: 16,
    score: 0,
    playerWords: [[0, 1, 2], []],
    activeWord: 1,
    chosenTiles: [
      { letter: "F", score: 4 },
      { letter: "O", score: 1 },
      { letter: "E", score: 1 },
      { letter: "A", score: 1 },
      { letter: "T", score: 1 },
    ],
  };

  const originalState = structuredClone(gameState);

  const result = addLetter(gameState, 3, testDictionary);

  assert.deepEqual(result, {
    puzzleLength: 16,
    score: 8.2,
    playerWords: [[0, 1, 2], [3], []],
    activeWord: 1,
    chosenTiles: [
      { letter: "F", score: 4 },
      { letter: "O", score: 1 },
      { letter: "E", score: 1 },
      { letter: "A", score: 1 },
      { letter: "T", score: 1 },
    ],
  });
  assert.deepEqual(gameState, originalState);
});

test("Does not add tile already in use", () => {
  const gameState = {
    puzzleLength: 16,
    score: 7.2,
    playerWords: [[0, 1, 2], []],
    activeWord: 0,
    chosenTiles: [
      { letter: "F", score: 4 },
      { letter: "O", score: 1 },
      { letter: "E", score: 1 },
    ],
  };

  const originalState = structuredClone(gameState);

  const result = addLetter(gameState, 2, testDictionary);

  assert.deepEqual(result, {
    puzzleLength: 16,
    score: 7.2,
    playerWords: [[0, 1, 2], []],
    activeWord: 0,
    chosenTiles: [
      { letter: "F", score: 4 },
      { letter: "O", score: 1 },
      { letter: "E", score: 1 },
    ],
  });
  assert.deepEqual(gameState, originalState);
});

// Remove letter

import { removeLetter } from "../gameLogic.js";

test("Correctly removes tile and calculate score", () => {
  const gameState = {
    puzzleLength: 16,
    score: 7.2,
    playerWords: [[0, 1, 2], []],
    activeWord: 0,
    chosenTiles: [
      { letter: "F", score: 4 },
      { letter: "O", score: 1 },
      { letter: "E", score: 1 },
    ],
  };

  const originalState = structuredClone(gameState);

  const result = removeLetter(gameState, 2, testDictionary);

  assert.deepEqual(result, {
    puzzleLength: 16,
    score: 0,
    playerWords: [[0, 1], []],
    activeWord: 0,
    chosenTiles: [
      { letter: "F", score: 4 },
      { letter: "O", score: 1 },
      { letter: "E", score: 1 },
    ],
  });
  assert.deepEqual(gameState, originalState);
});

test("Correctly removes tile, removes empty word, calculates score", () => {
  const gameState = {
    puzzleLength: 16,
    score: 8.2,
    playerWords: [[0, 1, 2], [3], []],
    activeWord: 1,
    chosenTiles: [
      { letter: "F", score: 4 },
      { letter: "O", score: 1 },
      { letter: "E", score: 1 },
      { letter: "A", score: 1 },
      { letter: "T", score: 1 },
    ],
  };

  const originalState = structuredClone(gameState);

  const result = removeLetter(gameState, 3, testDictionary);

  assert.deepEqual(result, {
    puzzleLength: 16,
    score: 7.2,
    playerWords: [[0, 1, 2], []],
    activeWord: 1,
    chosenTiles: [
      { letter: "F", score: 4 },
      { letter: "O", score: 1 },
      { letter: "E", score: 1 },
      { letter: "A", score: 1 },
      { letter: "T", score: 1 },
    ],
  });

  assert.deepEqual(gameState, originalState);
});

test("Correctly removes tile, doesnt remove active word", () => {
  const gameState = {
    puzzleLength: 16,
    score: 8.2,
    playerWords: [[0, 1, 2], [], [4], [3]],
    activeWord: 2,
    chosenTiles: [
      { letter: "F", score: 4 },
      { letter: "O", score: 1 },
      { letter: "E", score: 1 },
      { letter: "A", score: 1 },
      { letter: "T", score: 1 },
    ],
  };

  const originalState = structuredClone(gameState);

  const result = removeLetter(gameState, 4, testDictionary);

  assert.deepEqual(result, {
    puzzleLength: 16,
    score: 8.2,
    playerWords: [[0, 1, 2], [], [3]],
    activeWord: 1,
    chosenTiles: [
      { letter: "F", score: 4 },
      { letter: "O", score: 1 },
      { letter: "E", score: 1 },
      { letter: "A", score: 1 },
      { letter: "T", score: 1 },
    ],
  });

  assert.deepEqual(gameState, originalState);
});

import { getIndexes } from "../gameLogic.js";

test("Retrieve tile at first index", () => {
  // Arrange
  const playerWords = [
    [1, 2, 3],
    [6, 7, 8, 9],
    [5, 12],
  ];

  // Act
  const result = getIndexes(1, playerWords);

  // Assert
  assert.deepEqual(result, { word: 0, letter: 0 });
});

test("Retrieve correct indexes", () => {
  // Arrange
  const playerWords = [
    [1, 2, 3],
    [6, 7, 8, 9],
    [5, 12],
  ];

  // Act
  const result = getIndexes(8, playerWords);

  // Assert
  assert.deepEqual(result, { word: 1, letter: 2 });
});

test("Retrieve based on missing index", () => {
  // Arrange
  const playerWords = [
    [1, 2, 3],
    [6, 7, 8, 9],
    [5, 12],
  ];

  // Act
  const result = getIndexes(15, playerWords);

  // Assert
  assert.deepEqual(result, { word: -1, letter: -1 });
});

test("Retrieve based on missing playerWords", () => {
  // Arrange
  const playerWords = [];

  // Act
  const result = getIndexes(15, playerWords);

  // Assert
  assert.deepEqual(result, { word: -1, letter: -1 });
});

import { calculateScore } from "../gameLogic.js";

test("Correctly claculate valid one word score", () => {
  // Arrange
  const gameState = {
    playerWords: [[0, 1, 2]],
    chosenTiles: [
      { letter: "F", score: 4 },
      { letter: "O", score: 1 },
      { letter: "E", score: 1 },
      { letter: "A", score: 1 },
    ],
  };
  // Act
  const score = calculateScore(gameState, testDictionary);
  // Assert
  assert.equal(score, 7.2);
});

test("Correctly claculate valid multi word score", () => {
  // Arrange
  const gameState = {
    playerWords: [
      [0, 1, 2],
      [3, 4],
    ],
    chosenTiles: [
      { letter: "F", score: 4 },
      { letter: "O", score: 1 },
      { letter: "E", score: 1 },
      { letter: "A", score: 1 },
      { letter: "T", score: 1 },
    ],
  };
  // Act
  const score = calculateScore(gameState, testDictionary);
  // Assert
  assert.equal(score, 9.4);
});

test("Correctly claculate mixed validity word score", () => {
  // Arrange
  const gameState = {
    playerWords: [
      [0, 1, 2],
      [3, 1],
    ],
    chosenTiles: [
      { letter: "F", score: 4 },
      { letter: "O", score: 1 },
      { letter: "E", score: 1 },
      { letter: "A", score: 1 },
      { letter: "T", score: 1 },
    ],
  };
  // Act
  const score = calculateScore(gameState, testDictionary);
  // Assert
  assert.equal(score, 7.2);
});

test("Correctly claculate invalid word score", () => {
  // Arrange
  const gameState = {
    playerWords: [[2, 1, 0]],
    chosenTiles: [
      { letter: "F", score: 4 },
      { letter: "O", score: 1 },
      { letter: "E", score: 1 },
    ],
  };
  // Act
  const score = calculateScore(gameState, testDictionary);
  // Assert
  assert.equal(score, 0);
});

test("Correctly claculate missing word score", () => {
  // Arrange
  const gameState = {
    playerWords: [[]],
    chosenTiles: [
      { letter: "F", score: 4 },
      { letter: "O", score: 1 },
      { letter: "E", score: 1 },
    ],
  };
  // Act
  const score = calculateScore(gameState, testDictionary);
  // Assert
  assert.equal(score, 0);
});
