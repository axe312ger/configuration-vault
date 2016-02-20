'use strict'

const fs = require('mz/fs')
const inquirer = require('inquirer')
const promisify = require('es6-promisify')
const chalk = require('chalk')

const galaxy = require('./universe/galaxy')
const collect = require('./universe/sequential-reduce')
const cliHelpers = require('./universe/cli-helpers')

const prompt = promisify(inquirer.prompt, function (result) {
  this.resolve(result)
})

const showGalaxyPrompt = galaxy.showGalaxyPrompt
const center = cliHelpers.center;
const hr = cliHelpers.hr;
const chalkGalaxy = cliHelpers.chalkGalaxy;
const chalkGroup = cliHelpers.chalkGroup;
const chalkPlanet = cliHelpers.chalkPlanet;
const newLine = cliHelpers.newLine;
const galaxyRegEx = /^galaxy-([\w-]+)\.json/

console.log(newLine(2))
console.log(chalk.inverse(hr('#')))
console.log(chalk.inverse(center('Welcome to the interactive universe installer')))
console.log(chalk.inverse(hr('#')))
console.log(newLine())
console.log(`It will guide you though the installation process of several package manager ${chalkGalaxy('galaxies')}.`)
console.log(`These contain ${chalkGroup('groups')} of ${chalkPlanet('planets')} which represents the packages to install.`)
console.log('The universe has the following structure:')
console.log(newLine())
console.log('First we will gather all the packages to install, afterwards they are installed in one batch so you got time to grab a club mate')
console.log(newLine(2))
console.log(`So... No need to wait... Lets ${chalk.green('start')}.`)
console.log(newLine(2))

fs
  .readdir(process.cwd())
  .catch((err) => {
    console.err(err)
  })
  .then((files) => {
    const galaxyConfigs = files
      .map((file) => galaxyRegEx.exec(file))
      .filter((matched) => matched)
      .reduce((galaxies, matchResult) => {
        const name = matchResult[1]
        const file = matchResult[0]

        galaxies[name] = require(`./${file}`)

        return galaxies
      }, {})

    return galaxyConfigs
  })
  .then((galaxyConfigs) => {
    const choices = Object.keys(galaxyConfigs)
      .map((galaxyKey) => ({
        name: galaxyConfigs[galaxyKey].label,
        value: galaxyKey,
        short: chalkGalaxy(galaxyConfigs[galaxyKey].label)
      }))

    const question = {
      type: 'checkbox',
      name: 'galaxies',
      message: 'Select which galaxys you want to install',
      choices
    }

    return prompt([question])
      .then((answers) => {
        return answers.galaxies
          .map((galaxyKey) => galaxyConfigs[galaxyKey])
      })
  })
  .then((galaxyConfigs) => {
    return collect(galaxyConfigs, showGalaxyPrompt)
  })
  .then((planets) => {
    console.log('All data needed...')
    console.log(planets)
    console.log('TODO: Start install!')
  })
  .catch((error) => {
    console.log('ERROR!!!');
    console.error(error.stack);
  })
