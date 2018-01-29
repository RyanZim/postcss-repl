# postcss-repl

[![Build Status](https://travis-ci.org/RyanZim/postcss-repl.svg?branch=master)](https://travis-ci.org/RyanZim/postcss-repl) [![Greenkeeper badge](https://badges.greenkeeper.io/RyanZim/postcss-repl.svg)](https://greenkeeper.io/)

An online REPL for [PostCSS](http://postcss.org/), including as many of the most popular PostCSS plugins. (Some, such as [`postcss-import`](https://github.com/postcss/postcss-import), won't work in the browser.)

## Currently Supported Plugins

<!-- AUTO-GENERATED; DO NOT EDIT -->

* [`postcss-simple-vars`](https://github.com/postcss/postcss-simple-vars)
* [`postcss-advanced-variables`](https://github.com/jonathantneal/postcss-advanced-variables)
* [`postcss-mixins`](https://github.com/postcss/postcss-mixins)
* [`postcss-nesting`](https://github.com/jonathantneal/postcss-nesting)
* [`postcss-nested`](https://github.com/postcss/postcss-nested)
* [`short`](https://github.com/jonathantneal/postcss-short)
* [`rucksack`](https://github.com/simplaio/rucksack)
* [`lost`](https://github.com/peterramsing/lost)
* [`postcss-cssnext`](https://github.com/MoOx/postcss-cssnext)
* [`postcss-ordered-values`](https://github.com/ben-eb/postcss-ordered-values)
* [`postcss-calc`](https://github.com/postcss/postcss-calc)
* [`postcss-flexbugs-fixes`](https://github.com/luisrudge/postcss-flexbugs-fixes)
* [`autoprefixer`](https://github.com/postcss/autoprefixer)
* [`cssnano`](https://github.com/ben-eb/cssnano)

<!-- END AUTO-GENERATED -->

## Contributing

Contributions welcome! This is an [OPEN Open Source Project](http://openopensource.org/); individuals making significant and valuable contributions are given commit-access.

A brief rundown of the tech used:

* [Svelte](https://svelte.technology/) for the UI
* [PostCSS](http://postcss.org/) for CSS (of course!)
* [Browserify](http://browserify.org/) for bundling

Please ensure you're using npm v5 or higher when working on this project. We have the `package-lock.json` committed to version control, please keep it up-to-date. (If you use `nvm`, you can just run `nvm use` in the project directory to get the correct version).

We use prettier for code formatting, please run `npm run format` before committing and pushing. The plugin list above is auto-generated, run `npm run build:readme` (or `npm run build`) to regenerate it after adding a plugin.

Run `npm run analyze` to get a breakdown of what packages are eating up bundle size.

Please open an issue before making huge changes.

And most importantly: **Be Nice!**

## License

ISC (similar to MIT, but shorter)
