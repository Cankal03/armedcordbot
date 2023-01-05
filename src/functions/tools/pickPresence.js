const { ActivityType, Presence } = require('discord.js');

module.exports = (client) => {
    client.pickPresence = async () => {
        const options = [{
            type: ActivityType.Playing,
            text: "Thanks for using my service!",
            status: "online"

        },
        {
            type: ActivityType.Playing,
            text: "/help - v. 0.1",
            status: "dnd"

        },
        {
            type: ActivityType.Listening,
            text: `${client.guilds.cache.size} servers`,
            status: "dnd"

        }];
        const option = Math.floor(Math.random() * options.length);

       client.user.setPresence({
        activities :[{
            name: options[option].text,
            type: options[option].type
        }],
        status: options[option].status
       })

    }
}