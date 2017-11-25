# postcss-repl

[![Greenkeeper badge](https://badges.greenkeeper.io/RyanZim/postcss-repl.svg)](https://greenkeeper.io/)

_This is a work-in-progress, things may be messy here._

The goal is to build a REPL for [PostCSS](http://postcss.org/), including as many of the most popular plugins as we can. (Some, such as `postcss-import`, won't work in the browser.)

## Currently Supported Plugins

<!-- AUTO-GENERATED; DO NOT EDIT -->

* [`postcss-simple-vars`](https://www.npmjs.com/package/postcss-simple-vars)
* [`postcss-mixins`](https://www.npmjs.com/package/postcss-mixins)
* [`postcss-nesting`](https://www.npmjs.com/package/postcss-nesting)
* [`postcss-nested`](https://www.npmjs.com/package/postcss-nested)
* [`postcss-short`](https://www.npmjs.com/package/postcss-short)
* [`lost`](https://www.npmjs.com/package/lost)
* [`postcss-cssnext`](https://www.npmjs.com/package/postcss-cssnext)
* [`postcss-ordered-values`](https://www.npmjs.com/package/postcss-ordered-values)
* [`postcss-calc`](https://www.npmjs.com/package/postcss-calc)
* [`postcss-flexbugs-fixes`](https://www.npmjs.com/package/postcss-flexbugs-fixes)
* [`autoprefixer`](https://www.npmjs.com/package/autoprefixer)

<!-- END AUTO-GENERATED -->

## Contributing

Contributions welcome! This is an [OPEN Open Source Project](http://openopensource.org/); individuals making significant and valuable contributions are given commit-access.

A brief rundown of the tech used:

* Vue.js for the UI (this may change in the future)
* PostCSS for CSS (of course!)
* Browserify for bundling

Please ensure you're using npm v5 or higher when working on this project. We have the `package-lock.json` committed to version control, please keep it up-to-date. (If you use `nvm`, you can just run `nvm use` in the project directory to get the correct version).

We use prettier for code formatting, please run `npm run format` before committing and pushing. The plugin list above is auto-generated, run `npm run build:readme` (or `npm run build`) to regenerate it after adding a plugin.

Please open an issue before making huge changes.

And most importantly: **Be Nice!**

## License

ISC (similar to MIT, but shorter)
