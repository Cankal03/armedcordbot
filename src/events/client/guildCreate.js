const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildCreate',
    async execute(guild, client) {
        let embed = new EmbedBuilder()
            .setTitle(`<a:USBlob_Join:969037779835170827> Hey, thanks for adding ${client.user.tag}`)
            .setImage('https://giphy.com/gifs/GoArmy-respect-salute-gesture-fxsAcheaMi1PnxPJaf')
            .setURL('https://giphy.com/gifs/GoArmy-respect-salute-gesture-fxsAcheaMi1PnxPJaf')
            .setColor('Green')
        guild.systemChannel.send({
            embeds: [embed]
        })
        //defaultChannel will be the channel object that it first finds the bot has permissions for

        if(!guild.systemChannel) return console.error;






    }
}