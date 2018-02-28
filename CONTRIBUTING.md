# Contributing

Contributions welcome! This is an [OPEN Open Source Project](http://openopensource.org/); individuals making significant and valuable contributions are given commit-access.

Please take a moment to review the guidelines below.

## General Conduct

Please respect the following rules:

* Please **do not** derail or troll issues or PR's. Keep the discussion on topic and respect the opinions of others.
* Please **do not** post comments consisting solely of "+1" or ":thumbsup:". Use [GitHub's "reactions" feature](https://github.com/blog/2119-add-reactions-to-pull-requests-issues-and-comments) instead. We will delete comments that violate this rule.
* **Absolutely No** foul language, swearing, or name-calling. Comments that violate this rule will be edited to remove the offensive language or deleted by the moderators.

## Pull Requests

A brief rundown of the tech used:

* [Svelte](https://svelte.technology/) for the UI
* [PostCSS](http://postcss.org/) for CSS (of course!)
* [Webpack](https://webpack.js.org/) for bundling

Please ensure you're using npm v5 or higher when working on this project. We have the `package-lock.json` committed to version control, please keep it up-to-date. (If you use `nvm`, you can just run `nvm use` in the project directory to get the correct version).

We use prettier for code formatting, please run `npm run format` before committing and pushing. The plugin list above is auto-generated, run `npm run build:readme` (or `npm run build`) to regenerate it after adding a plugin.

Run `npm run analyze` to get a breakdown of what packages are eating up bundle size.

Please open an issue before making huge changes.

### Git Commit Messages

* Capitalize the first word
* Don't end the first line with a period
* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference relevant issues and pull requests after the first line

## Collaborator Guidelines

_This section is for collaborators with commit access._

Basic ground rules:

* No `--force` pushes to `master` or long-running development branches.
* Non-master branches _must_ to be used for ongoing work. Anything pushed/merged to `master` is auto-published to the live website.
* All changes (except minor docs revisions, typo/linter fixes, etc.) ought to be subject to an internal pull-request to solicit feedback from other contributors.
* Pull requests should have approval from the majority of the collaborators before merging. For plugin additions and major changes, approval from the owner ([@RyanZim](https://github.com/RyanZim)) is preferred.
* Please ensure that code and markdown is formatted correctly with prettier, and commit messages are within the guidelines above, before merging PRs.
