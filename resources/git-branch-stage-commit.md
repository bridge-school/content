# Git Basics (branch, stage, commit)
Suppose you have just forked and cloned a repository onto your local machine. You're interested in making some changes to it, then eventually requesting that your changes be merged back into that repository. How do you get there?

A good place to start is always to check the state of your files.

Make sure you're in the directory that you cloned locally, then type in the command: 
`git status`. 
You'll see something like this:
```
On branch master
Your branch is up-to-date with 'origin/master'.
nothing to commit, working tree clean
```

Ok... cool. What does that mean? 

## Branching
### What is branching?
When you branch, you diverge from the main line of development so that you can work on some changes without affecting the main line. 

### When do I branch?
You'll typically create new branches when you're developing a feature or putting in a fix. Keeping your changes organized and separated into branches will allow you to work faster overall and with less complications. It also makes it easier to get your code reviewed. When your PRs contain smaller, focused packages of code, a reviewer doesn't need to spend as much time contextualizing or making sense of your changes - this leads to more efficient reviews!

For example, let's say your project's main branch is `master` and it is the 'source of truth' of the state of your live app- everything that is merged into this branch should be ready to be online. Now let's say there are two new features you want to add to your project. If the features are not dependent on each other, this is a good opportunity to create a new branch for each of them. 

Why not make one new branch and work on both of them there? Here's one reason: what if you do, but after you've started making changes for both features, you decide that you don't want feature #1 anymore? Now you have some unwanted changes scattered among your files, and you have to spend time finding and undoing those changes without messing with any of the changes that are related to feature #2. If you had just separated the features into their own branches, you could just scrap the branch for feature #1 and be done with it! 

Why not work on them in master? The same as above, plus the added risk of making changes directly to the branch that reflects your live app (it could break). 

### Ok cool. How do I create/switch branches?
Let's say you want to create a new branch for a feature called `favourites`. To **create** this new branch locally and switch to it, use this command:
```
$ git checkout -b favourites
```
That will give me a message that says:
```
Switched to a new branch 'favourites'
```
Now to **display a list** of what branches you have locally, use the command `git branch`:
```
* favourites
  master
```
The star denotes what branch you are currently on (favourites here). 
To **switch** back to the master branch, just use the command: 
```
$ git checkout master
```
That's pretty much it, just replace the branch names in the above commands to whatever branches you are creating or switching to. 

## Staging
After you've made the changes in your branch, it is time to stage those changes.
Let's say that in your `favourites` branch, you created a new file called `constants.js` and you modified a file called `index.js`. If you check the state of your files using the command `git status`:
```
On branch favourites
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   index.js

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	constants.js

no changes added to commit (use "git add" and/or "git commit -a")
```
Here, `constants.js` is listed as an untracked file because it is new, meaning it was not part of the previous commit, and therefore is not being tracked yet. After this file is included in a commit, it will be tracked. 

Ok, so let's **stage** the changes for both of these files. You can do them individually using the command found in the above message, or do them both using the command: 
```
git add .
```
Now if you check the state of your files using `git status` again, you'll see this:
```
On branch favourites
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   index.js
	new file:   constants.js
```
Now both file changes are staged to be committed. 
## Committing
When you make a commit, you essentially take a snapshot of the state of all the files in the directory at that point in time. This is the basis of tracking changes in git. To make a commit, use this command and include a descriptive message of what the commit does:
```
git commit -m "Add constants file and import to favourites index"
```
You'll see something like this:
```
[favourites ecdc873] Add constants file and import to favourites index
 2 files changed, 2 insertions(+), 1 deletion(-)
 create mode 100644 constants.js
```
Now your staged changes have been committed! (Note: unstaged changes will not be included in the commit). Commit often to make life easier.

## Recap
Here are the basic steps: 
```
// 1. Create and switch to new branch:
git checkout -b [branch_name_here]

// 2. Make changes to your files

// 3. Stage the changes you want to commit
git add [file_name_here]

// 4. After everything is staged the way you want, make a commit
git commit -m "Write a descriptive commit message here"

// 5. Repeat 2-4 as necessary

// 6. Push your local branch to remote and make a PR (covered elsewhere)
```

## Learn more
For more details and options, check out these links:
* [Stage, Commit ](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository)
* [Branch](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)