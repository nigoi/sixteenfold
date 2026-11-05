import test from "node:test";
import assert from "node:assert/strict";

import { testDictionary, testTiles } from "./testDataSets.js";

import { removeLetter } from "../gameLogic.js";

test("removeLetter: removes a tile and recalculates the score", () => {
  const gameState = {
    puzzleLength: 16,
    score: 7.2,
    playerWords: [[0, 1, 2], []],
    activeWord: 0,
    chosenTiles: testTiles,
  };

  const originalState = structuredClone(gameState);

  const result = removeLetter(gameState, 2, testDictionary);

  assert.deepEqual(result, {
    puzzleLength: 16,
    score: 0,
    playerWords: [[0, 1], []],
    activeWord: 0,
    chosenTiles: testTiles,
  });
  assert.deepEqual(gameState, originalState);
});

test("removeLetter: removes a single-letter word and recalculates the score", () => {
  const gameState = {
    puzzleLength: 16,
    score: 8.2,
    playerWords: [[0, 1, 2], [3], []],
    activeWord: 1,
    chosenTiles: testTiles,
  };

  const originalState = structuredClone(gameState);

  const result = removeLetter(gameState, 3, testDictionary);

  assert.deepEqual(result, {
    puzzleLength: 16,
    score: 7.2,
    playerWords: [[0, 1, 2], []],
    activeWord: 1,
    chosenTiles: testTiles,
  });

  assert.deepEqual(gameState, originalState);
});

test("removeLetter: removes a tile and adjusts the active word index", () => {
  const gameState = {
    puzzleLength: 16,
    score: 8.2,
    playerWords: [[0, 1, 2], [], [4], [3]],
    activeWord: 2,
    chosenTiles: testTiles,
  };

  const originalState = structuredClone(gameState);

  const result = removeLetter(gameState, 4, testDictionary);

  assert.deepEqual(result, {
    puzzleLength: 16,
    score: 8.2,
    playerWords: [[0, 1, 2], [], [3]],
    activeWord: 1,
    chosenTiles: testTiles,
  });

  assert.deepEqual(gameState, originalState);
});
