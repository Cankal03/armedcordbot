const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
/*const durations = ({name:'timeout_60secs', value: 60* 1000}, 
{name:'timeout_5mins', value: 5* 60* 1000}, 
{name:'timeout_10mins', value: 10* 60* 1000})*/

module.exports = {
   data: new SlashCommandBuilder()
      .setName('timeout')
      .setDescription('Timeout user')
      .addUserOption(option => option.setName('target').setDescription('The user to timeout').setRequired(true))
      .addStringOption(option =>
         option.setName('duration')
            .setDescription('How long they should be timed out for')
            .setRequired(true)
            .addChoices(
               { name: '60 seconds', value: `60 secs` }, //60.000
               { name: '5 minutes', value: `5 mins` }, //300.000
               { name: '10 minutes', value: `10 mins` }, //600.000
               { name: '30 minutes', value: `30 mins` }, //1.800.000
               { name: '60 minutes', value: `1 hour` }, //3.600.000
               { name: '24 hours', value: `1 day` }, //86.400.000
               { name: '7 days', value: `1 week` })) //604.800.000
      .addStringOption(option => option.setName('reason').setDescription('The reason for timing them out, if any'))
      .setDMPermission(false)
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

   async execute(interaction, client) {
      const user = interaction.options.getUser('target');
      const reason = interaction.options.getString('reason') || "no reason given!"
      const duration = interaction.options.getString('duration')
      const member = await interaction.guild.members.fetch(user.id)

      let timoutstring;


      switch (duration) {
        case '60 secs':
            timoutstring = 60 * 1000
            
            break;
        case '5 mins':
            timoutstring = 5 * 60 * 1000
      
        default:
        case '10 mins':
            timoutstring = 10 * 60 * 1000

            break;
        case '30 mins':
            timoutstring = 30 * 60 * 1000

            break;
        case '1 hour':
            timoutstring = 60 * 60 * 1000

            break;
        case '1 day':
            timoutstring = 24 * 60 * 60 * 1000

            break;
        case '1 week':
            timoutstring = 7 * 24 * 60 * 60 * 1000

            break;
      }

      try {
         await member.timeout(timoutstring, reason)

         let embed = new EmbedBuilder()
         .setAuthor({
            name:`Succesful`
         },)
         .setColor('Green')
         .setDescription(`${member.user.tag} has been timed out for ${duration} with reason of ${reason}.`)
         
         await interaction.reply({
            embeds: [embed]
         })

         let embed2 = new EmbedBuilder()
         .setAuthor({
            name:`Timeout`
         },)
         .setColor('Red')
         .setDescription(`You have been timed out from ${interaction.guild.name}\nModerator: ${interaction.user} (${interaction.member.id})\nchannel: ${interaction.channel}\nduration: ${duration}\nreason: ${reason}`)

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
            .setDescription('Failed to timeout the user.')
            interaction.reply({
               content:'Uh oh!',embeds: [embed3]
            })
         }
      }

      /*console.log(duration)*/
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