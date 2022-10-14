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

      try {
         await member.kick(reason)

         await interaction.reply({
            content: `<a:US_yes:970033604581265468> | ${member.user.tag} has been kicked with the reason of ${reason}`
         })

         await user.send({
            content: `You kicked from ${interaction.guild.name}`
         }).catch(console.error())
      } catch (error) {
         if (error) {
            interaction.reply({
               content: 'Failed to kick user.'
            })
         }

      }
   }
}
