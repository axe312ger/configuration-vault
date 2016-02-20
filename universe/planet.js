'use strict'

const inquirer = require('inquirer')
const promisify = require('es6-promisify')
const chalk = require('chalk')

const cliHelpers = require('./cli-helpers')

const prompt = promisify(inquirer.prompt, function (result) {
  this.resolve(result)
})

const chalkPlanet = cliHelpers.chalkPlanet;
const hr = cliHelpers.hr;
const newLine = cliHelpers.newLine;

function showPlanetPrompt (planet) {
  const preamble = [
    newLine(3),
    hr('-'),
    `${chalk.bold('Installing the')} ${chalkPlanet(planet.label)} ${chalk.bold('planet')}`,
    newLine(),
    `${chalk.magenta('=>')} ${chalk.dim(planet.description)}`,
    hr('-'),
    newLine(),
  ]

  preamble.map((line) => console.log(line))

  const question = {
    type: 'confirm',
    name: 'planet',
    message: `Install ${planet.label}`,
    default: true
  }

  return prompt([question])
    .then((answers) => answers.planet ? planet.id : false)
}

module.exports = {
  showPlanetPrompt
}
