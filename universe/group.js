'use strict'

const inquirer = require('inquirer')
const promisify = require('es6-promisify')

const cliHelpers = require('./cli-helpers')
const collect = require('./sequential-reduce')
const planet = require('./planet')

const prompt = promisify(inquirer.prompt, function (result) {
  this.resolve(result)
})

const chalkPlanet = cliHelpers.chalkPlanet
const newLine = cliHelpers.newLine
const preamble = cliHelpers.preamble
const showPlanetPrompt = planet.showPlanetPrompt

function showGroupPrompt (group) {
  preamble('group', group.label, group.description)

  console.log(newLine())
  console.log('The following planets are available in this group:')
  console.log(newLine())

  group.planets
    .map((planet) => `* ${chalkPlanet(planet.label)}`)
    .forEach((listItem) => console.log(listItem))

  console.log(newLine())

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
        value: 'none',
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
