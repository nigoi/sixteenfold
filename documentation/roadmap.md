# Fifteenfold — Feature Roadmap

**Progress:** Stages 1 and 2 complete (Features 1–8). Stage 3 is next. Random development tiles are already working (part of Feature 14).

**Working method:** Build one feature at a time, test it, then commit. `[x]` means implemented; `[ ]` means outstanding. Keep the interface minimal: removing a word's last letter deletes the word, so no separate clear or delete button is planned.

## Stage 1 — Build and edit a word

### 1. Display 15 tiles
- [x] Store each tile's identity, letter and point value.
- [x] Display 15 tiles, including distinct copies of repeated letters.

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

**Milestone:** Build, change and remove several words, then recover all 15 distinct tiles.

## Stage 3 — Validate, score and submit

### 9. Check words
- [ ] Load a small development dictionary.
- [ ] Mark valid and invalid words, updating after every edit.
- [ ] Handle dictionary loading failures separately from invalid words.

### 10. Score individual words
- [ ] Sum letter values and apply the length multiplier (×0.7 for one letter, +0.1 per extra letter).
- [ ] Give invalid words zero points and display scores to one decimal place.

### 11. Calculate the total
- [ ] Add valid word scores and subtract 2 points per unused letter.
- [ ] Update the total whenever the arrangement changes.

### 12. Submit a game
- [ ] Add final submission and show the word, penalty and score breakdown.
- [ ] Prevent changes or repeat submission if the result is final.

**Milestone:** Finish a complete local game using a temporary dictionary.

## Stage 4 — Prepare real puzzles

### 13. Prepare the release dictionary
- [ ] Build and document an openly reusable British/American word list (target: 150,000+ entries).
- [ ] Remove duplicates, proper nouns and abbreviations; retain valid short words and inflections.
- [ ] Version the dictionary and test representative words.

### 14. Generate playable letter sets
- [x] Generate 15 random letters with repeats and point values for development.
- [ ] Weight letters by frequency.
- [ ] Enforce a playable vowel/consonant range.

### 15. Tune gameplay
- [ ] Playtest letter sets and adjust the generation rules, scoring and penalties.
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
- [ ] Fit the layout on mobile and desktop, including longer words.
- [ ] Support touch, mouse and keyboard with clear selection and focus feedback.

### 21. Explain the rules
- [ ] Write short instructions for tiles, words, scoring and submission.
- [ ] Include dictionary rules and required attribution.

### 22. Test and publish
- [ ] Test the full game, repeated letters, editing, scoring, saving and rollover.
- [ ] Publish the site and check that a new player can complete a game.
- [ ] Provide a simple way to report issues.

## Decisions to make when needed
- [x] No separate clear-word or delete-word buttons: remove letters individually.
- [x] Switching words keeps the others intact and selects the clicked word for editing.
- [ ] Decide whether invalid words' tiles count as unused.
- [ ] Decide how scores are rounded and whether duplicate words are allowed.
- [ ] Decide whether submission is final, and define the daily timezone and rollover behaviour.

## Later ideas (not required for release)

Drag and drop, keyboard shortcuts, shareable results, statistics and streaks, a puzzle solver, leaderboards, accounts, timed play and a tactical board mode.

**Next task:** Feature 9 — load a small development dictionary, then check and mark words as valid or invalid after each edit.
