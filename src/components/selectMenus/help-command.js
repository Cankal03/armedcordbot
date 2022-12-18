const { EmbedBuilder } = require('discord.js')

module.exports = {
    data: {
        name: `help-command`,
    },
    async execute(interaction, client){

        const value = interaction.values[0]

        switch (value) {
            case "general_commands":
                let embed = new EmbedBuilder()
                .setAuthor({
                    name:`General commands`
                })
                .setColor('Green')
                .setDescription('/help - Replys with help\n/ping - Replys with the latency')
                

                await interaction.reply({
                    embeds:[embed],
                    ephemeral: true
                });
                
                break;
        
            default:
                break;
            case 'applications_commands':
                let embed2 = new EmbedBuilder()
                .setAuthor({
                    name:`Applications commands`
                })
                .setColor('Green')
                .setDescription('Avataruser - Replys with targets avatar')
                

                await interaction.reply({
                    embeds:[embed2],
                    ephemeral: true
                });
                
                break;
            case 'moderations_commands':
                let embed3 = new EmbedBuilder()
                .setAuthor({
                    name:`Moderations commands`
                })
                .setColor('Green')
                .setDescription('/timeout - Timeout user')
                

                await interaction.reply({
                    embeds:[embed3],
                    ephemeral: true
                })




                break;


            
        }
        
        
    }
}