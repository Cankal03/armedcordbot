const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

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

         let embed = new EmbedBuilder()
         .setAuthor({
            name:`Succesful`
         },)
         .setColor('Green')
         .setDescription(`${member.user.tag} has been kicked from ${interaction.guild.name} for the reason of ${reason}.`)
         
         await interaction.reply({
            embeds: [embed]
         })

         let embed2 = new EmbedBuilder()
         .setAuthor({
            name:`Kick`
         },)
         .setColor('Red')
         .setDescription(`You have been kicked from ${interaction.guild.name}\nModerator: ${interaction.user} (${interaction.member.id})\nchannel: ${interaction.channel}\nreason: ${reason}`)

         await user.send({
            content:'Uh oh!',embeds: [embed2]
         })

      } catch (error) {
         if (error) {
            let embed3 = new EmbedBuilder()
            .setAuthor({
               name:`Failed`
            })
            .setColor('Red')
            .setDescription('Failed to kick the user.')
            interaction.reply({
               content:'Uh oh!',embeds: [embed3]
            })
            
         }

      }
   }
}