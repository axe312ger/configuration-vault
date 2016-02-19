'use strict'

const inquirer = require('inquirer')
const promisify = require('es6-promisify')
const planet = require('./planet')

const collect = require('./sequential-reduce')

const prompt = promisify(inquirer.prompt, function (result) {
  this.resolve(result)
})

const showPlanetPrompt = planet.showPlanetPrompt

function showGroupPrompt (group) {
  const preamble = [
    '',
    `Group: ${group.label}`,
    '',
    group.description,
    '',
    'The following planets are available in this group:'
  ]

  preamble.map((line) => console.log(line))

  const planets = group.planets
    .map((planet) => `* ${planet.label}`)
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
        value: 'all'
      },
      {
        name: 'Install some planets of this group',
        value: 'some'
      },
      {
        name: 'Install no planets of this group at all',
        value: 'none'
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
