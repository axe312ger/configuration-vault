/**
 * @file       installer.browser.js
 * @desc       Opens multiple given urls in a browser
 *
 * @param      browser name of browser to launch (Google Chrome, firefox, safari)
 * @param      urls multiple number of urls to open
 */

'use strict'

const open = require('open')

const browser = process.argv[2]
const urls = process.argv.slice(3)

urls.forEach((url) => open(url, browser))
