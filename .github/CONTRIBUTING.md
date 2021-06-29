# Contributing

:wave: Hi there!
We're thrilled that you'd like to contribute to this project. Your help is essential for keeping it great.

## Submitting a pull request

[Pull Requests][pulls] are used for adding new playbooks, roles, and documents to the repository, or editing the existing ones.

**With write access**

1. Clone the repository (only if you have write access)
1. Create a new branch: `git checkout -b my-branch-name`
1. Make your change
1. Push and [submit a pull request][pr]
1. Pat yourself on the back and wait for your pull request to be reviewed and merged.

**Without write access**

1. [Fork][fork] and clone the repository
1. Create a new branch: `git checkout -b my-branch-name`
1. Make your change
1. Push to your fork and [submit a pull request][pr]
1. Pat your self on the back and wait for your pull request to be reviewed and merged.

**Commit Structure**
All the Herbs organization libraries uses seemantic release and commitizen to :

- Generate changelog
- Control version
- Publish to npm via github actions
Please use this format for commit messages (https://semver.org/). 

To help with this task we have implemented the commitizen to all libraries, just follow those steps:

- `npm install -g commitizen`
- Write a lot of good code to contribute to herbs 🌿
- `git add yourChanges`
- `git cz` or `npm run commit` or `npx cz` instead `git commit` 
- `git push`


Here are a few things you can do that will increase the likelihood of your pull request being accepted:

- Keep your change as focused as possible. If there are multiple changes you would like to make that are not dependent upon each other, consider submitting them as separate pull requests.
- Write [good commit messages](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

Draft pull requests are also welcome to get feedback early on, or if there is something blocking you.

- Create a branch with a name that identifies the user and nature of the changes (similar to `user/branch-purpose`)
- Open a pull request


## Resources

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Using Pull Requests](https://help.github.com/articles/about-pull-requests/)
- [GitHub Help](https://help.github.com)

[pulls]: https://github.com/herbsjs/todolist-on-herbs/pulls
[pr]: https://github.com/herbsjs/todolist-on-herbs/compare
[fork]: https://github.com/herbsjs/todolist-on-herbs/fork
