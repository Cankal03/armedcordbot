const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {

        if (message.content.includes('<@1000488729565208606>')) {
            let embed = new EmbedBuilder()
                .setDescription(`${client.user.tag} only supports gloabl (/) commands, try /help`)
                .setColor('Green')

            message.reply({
                embeds: [embed]
            });
        }

    }
}