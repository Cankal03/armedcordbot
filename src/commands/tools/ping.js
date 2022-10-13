const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replys with the latency'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const newmessage = `:ping_pong: Pong!\nAPI Latency: ${client.ws.ping} ms\nClient Latency: ${message.createdTimestamp - interaction.createdTimestamp}ms`
        await interaction.editReply({
            content: newmessage
        });
    }

}
