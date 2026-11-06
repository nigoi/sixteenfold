import test from "node:test";
import assert from "node:assert/strict";

import { testDictionary, testTiles, blankGameState } from "./testDataSets.js";

import { addLetter, removeLetter, changeActiveWord } from "../src/gameLogic.js";

test("Add multiple words: add two words", () => {
  const originalState = structuredClone(blankGameState);
  let result = addLetter(blankGameState, 4, testDictionary); // T
  result = addLetter(result, 3, testDictionary); // A
  result = addLetter(result, 7, testDictionary); // M
  result = addLetter(result, 2, testDictionary); // E

  result = changeActiveWord(result, 1);

  result = addLetter(result, 5, testDictionary); // B
  result = addLetter(result, 9, testDictionary); // I
  result = addLetter(result, 11, testDictionary); // T
  result = addLetter(result, 10, testDictionary); // E

  assert.deepEqual(result, {
    puzzleLength: 16,
    score: 15.6,
    playerWords: [[4, 3, 7, 2], [5, 9, 11, 10], []],
    activeWord: 1,
    chosenTiles: testTiles,
  });
  assert.deepEqual(blankGameState, originalState);
});

test("Add multiple words: add two words, remove one", () => {
  const originalState = structuredClone(blankGameState);
  let result = addLetter(blankGameState, 4, testDictionary); // T
  result = addLetter(result, 3, testDictionary); // A
  result = addLetter(result, 7, testDictionary); // M
  result = addLetter(result, 2, testDictionary); // E

  result = changeActiveWord(result, 1);

  result = addLetter(result, 5, testDictionary); // B
  result = addLetter(result, 9, testDictionary); // I
  result = addLetter(result, 11, testDictionary); // T
  result = addLetter(result, 10, testDictionary); // E

  result = removeLetter(result, 5, testDictionary); // B
  result = removeLetter(result, 9, testDictionary); // I
  result = removeLetter(result, 11, testDictionary); // T
  result = removeLetter(result, 10, testDictionary); // E

  assert.deepEqual(result, {
    puzzleLength: 16,
    score: 7.8,
    playerWords: [[4, 3, 7, 2], []],
    activeWord: 1,
    chosenTiles: testTiles,
  });
  assert.deepEqual(blankGameState, originalState);
});

test("Add multiple words: add word, remove word, add word", () => {
  const originalState = structuredClone(blankGameState);
  let result = addLetter(blankGameState, 4, testDictionary); // T
  result = addLetter(result, 3, testDictionary); // A
  result = addLetter(result, 7, testDictionary); // M
  result = addLetter(result, 2, testDictionary); // E

  result = removeLetter(result, 4, testDictionary); // T
  result = removeLetter(result, 3, testDictionary); // A
  result = removeLetter(result, 7, testDictionary); // M
  result = removeLetter(result, 2, testDictionary); // E

  result = addLetter(result, 5, testDictionary); // B
  result = addLetter(result, 9, testDictionary); // I
  result = addLetter(result, 11, testDictionary); // T
  result = addLetter(result, 10, testDictionary); // E

  result = changeActiveWord(result, 1);

  result = addLetter(result, 4, testDictionary); // T
  result = addLetter(result, 3, testDictionary); // A
  result = addLetter(result, 7, testDictionary); // M
  result = addLetter(result, 2, testDictionary); // E

  assert.deepEqual(result, {
    puzzleLength: 16,
    score: 15.6,
    playerWords: [[5, 9, 11, 10], [4, 3, 7, 2], []],
    activeWord: 1,
    chosenTiles: testTiles,
  });
  assert.deepEqual(blankGameState, originalState);
});

test("Add multiple words: add two words, remove 1st word, add word, edit word", () => {
  const originalState = structuredClone(blankGameState);
  let result = addLetter(blankGameState, 4, testDictionary); // T
  result = addLetter(result, 3, testDictionary); // A
  result = addLetter(result, 7, testDictionary); // M
  result = addLetter(result, 2, testDictionary); // E

  result = changeActiveWord(result, 1);

  result = addLetter(result, 5, testDictionary); // B
  result = addLetter(result, 9, testDictionary); // I
  result = addLetter(result, 11, testDictionary); // T
  result = addLetter(result, 10, testDictionary); // E

  result = removeLetter(result, 4, testDictionary); // T
  result = removeLetter(result, 3, testDictionary); // A
  result = removeLetter(result, 7, testDictionary); // M
  result = removeLetter(result, 2, testDictionary); // E

  result = changeActiveWord(result, 1);

  result = addLetter(result, 0, testDictionary); // F
  result = addLetter(result, 3, testDictionary); // A
  result = addLetter(result, 7, testDictionary); // M
  result = addLetter(result, 2, testDictionary); // E

  result = changeActiveWord(result, 0);

  result = removeLetter(result, 9, testDictionary); // I
  result = removeLetter(result, 11, testDictionary); // T
  result = removeLetter(result, 10, testDictionary); // E

  result = addLetter(result, 10, testDictionary); // E
  result = addLetter(result, 11, testDictionary); // T

  assert.deepEqual(result, {
    puzzleLength: 16,
    score: 17.7,
    playerWords: [[5, 10, 11], [0, 3, 7, 2], []],
    activeWord: 0,
    chosenTiles: testTiles,
  });
  assert.deepEqual(blankGameState, originalState);
});
