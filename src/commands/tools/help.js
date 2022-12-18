const { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Replys with help'),
    async execute(interaction, client) {

        let embed = new EmbedBuilder()
            .setAuthor({
                name: `${client.user.tag}'s helpmenu`,
                url: `https://cdn.discordapp.com/emojis/1029108104924778529.webp?size=240&quality=lossless`
            })
            .setTitle('<:US_slashcmd:973544838958030848> Bot-Prefix: /')
            .setColor('Green')
            .setImage(`https://cdn.discordapp.com/attachments/794390733813579777/1026991460588998827/4C310B6D-7197-4EEF-9A92-2073A6079513.jpg`)
            .addFields({
                name: 'Choose your option down below, use the select-menu!',
                value: `[Support-Server](https://discord.gg/E4RmQJTRBm) | [Invite Bot](https://discord.com/api/oauth2/authorize?client_id=1000488729565208606&permissions=8&scope=bot%20applications.commands) | [Contact Me](https://www.instagram.com/armedcordbot/)`
            })
            .setFooter({
                iconURL: client.user.displayAvatarURL(),
                text: `Any bugs, erros? Contact the Project-Owner via the url above!`
            })
        const menu = new StringSelectMenuBuilder()
            .setCustomId(`help-command`)
            .setMinValues(1)
            .setMaxValues(1)
            .setOptions(new StringSelectMenuOptionBuilder({
                label: `General commands`,
                value: 'general_commands'
            }), new StringSelectMenuOptionBuilder({
                label: `Applications commands`,
                value: 'applications_commands'
            }), new StringSelectMenuOptionBuilder({
                label: `Moderations commands`,
                value: 'moderations_commands'
            }));


        await interaction.reply({
            embeds: [embed], components: [new ActionRowBuilder().addComponents(menu)]
        });
    }
}
