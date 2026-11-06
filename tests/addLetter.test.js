import test from "node:test";
import assert from "node:assert/strict";

import { testDictionary, testTiles } from "./testDataSets.js";

import { addLetter } from "../src/gameLogic.js";

test("addLetter: completes a word and recalculates the score", () => {
  const gameState = {
    puzzleLength: 16,
    score: 0,
    playerWords: [[0, 1]],
    activeWord: 0,
    chosenTiles: testTiles,
  };

  const originalState = structuredClone(gameState);

  const result = addLetter(gameState, 2, testDictionary);

  assert.deepEqual(result, {
    puzzleLength: 16,
    score: 7.2,
    playerWords: [[0, 1, 2], []],
    activeWord: 0,
    chosenTiles: testTiles,
  });
  assert.deepEqual(gameState, originalState);
});

test("addLetter: adds the first tile, updates the score and creates an empty word", () => {
  const gameState = {
    puzzleLength: 16,
    score: 0,
    playerWords: [[]],
    activeWord: 0,
    chosenTiles: testTiles,
  };

  const originalState = structuredClone(gameState);

  const result = addLetter(gameState, 3, testDictionary);

  assert.deepEqual(result, {
    puzzleLength: 16,
    score: 1,
    playerWords: [[3], []],
    activeWord: 0,
    chosenTiles: testTiles,
  });
  assert.deepEqual(gameState, originalState);
});

test("addLetter: adds a tile to the second word", () => {
  const gameState = {
    puzzleLength: 16,
    score: 0,
    playerWords: [[0, 1, 2], []],
    activeWord: 1,
    chosenTiles: testTiles,
  };

  const originalState = structuredClone(gameState);

  const result = addLetter(gameState, 3, testDictionary);

  assert.deepEqual(result, {
    puzzleLength: 16,
    score: 8.2,
    playerWords: [[0, 1, 2], [3], []],
    activeWord: 1,
    chosenTiles: testTiles,
  });
  assert.deepEqual(gameState, originalState);
});

test("addLetter: does not add a tile already in use", () => {
  const gameState = {
    puzzleLength: 16,
    score: 7.2,
    playerWords: [[0, 1, 2], []],
    activeWord: 0,
    chosenTiles: testTiles,
  };

  const originalState = structuredClone(gameState);

  const result = addLetter(gameState, 2, testDictionary);

  assert.deepEqual(result, {
    puzzleLength: 16,
    score: 7.2,
    playerWords: [[0, 1, 2], []],
    activeWord: 0,
    chosenTiles: testTiles,
  });
  assert.deepEqual(gameState, originalState);
});

test("addLetter: rejects invalid tile indexes", () => {
  const gameState = {
    puzzleLength: 16,
    score: 7.2,
    playerWords: [[0, 1, 2], []],
    activeWord: 0,
    chosenTiles: testTiles,
  };

  const originalState = structuredClone(gameState);

  const invalidIndexes = [99, -1, 1.5, "2", NaN];

  for (const index of invalidIndexes) {
    const result = addLetter(gameState, index, testDictionary);

    assert.deepEqual(result, originalState);
  }

  assert.deepEqual(gameState, originalState);
});
