const { EmbedBuilder } = require('discord.js');

module.exports = {
    data : {
        name: `suggestion_command`
    }, 
    async execute(interaction, client){
        await interaction.reply({content:`Thank you very much! We have successfully received your suggestion... `})

        const channel = interaction.guild.channels.cache.get('1056019358029193236');

        let embed = new EmbedBuilder()
        .setAuthor({
            name: `${interaction.user.tag} (${interaction.user.id})`,iconURL: interaction.user.displayAvatarURL()
        })
        .setTitle('New suggest')
        .setDescription(`**Title:**\n${interaction.fields.getTextInputValue('suggestion_title')}\n**Description:**\n${interaction.fields.getTextInputValue('suggestion_description')}\n**Is there anything else you want to tell us?**\n${interaction.fields.getTextInputValue('suggestion_footer')}`)
        .setColor('Green')
        .setFooter(
            {text: `✅ -> Accepted/in progress |  ❌ -> Declined`, iconURL: client.user.displayAvatarURL()},
        )
        
        let msg = await channel.send({embeds: [embed]})
        msg.react('👍')
        msg.react('👎') 
    }
}