const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('button')
        .setDescription('Replys a button'),
    async execute(interaction, client) {
        const button = new ButtonBuilder()
            .setCustomId('sub-test')
            .setLabel(`Click me!`)
            .setStyle(ButtonStyle.Primary);

        await interaction.reply({
            components: [new ActionRowBuilder().addComponents(button)]
        })

    }

}
