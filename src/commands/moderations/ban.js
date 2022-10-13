const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
   data: new SlashCommandBuilder()
      .setName('ban')
      .setDescription('ban user')
      .addUserOption(option => option.setName('target').setDescription('Target the member to ban').setRequired(true))
      .addIntegerOption(option =>
         option.setName('delete_messages')
            .setDescription('How much of their recent messages hisotry to delete')
            .setRequired(true)
            .addChoices(
               { name: `Don't delete any`, value: 0 },
               { name: 'Previous 24 Hours', value: 1 },
               { name: 'Previous 7 Days', value: 7 }))
      .addStringOption(option => option.setName('reason').setDescription('The reason for banning, if any'))
      .setDMPermission(false)
      .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
   async execute(interaction, client) {
      const user = interaction.options.getUser('target');
      const reason = interaction.options.getString('reason') || "No reason given!"
      const delete_messagesdays = interaction.options.getInteger('delete_messages')
      const member = await interaction.guild.members.fetch(user.id).catch(console.error);

      console.log(delete_messagesdays)






      try {
         await member.ban({
            deleteMessagesDays: delete_messagesdays,
            reason: reason
         })

         await interaction.reply({
            content: `<a:US_yes:970033604581265468> | ${member.user.tag} has been banned with the reason of ${reason}`
         })

         await user.send({
            content: `You banned from ${interaction.guild.name}`
         })
      } catch (error) {
         if (error) {
            interaction.reply({
               content: `Failed to ban the user.`
            })
         }


      }











   }

}