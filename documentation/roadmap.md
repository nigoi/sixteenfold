# Fifteenfold — Feature Roadmap

Work in order. Each numbered item is a feature; its checkboxes are the elements to implement.
Tick elements as they work. A feature is complete when its “Done when” check passes.
Progress is unassessed: compare this list with the existing game before starting.

## Working rules

- Work on one feature at a time.
- Before starting, put its detailed tasks and completion checks in CURRENT_FEATURE.md.
- Commit small, coherent changes; a checkbox does not have to equal a commit.
- Record unrelated improvements under Later ideas rather than expanding the current feature.
- Revise later tasks when you reach them. These are planning steps, not a fixed code structure.

## Stage 1 — Build and edit one word

### 1. Display the starting tiles

- [x] Create a dataset of all the alphabet letters.
- [x] Store each tile’s identity, letter and point value.
- [x] Display all tiles and their values.

**Done when:** 15 tiles appear, including separately identifiable copies of repeated letters.

### 2. Select tiles to build a word

- [x] Track selected tiles in order.
- [x] Append a clicked tile to the current word.
- [x] Make selected tiles unavailable in the pool.
- [x] Prevent the same tile being selected twice.

**Done when:** the displayed word follows selection order and each physical tile is used at most once.

### 3. Remove a selected letter

- [x] Select an individual letter in the current word to remove.
- [x] Return that exact tile to the available pool.
- [x] Preserve the order of the remaining letters.

**Done when:** either of two identical letters can be removed independently and selected again.

### 4. Clear the current word

- [x] Add a clear-word control.
- [x] Return every tile in the current word to the pool.
- [x] Handle an already empty word.

**Done when:** clearing recovers all selected tiles without duplication.

**Scope:** use simple click/tap controls. Dictionary checks, scores, dragging and custom keyboard shortcuts come later.

## Stage 2 — Arrange multiple words

### 5. Keep a word and start another

- [ ] Add a control to keep the current word in the arrangement.
- [ ] Display kept words separately from the current word.
- [ ] Start a new empty word without releasing tiles in kept words.
- [ ] Prevent empty words from being added.

**Done when:** two words can coexist and share no tile identities.

### 6. Delete a kept word

- [ ] Add a delete control for each kept word.
- [ ] Remove the chosen word and release its tiles.
- [ ] Leave other words and the current word unchanged.

**Done when:** deleting one word recovers exactly its tiles.

### 7. Edit a kept word

- [ ] Choose a kept word for editing.
- [ ] Define what happens if another word is currently being edited.
- [ ] Reuse letter removal and selection to change the chosen word.
- [ ] Save the edit back to the same word, or delete it if emptied.

**Done when:** a word can be changed without losing tiles or creating a duplicate copy of itself.

### 8. Rearrange letters

- [ ] Provide a simple control to move a letter within the current word.
- [ ] Move letters between words by removing them to the pool and selecting them into another word.
- [ ] Keep all word orders and tile ownership accurate.

**Done when:** letters can be reordered within and transferred between words without changing the total of 15 tiles.

**Milestone:** build two words, edit them and recover all 15 tiles. Across the pool and all words, every tile exists exactly once.

## Stage 3 — Validate and score

### 9. Check words against a development dictionary

- [ ] Load a small temporary word list.
- [ ] Match words consistently regardless of letter case.
- [ ] Show valid and invalid states and recheck after edits.
- [ ] Distinguish loading or failed loading from an invalid word.

**Done when:** known valid and invalid words are identified correctly, including after editing.

### 10. Calculate individual word scores

- [ ] Sum the tile values in a word.
- [ ] Apply the multiplier: ×0.7 for one letter, increasing by 0.1 per additional letter.
- [ ] Give invalid words zero points.
- [ ] Show each word’s score to one decimal place and update it after edits.

**Done when:** hand-calculated examples match the display for short and long words.

### 11. Calculate the arrangement total

- [ ] Sum valid word scores.
- [ ] Count unused letters using the agreed invalid-word policy.
- [ ] Subtract 2 points per unused letter; keep the penalty adjustable.
- [ ] Show word total, penalty and final total, updating after every change.

**Done when:** selecting, editing and deleting words always produces the expected score, including negative totals.

### 12. Submit the final arrangement

- [ ] Add a final submission control distinct from keeping an individual word.
- [ ] Explain any irreversible submission behaviour before the player commits.
- [ ] Capture the final words, unused tiles and score breakdown.
- [ ] Show the result and prevent further edits if submission is final.

