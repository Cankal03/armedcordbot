const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge_messages')
        .setDescription('Purge messages')
        .addIntegerOption(option => option.setName('amount').setDescription('Amount of purge messages').setRequired(true))
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction, client) {
        let amount = interaction.options.getInteger("amount");

        if (isNaN(amount)) {
            return interaction.reply("Type a valid amount!")
        }

        if (parseInt(amount) > 100) {
            return interaction.reply("<a:US_no:970033684835106868> | An amount higher then 100 i can't delete for safety.")
        } else {
            try {
                let { size } = await interaction.channel.bulkDelete(amount)
                await interaction.reply({ content: `<a:US_yes:970033604581265468> | Deleted ${size} message(s) succesfull.`, ephemeral: true })
            } catch (err) {
                console.log(err)
                interaction.reply({ content: "<a:US_no:970033684835106868> | I can't deleted messages older then 14 days.", ephemeral: true })
            }
        }

    }
}