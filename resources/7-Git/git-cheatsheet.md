## Setup (you only need to do this part once)

* create a fork in github to use for all future pull requests
* clone your fork locally
* set up the main repo as a git remote called upstream

```sh
git clone git@github.com:[your user name]/[your repo].git
cd [your repo]
git remote add upstream git@github.com:rangle/[your repo].git
```

## Then each time want to make a change:

```sh
# update your fork from the main repo
git fetch upstream
git rebase upstream/master

# Create a new branch for your feature
git checkout -b my-new-branch

# commit your changes as before

# push your changes
git push origin my-new-branch

# create a PR on github between your fork's feature branch and the main repo

# once you've gotten a shipit from another team member:

# get anything from master that has changed
git fetch upstream
git rebase upstream/master

# Then go to github and merge the branch into master and delete it. Be sure
# to use the 'squash' button in github (should be set as the default in your
# project's github settings).
```

## Cloning and working on the repo directly

If you have skipped forking you can ignore most of the setup above, just make sure your origin is set to the base repo.

## Then each time you want to make a change:
```sh
# update your local from the main repo
git fetch origin
git rebase origin/master

# Create a new branch for your feature
git checkout -b my-new-branch

# commit your changes as before

# push your changes
git push origin my-new-branch

# create a PR on github on the main repo

# once you've gotten a shipit from another team member:

# get anything from master that has changed
git fetch origin
git rebase origin/master

# Then go to github and merge the branch into master and delete it. Be sure
# to use the 'squash' button in github (should be set as the default in your
# project's github settings).
```
