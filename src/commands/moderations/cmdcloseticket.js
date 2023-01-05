const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, time } = require('discord.js');
const Ticketcreate = require('../../schemas/ticketcreate_command');
const mongoose = require('mongoose');



module.exports = {
   data: new SlashCommandBuilder()
      .setName('cmdcloseticket')
      .setDescription('No description provided')
      .addStringOption(option =>
         option.setName('object-id')
            .setDescription('Paste here the mongodb object-id')
            .setRequired(true)
      )
      .setDMPermission(false)
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

   async execute(interaction, client) {
      const objectid = interaction.options.getString('object-id');
      let u = interaction.channel.name
      console.log(u)

      let embed = new EmbedBuilder()
         .setTitle('Dein Support Ticket wurde geschlossen')
         .setDescription('Vielen Dank für deine Zeit! Ein Modertor hat gerade eben auf dein Wunsch dein Support Ticket als erledgit makiert.')
         .setColor('Green')

      await client.users.cache.get(u).send({ embeds: [embed] })
      await interaction.channel.delete()

      Ticketcreate.deleteMany({ _id: objectid }).catch(console.error)

   }

}