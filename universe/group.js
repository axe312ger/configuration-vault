'use strict'

const inquirer = require('inquirer')
const promisify = require('es6-promisify')
const chalk = require('chalk')

const cliHelpers = require('./cli-helpers')
const collect = require('./sequential-reduce')
const planet = require('./planet')

const prompt = promisify(inquirer.prompt, function (result) {
  this.resolve(result)
})

const chalkGroup = cliHelpers.chalkGroup;
const chalkPlanet = cliHelpers.chalkPlanet;
const hr = cliHelpers.hr;
const newLine = cliHelpers.newLine;
const showPlanetPrompt = planet.showPlanetPrompt

function showGroupPrompt (group) {
  const preamble = [
    newLine(3),
    hr('-'),
    `${chalk.bold('Installing the')} ${chalkGroup(group.label)} ${chalk.bold('planet group')}`,
    newLine(),
    `${chalk.magenta('=>')} ${chalk.dim(group.description)}`,
    hr('-'),
    newLine(),
    'The following planets are available in this group:',
    newLine()
  ]

  preamble.map((line) => console.log(line))

  const planets = group.planets
    .map((planet) => `* ${chalkPlanet(planet.label)}`)
    .map((listItem) => console.log(listItem))

  console.log('')

  const question = {
    type: 'list',
    name: 'planets',
    message: 'What do you want to do?',
    default: 'some',
    choices: [
      {
        name: 'Install all planets of this group',
        value: 'all',
        short: chalkPlanet('All planets')
      },
      {
        name: 'Install some planets of this group',
        value: 'some',
        short: chalkPlanet('Some planets')
      },
      {
        name: 'Install no planets of this group at all',
        value: 'none'
        ,
        short: chalkPlanet('No planets at all')
      }
    ]
  }

  return prompt([question])
    .then((answers) => {
      if (answers.planets === 'none') {
        return []
      }

      if (answers.planets === 'all') {
        return group.planets.map((planet) => planet.id)
      }

      return collect(group.planets, showPlanetPrompt)
    })
    .then((planets) => {
      return planets.filter((p) => p)
    })
}

module.exports = {
  showGroupPrompt
}
