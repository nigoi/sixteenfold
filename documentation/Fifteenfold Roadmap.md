# Fifteenfold — Feature Roadmap

Build in this order. Each stage should work before moving on.

## 1. Build words

- [ ] Display 15 fixed letter tiles with point values.
- [ ] Track each tile separately, including repeated letters.
- [ ] Select tiles to form a word.
- [ ] Remove letters or clear the word, returning tiles to the pool.
- [ ] Prevent tiles from being used twice.

## 2. Arrange and edit words

- [ ] Create multiple words from the same 15 tiles.
- [ ] Edit or delete existing words.
- [ ] Reorder letters within words.
- [ ] Move letters between words, initially by returning them to the pool.

## 3. Validate words

- [ ] Check words against a small development dictionary.
- [ ] Mark invalid words clearly and recheck after edits.
- [ ] Handle dictionary loading and errors.
- [ ] Prepare a broad release dictionary of approximately 150,000+ words.
- [ ] Combine British and American spellings and remove duplicates.
- [ ] Include listed one- and two-letter words and word forms.
- [ ] Exclude proper nouns and abbreviations.
- [ ] Keep source licences, attribution and a dictionary version number.

## 4. Score and finish a game

- [ ] Store letter values as adjustable settings.
- [ ] Calculate word scores: letter total × length multiplier.
- [ ] Start at ×0.7 for one letter; add 0.1 per additional letter.
- [ ] Give invalid words zero points.
- [ ] Apply the current penalty of 2 points per unused letter.
- [ ] Show word scores, penalties and the total to one decimal place.
- [ ] Submit the arrangement and display the final score breakdown.
- [ ] Lock editing after submission if submission is irreversible.

**Milestone: a complete local game. Playtest before continuing.**

## 5. Generate playable letter sets

- [ ] Generate exactly 15 letters, allowing repeats.
- [ ] Weight selection by letter frequency.
- [ ] Keep vowels and consonants within a chosen range.
- [ ] Playtest different sets for difficulty and variety.
- [ ] Adjust scoring and generation settings where needed.

## 6. Add daily play and saved progress

- [ ] Give each daily puzzle an identifier and date.
- [ ] Give every player the same letters, dictionary and scoring version.
- [ ] Choose a daily rollover time and timezone.
- [ ] Save and restore progress in the browser.
- [ ] Preserve submitted results.
- [ ] Handle a new day without mixing puzzle states.

## 7. Prepare for release

- [ ] Make the layout work on mobile and desktop.
- [ ] Support touch, mouse and keyboard controls.
- [ ] Show clear selection and keyboard focus indicators.
- [ ] Explain the rules, scoring and penalties.
- [ ] Display dictionary attribution.
- [ ] Check scoring, repeated tiles, editing, saving and daily rollover.
- [ ] Publish and collect player feedback.

## Decisions to settle

- [ ] Decide whether letters in invalid words count as unused. Recommended: yes, to prevent penalty avoidance.
- [ ] Decide when scores are rounded.
- [ ] Decide whether duplicate words are allowed when made from separate tiles.
- [ ] Decide whether final submission is irreversible.
- [ ] Choose the daily timezone and rollover time.

## Optional features after release

- Drag and drop.
- Shareable results.
- Statistics and streaks.
- A solver for assessing puzzles.
- Leaderboards and accounts.
- Timed play.
- Tactical board mode.

## Next milestone

Build two words from a fixed set of 15 tiles, edit either word, and return all tiles to the pool without losing or duplicating any.
