# Terminal commands

git diff: review your changes.
git add: select changes for the snapshot.
git commit: save the snapshot locally.
git push: upload saved commits to GitHub.
git -m: add message to commit

git switch -c *name*: Creates new branch under name
git branch:	List local branches and show your current branch
git switch main: Return to the main branch
git switch *name*: Move to your named branch
git push -u origin *name*: Push the new branch to GitHub and set its upstream
git merge *name*: Merges named branch into current branch

# Commit message guide

feat: feature addition
style: style addition
fix: bug fix 
refactor: code refactor
docs: documentation changes
test: automated tests

## One commit for each coherent change. 

Once a complete element is changed, commit it. Features can be broken down into small elements.

E.g.

git commit -m "feat: allow selected tiles to return to the pool"

## New branch for each new feature being worked on

When selecting a ticket, open a branch to work on that feature.