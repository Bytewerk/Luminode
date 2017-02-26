'use strict'

let lumino = require('./lumino')

module.exports = exports = (from, msg, client) => {
    lumino.showPrivateMessage(from, msg)
}