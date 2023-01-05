const { EmbedBuilder } = require('discord.js');
const Ticketcreate = require('../../schemas/ticketcreate_command');
const mongoose = require('mongoose');
const config = require('../../config');

module.exports = {
    data: {
        name: `close_button_created_mail_channel`
    },
    async execute(interaction, client) {

        let profile = await Ticketcreate.findOne({ UserId: interaction.user.id }, async (err, data) => {
            await interaction.deferReply({
                fetchReply: true
            });
            let username = data.UserName
            let userid = data.UserId
            let ch = data.ChannelId
            let reason = data.Reason
            client.channels.cache.get(ch).delete()

            let embed = new EmbedBuilder()
                .setTitle('Succes')
                .setDescription('Your Support-ticket was closed')
                .setColor('Green')

            interaction.editReply({ embeds: [embed] })

        })











    }


}