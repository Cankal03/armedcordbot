const { EmbedBuilder } = require('discord.js')

module.exports = {
    data: {
        name: `sub-menutest`
    },
    async execute(interaction, client){
        const embed = new EmbedBuilder()
        .setTitle(`${interaction.values.labels} helpcategory`)
        .setDescription(`${interaction.values[0]}`)
        .setColor('Green')
        await interaction.reply({
            embeds:[embed],
            ephemeral: true
        });
    }
}