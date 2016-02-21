/**
 * @file       installer.app-store.js
 * @desc       Guides user to multiple mac app store installations
 *
 * @param      ids multiple number of app store ids to open
 */
'use strict'

const inquirer = require('inquirer')
const promisify = require('es6-promisify')
const open = require('open')

const ids = process.argv.slice(2)

const prompt = promisify(inquirer.prompt, function (result) {
  this.resolve(result)
})

function annoyUser () {
  const messages = [
    'Are you ready to install the next app?',
    'Keep it rollin?',
    'Gogogo?',
    'So.. are you ready yet for the next one?',
    'Are you done with this one?'
  ]

  const question = {
    type: 'confirm',
    name: 'continue',
    message: messages[Math.floor(Math.random() * messages.length)],
    default: false
  }

  return prompt([question])
    .then((answers) => {
      if (!answers.continue) {
        return annoyUser()
      }

      return true
    })
}

ids
  .reduce((previous, id) => {
    const nextItem = (previousItem) => {
      console.log(`Installing app with id: ${id}`)
      open(`macappstores://itunes.apple.com/de/app/magnet/${id}`)

      return annoyUser()
    }
    return previous.then(nextItem)
  }, Promise.resolve())
