'use strict'

/*
 * Sequentially collects all returned array items
 * of from calling `fn` which each item of `list`
 */

function collect(list, fn) {
  let allItems = []

  const sequence = list
    .reduce((previous, item) => {
      const nextItem = (previousItem) => {
        allItems = [...allItems, previousItem]
        return fn(item)
      }

      return previous.then(nextItem)
    }, Promise.resolve())

  return sequence.then((lastItem) => {
    return [...allItems, lastItem].slice(1)
  })
}

module.exports = collect
