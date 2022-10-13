const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');


module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Avataruser')
        .setType(ApplicationCommandType.User),
    async execute(interaction, client) {


        await interaction.reply({
            content: `${interaction.targetUser.displayAvatarURL()}`
        })
    }

}