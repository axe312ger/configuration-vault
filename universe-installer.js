'use strict'

const fs = require('mz/fs')
const child_process = require('mz/child_process')
const inquirer = require('inquirer')
const promisify = require('es6-promisify')

const galaxy = require('./universe/galaxy')
const collect = require('./universe/sequential-reduce')
const cliHelpers = require('./universe/cli-helpers')

const exec = child_process.exec
const prompt = promisify(inquirer.prompt, function (result) {
  this.resolve(result)
})

const showGalaxyPrompt = galaxy.showGalaxyPrompt
const galaxyRegEx = /^galaxy-([\w-]+)\.json/

const chalkGalaxy = cliHelpers.chalkGalaxy
const displayProcessLog = cliHelpers.displayProcessLog
const displayWelcome = cliHelpers.displayWelcome
const displayNothingToDo = cliHelpers.displayNothingToDo
const displayInstallIntro = cliHelpers.displayInstallIntro
const newLine = cliHelpers.newLine

function installFailed (error) {
  console.error('Failed to install:')
  console.error(error, error.stack)
}

displayWelcome()

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
  .then((galaxies) => {
    return galaxies.filter((galaxy) => galaxy.planets.length)
  })
  .then((galaxies) => {
    if (!galaxies.length) {
      displayNothingToDo()
      return
    }

    displayInstallIntro()

    const installations = galaxies
      .map((galaxy) => {
        const args = galaxy.planets.join(' ')
        const command = `${galaxy.config.command} ${args}`

        console.log(`* ${command}`)

        return exec(command)
      })
      .map((installation) => {
        return installation
          .then((stdout) => {
            displayProcessLog(stdout.join('\n'))
          })
          .catch(installFailed)
      })

    return Promise.all(installations)
  })
  .then(() => {
    console.log('Installation process finished!!!! We are done ❤️')
    console.log(newLine(2))
  })
  .catch((error) => {
    console.log('ERROR!!!')
    console.error(error.stack)
  })
