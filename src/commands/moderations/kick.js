const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
   data: new SlashCommandBuilder()
      .setName('kick')
      .setDescription('Kick user')
      .addUserOption(option => option.setName('target').setDescription('The user to kick').setRequired(true))
      .addStringOption(option => option.setName('reason').setDescription('The reason for kicking, if any'))
      .setDMPermission(false)
      .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
   async execute(interaction, client) {
      const user = interaction.options.getUser('target');
      const reason = interaction.options.getString('reason') || "No reason given!"
      const member = await interaction.guild.members.fetch(user.id).catch(console.error);

      await member.kick(reason).catch(console.error)

      await user.send({
         content: `You kicked from ${interaction.guild.name}`
      }).catch(console.log(`user's dm's are off.`))








   }

}
