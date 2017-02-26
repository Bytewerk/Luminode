'use strict'

let config = require('./config')

let telnet = require('./telnet')

let client
let timeout

module.exports = exports = {
    showMessage: (from, chan, msg) => {
        if (client)
            client.close()

        clearTimeout(timeout)

        client = telnet(config.lumino.host, config.lumino.port, { eol: '\n' })

        client.exec('setprio ' + config.lumino.priority)
        client.exec('settextarea 0 0 ' + config.lumino.width + ' ' + config.lumino.height)
        client.exec('settext 0 ' + from + ' in ' + chan + ':')
        client.exec('settext 1 ' + msg)

        timeout = setTimeout(() => {
            client.close()
        }, config.lumino.duration)
    },
    showPrivateMessage: (from, msg) => {
        if (client)
            client.close()

        clearTimeout(timeout)

        client = telnet(config.lumino.host, config.lumino.port, { eol: '\n' })

        client.exec('setprio ' + config.lumino.priority)
        client.exec('settextarea 0 0 ' + config.lumino.width + ' ' + config.lumino.height)
        client.exec('settext 0 ' + from + ':')
        client.exec('settext 1 ' + msg)

        timeout = setTimeout(() => {
            client.close()
        }, config.lumino.duration)
    }
}