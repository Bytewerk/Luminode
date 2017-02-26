'use strict'

let config = require('./config')
let lumino = require('./lumino')

module.exports = exports = (from, chan, msg, client) => {
    if(chan == client.nick) return // This event gets fired by PMs as well... -.-

    if(msg.substring(0, config.irc.commandPrefix.length) == config.irc.commandPrefix) {
        msg = msg.substring(config.irc.commandPrefix.length + 1)
        let command = msg.split(' ')
        if(command.length == 0) return

        switch(command[0]) {
            case 'leave':
                doIfEnoughPermissions(from, client, () => {
                    if(Object.prototype.toString.call(config.irc.leaveMessage) == '[object Array]')
                        client.say(chan, config.irc.leaveMessage[Math.floor(Math.random() * config.irc.leaveMessage.length)])
                    else if(Object.prototype.toString.call(config.irc.leaveMessage) == '[object String]')
                        client.say(chan, config.irc.leaveMessage)
                    client.part(chan)
                }, () => {
                    client.say(chan, 'You don\'t have enough permissions to perform this action!')
                })
                break
            case 'show':
                if(command.length != 2)
                    return sayHelp(command[0], client, chan)

                switch(command[1]) {
                    case 'all':
                        console.log('show all')
                        config.show[chan] = true
                        break
                    case 'nothing':
                        config.show[chan] = false
                        break
                }
                break
            case 'say':
                if(command.length < 2)
                    return sayHelp(command[0], client, chan)

                command.shift()
                lumino.showMessage(from, chan, command.join(' '))
        }
    } else if(config.show.hasOwnProperty(chan) && config.show[chan] == true)
        lumino.showMessage(from, chan, msg)
}

function sayHelp(command, client, receiver) {
    client.say(receiver, 'Awrrr yes baby you know how to rape my commands') // TODO: Display proper help
}

function doIfEnoughPermissions(user, client, enough, notenough) {
    client.whois(user, (info) => {
        if(!info) return
        let chans = info.channels
        for(let i = 0; i < chans.length; i++) {
            let chan = chans[i]
            switch(chan.charAt(0)) {
                case '~':
                case '&':
                case '@':
                case '%':
                    enough()
                    return
            }
            notenough()
        }
    })
}