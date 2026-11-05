import test from "node:test";
import assert from "node:assert/strict";

import { testDictionary, testTiles } from "./testDataSets.js";

import { addLetter, removeLetter, changeActiveWord } from "../gameLogic.js";
