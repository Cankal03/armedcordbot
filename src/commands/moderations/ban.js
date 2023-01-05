const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban user')
    .addUserOption(option => option.setName('target').setDescription('The user to ban').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The reason to ban user, if any'))
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction, client){
        const user = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || "N/A"
        const member = await interaction.guild.members.fetch(user.id).catch(console.error);


        try {
         await member.kick(reason)

         let embed = new EmbedBuilder()
         .setAuthor({
            name:`Succesful`
         },)
         .setColor('Green')
         .setDescription(`${member.user.tag} has been banned from ${interaction.guild.name} for the reason of ${reason}.`)
         
         await interaction.reply({
            embeds: [embed]
         })

         let embed2 = new EmbedBuilder()
         .setAuthor({
            name:`Ban`
         },)
         .setColor('Red')
         .setDescription(`You have been banned from ${interaction.guild.name}\nModerator: ${interaction.user} (${interaction.member.id})\nchannel: ${interaction.channel}\nreason: ${reason}`)

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
            .setDescription('Failed to ban the user.')
            interaction.reply({
               content:'Uh oh!',embeds: [embed3]
            })
            
         }

      }
        
    }
}