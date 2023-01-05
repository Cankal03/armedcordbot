const { Events, EmbedBuilder, InteractionType, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, bold, italic, codeBlock, UserFlags } = require('discord.js');
const config = require('../../config');
const wait = require('node:timers/promises').setTimeout;
const Ticketcreate = require('../../schemas/ticketcreate_command');
const mongoose = require('mongoose');


module.exports = {
  name: Events.MessageCreate,
  async execute(message, client) {

    if (message.content.includes('<@1040379944607436922>')) {
      let embed = new EmbedBuilder()
        .setDescription(`${client.user.tag} only supports gloabl (/) commands, try /help`)
        .setColor('Green')

      message.reply({ content: `ARMYcord is thinking...` }).then(msg => msg.delete({
        timeout: 2000
      }))
      await message.reply({ embeds: [embed] })
    }

    if (message.content === 'a!sync_commands') {
      const msg = message.reply({ content: 'Commands werden synchronisiert... 5-20 secs... (Getting Data) <a:Loading:1054512606880206878>' })

      await wait(10000);
      await message.channel.send({ content: 'https://media.discordapp.net/attachments/794390733813579777/1054163814817468446/IMG_8463.gif' })

    }

    if (message.author.bot) return;

    const guild = client.guilds.cache.get(config.Handler.GUILD_ID);

    if (!guild) {
      console.error('[CRASH] Guild is not valid.'.red);
      return process.exit();
    }

    const category = guild.channels.cache.find(CAT => CAT.id === config.Handler.CATEGORY_ID || CAT.name === "ModMail");

    const channel = guild.channels.cache.find(
      x => x.name === message.author.id && x.parentId === category.id
    );

    if (message.channel.type == ChannelType.DM) {


      if (!category) return message.reply(
        {
          embeds: [
            new EmbedBuilder()
              .setDescription("The system is not ready yet.")
              .setColor("Red")
          ]
        }
      );

      // The Modmail system:
      if (!channel) {

        let embedDM = new EmbedBuilder()
          .setTitle('Interaktion erfolgreich')
          .setDescription('Ein Support Ticket wurde gerade eben erstellt, um Kontakt mit dem Staff-Team aufzunehmen schreibe einfach hier untern weiter!')
          .addFields(
            { name: 'Dein Grund:', value: `${message.content || italic('Kein Kontent wurde angegeben.')}` }
          )
          .setColor('Green')
          .setFooter(
            {
              text: "Hast du den Bot ausversehen angeschrieben? Dann Interagiere mit dem knopf unten."
            }
          )

        if (message.attachments.size) {
          embedDM.setImage(message.attachments.map(img => img)[0].proxyURL);
        };

        message.reply(
          {
            embeds: [
              embedDM
            ],
            components: [
              new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setCustomId('close_dm')
                    .setLabel('Support Ticket schließen')
                    .setStyle(ButtonStyle.Danger),
                )
            ]
          }
        )

        const channel = await guild.channels.create({
          name: message.author.id,
          type: ChannelType.GuildText,
          parent: category,
          topic: `Ein Support Ticket wurde erstellt von: ${message.author.tag}`
        }).catch(console.log);

        let profile = await Ticketcreate.findOne({ UserId: message.author.id })
        if (!profile) {
          profile = new Ticketcreate({

            _id: mongoose.Types.ObjectId(),
            UserId: message.author.id,
            ChannelId: channel.id,
            Reason: message.content

          });

          await profile.save().catch(console.error)
        } 


        let embed = new EmbedBuilder()
          .setTitle("Neues Support Ticket")
          .setDescription('Daten:')
          .addFields(
            { name: "Account", value: `${message.author.tag} (\`${message.author.id}\`)` },
            { name: "Grund", value: `${message.content.substr(0, 4096) || italic('Kein Kontent wurde angegeben.')}` },
          )
          .setColor('Green')

        if (message.attachments.size) {
          embed.setImage(message.attachments.map(img => img)[0].proxyURL);
        };

        const ROLES_TO_MENTION = [];
        config.Modmail.MAIL_MANAGER_ROLES.forEach((role) => {
          if (!config.Modmail.MAIL_MANAGER_ROLES || !role) return ROLES_TO_MENTION.push('[ERROR: No roles were provided]')
          if (config.Modmail.MENTION_MANAGER_ROLES_WHEN_NEW_MAIL_CREATED == false) return;

          const ROLE = guild.roles.cache.get(role);
          if (!ROLE) return;
          ROLES_TO_MENTION.push(ROLE);
        });

        return channel.send(
          {
            content: config.Modmail.MENTION_MANAGER_ROLES_WHEN_NEW_MAIL_CREATED ? ROLES_TO_MENTION.join(', ') : "** **",
            embeds: [
              embed
            ],
           
          }
        ).then(async (sent) => {
          sent.pin()
            .catch(() => { });
        });

      } else {
        let embed = new EmbedBuilder()
          .setAuthor({ name: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
          .setDescription(message.content.substr(0, 4096) || italic('Kein Kontent wurde angegeben.'))
          .setColor('Green');

        if (message.attachments.size) embed.setImage(message.attachments.map(img => img)[0].proxyURL);

        message.react("📨")
          .catch(() => { });

        return channel.send(
          {
            embeds: [
              embed
            ]
          }
        );
      }

      // If the message is in the modmail category:
    } else if (message.channel.type === ChannelType.GuildText) {

      if (!category) return;

      if (message.channel.parentId === category.id) {
        if (message.content.startsWith('a!')) return;

        Ticketcreate.findOne({ UserId: message.channel.name }, async (err, data) => {

          let code = data._id
          let userid = data.UserId
          let channel = data.ChannelId
          let reason = data.Reason

          client.channels.cache.get(data.ChannelId).setTopic(`Code: ${code}`)



          let embed = new EmbedBuilder()
            .setAuthor({ name: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setDescription(message.content.substr(0, 4096) || italic('Kein Kontent wurde angegeben.'))
            .setColor('Red');

          if (message.attachments.size) embed.setImage(message.attachments.map(img => img)[0].proxyURL);

          message.react("📨")
            .catch(() => { });

          return client.users.cache.get(data.UserId).send(
            {
              embeds: [
                embed
              ]
            }
          ).catch(() => { });
        })
      } else return;
    }









  }
}