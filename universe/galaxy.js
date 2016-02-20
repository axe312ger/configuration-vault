'use strict'

const inquirer = require('inquirer')
const promisify = require('es6-promisify')
const chalk = require('chalk')

const cliHelpers = require('./cli-helpers')
const collect = require('./sequential-reduce')
const group = require('./group')

const prompt = promisify(inquirer.prompt, function (result) {
  this.resolve(result)
})

const chalkGalaxy = cliHelpers.chalkGalaxy;
const chalkGroup = cliHelpers.chalkGroup;
const hr = cliHelpers.hr;
const newLine = cliHelpers.newLine;

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
    newLine(),
    hr('-'),
    `${chalk.bold('Installing the')} ${chalkGalaxy(galaxy.label)} ${chalk.bold('universe')}`,
    newLine(),
    `${chalk.magenta('=>')} ${chalk.dim(galaxy.description)}`,
    hr('-'),
    newLine(),
    'The following planet groups are available in this package:',
    newLine()
  ]

  preamble.map((line) => console.log(line))

  const groups = galaxy.groups
    .map((group) => `* ${chalkGroup(group.label)}`)
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
        value: 'all',
        short: chalkGroup('All groups')
      },
      {
        name: 'Install some planet groups',
        value: 'some'
        ,
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
    .then((planets) => ({ galaxy, planets }))
}

module.exports = {
  showGalaxyPrompt
}
