const chalk = require('chalk')

function center(text) {
  const columns = process.stdout.columns
  const prefixLength = Math.ceil((columns - text.length) / 2)
  const postfixLength = columns - (prefixLength + text.length)
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

function hr(char) {
  return Array(process.stdout.columns + 1).join(char || '#')
}

function newLine(count) {
  return Array(count || 1).join('\n')
}

module.exports = {
  center,
  chalkGalaxy,
  chalkGroup,
  chalkPlanet,
  hr,
  newLine
}
