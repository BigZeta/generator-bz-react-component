"use strict";

var generators = require('yeoman-generator');
var path = require('path');
var yosay = require('yosay');
var _ = require('lodash');
_.mixin(require('underscore.string').exports());

var QUESTIONS = [{
    type: 'input',
    name: 'module:scope',
    message: 'Module scope (company)',
    default: 'bigzeta'
}, {
    type: 'input',
    name: 'component',
    message: 'Component Name',
    default: 'MyReactComponent'
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
    initializing: function () {
        this.pkg = require('../../package.json');
        this.appname = this.arguments[0] || this.appname;

        console.log(this.appname);

    },

    prompting: function() {
        this.log(yosay('BigZeta ES6 npm module generator with:mocha, semver, etc.!'));
        return this.prompt(QUESTIONS).then(function(answers) {
            this.answers = answers;
            this.useReact = answers.useReact;
            this.license = "UNLICENSED";
            this.slug = _.slugify(this.appname);
            this.libname = _.capitalize(_.camelize(_.slugify(_.humanize(this.appname))));
            this.context = {
                answers: this.answers,
                appname: this.appname,
                slug: this.slug,
                libname: this.libname
            }
        }.bind(this));
    },

    writing: {
        app: function() {

            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'),
                this.context
            );
            // this.fs.copyTpl(
            //     this.templatePath('_README.md'),
            //     this.destinationPath('README.md'),
            //     { answers: this.answers, appname: this.appname, slug: this.slug, libname: this.libname }
            // );
            this.fs.copyTpl(
                this.templatePath('_webpack.config.js'),
                this.destinationPath('webpack.config.js'),
                this.context
            );
            this.fs.copy(
                this.templatePath('karma.conf.js'),
                this.destinationPath('karma.conf.js')
            );
            this.fs.copyTpl(
                this.templatePath('_index.html'),
                this.destinationPath('index.html'),
                this.context
            );
            this.copy('babelrc', '.babelrc');
            this.copy('eslintrc', '.eslintrc');
            this.copy('editorconfig', '.editorconfig');
            this.copy('gitignore', '.gitignore');
            this.copy('npmignore', '.npmignore');
            this.copy('LICENSE.md', 'LICENSE.md');
            this.copy('_README.md', 'README.md');
            this.copy('_travis.yml', '.travis.yml');
        },

        lib: function() {
            this.fs.copyTpl(
                this.templatePath('src/_index.js'),
                this.destinationPath('src/index.js'),
                this.context
            );
            this.fs.copyTpl(
                this.templatePath('src/_main-component.jsx'),
                this.destinationPath('src/' + this.slug + '.jsx'),
                this.context
            );
            this.fs.copyTpl(
                this.templatePath('src/_main-component.scss'),
                this.destinationPath('src/' + this.slug + '.scss'),
                this.context
            );
        },
        spec: function() {
            this.fs.copyTpl(
                this.templatePath('spec/_main-component.spec.jsx'),
                this.destinationPath('spec/' + this.slug + '.spec.jsx'),
                this.context
            );
            this.fs.copy(
                this.templatePath('spec/spec-helper.js'),
                this.destinationPath('spec/spec-helper.js')
            );
        },

        test: function() {
            this.fs.copyTpl(
                this.templatePath('test/functional/_functional.test.js'),
                this.destinationPath('test/functional/' + this.slug + '.test.jsx'),
                this.context
            );
            this.fs.copyTpl(
                this.templatePath('test/unit/_unit.test.js'),
                this.destinationPath('test/unit/' + this.slug + '.test.jsx'),
                this.context
            );
        }
    },

    install: function() {
        this.npmInstall();
    }
});

