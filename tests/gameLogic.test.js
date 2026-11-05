import test from "node:test";
import assert from "node:assert/strict";

import { getIndexes } from "../gameLogic.js";

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
