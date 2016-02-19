'use strict'

const inquirer = require('inquirer')
const promisify = require('es6-promisify')
const group = require('./group')
const collect = require('./sequential-reduce')

const prompt = promisify(inquirer.prompt, function (result) {
  this.resolve(result)
})

const showGroupPrompt = group.showGroupPrompt

function showGalaxyPrompt (galaxy) {

  if (!galaxy.groups.length) {
    console.log(`${galaxy.label} has nothing to install`)
    return {
      galaxy,
      planets: []
    }
  }

  const preamble = [
    `Installing the ${galaxy.label}`,
    '',
    galaxy.description,
    '',
    'The following planet groups are available in this package:'
  ]

  preamble.map((line) => console.log(line))

  const groups = galaxy.groups
    .map((group) => `* ${group.label}`)
    .map((listItem) => console.log(listItem))

  console.log('')

  const question = {
    type: 'list',
    name: 'groups',
    message: 'What do you want to do?',
    default: 'some',
    choices: [
      {
        name: 'Install all planet groups',
        value: 'all'
      },
      {
        name: 'Install some planet groups',
        value: 'some'
      },
      {
        name: 'Install no planet groups at all',
        value: 'none'
      }
    ]
  }

  return prompt([question])
    .then((answers) => {
      if (answers.groups === 'none') {
        return []
      }

      if (answers.groups === 'all') {
        return galaxy.groups.reduce((planets, group) => {
          const planetIds = group.planets.map((planet) => planet.id)
          return [...planets, planetIds]
        }, [])
      }

      return collect(galaxy.groups, showGroupPrompt)
    })
    .then((groups) => {
      return groups.reduce((planets, group) => [...planets, ...group], [])
    })
    .then((planets) => ({ galaxy, planets }))
}

module.exports = {
  showGalaxyPrompt
}
