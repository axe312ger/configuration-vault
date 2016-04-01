'use strict'

const fs = require('mz/fs')
const child_process = require('child_process')
const inquirer = require('inquirer')
const promisify = require('es6-promisify')

const galaxy = require('./universe/galaxy')
const collect = require('./universe/sequential-reduce')
const cliHelpers = require('./universe/cli-helpers')

const spawn = child_process.spawn
const prompt = promisify(inquirer.prompt, function (result) {
  this.resolve(result)
})

const showGalaxyPrompt = galaxy.showGalaxyPrompt
const galaxyRegEx = /^galaxy-([\w-]+)\.json/

const chalkGalaxy = cliHelpers.chalkGalaxy
const displayWelcome = cliHelpers.displayWelcome
const displayNothingToDo = cliHelpers.displayNothingToDo
const displayInstallIntro = cliHelpers.displayInstallIntro
const displayInstallStart = cliHelpers.displayInstallStart
const displayInstallEnd = cliHelpers.displayInstallEnd
const displayInstallOutro = cliHelpers.displayInstallOutro

function installFailed (error) {
  console.error('Failed to install:')
  console.error(error, error.stack)
}

displayWelcome()

fs
  .readdir(`${process.cwd()}/galaxies`)
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

        galaxies[name] = require(`./galaxies/${file}`)

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
      .reduce((previous, galaxy) => {
        const installGalaxy = () => {
          const args = [...galaxy.config.parameters, ...galaxy.planets]
          const command = galaxy.config.command

          displayInstallStart(galaxy.config.label, command, args)

          return new Promise((resolve, reject) => {
            const installer = spawn(command, args, { stdio: 'inherit' })

            installer.on('exit', function (code) {
              displayInstallEnd()

              if (code !== 0) {
                return reject(false)
              }
              resolve(true)
            })
          }).catch(installFailed)
        }

        return previous.then(installGalaxy)
      }, Promise.resolve())

    return installations
  })
  .then(() => {
    displayInstallOutro()
  })
  .catch((error) => {
    console.log('ERROR!!!')
    console.error(error.stack)
  })
