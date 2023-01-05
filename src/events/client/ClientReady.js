const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {

        setInterval(client.pickPresence, 10 * 1000);
        console.log(`READY!! Client Logged in!`)

    }
}