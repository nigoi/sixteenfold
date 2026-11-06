import test from "node:test";
import assert from "node:assert/strict";

import { testDictionary, testTiles } from "./testDataSets.js";

// Update active word

import { changeActiveWord } from "../src/gameLogic.js";

test("changeActiveWord: selects a different active word", () => {
  const gameState = {
    puzzleLength: 16,
    score: 0,
    playerWords: [[0, 1, 2], []],
    activeWord: 0,
    chosenTiles: testTiles,
  };
  const buttonIndex = 1;

  const result = changeActiveWord(gameState, buttonIndex);

  assert.deepEqual(result, {
    puzzleLength: 16,
    score: 0,
    playerWords: [[0, 1, 2], []],
    activeWord: 1,
    chosenTiles: testTiles,
  });
});

test("changeActiveWord: rejects an out-of-bounds index", () => {
  const gameState = {
    puzzleLength: 16,
    score: 0,
    playerWords: [[0, 1, 2], []],
    activeWord: 0,
    chosenTiles: testTiles,
  };
  const buttonIndex = 3;

  const result = changeActiveWord(gameState, buttonIndex);

  assert.deepEqual(result, {
    puzzleLength: 16,
    score: 0,
    playerWords: [[0, 1, 2], []],
    activeWord: 0,
    chosenTiles: testTiles,
  });
});

// Get indexes

import { getIndexes } from "../src/gameLogic.js";

test("getIndexes: finds a tile at the first position", () => {
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

test("getIndexes: finds a tile in the second word", () => {
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

test("getIndexes: returns sentinel indexes for a missing tile", () => {
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

test("getIndexes: returns sentinel indexes for an empty words array", () => {
  // Arrange
  const playerWords = [];

  // Act
  const result = getIndexes(15, playerWords);

  // Assert
  assert.deepEqual(result, { word: -1, letter: -1 });
});

// Calculate score

import { calculateScore } from "../src/gameLogic.js";

test("calculateScore: scores one valid word", () => {
  // Arrange
  const gameState = {
    playerWords: [[0, 1, 2]],
    chosenTiles: testTiles,
  };
  // Act
  const score = calculateScore(gameState, testDictionary);
  // Assert
  assert.equal(score, 7.2);
});

test("calculateScore: sums scores for multiple valid words", () => {
  // Arrange
  const gameState = {
    playerWords: [
      [0, 1, 2],
      [3, 4],
    ],
    chosenTiles: testTiles,
  };
  // Act
  const score = calculateScore(gameState, testDictionary);
  // Assert
  assert.equal(score, 9.4);
});

test("calculateScore: scores only valid words in a mixed set", () => {
  // Arrange
  const gameState = {
    playerWords: [
      [0, 1, 2],
      [3, 1],
    ],
    chosenTiles: testTiles,
  };
  // Act
  const score = calculateScore(gameState, testDictionary);
  // Assert
  assert.equal(score, 7.2);
});

test("calculateScore: returns zero for an invalid word", () => {
  // Arrange
  const gameState = {
    playerWords: [[2, 1, 0]],
    chosenTiles: testTiles,
  };
  // Act
  const score = calculateScore(gameState, testDictionary);
  // Assert
  assert.equal(score, 0);
});

test("calculateScore: returns zero for an empty word", () => {
  // Arrange
  const gameState = {
    playerWords: [[]],
    chosenTiles: testTiles,
  };
  // Act
  const score = calculateScore(gameState, testDictionary);
  // Assert
  assert.equal(score, 0);
});
