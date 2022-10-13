const { EmbedBuilder, SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('info-user')
        .setDescription('Get userinfo from target')
        .addUserOption(option => option.setName('target').setDescription('Target the member, if any'))
    ,
    async execute(interaction, client) {
        const target = interaction.options.getUser('target') || interaction.user;
        const member = target;

        await member.fetch()
        /*const member = await interaction.guild.members.fetch(target.id).catch(console.error);*/

        const statusType = {
            idle: 'Idle',
            dnd: 'Dnd',
            online: 'Online',
            invisible: 'Invisible'
        };

        const clientType = [
            { name: 'desktop', text: 'Computer' },
            { name: 'mobile', text: 'Phone' },
            { name: 'web', text: 'Website' },
            { name: 'offline', text: 'Offline' }

        ];

        const badges = {
            BugHunterLevel1: 'Bug-Hunter',
            BugHunterLevel2: 'Bug-Buster',
            CertifiedModerator: 'Discord Certifed Moderator',
            HypeSquadOnlineHouse1: 'House of Bravery',
            HypeSquadOnlineHouse2: 'House of Brilliance',
            HypeSquadOnlineHouse3: 'House of Balance',
            Hypesquad: 'HypeSquad Event Attendee',
            Partner: 'Discord-Partner',
            Staff: 'Discord-Staff',
            VerifiedBot: 'Verified Bot',
            VerifiedDeveloper: 'Verified Developer'
        };

        /*const maxDisplayRoles = (roles, maxFieldLength = 1024) => {
            let totalLength = 0;
            const result = [];

            for(const role of roles) {
                const roleString = `<@${role.id}>`;

                if(roleString.length + totalLength > maxFieldLength)
                 break;
                totalLength+= roleString.length+1
                result.push(roleString);



            }
        }*/

        /*const sortedRoles = roles.cache.map(role => role).sort((a, b) => b.position - a.position).slice(0, roles.cache.size - 1);*/


        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('Green')
                    .setAuthor({
                        name: member.tag
                    })
                    .setThumbnail(member.displayAvatarURL())
                    .addFields(
                        { name: `ID`, value: member.id },
                        { name: `Account Created`, value: `<t:${parseInt(member.createdTimestamp / 1000)}:R>` },
                        { name: `Nickname`, value: target.nickname || 'none' },


                    )
            ]
        })
    }

}