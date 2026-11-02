# Sixteenfold — Feature Roadmap

**Progress (1 November 2026):** Stages 1 and 2 complete (Features 1–8, based on the latest code review). Stage 3 in progress: live validation, score calculation and updates are implemented, but dictionary-error handling, the correct multiplier, individual score displays and submission remain. Random 16-tile development puzzles are working (part of Feature 14).

**Working method:** Build one feature at a time, test it, then commit. `[x]` means implemented in the latest reviewed files; `[ ]` means outstanding. Preserve the minimalist interface; no separate clear-word or delete-word button.

## Rules confirmed

- **16 tiles** per puzzle. Each physical tile can be used only once across all words.
- Standard Scrabble-style letter point values.
- Valid words score their **base letter-point sum multiplied by their length multiplier**.
- **Multiplier = 1 + 0.1 × (number of letters − 1)**. Examples: 1 letter ×1.0; 2 ×1.1; 4 ×1.3; 16 ×2.5.
- Invalid words score **zero**.
- Total score is the **sum of all valid word scores**, shown to one decimal place.

## Stage 1 — Build and edit a word

### 1. Display 16 tiles
- [x] Store each tile's identity, letter and point value.
- [x] Display 16 tiles, including distinct copies of repeated letters.

### 2. Build a word
- [x] Add selected tiles in order.
- [x] Prevent a tile being used twice and visually distinguish used tiles.

### 3. Remove letters
- [x] Click any letter in a word to return that exact tile to the pool.
- [x] Preserve the order of the remaining letters.

### 4. Clear a word without an extra button
- [x] Allow all letters to be removed individually.
- [x] Restore each tile to the pool without duplication.
- [x] Keep the initial empty word available for play.

## Stage 2 — Arrange multiple words

### 5. Create multiple words
- [x] Use `+` to start another word without releasing existing tiles.
- [x] Store each word separately and prevent adding consecutive empty words.

### 6. Remove an empty word automatically
- [x] Remove a word's container and data when its last letter is removed (except the initial word).
- [x] Return its letters to the pool as they are removed.
- [x] Do not change which *other* word is active when deleting an inactive word.

### 7. Edit an existing word
- [x] Select any word using its asterisk button.
- [x] Add and remove letters from that word without creating a duplicate.
- [x] Find button positions dynamically, rather than relying on stored indices.
- [x] Keep the active-word selection and button opacity correct after deleting an earlier word.

### 8. Rearrange letters
- [x] Move letters between words by returning them to the pool and selecting them again.
- [x] Reorder letters within a word by removing and reselecting tiles, without additional controls.
- [x] Keep every tile unique through repeated edits and deletions.

**Milestone achieved:** Build, change and remove multiple words, then recover all 16 distinct tiles.

## Stage 3 — Validate, score and submit

### 9. Check words — nearly complete
- [x] Load a development dictionary from `40k.txt` into a JavaScript `Set` (the supplied file contains approximately 79,340 lines).
- [x] Indicate valid and invalid words visually and update after edits, including edits to inactive words.
- [ ] Handle dictionary network/HTTP/loading failures separately from words that aren't in the dictionary.

### 10. Score individual words — in progress
- [x] Sum the point values of tiles belonging to each valid word.
- [x] Exclude invalid words from score calculation.
- [x] Apply the multiplier to the entire word's base score

### 11. Calculate the total — nearly complete
- [x] Add valid-word contributions together (with no unused-letter deduction).
- [x] Recalculate and display the total after both letter additions and removals.
- [x] Round the total to one decimal place.
- [x] Verify totals after the length-multiplier correction, including invalid words and repeated edits.

### 12. Submit a game — not started
- [ ] Add a final submit action and show a breakdown of words, individual scores and total score (no penalties).
- [ ] Decide and implement whether submission locks the game against edits and repeated submission.

**Milestone:** Complete a local game with dictionary validation, accurate scores and a final result.

## Stage 4 — Prepare real puzzles

### 13. Prepare the release dictionary
- [ ] Build and document an openly reusable British/American word list (target: 150,000+ entries).
- [ ] Remove duplicates, proper nouns and abbreviations; retain valid short words and inflections.
- [ ] Version the dictionary and test representative words.

### 14. Generate playable letter sets
- [x] Generate 16 random letters, with repeats and point values, for development.
- [x] Weight letters by frequency.
- [ ] Enforce a playable vowel/consonant range.

### 15. Tune gameplay
- [ ] Playtest letter sets and adjust generation rules and scoring if necessary.
- [ ] Record the chosen settings as a version.

## Stage 5 — Daily play and saving

### 16. Shared daily puzzle
- [ ] Give each date one puzzle ID, letter set, dictionary version and scoring version.
- [ ] Set a daily rollover time and make the puzzle identical for all players.

### 17. Save progress
- [ ] Store the current arrangement locally in the browser.
- [ ] Restore it safely after refresh or return visits.

### 18. Save completed results
- [ ] Save the final result and completion state by puzzle ID.
- [ ] Show the saved result instead of reopening a completed game for editing.

### 19. New-day rollover
- [ ] Load the new puzzle without mixing it with previous progress.
- [ ] Decide how unfinished puzzles are handled.

## Stage 6 — Release

### 20. Make the interface usable
- [ ] Fit the layout on mobile and desktop, including 16-letter words.
- [ ] Support touch, mouse and keyboard with clear selection and focus feedback.

### 21. Explain the rules
- [ ] Write short instructions for tiles, words, multiplier scoring and submission.
- [ ] Include dictionary rules and required attribution.

### 22. Test and publish
- [ ] Test full games, repeated letters, editing, validation, scoring, saving and rollover.
- [ ] Publish the site and check that a new player can complete a game.
- [ ] Provide a simple way to report issues.

## Decisions

- [x] Sixteen tiles per puzzle; name now shown as **Sixteenfold** in the latest HTML.
- [x] No unused-letter penalties.
- [x] Length multiplier begins at ×1.0 for one letter and increases by ×0.1 per additional letter.
- [x] Invalid words contribute zero points.
- [x] No separate clear-word or delete-word buttons.
- [x] Switching words keeps the others intact and selects the clicked word for editing.
- [ ] Decide whether duplicate words can score more than once.
- [ ] Decide when to round each word score versus the total; specify the display rule consistently.
- [ ] Decide whether submission is final.
- [ ] Choose the daily puzzle timezone and rollover behaviour.

## Later ideas (not required for release)

Drag and drop, keyboard shortcuts, shareable results, statistics and streaks, a puzzle solver, leaderboards, accounts, timed play and a tactical board mode.

**Next task:** Correct the multiplier expression in `calculateScore()`, then add per-word scoring display. Finish Feature 9 error handling before marking it complete; proceed to Feature 12 submission once Features 9–11 pass tests.
