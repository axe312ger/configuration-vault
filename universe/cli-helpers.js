'use strict'

const chalk = require('chalk')
const punycode = require('punycode')
const shellEscape = require('shell-escape')

const maxColumns = 100
const columns = process.stdout.columns > maxColumns ? maxColumns : process.stdout.columns

function realLength (utf8Text) {
  return punycode.ucs2.decode(utf8Text).length
}

function center (text) {
  const textLength = realLength(text)
  const prefixLength = Math.ceil((columns - textLength) / 2)
  const postfixLength = columns - (prefixLength + textLength)
  const prefix = Array(prefixLength + 1).join(' ')
  const postfix = Array(postfixLength + 1).join(' ')

  return prefix + text + postfix
}

function chalkGalaxy (text) {
  return chalk.magenta(text)
}

function chalkGroup (text) {
  return chalk.green(text)
}

function chalkPlanet (text) {
  return chalk.blue(text)
}

function hr (char) {
  return Array(columns + 1).join(char || '#')
}

function newLine (count) {
  return Array(count || 1).join('\n')
}

function preamble (type, label, desc) {
  let title
  switch (type) {
    case 'galaxy':
      title = chalkGalaxy(label)
      break
    case 'group':
      title = chalkGroup(label)
      break
    case 'planet':
      title = chalkPlanet(label)
      break
  }

  const preamble = [
    newLine(3),
    hr('-'),
    `${chalk.bold('Installing the')} ${title} ${chalk.bold(type)}`,
    newLine(),
    description(desc),
    hr('-'),
    newLine()
  ]

  preamble.map((line) => console.log(line))
}

function description (text) {
  const prefix = '=> '

  const chunkLength = columns - prefix.length
  const words = text.split(' ')

  const chunks = words.reduce((lines, word) => {
    const line = lines.pop() || []

    if (realLength(line.join(' ')) + realLength(word) >= chunkLength) {
      return [...lines, line, [word]]
    }

    return [...lines, [...line, word]]
  }, [])

  return chunks
    .map((words) => words.join(' '))
    .reduce((output, line) => `${output}${chalk.magenta(prefix)}${chalk.dim(line)}\n`, '')
}

function displayWelcome () {
  console.log(newLine(2))
  console.log(chalk.inverse(hr('#')))
  console.log(chalk.inverse(center('Welcome to the interactive universe installer')))
  console.log(chalk.inverse(hr('#')))
  console.log(newLine())
  console.log(`It will guide you though the installation process of several package manager ${chalkGalaxy('galaxies')}.`)
  console.log(`These contain ${chalkGroup('groups')} of ${chalkPlanet('planets')} which represents the packages to install.`)
  console.log('The universe has the following structure:')
  console.log(newLine())
  console.log('First we will gather all the packages to install, afterwards they are installed in one batch so you got time to grab a club mate')
  console.log(newLine(2))
  console.log(`So... No need to wait... Lets ${chalk.green('start')}.`)
  console.log(newLine(2))
}

function displayNothingToDo () {
  console.log(newLine(2))
  console.log(chalk.inverse(hr('#')))
  console.log(chalk.inverse(center('No packages selected. There is nothing to do.')))
  console.log(chalk.inverse(hr('#')))
}

function displayInstallIntro () {
  console.log(newLine(2))
  console.log(chalk.inverse(hr('#')))
  console.log(chalk.inverse(center('Ready! Installation process is starting. Grab a coffee or club mate!')))
  console.log(chalk.inverse(hr('#')))
  console.log(newLine(2))
  console.log('Following commands will be executed:')
  console.log(newLine())
}

function displayInstallStart (title, command, args) {
  const escapedCommand = shellEscape([command, ...args])

  console.log(newLine(2))
  console.log(hr('#'))
  console.log(`${chalk.bold('Starting with installation of')} ${chalkGalaxy(title)}`)
  console.log(hr('#'))
  console.log(newLine())
  console.log(chalk.bold('Command:'))
  console.log(escapedCommand)
  console.log(newLine(2))
  console.log(chalk.bold('Command log:'))
  console.log(hr('-'))
}

function displayInstallEnd () {
  console.log(newLine())
  console.log(hr('-'))
  console.log(newLine())
}

function displayInstallOutro () {
  console.log(newLine())
  console.log(hr('#'))
  console.log(center('All installations finished❗️ We are done here ❤️'))
  console.log(hr('#'))
  console.log(newLine(2))
}

module.exports = {
  center,
  chalkGalaxy,
  chalkGroup,
  chalkPlanet,
  hr,
  newLine,
  preamble,
  displayWelcome,
  displayNothingToDo,
  displayInstallIntro,
  displayInstallStart,
  displayInstallEnd,
  displayInstallOutro
}
