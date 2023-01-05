const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggestion')
        .setDescription('No description provided')
        .setDMPermission(false),
    async execute(interaction, client) {
        const modal = new ModalBuilder()
            .setCustomId(`suggestion_command`)
            .setTitle(`Suggestion`)

        const textInput_title = new TextInputBuilder()
            .setCustomId(`suggestion_title`)
            .setLabel(`Title`)
            .setRequired(true)
            .setStyle(TextInputStyle.Short)

        const textInput_description = new TextInputBuilder()
            .setCustomId(`suggestion_description`)
            .setLabel(`Tell us your suggestion`)
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph)

        const textInput_footer = new TextInputBuilder()
            .setCustomId(`suggestion_footer`)
            .setLabel(`Is there anything else you want to tell us?`)
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph)

        const firstActionRow = new ActionRowBuilder().addComponents(textInput_title);
        const secondActionRow = new ActionRowBuilder().addComponents(textInput_description);
        const thirdActionRow = new ActionRowBuilder().addComponents(textInput_footer);

        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

        await interaction.showModal(modal);

    }

}