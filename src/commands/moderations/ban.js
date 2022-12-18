const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
   data: new SlashCommandBuilder()
      .setName('ban')
      .setDescription('Ban user')
      .addUserOption(option => option.setName('target').setDescription('The user to ban').setRequired(true))
      .addStringOption(option => option.setName('reason').setDescription('The reason for banning, if any'))
      .setDMPermission(false)
      .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
   async execute(interaction, client) {
      const user = interaction.options.getUser('target');
      const reason = interaction.options.getString('reason') || "no reason given!"
      const member = await interaction.guild.members.fetch(user.id).catch(console.error);

      try {
         await member.ban({
            reason: reason
         })

         
      } catch (error) {
         if (error) {
            
         }
      }
   }
}