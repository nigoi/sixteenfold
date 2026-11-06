# Sixteenfold — Development Roadmap

**Updated:** 6 November 2026  
**Stack:** HTML, CSS, vanilla JavaScript (ES modules), Node.js built-in test runner, GitHub Actions  
**Goal:** Release a small, polished, playable daily word-tile puzzle without a backend.

**Verification:** Reviewed the supplied `gameLogic.js`, `main.js`, `render.js`, four test files and shared fixtures. Ran the 22 supplied tests against `gameLogic.js` in Node 22: **22 passed, 0 failed**. Browser rendering and GitHub Actions execution were not independently tested here. `[x]` means supported by source/tests; `[ ]` means outstanding or not verified.

## Confirmed game rules

- 16 individually identifiable tiles; each physical tile can only be in one position.
- Standard Scrabble-style letter values.
- Valid word score = letter-value sum × `[1 + 0.1 × (word length − 1)]`.
- Invalid words score zero; no penalty for unused tiles.
- Total = sum of valid word scores, rounded to one decimal place.
- Minimal interface: no separate clear-word or delete-word control.

## Stage 1 — Core tile and word interactions — implemented

- [x] Generate and display 16 individually addressable tiles with letters and points.
- [x] Add a chosen tile to the active word in selection order.
- [x] Prevent reuse of an already-selected tile.
- [x] Click a letter in a word to return its exact tile to the pool.
- [x] Show used tiles differently from available tiles.
- [x] Support multiple words and changing the active word.
- [x] Automatically maintain an available empty word and remove redundant empty words.
- [x] Adjust the active-word index when words are deleted before it.
- [x] Reorder/move letters by removing and reselecting them without added controls.

**Done when:** Full editing workflow works in the browser without lost or duplicated tiles.

## Stage 2 — Separation of concerns and automated tests — substantially complete

- [x] Separate `src/gameLogic.js`, `src/main.js`, and `src/render.js`.
- [x] Make core state changes return updated game-state snapshots, without directly manipulating DOM.
- [x] Extract shared test dictionary, tiles and blank game state into `tests/testDataSets.js`.
- [x] Split unit tests into `addLetter`, `removeLetter`, and helper-function suites.
- [x] Add four multistep integration tests exercising add/remove/switch/edit operations.
- [x] Run all **22** supplied tests successfully in Node.
- [x] Confirm the GitHub Actions workflow passes on the current pull request (not verifiable from uploaded source files).
- [x] Add regression coverage for rejecting out-of-range/noninteger tile indices and for active-word index edge cases.
- [x] Consider consolidating repeated fixture construction only if it starts obstructing test readability.

**Done when:** Tests pass locally and in CI, and the editing workflow passes a manual browser smoke test. Branch protection is optional; it is not currently enforced on the private repository's plan.

## Stage 3 — Word validation, scoring and submitting — next milestone

### Validation and scoring

- [x] Load `assets/40k.txt` into a lowercase `Set` on startup.
- [x] Validate constructed words using the dictionary.
- [x] Visually distinguish valid and invalid constructed words after game-state updates.
- [x] Score each valid word with the confirmed length multiplier.
- [x] Ignore invalid words and round the total to one decimal place.
- [x] Verify representative scores and multiword action sequences in automated tests.
- [x] Handle failed dictionary fetch/HTTP responses explicitly; do not interpret an error page as dictionary data.

### Submission and final result

- [ ] Attach functionality to the existing Submit button.
- [ ] Define a submitted/completed state and prevent further editing or repeated submissions if submission is final.
- [ ] Display a clear final score and the word breakdown (with invalid words distinguished).
- [ ] Test empty submissions, mixed valid/invalid words, unused tiles and repeat submission.

**Done when:** A player can construct words, see a correct running score, submit and view a stable result.

## Stage 4 — Playable and repeatable puzzles

### Generation and dictionary

- [x] Generate 16 tiles with weighted letter-frequency groups for development.
- [ ] Enforce and test a suitable vowel/consonant distribution and other playability constraints.
- [ ] Add controlled randomness/seed input so a given puzzle ID always produces the same tiles.
- [ ] Playtest sample seeds for usefulness and score balance.
- [ ] Choose and license an openly reusable release word list, including UK/US policy, short words, inflections and attribution.
- [ ] Version the dictionary, generation settings and scoring rules for stable daily puzzles.

