"use strict";

var generators = require('yeoman-generator');
var path = require('path');
var yosay = require('yosay');
var _ = require('lodash');

var QUESTIONS = [{
    type: 'input',
    name: 'module:scope',
    message: 'Module scope (company)',
    default: 'bigzeta'
}, {
    type: 'input',
    name: 'module:name',
    message: 'Module name',
    default: 'mynpm'
}, {
    type: 'input',
    name: 'module:description',
    message: 'Module description',
    default: 'My new npm module'
}, {
    type: 'input',
    name: 'module:author:nickname',
    message: 'Your GitHub username',
    store: true
}, {
    type: 'input',
    name: 'module:author:email',
    message: 'Author email',
    store: true
}, {
    type: 'input',
    name: 'module:author:github',
    message: 'Your GitHub Username',
    store: true
}, {
    type: 'input',
    name: 'module:author:fullName',
    message: 'Your full name',
    store: true
}, {
    type: 'Boolean',
    name: 'useReact',
    message: "Include React setup in the module",
    default: true
}];

module.exports = generators.Base.extend({
    prompting: function() {
        this.log(yosay('BigZeta ES6 npm module generator with:mocha, semver, etc.!'));
        return this.prompt(QUESTIONS).then(function(answers) {
            this.answers = answers;
            this.useReact = answers.useReact;
            this.license = "UNLICENSED";
        }.bind(this));
    },

    writing: function() {
        this.directory('src', 'src');
        this.directory('test', 'test');
        this.copy('babelrc', '.babelrc');
        this.copy('eslintrc', '.eslintrc');
        this.copy('editorconfig', '.editorconfig');
        this.copy('gitignore', '.gitignore');
        this.copy('npmignore', '.npmignore');
        if (this.useReact) {
            this.copy('package.json', 'package.json');
        } else {
            this.copy('package.json', 'package.json');
        }
        this.copy('README.md', 'README.md');
        this.copy('LICENSE.md', 'LICENSE.md');
        this.copy('travis.yml', '.travis.yml');
    },

    install: function() {
        this.npmInstall();
    }
});

