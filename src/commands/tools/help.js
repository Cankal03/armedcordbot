const { SlashCommandBuilder, SelectMenuBuilder, ActionRowBuilder, SelectMenuOptionBuilder, EmbedBuilder, Emoji } = require('discord.js');
const embed = require('./embed');


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
            .setColor('Gold')
            .setImage(`https://cdn.discordapp.com/attachments/794390733813579777/1026991460588998827/4C310B6D-7197-4EEF-9A92-2073A6079513.jpg`)
            .addFields({
                name: 'Choose your option down below, use the selectmenu!',
                value: `[Support](https://discord.gg/E4RmQJTRBm) | [Invite Bot](https://www.apple.com/de/)`
            })
            .setFooter({
                iconURL: client.user.displayAvatarURL(),
                text: `Any bugs, erros?? Contact the Project-Owner via DM me (soon)`
            })
        const menu = new SelectMenuBuilder()
            .setCustomId(`sub-menutest`)
            .setMinValues(1)
            .setMaxValues(1)
            .setOptions(new SelectMenuOptionBuilder({
                label: `General commands`,
                value: 'Admin only:\n/timeout, /ban, /kick, /surveys, ... \nFor all:\n/ping, /help, /info-user'

            }), new SelectMenuOptionBuilder({
                label: `Applications commands`,
                value: 'For all:\nGetavatar, ...'
            }), new SelectMenuOptionBuilder({
                label: `Database commands`,
                value: 'For all:\n/database,/modal ...'
            }));

        console.log(menu)

        await interaction.reply({
            embeds: [embed], components: [new ActionRowBuilder().addComponents(menu)]


        });
    }
}
