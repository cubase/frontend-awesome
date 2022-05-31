#!/usr/bin/env node
const chalk = require('chalk')
const { version } = require('../package.json')
const { run } = require('./react-boilerplate')

console.log(chalk.yellow.bold(`@frontend-awesome/react-boilerplate (${version})`))

run()
