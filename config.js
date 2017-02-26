'use strict'

let config = {
    irc: {
        nickname: 'luminode',
        username: 'Lumino',
        realname: 'Lumino Display',
        nickservPass: 'dummrumleuchte',
        host: 'chat.freenode.com',
        port: 6697,
        ssl: true,
        acceptInvalidSSL: true,
        commandPrefix: '.lumino',
        leaveMessage: ['Bye bye!', 'Have a nice day :)', 'Why would you kick me? :('], // This may be either an array or a string. If it's an array, a random value will be selected every time the bot leaves a channel.
        joinMessage: ['Hi!', 'Thanks for the invite :)', 'What\'s up?'], // Same as for leaveMessage
        whitelist: ['#bytewerk', '#platztest', '#platzworld'] // If the array is empty or undefined, the whitelist is disabled
    },
    lumino: {
        host: 'ledschild.bingo',
        port: 12345,
        priority: '0xffffff',
        width: 160,
        height: 24,
        duration: 10000 // The duration a message will be displayed in milliseconds
    },
    show: {
        /*
        * channel: true|false // Whether every message should be displayed in that channel or not
        */
    }
}

module.exports = exports = config