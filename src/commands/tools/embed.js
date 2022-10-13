const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Replys with an embed'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle(`embedbuilder`)
            .setDescription('This is an very cool description')
            .setColor("Green")
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp(Date.now())

        await interaction.reply({
            embeds: [embed]
        })


    }

}
