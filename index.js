'use strict'

let irc = require('irc')

let config = require('./config')
let pm = require('./pm')
let message = require('./message')

let client = new irc.Client(config.irc.host, config.irc.nickname, {
    port: config.irc.port,
    secure: config.irc.ssl,
    selfSigned: config.irc.acceptInvalidSSL,
    certExpired: config.irc.acceptInvalidSSL,
    userName: config.irc.username,
    realName: config.irc.realname,
    channels: ['#platztest']
})

client.addListener('message', (from, chan, msg) => { message(from, chan, msg, client) })

client.addListener('pm', (from, msg) => { pm(from, msg, client) })

client.addListener('invite', (chan, from, msg) => {
    if(Object.prototype.toString.call(config.irc.whitelist) == '[object Array]') {
        if(config.irc.whitelist.length > 0) {
            let found = false
            for(let i = 0; i < config.irc.whitelist.length; i++) {
                if(config.irc.whitelist[i] == chan) {
                    client.join(chan)
                    found = true
                    break
                }
            }
            if(!found) {
                client.say(from, 'The channel ' + chan + ' is not whitelisted.')
                return
            }
        } else client.join(chan)
    } else client.join(chan)
    if(Object.prototype.toString.call(config.irc.joinMessage) == '[object Array]')
        client.say(chan, config.irc.joinMessage[Math.floor(Math.random() * config.irc.joinMessage.length)])
    else if(Object.prototype.toString.call(config.irc.joinMessage) == '[object String]')
        client.say(chan, config.irc.joinMessage)
})

client.addListener('error', (msg) => {
    console.error(msg)
})