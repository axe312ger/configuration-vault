'use strict'

const inquirer = require('inquirer')
const promisify = require('es6-promisify')

const cliHelpers = require('./cli-helpers')

const prompt = promisify(inquirer.prompt, function (result) {
  this.resolve(result)
})

const chalkPlanet = cliHelpers.chalkPlanet
const preamble = cliHelpers.preamble

function showPlanetPrompt (planet) {
  preamble('planet', planet.label, planet.description)

  const question = {
    type: 'confirm',
    name: 'planet',
    message: `Install ${chalkPlanet(planet.label)}`,
    default: true
  }

  return prompt([question])
    .then((answers) => answers.planet ? planet.id : false)
}

module.exports = {
  showPlanetPrompt
}