### Shared daily puzzle

- [ ] Assign a puzzle ID to each date and choose a daily rollover timezone.
- [ ] Derive the same tile set from the same ID for all users, across refreshes/devices.
- [ ] Test that tomorrow gets a new puzzle and yesterday's result is unchanged.

**Done when:** Different browsers receive the same puzzle for the same date and that puzzle is repeatable.

## Stage 5 — Local saving and repeat visits

- [ ] Persist the current puzzle ID, word arrangement, active word and completion status using `localStorage`.
- [ ] Restore an unfinished game after refresh without regenerating tiles or corrupting indexes.
- [ ] Save completed results by puzzle ID; show a completed result instead of an editable game.
- [ ] Handle missing, malformed or obsolete saved data safely.
- [ ] Establish rollover behaviour for unfinished puzzles.
- [ ] Consider simple personal score history/statistics only after basic saving works.

**Done when:** A player can refresh or return tomorrow without losing or mixing game progress.

## Stage 6 — Finish and release

- [ ] Make the layout responsive on mobile and desktop, including long words and all 16 tiles.
- [ ] Check mouse/touch interactions; add usable keyboard focus/activation to interactive controls.
- [ ] Ensure first render immediately shows all game UI and handles dictionary failures clearly.
- [ ] Add concise rules and scoring explanation without cluttering the interface.
- [ ] Fix spelling and naming consistency (`Sixteenfold`); remove development logs.
- [ ] Add a README with local setup (`npm test`), gameplay rules and credits/attribution.
- [ ] Run complete browser playthroughs and test deployed assets/paths.
- [ ] Deploy to a public static host, smoke-test on desktop and mobile, and provide an issue-reporting route.

**Done when:** Someone unfamiliar with the game can open the published site and complete a daily puzzle without guidance.

## Specific code-review notes (6 November)

1. `changeActiveWord()` tests only `buttonIndex > playerWords.length`; negative, fractional and nonnumeric indices are not explicitly rejected. Its fallback to zero is implicit rather than a defined invalid-input policy.
2. `addLetter()` prevents duplicate usage but does not check tile index bounds/type; an invalid index could enter state and cause validation or rendering errors.
3. `renderGame()` compares objects with `state != oldState`, but `main.js` passes a `structuredClone` as `oldState`; therefore this check will always signal a change, even if the contents are identical. This is not currently fatal but makes the guard ineffective.
4. Startup calls `renderLetterPool()` but not full `renderGame()`. Verify initial active-word styling and validation are correctly shown, and decide whether empty words should display an invalid indicator.
5. `getDictionary()` currently awaits `response.text()` without checking `response.ok`; a 404 could be parsed as the dictionary.
6. `renderPlayerLetters()` selects `.tile` globally when cloning source tiles. Scope to `#letterPool .tile` to avoid accidentally cloning a word tile in future rendering/layout changes.
7. `renderValidation()` uses `words.indexOf(word)` to obtain the display index. Indexed iteration is clearer and avoids relying on unique array references.
8. Submit is not wired in the supplied `main.js`; persistence, seed/date IDs and per-word display are also not yet implemented.

## Recommended next tasks (in order)

1. **Small robustness pass:** dictionary HTTP failure handling, tile index guard, active-word index guard and initial render correctness.
2. **Submission flow:** completed state, final-score display, no editing after submission, and focused tests.
3. **Daily puzzle generation:** deterministic seeded generation, playability checks and daily ID.
4. **Browser persistence:** refresh/restore and completed-result history.
5. **Release polish:** mobile layout, instructions, attribution, deployment and end-to-end smoke testing.

## Later, outside MVP

Drag-and-drop, keyboard shortcuts beyond accessibility basics, shareable results, streaks and statistics, accounts, leaderboards, a solver, timed play and a board mode.

**Working method:** One focused feature per branch/pull request; write tests for significant rules or previously discovered bugs; run `npm test` and a short browser smoke test before merging. Keep the interface minimalist and avoid adding infrastructure before a clear need exists.
