# Git rebase

## What’s rebasing?

Git rebase takes a branch you select and merges it on to the branch where you’re currently working. Then it takes all of your local commits and applies them on top.

## You said it merges the branches. Why not use `git merge`?

Git rebase solves the same issues as git merge, but rebasing results in a cleaner, easier to understand commit history (better for everyone trying to understand the history of your project!). Rebasing keeps your history clean by moving your commits to the end of your git history, while git merge makes a merge commit every time you pull upstream changes, but keeps your commits at the same at the same point in history when they were made (resulting in a strange spliting of your changes in your git history). 

tl;dr: git rebase makes your commit history easier to read than git merge. To learn more about the difference between merging and rebasing (with handy diagrams!), check out this link: https://www.atlassian.com/git/tutorials/merging-vs-rebasing  

## When should I rebase?

One common reason for rebasing is to get changes from another branch and apply them to your own. Let’s say you and your team are busy working on your project. You’re coding on your local branch when someone else on your team finishes a feature and merges it to master. The new code your friend just pushed is a change you want on your local branch. You can use `git rebase <nameOfYourFriendsBranch>` to add these changes to your local branch and keep working.

Another reason to rebase is to head off (or handle!) any potential merge conflicts. A merge conflict occurs when two branches have code edits on the same lines. Git doesn’t know which of the edits should be kept, so it throws a conflict that a human (you!) has to resolve. So if a teammate's branch is merged before yours and you and your teammate have both touched the same files, your branch could now have merge conflicts. The fix? Rebasing.

Your team norms might dictate other times you need to rebase - for example, a team might agree that if your branch has _any_ outdated changes from master, you rebase. 

## Merge conflicts sound terrible. How can I make sure I never have to deal with them?

Alas, dealing with merge conflicts is a part of developer life. But they don’t have to be awful! To mitigate conflicts, commit your work often and rebase master when new code is added. If everyone on your team does this, you’ll keep your local branches up-to-date and lower the entire team's odds of having to fix a large merge conflict.

Using the interactive mode when performing a rebase helps as well. Interactive mode can be used by adding the -i flag to your rebase command like so:

 `git rebase -i <nameOfBranchToRebaseIn>`

Using interactive mode when rebasing lets you see the commits that you're rebasing, and allows you to edit and squash commits.

## What is git squash?
Git squash allows you to take several commits and combine them into a single commit. Say you've finished a feature - styling a nav bar - and your git history looks like this:
```
3f0e9cdcda init commit
9845111670 in progress
cd362d2f52 still working
300571e57c styled nav bar
```

To keep your git history clean and easy to read, you can combine all of these commits into a single commit and update your commit message. You can do this by rebasing your current branch into itself, and then squashing your commits together, like this:

`git rebase -i <nameOfBranchYouAreOn>~4`

The reason "4" is added to the end of the rebase message is because your branch currently has 4 commits that you want to make into a single commit. After you run this command, git will show you the commits you've selected:

```
pick 3f0e9cdcda init commit
pick 9845111670 in progress
pick cd362d2f52 still working
pick 300571e57c styled nav bar
```

You can squash your commits by keeping the first commit as is, and selecting 'squash' for the other commits like so:

```
pick 3f0e9cdcda init commit
s 9845111670 in progress
s cd362d2f52 still working
s 300571e57c styled nav bar
```

Save your choices:
`cmd + s`, then `cmd+ w`

Once you've done this, git will give you the option of editing the commit messages for all of the commits you've changed. You can edit your commit messages into a single commit that describes the work you've done on the branch. When you're finished editing the messages, save and quit your editor.

At this point you can push your new, squashed changes. Since you've just changed the git history of your branch, you'll need to force push, so rather than:
`git push`

you'll need:

`git push -f`

You use the -f flag to force update your git history on your remote branch after you rebase. If you don't force push your code, you'll get merge conflicts, and no one likes dealing with those.

## When shouldn't I rebase?
Once you've pushed your code to your team's repo, don't rebase anymore. If your code is in the repo, other people on your team may have pulled your work and rebased their branches. Rebasing at this point can cause messiness and merge conflicts.

Similairly, once you've put up a PR and someone on your team has reviewed it and requested changes, don't rebase after you make these changes. You want to keep the history of your commits intact at this point so your reviewers can easily follow the work you've updated.


If you are curious about what’s going on under the hood when you run `git rebase`, you can read more about the mechanics of it here: https://git-scm.com/book/en/v2/Git-Branching-Rebasing

