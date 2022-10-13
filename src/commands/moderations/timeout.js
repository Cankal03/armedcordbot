const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
/*const durations = ({name:'timeout_60secs', value: 60* 1000}, 
{name:'timeout_5mins', value: 5* 60* 1000}, 
{name:'timeout_10mins', value: 10* 60* 1000})*/

module.exports = {
   data: new SlashCommandBuilder()
      .setName('timeout')
      .setDescription('Timeout user')
      .addUserOption(option => option.setName('target').setDescription('The user to timeout').setRequired(true))
      .addIntegerOption(option =>
         option.setName('duration')
            .setDescription('How long they should be timed out for')
            .setRequired(true)
            .addChoices(
               { name: '60 secs', value: 60 * 1000 }, //60.000
               { name: '5 mins', value: 5 * 60 * 1000 }, //300.000
               { name: '10 mins', value: 10 * 60 * 1000 }, //600.000
               { name: '30 mins', value: 30 * 60 * 1000 }, //1.800.000
               { name: '1 hour', value: 60 * 60 * 1000 }, //3.600.000
               { name: '1 day', value: 24 * 60 * 60 * 1000 }, //86.400.000
               { name: '1 week', value: 7 * 24 * 60 * 60 * 1000 })) //604.800.000
      .addStringOption(option => option.setName('reason').setDescription('The reason for timing them out, if any'))
      .setDMPermission(false)
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

   async execute(interaction, client) {
      const user = interaction.options.getUser('target');
      const reason = interaction.options.getString('reason') || "No reason given!"
      const duration = interaction.options.getInteger('duration')
      const member = await interaction.guild.members.fetch(user.id).catch(console.error);



      /*console.log(duration)*/

      await member.timeout(duration, reason).catch(console.error);

      await interaction.reply({
         content: `<a:US_yes:970033604581265468> | **${member.user.tag}** has been timed out with reason of *${reason}*`
      })
      /*console.log({user, reason, duration, member})*/

      /*await member.ban({
       deleteMessagesDays: 1,
       reason: reason
      }).catch(console.error)

      await user.send({
       content: `You banned from ${interaction.guild.name}`
      }).catch(console.log(`user's dm's are off.`))*/








   }

}