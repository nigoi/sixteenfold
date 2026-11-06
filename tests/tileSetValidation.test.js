import test from "node:test";
import assert from "node:assert/strict";

import { validateTileSet } from "../src/gameLogic.js";

test("validateTileSet: rejects too few vowels", () => {
  const notEnoughVowels = [
    { letter: "A", score: 1 },
    { letter: "E", score: 1 },
    { letter: "I", score: 1 },
    { letter: "O", score: 1 },
    { letter: "B", score: 3 },
    { letter: "C", score: 3 },
    { letter: "D", score: 2 },
    { letter: "F", score: 4 },
    { letter: "G", score: 2 },
    { letter: "H", score: 4 },
    { letter: "J", score: 8 },
    { letter: "K", score: 5 },
    { letter: "L", score: 1 },
    { letter: "M", score: 3 },
    { letter: "N", score: 1 },
    { letter: "P", score: 3 },
  ];

  assert.equal(validateTileSet(notEnoughVowels), false);
});

test("validateTileSet: rejects too many vowels", () => {
  const tooManyVowels = [
    { letter: "A", score: 1 },
    { letter: "E", score: 1 },
    { letter: "I", score: 1 },
    { letter: "O", score: 1 },
    { letter: "U", score: 1 },
    { letter: "A", score: 1 },
    { letter: "E", score: 1 },
    { letter: "B", score: 3 },
    { letter: "C", score: 3 },
    { letter: "D", score: 2 },
    { letter: "F", score: 4 },
    { letter: "G", score: 2 },
    { letter: "H", score: 4 },
    { letter: "J", score: 8 },
    { letter: "K", score: 5 },
    { letter: "L", score: 1 },
  ];

  assert.equal(validateTileSet(tooManyVowels), false);
});

test("validateTileSet: accepts a valid vowel count", () => {
  const correctVowelCount = [
    { letter: "A", score: 1 },
    { letter: "E", score: 1 },
    { letter: "I", score: 1 },
    { letter: "O", score: 1 },
    { letter: "U", score: 1 },
    { letter: "B", score: 3 },
    { letter: "C", score: 3 },
    { letter: "D", score: 2 },
    { letter: "F", score: 4 },
    { letter: "G", score: 2 },
    { letter: "H", score: 4 },
    { letter: "J", score: 8 },
    { letter: "K", score: 5 },
    { letter: "L", score: 1 },
    { letter: "M", score: 3 },
    { letter: "N", score: 1 },
  ];

  assert.equal(validateTileSet(correctVowelCount), true);
});

test("validateTileSet: rejects Q without U", () => {
  const qWithoutU = [
    { letter: "Q", score: 10 },
    { letter: "A", score: 1 },
    { letter: "A", score: 1 },
    { letter: "E", score: 1 },
    { letter: "I", score: 1 },
    { letter: "O", score: 1 },
    { letter: "B", score: 3 },
    { letter: "C", score: 3 },
    { letter: "D", score: 2 },
    { letter: "F", score: 4 },
    { letter: "G", score: 2 },
    { letter: "H", score: 4 },
    { letter: "J", score: 8 },
    { letter: "K", score: 5 },
    { letter: "L", score: 1 },
    { letter: "M", score: 3 },
  ];

  assert.equal(validateTileSet(qWithoutU), false);
});

test("validateTileSet: accepts Q with U", () => {
  const qWithU = [
    { letter: "Q", score: 10 },
    { letter: "U", score: 1 },
    { letter: "A", score: 1 },
    { letter: "E", score: 1 },
    { letter: "I", score: 1 },
    { letter: "B", score: 3 },
    { letter: "C", score: 3 },
    { letter: "D", score: 2 },
    { letter: "F", score: 4 },
    { letter: "G", score: 2 },
    { letter: "H", score: 4 },
    { letter: "J", score: 8 },
    { letter: "K", score: 5 },
    { letter: "L", score: 1 },
    { letter: "M", score: 3 },
    { letter: "O", score: 1 },
  ];

  assert.equal(validateTileSet(qWithU), true);
});

test("validateTileSet: rejects a letter appearing more than three times", () => {
  const tripleB = [
    { letter: "A", score: 1 },
    { letter: "E", score: 1 },
    { letter: "I", score: 1 },
    { letter: "O", score: 1 },
    { letter: "U", score: 1 },
    { letter: "B", score: 3 },
    { letter: "B", score: 3 },
    { letter: "B", score: 3 },
    { letter: "B", score: 3 },
    { letter: "D", score: 2 },
    { letter: "F", score: 4 },
    { letter: "G", score: 2 },
    { letter: "H", score: 4 },
    { letter: "J", score: 8 },
    { letter: "K", score: 5 },
    { letter: "L", score: 1 },
  ];

  assert.equal(validateTileSet(tripleB), false);
});

test("validateTileSet: accepts a letter appearing twice", () => {
  const doubleB = [
    { letter: "A", score: 1 },
    { letter: "E", score: 1 },
    { letter: "I", score: 1 },
    { letter: "O", score: 1 },
    { letter: "U", score: 1 },
    { letter: "B", score: 3 },
    { letter: "B", score: 3 },
    { letter: "C", score: 3 },
    { letter: "D", score: 2 },
    { letter: "F", score: 4 },
    { letter: "G", score: 2 },
    { letter: "H", score: 4 },
    { letter: "J", score: 8 },
    { letter: "K", score: 5 },
    { letter: "L", score: 1 },
    { letter: "M", score: 3 },
  ];

  assert.equal(validateTileSet(doubleB), true);
});
