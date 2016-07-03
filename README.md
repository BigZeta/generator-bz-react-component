# generator-bigzeta-npm

This generator creates empty npm module with ES6 support and integrated Travis and Coveralls services.

## Getting Started

```bash
npm install -g yo @bigzeta/generator-bigzeta-npm
mkdir my-project && cd my-project
yo bigzeta-npm
```

Or you can create folder with your project and just copy\paste this code to terminal (you should be located under your project folder)

```bash
npm install -g yo @bigzeta/generator-bigzeta-npm && yo bigzeta-npm
```

## Project structure

When project is generated you will get project with that structure:

```
|-- my-project
  |-- src
  |  |-- index.js
  |  |-- starwars-names.json
  |-- test
  |  |-- unit
  |  |  |-- index.test.js
  |  |-- functional
  |  |  |-- index.test.js
  |  |-- mocha.opts
  |-- .babelrc
  |-- .eslintrc
  |-- .editorconfig
  |-- .gitignore
  |-- .npmignore
  |-- .travis.yml
  |-- package.json
  |-- LICENSE
  |-- README.md
```

This project is a simple tutortial app, but serves as starting point. Toss the things you don't need.

## License

UNLICENSED