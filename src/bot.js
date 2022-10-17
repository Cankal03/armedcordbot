require('dotenv').config();
const { token, databaseToken } = process.env;
const { connect } = require('mongoose');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs')


const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.MessageContent] });
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];


const functionsFolders = fs.readdirSync('./src/functions');
for (const folder of functionsFolders) {
    const functionsFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter(file => file.endsWith(".js"));
    for (const file of functionsFiles)
        require(`./functions/${folder}/${file}`)(client)
}


client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);
(async () => {
    await connect(databaseToken).catch(console.error);
})();
