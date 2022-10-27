const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('surveys')
        .setDescription('Replys with survey')
        .addStringOption(option => option.setName('text').setDescription('Text for survey, required').setRequired(true))
        .addChannelOption(option => option.setName('channel').setDescription('Channel for survey, if any'))
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction, client) {
        const text = interaction.options.getString('text');
        const channel = interaction.options.getChannel('channel') || interaction.channel;
        let embed = new EmbedBuilder()
            .setAuthor({
                name: `${client.user.tag}'s Surveys option`
            })
            .setTitle(`Survey beta v. 0.1`)
            .setColor('Gold')
            .setImage(`https://cdn.discordapp.com/attachments/794390733813579777/1028791008659521588/A81A0E13-1A66-4BF3-8E54-0C1A86B638FA.jpg`)
            .addFields({
                name: `${text}`,
                value: `[Support](https://discord.gg/E4RmQJTRBm) | [Invite Bot](https://www.apple.com/de/)`
            })
            .setFooter({
                iconURL: client.user.displayAvatarURL(),
                text: `Survey pannel beta v. 0.1`
            })

        await interaction.reply({
            content: '<a:US_yes:970033604581265468> | Sent!'
        })


        const message = await channel.send({
            embeds: [embed]
        });

        message.react('<a:US_yes:970033604581265468>');
        message.react('<a:US_no:970033684835106868>');
    }
}