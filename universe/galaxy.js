'use strict'

const inquirer = require('inquirer')
const promisify = require('es6-promisify')

const cliHelpers = require('./cli-helpers')
const collect = require('./sequential-reduce')
const group = require('./group')

const prompt = promisify(inquirer.prompt, function (result) {
  this.resolve(result)
})

const chalkGroup = cliHelpers.chalkGroup
const newLine = cliHelpers.newLine
const preamble = cliHelpers.preamble

const showGroupPrompt = group.showGroupPrompt

function showGalaxyPrompt (galaxy) {
  if (!galaxy.groups.length) {
    console.log(`${galaxy.label} has nothing to install`)
    return {
      galaxy,
      planets: []
    }
  }

  preamble('galaxy', galaxy.label, galaxy.description)

  console.log(newLine())
  console.log('The following planet groups are available in this package:')
  console.log(newLine())

  galaxy.groups
    .map((group) => `* ${chalkGroup(group.label)}`)
    .forEach((listItem) => console.log(listItem))

  console.log(newLine())

  const question = {
    type: 'list',
    name: 'groups',
    message: 'What do you want to do?',
    default: 'some',
    choices: [
      {
        name: 'Install all planet groups',
        value: 'all',
        short: chalkGroup('All groups')
      },
      {
        name: 'Install some planet groups',
        value: 'some',
        short: chalkGroup('Some groups')
      },
      {
        name: 'Install no planet groups at all',
        value: 'none',
        short: chalkGroup('No groups at all')
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
    .then((planets) => ({ config: galaxy, planets }))
}

module.exports = {
  showGalaxyPrompt
}
