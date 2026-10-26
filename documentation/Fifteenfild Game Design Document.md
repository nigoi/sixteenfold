# Fifteenfold

## Overview
Fifteenfold is a daily word game. Players arrange 15 letters into words to earn the highest total score possible. Each letter can be used only once.

The challenge is to balance long words, valuable letters and using as many letters as possible.

## Gameplay
1. The player receives 15 letter tiles, each with a point value.
2. The player selects tiles to create words. Each word's score and the running total are displayed.
3. Before submitting, the player can edit or remove words and move letters within or between them.
4. Words not recognised by the game's dictionary are marked as invalid and earn no points.
5. The player submits their final arrangement. Unused letters reduce the final score.

## Letter Generation
- A new set of 15 letters is generated each day, and every player receives the same set.
- Letter selection is random but weighted by letter frequency.
- The number of vowels and consonants stays within a playable range.
- Letters can appear more than once.

## Scoring
Every letter has a point value. The current scoring examples use standard Scrabble letter values; Fifteenfold's final letter values have not yet been set.

Word score = total letter points × word-length multiplier.

The multiplier starts at ×0.7 for a one-letter word and increases by 0.1 for every additional letter. A four-letter word scores ×1.0, and a 15-letter word scores ×2.1.

Each unused letter incurs a 2-point penalty. This value is the current playtesting setting.

Final score = total of valid word scores − (2 × unused letters).

Scores are displayed to one decimal place.

## Accepted Words
- Fifteenfold uses one shared dictionary containing both British and American English spellings.
- Any word in that dictionary is accepted, including obscure, archaic, regional and specialist vocabulary.
- One- and two-letter words are valid if they appear in the dictionary.
- Plurals, conjugations and alternative spellings are accepted when listed.
- Proper nouns and abbreviations are excluded under the current word policy.
- A word must be formed entirely from available tiles; no tile can be used twice.

## Word Bank
- The aim is a broad English word bank of approximately 150,000 words or more, with no fixed maximum.
- It will be assembled from established, openly reusable word lists rather than AI-generated vocabulary.
- British and American spellings will be combined, duplicate entries removed, and source licences and attribution retained.
- All players use the same version of the word bank for a given daily puzzle.
- Dictionary changes take effect between daily puzzles, not during an active puzzle.

## Daily Play
Every player receives the same letters, word bank and scoring rules for the day's challenge, allowing scores to be compared fairly.