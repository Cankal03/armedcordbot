const { EmbedBuilder, Events } = require('discord.js')

module.exports = {
    name: Events.GuildCreate,
    async execute(guild, client) {
        let embed = new EmbedBuilder()
            .setTitle(`<a:USBlob_Join:969037779835170827> Hey, thanks for adding ${client.user.tag}`)
            .setImage('https://media0.giphy.com/media/fxsAcheaMi1PnxPJaf/giphy-downsized-large.gif')
            .setURL('https://media0.giphy.com/media/fxsAcheaMi1PnxPJaf/giphy-downsized-large.gif')
            .setColor('Green')
        guild.systemChannel.send({
            embeds: [embed]
        })
        //defaultChannel will be the channel object that it first finds the bot has permissions for

        if(!guild.systemChannel) return;

    }
}