**Done when:** the submitted result matches the last arrangement and repeated submission cannot alter it.

**Milestone:** a complete local game using fixed letters and a temporary dictionary. Playtest the whole loop before continuing.

## Stage 4 — Prepare real puzzles

### 13. Prepare the release dictionary

- [ ] Select openly reusable sources and retain licences and attribution.
- [ ] Combine British and American entries, normalise case and remove duplicates.
- [ ] Apply the word policy: include listed short words and word forms; exclude proper nouns and abbreviations.
- [ ] Aim for approximately 150,000+ entries and assign a dictionary version.
- [ ] Replace the temporary list and check representative accepted and excluded entries.

**Done when:** the game uses the versioned release word bank and its sources are documented.

### 14. Generate letter sets

- [ ] Generate exactly 15 letters, allowing repeats.
- [ ] Weight selection by letter frequency.
- [ ] Enforce a chosen vowel/consonant range.
- [ ] Allow fresh development sets to be generated for testing.

**Done when:** generated sets consistently satisfy the configured constraints.

### 15. Tune puzzle quality and scoring

- [ ] Playtest varied sets using the release dictionary.
- [ ] Review letter weights, vowel limits, letter values and unused-letter penalties.
- [ ] Record the chosen settings as a scoring/generation version.

**Done when:** the settings are recorded and sampled puzzles have been reviewed for playability and variety.

**Scope:** manual playtesting first. A solver is optional later work.

## Stage 5 — Daily play and persistence

### 16. Load a shared daily puzzle

- [ ] Choose the daily timezone and rollover time.
- [ ] Associate each date with a puzzle ID, letter set, dictionary version and scoring version.
- [ ] Load that same puzzle for every player; a prepared puzzle schedule is sufficient initially.

**Done when:** separate browsers opening the same date receive identical puzzle data and rules.

### 17. Save and resume progress

- [ ] Save tile arrangement and editing state in the browser, linked to the puzzle ID.
- [ ] Restore progress after a refresh or return visit.
- [ ] Recover sensibly from missing, incompatible or unreadable saved data.

**Done when:** refreshing restores a valid arrangement without losing or duplicating tiles.

### 18. Preserve submitted results

- [ ] Save completion status and the final result against the puzzle ID.
- [ ] Restore the submitted result instead of an editable game.
- [ ] Keep its dictionary and scoring versions associated with it.

**Done when:** returning to a completed puzzle shows the same final result.

### 19. Handle the change of day

- [ ] Detect that a different daily puzzle is available.
- [ ] Define what happens to an unfinished game at rollover.
- [ ] Start the new puzzle without applying the previous day’s progress.

**Done when:** returning after rollover loads the appropriate puzzle and never mixes tile sets or rules.

## Stage 6 — Release

### 20. Make the game usable on different devices

- [ ] Fit the layout to mobile and desktop screens.
- [ ] Make all actions usable by touch, mouse and keyboard, with visible focus.
- [ ] Communicate selection and validity without relying only on colour.

**Done when:** the full game can be completed on a phone and with a keyboard alone.

### 21. Explain the game

- [ ] Add concise rules covering tile use, editing, validation and final submission.
- [ ] Explain letter values, multipliers and unused-letter penalties.
- [ ] Show dictionary policy and required source attribution.

**Done when:** a new player can understand and finish a game without your help.

### 22. Check and publish the first release

- [ ] Check the full loop, repeated letters, scoring, saving and rollover.
- [ ] Publish the game and check it at its public address.
- [ ] Provide a way to report problems and record feedback for later prioritisation.

**Done when:** a new player can open the public game, finish a puzzle and return to their saved result.

## Decisions — resolve before the affected feature

- [ ] Before feature 7: what happens to the current word when selecting another word to edit?
- [ ] Before features 9–11: do letters in invalid words count as unused? Recommended: yes, to prevent penalty avoidance.
- [ ] Before feature 10: when are scores rounded?
- [ ] Before feature 9: can the same word appear twice using separate tiles?
- [ ] Before feature 12: is final submission irreversible?
- [ ] Before feature 16: which timezone and time define a new day?
- [ ] Before feature 19: what happens to an unfinished game at rollover?

## Later ideas — outside the first release

- Drag and drop and direct dragging between words.
- Custom typing shortcuts beyond standard keyboard access.
- Shareable results.
- Statistics and streaks.
- A solver for assessing puzzles.
- Leaderboards and accounts.
- Timed play.
- Tactical board mode.
