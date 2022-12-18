const { Events } = require('discord.js')

module.exports = {
    name: Events.MessageCreate,
    async execute(message, client) {

        if (message.content.includes('<@1040379944607436922>')) {
            let embed = new EmbedBuilder()
                .setDescription(`${client.user.tag} only supports gloabl (/) commands, try /help`)
                .setColor('Green')

            message.reply({ content: `ARMYcord is thinking...` }).then(msg => msg.delete({
                timeout: 2000
            }))
            await message.reply({ embeds: [embed] })
        }
    }

}