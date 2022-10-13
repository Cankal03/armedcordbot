const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: "fav-color"
    },
    async execute(interaction, client) {
        await interaction.deferReply({
            fetchReply: true
        });


        await interaction.editReply({
            content: `<a:US_yes:970033604581265468> | Modal sent succesfully to my database`
        });

        console.log(`Modal from ${interaction.user.tag} (${interaction.user.id}), Ques1:${interaction.fields.getTextInputValue("favColorInput")}`)
    }
}