const { EmbedBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: {
        name: `sub-test`
    },
    async execute(interaction, client) {
        const channel = interaction.guild.channels.create({
            name: 'test',
            permissionsOverwrites: [
                {
                    id: interaction.user.id,
                    allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.AttachFiles]
                }


            ]
        })

        interaction.reply({
            content: `test`
        })

    }
}