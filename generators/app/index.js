"use strict";

var Generator = require('yeoman-generator');
var path = require('path');
var yosay = require('yosay');
var _ = require('lodash');
_.mixin(require('underscore.string').exports());

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts)

        this.argument('appname', { type: String, required: true})
    }

    initializing() {
        this.pkg = require('../../package.json');
        this.appname = this.arguments[0] || this.appname;

        this.log(`Generating application ${this.appname}`);
    }

    prompting() {

        return this.prompt([{
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
                name: 'module:author:fullName',
                message: 'Your full name',
                store: true
            }, {
                type: 'Boolean',
                name: 'useReact',
                message: "Include React setup in the module",
                default: true
            }, {
                type: 'input',
                name: 'license',
                message: "License Type",
                default: 'UNLICENSED'
            }]
        ).then((answers) => {
            this.log('Prompting done')
            this.answers = answers;
            this.useReact = answers.useReact;
            this.license = "UNLICENSED";
            this.slug = _.slugify(this.appname);
            this.libname = _.capitalize(_.camelize(_.slugify(_.humanize(this.appname))));
            this.context = {
                answers: this.answers,
                appname: this.options.appname,
                slug: this.slug,
                libname: this.libname
            }

            this.config.save()
        })
    }

    configuring() {

    }

    paths() {
        this.log(`Running from ${this.contextRoot}`)
        this.log(`Destination root is ${this.destinationRoot()}`)
    }

    writingApp() {

        this.log(`context: ` + JSON.stringify(this.context, null, 4))

        this.fs.copyTpl(
            this.templatePath('package.test.json'),
            this.destinationPath('package.test.json'),
            this.context
        )

        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            this.context
        );
        // this.fs.copyTpl(
        //     this.templatePath('_README.md'),
        //     this.destinationPath('README.md'),
        //     { answers: this.answers, appname: this.appname, slug: this.slug, libname: this.libname }
        // );
        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js'),
            this.context
        );
        this.fs.copyTpl(
            this.templatePath('config/base.js'),
            this.destinationPath('config/base.js'),
            this.context
        );
        this.fs.copyTpl(
            this.templatePath('config/development.js'),
            this.destinationPath('config/development.js'),
            this.context
        );
        this.fs.copyTpl(
            this.templatePath('config/production.js'),
            this.destinationPath('config/production.js'),
            this.context
        );
        this.fs.copy(
            this.templatePath('karma.conf.js'),
            this.destinationPath('karma.conf.js')
        );
        this.fs.copy(
            this.templatePath('.babelrc'),
            this.destinationPath('.babelrc'));
        this.fs.copy(
            this.templatePath('.eslintrc'),
            this.destinationPath('.eslintrc'));
        this.fs.copy(
            this.templatePath('editorconfig'),
            this.destinationPath('.editorconfig'));
        this.fs.copy(
            this.templatePath('gitignore'),
            this.destinationPath('.gitignore'));
        this.fs.copy(
            this.templatePath('npmignore'),
            this.destinationPath('.npmignore'));
        this.fs.copy(
            this.templatePath('LICENSE.md'),
            this.destinationPath('LICENSE.md'));
        this.fs.copy(
            this.templatePath('README.md'),
            this.destinationPath('README.md'));
        this.fs.copy(
            this.templatePath('circle.yml'),
            this.destinationPath('circle.yml'));
    }

    writingLib() {
        this.fs.copyTpl(
            this.templatePath('src/index.js'),
            this.destinationPath('src/index.js'),
            this.context
        )
        this.fs.copyTpl(
            this.templatePath('src/main-component.js'),
            this.destinationPath('src/' + this.slug + '.js'),
            this.context
        )
        this.fs.copyTpl(
            this.templatePath('src/static/scss/main-component.scss'),
            this.destinationPath('src/static/scss/' + this.slug + '.scss'),
            this.context
        )
    }

    writingTest() {
        this.fs.copyTpl(
            this.templatePath('__test__/index.spec.js'),
            this.destinationPath('__test__/index.spec.js'),
            this.context
        )
        this.fs.copyTpl(
            this.templatePath('__test__/main-component.spec.js'),
            this.destinationPath('__test__/' + this.slug + '.spec.js'),
            this.context
        )
        this.fs.copy(
            this.templatePath('__test__/unit.test.js'),
            this.destinationPath('__test__/unit.test.js')
        )
        this.fs.copy(
            this.templatePath('__test__/spec-helper.js'),
            this.destinationPath('__test__/spec-helper.js')
        )
        this.fs.copy(
            this.templatePath('__test__/mocha.opts'),
            this.destinationPath('__test__/mocha.opts')
        )
    }

    install() {
        //this.yarnInstall();
    }
};

