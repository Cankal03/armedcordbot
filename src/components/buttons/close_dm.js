const { EmbedBuilder } = require('discord.js');
const Ticketcreate = require('../../schemas/ticketcreate_command');
const mongoose = require('mongoose');

module.exports = {
    data: {
        name: `close_dm`
    },
    async execute(interaction, client) {

        Ticketcreate.findOne({ UserId: interaction.user.id }, async (err, data) => {
            await interaction.deferReply({
                fetchReply: true
            });
            let code = data._id
            let userid = data.UserId
            let channel = data.ChannelId
            let reason = data.Reason



            await client.channels.cache.get(data.ChannelId).delete()
            await interaction.editReply({
                content: `Vielen Dank für deine Rückmeldung! Dein Support Ticket wurde erfolgreich geschlossen.`
            });


            await Ticketcreate.deleteMany({ _id: data._id }).catch(console.error)
        })

       
    }
}