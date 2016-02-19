'use strict'

const inquirer = require('inquirer')
const promisify = require('es6-promisify')

const prompt = promisify(inquirer.prompt, function (result) {
  this.resolve(result)
})

function showPlanetPrompt (planet) {
  const preamble = [
    `Planet: ${planet.label}`,
    '',
    planet.description,
    ''
  ]

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
