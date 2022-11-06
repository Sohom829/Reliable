const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  Colors,
  Embed,
  ActionRowBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  SelectMenuBuilder,
} = require("discord.js");
const { connection } = require("mongoose");
const os = require("os");

/**
 * @param {ChatInputCommandInteraction} interaction;
 * @param {Embed};
 * @param {Colors};
 */

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bot")
    .setDescription("Every bot information.")
    .addSubcommand((sub) =>
      sub.setName("info").setDescription("Bot information.")
    )
    .addSubcommand((sub) =>
      sub.setName("ping").setDescription("Return bot ping")
    )
    .addSubcommand((sub) =>
      sub.setName("invite").setDescription("Invite Reliable to your server")
    )
    .addSubcommand((sub) =>
      sub.setName("uptime").setDescription("Returns bot uptime")
    )
    .addSubcommand((sub) =>
      sub.setName("credit").setDescription("see my developers")
    )
    .addSubcommand((sub) =>
      sub.setName("help").setDescription("Get every command of bot")
    ),
  async execute(interaction, client) {
    if (interaction.options.getSubcommand() === "info") {
      const status = [
        "Disconnected",
        "Connected",
        "Connecting",
        "Disconnecting",
      ];

      let link_button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Refresh")
          .setStyle(ButtonStyle.Success)
          .setCustomId("Refresh")
      );

      const embed = new EmbedBuilder()
        .setTitle(client.user.username + " Bot Statistics")
        .setThumbnail(
          client.user.displayAvatarURL({ dynamic: true, size: 1024 })
        )
        .addFields(
          {
            name: "<:reliable_server:1030037584249880627> Servers:",
            value: `\`\`\`ini\n[ ${client.guilds.cache.size} ]\`\`\``,
            inline: true,
          },
          {
            name: "<a:reliable_members:1030037727485362197> Users:",
            value: `\`\`\`ini\n[ ${client.guilds.cache.reduce(
              (a, b) => a + b.memberCount,
              0
            )} ]\`\`\``,
            inline: true,
          },
          {
            name: "<:reliable_channel:1030037810100584448> Channels",
            value: `\`\`\`ini\n[ ${client.channels.cache.size} ]\`\`\``,
            inline: true,
          },
          {
            name: "<a:reliable_uptime:1030037876169252864> Uptime: ",
            value: `<t:${Math.floor(
              Number(Date.now() - client.uptime) / 1000
            )}:R>`,
            inline: true,
          },
          {
            name: "<:reliable_ping:1030037984931749899> Ping:",
            value: `\`\`\`ini\n[ ${client.ws.ping} ms ]\`\`\``,
            inline: true,
          },
          {
            name: "<:reliable_DiscordJS:1030038058000719872> Discord.js:",
            value: `\`\`\`ini\n[ 14.6.0 ]\`\`\``,
            inline: true,
          },
          {
            name: "<:reliable_linux:1030038234501238794> OS:",
            value: `\`\`\`ini\n[ ${process.platform} ${process.arch} ]\`\`\``,
            inline: true,
          },
          {
            name: "<:reliable_database:1030818608638611516> Database:",
            value: `\`\`\`ini\n[ ${status[connection.readyState]} ]\`\`\``,
            inline: true,
          },
          {
            name: "<:reliable_nodeJS:1030818866416328785> NodeJS:",
            value: `\`\`\`ini\n[ ${process.version} ]\`\`\``,
            inline: true,
          },
          {
            name: ":brain: CPU Model:",
            value: `\`\`\`ini\n[ ${os.cpus()[0].model} ]\`\`\``,
            inline: true,
          },
          {
            name: "<:reliable_CPUusage:1030831910240391210> CPU Usage:",
            value: `\`\`\`ini\n[ ${(
              process.memoryUsage().heapUsed /
              1024 /
              1024
            ).toFixed(2)}% ]\`\`\``,
            inline: true,
          },
          {
            name: "<:reliable_memory:1030038320861937765> RAM: ",
            value: `\`\`\`ini\n[ ${(
              process.memoryUsage().rss /
              1024 /
              1024
            ).toFixed(2)} MB RSS\n${(
              process.memoryUsage().heapUsed /
              1024 /
              1024
            ).toFixed(2)} MB Heap ]\`\`\``,
            inline: true,
          },
          {
            name: "<a:reliable_developers:1030038452407898142> Bot Developers:",
            value: `<@967657941937291265> & <@783661052738011176>`,
          }
        )
        .setColor("#0398fc")
        .setFooter({ text: "©2022 | Reliable" })
        .setTimestamp();
      return interaction
        .reply({ embeds: [embed], components: [link_button] })
        .then(async (Message) => {
          const filter = (i) => i.user.id === interaction.user.id;
          let col = await interaction.channel.createMessageComponentCollector({
            filter,
            time: 120000,
          });

          col.on("collect", async (button) => {
            switch (button.customId) {
              case "Refresh": {
                const embed2 = new EmbedBuilder()
                  .setTitle(client.user.username + " Bot Statistics")
                  .setThumbnail(
                    client.user.displayAvatarURL({ dynamic: true, size: 1024 })
                  )
                  .addFields(
                    {
                      name: "<:reliable_server:1030037584249880627> Servers:",
                      value: `\`\`\`${client.guilds.cache.size}\`\`\``,
                      inline: true,
                    },
                    {
                      name: "<a:reliable_members:1030037727485362197> Users:",
                      value: `\`\`\`${client.guilds.cache.reduce(
                        (a, b) => a + b.memberCount,
                        0
                      )}\`\`\``,
                      inline: true,
                    },
                    {
                      name: "<:reliable_channel:1030037810100584448> Channels",
                      value: `\`\`\`${client.channels.cache.size}\`\`\``,
                      inline: true,
                    },
                    {
                      name: "<a:reliable_uptime:1030037876169252864> Uptime: ",
                      value: `<t:${Math.floor(
                        Number(Date.now() - client.uptime) / 1000
                      )}:R>`,
                      inline: true,
                    },
                    {
                      name: "<:reliable_ping:1030037984931749899> Ping:",
                      value: `\`\`\`${client.ws.ping} ms\`\`\``,
                      inline: true,
                    },
                    {
                      name: "<:reliable_DiscordJS:1030038058000719872> Discord.js:",
                      value: `\`\`\`V14.6.0\`\`\``,
                      inline: true,
                    },
                    {
                      name: "<:reliable_linux:1030038234501238794> OS:",
                      value: `\`\`\`${process.platform} ${process.arch}\`\`\``,
                      inline: true,
                    },
                    {
                      name: "<:reliable_database:1030818608638611516> Database:",
                      value: `\`\`\`${status[connection.readyState]}\`\`\``,
                      inline: true,
                    },
                    {
                      name: "<:reliable_nodeJS:1030818866416328785> NodeJS:",
                      value: `\`\`\`${process.version}\`\`\``,
                      inline: true,
                    },
                    {
                      name: ":brain: CPU Model:",
                      value: `\`\`\`${os.cpus()[0].model}\`\`\``,
                      inline: true,
                    },
                    {
                      name: "<:reliable_CPUusage:1030831910240391210> CPU Usage:",
                      value: `\`\`\`${(
                        process.memoryUsage().heapUsed /
                        1024 /
                        1024
                      ).toFixed(2)}%\`\`\``,
                      inline: true,
                    },
                    {
                      name: "<:reliable_memory:1030038320861937765> RAM: ",
                      value: `\`\`\`${(
                        process.memoryUsage().rss /
                        1024 /
                        1024
                      ).toFixed(2)} MB RSS\n${(
                        process.memoryUsage().heapUsed /
                        1024 /
                        1024
                      ).toFixed(2)} MB Heap\`\`\``,
                      inline: true,
                    },
                    {
                      name: "<a:reliable_developers:1030038452407898142> Bot Developers:",
                      value: `<@967657941937291265> & <@783661052738011176>`,
                    }
                  )
                  .setColor("#0398fc")
                  .setTimestamp()
                  .setFooter({ text: "©2022 | Reliable" });
                await interaction
                  .editReply({
                    content:
                      "> **<a:reliable_done:1030040640425312287> Data Updated**",
                    embeds: [embed2],
                  })
                  .catch((err) => {});
                await button.deferUpdate().catch((e) => {});
              }
            }
          });
          col.on("end", async (button) => {
            link_button = new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setLabel("Refresh")
                .setStyle(ButtonStyle.Success)
                .setCustomId("Refresh")
                .setDisabled(true)
            );
            return interaction
              .editReply({
                content: "> **Your Time Ended!**",
                components: [link_button],
              })
              .catch((err) => {});
          });
        })
        .catch((err) => {});
    } else if (interaction.options.getSubcommand() === "ping") {
      const message = await interaction.deferReply({ fetchReply: true });

      const newMessage = new EmbedBuilder()
        .setColor("#0398fc")
        .setTitle(`<:reliable_ping:1030037984931749899> Ping!`)
        .setFooter({ text: "©2022 | Reliable" })
        .addFields({
          name: `‣ API Lantecy`,
          value: `> **\`${client.ws.ping}\`**`,
          inline: true,
        })
        .addFields({
          name: `‣ Client Ping`,
          value: `> **\`${
            message.createdTimestamp - interaction.createdTimestamp
          }\`**`,
          inline: false,
        });

      await interaction.editReply({ embeds: [newMessage] });
    } else if (interaction.options.getSubcommand() === "invite") {
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Invite Reliable")
          .setEmoji("<:reliable_invite:1031443216664371231>")
          .setStyle(ButtonStyle.Link)
          .setURL(
            `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`
          ),
        new ButtonBuilder()
          .setLabel("Support Server")
          .setEmoji("<:reliable_support:1031443305399074836>")
          .setStyle(ButtonStyle.Link)
          .setURL("https://dsc.gg/reliable-support"),
        new ButtonBuilder()
          .setLabel("Top.GG")
          .setEmoji("<:reliable_topgg:1034324522305855561>")
          .setStyle("Link")
          .setURL("https://top.gg/bot/1030870443005071512?s=05fa7c98112c0")
      );

      const mainPage = new EmbedBuilder()
        .setTitle("Invite Link")
        .setFooter({ text: "©2022 | Reliable" })
        .setColor("#0398fc")
        .setDescription(
          "> **Click the below buttons! There are invite link and support link as well.**"
        );

      interaction.reply({ embeds: [mainPage], components: [row] });
    } else if (interaction.options.getSubcommand() === "uptime") {
      let days = Math.floor(client.uptime / 86400000);
      let hours = Math.floor(client.uptime / 3600000) % 24;
      let minutes = Math.floor(client.uptime / 60000) % 60;
      let seconds = Math.floor(client.uptime / 1000) % 60;

      const embed = new EmbedBuilder()
        .setTitle("Here is my Uptime! [not with counter]")
        .addFields(
          { name: "• Days:", value: `**\`${days}\` Day(s)**`, inline: true },
          { name: "• Hours:", value: `**\`${hours}\` Hour(s)**`, inline: true },
          {
            name: "• Minutes:",
            value: `**\`${minutes}\` Minute(s)**`,
            inline: true,
          },
          {
            name: "• Seconds:",
            value: `**\`${seconds}\` Second(s)**`,
            inline: true,
          }
        )
        .setColor("#0398fc")
        .setFooter({ text: "©2022 | Reliable" })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } else if (interaction.options.getSubcommand() === "credit") {
      const credits = new EmbedBuilder()
        .setColor("#0398fc")
        .setFooter({ text: "©2022 | Reliable" })
        .setTitle("Credits")
        .addFields(
          {
            name: `<a:reliable_developers:1030038452407898142> **Developers**`,
            value: `> <@967657941937291265> & <@783661052738011176>`,
            inline: false,
          },
          {
            name: `<:reliable_logo:1032950208130191370> **GFX Designer**`,
            value: `> <@991711412458115084>`,
            inline: false,
          }
        );

      const github = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Sohom Github")
          .setEmoji("<:reliable_github:1038345171298963527>")
          .setStyle("Link")
          .setURL("https://github.com/Sohom829"),
        new ButtonBuilder()
          .setLabel("Alpha Github")
          .setEmoji("<:reliable_github:1038345171298963527>")
          .setStyle("Link")
          .setURL("https://github.com/Alpha5959")
      );

      await interaction.reply({ embeds: [credits], components: [github] });
    } else if (interaction.options.getSubcommand() === "help") {
      const MainEmbed = new EmbedBuilder()
        .setColor("#0398fc")
        .setFooter({ text: "Made with 🖤 by Sohom829#8350 & Alpha•#9258" })
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setImage(
          `https://media.discordapp.net/attachments/1029807885116506122/1034897221109424178/IMG_20221025_221311.jpg`
        )
        .setTitle(`${client.user.username} - Command Panel`)
        .setDescription("Select a category from the menu");

      const row = new ActionRowBuilder().addComponents(
        new SelectMenuBuilder()
          .setCustomId("select")
          .setPlaceholder("No category selected")
          .addOptions(
            {
              label: "Moderation",
              description: "View Moderation Commands",
              value: `first_option`,
            },
            {
              label: "Info",
              description: "View Info Commands",
              value: "second_option",
            },
            {
              label: "Fun",
              description: "View Fun commands",
              value: "third_option",
            },
            {
              label: "Bot",
              description: "View default bot commands",
              value: "fourth_option",
            },
            {
              label: "Giveaway",
              description: "View all giveaway commands",
              value: "fifth_option",
            },
            {
              label: "Utility",
              description: "View all Utility commands",
              value: "sixth_option",
            }
          )
      );
      const topgg = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Vote for me!")
          .setEmoji("<:reliable_topgg:1034324522305855561>")
          .setStyle("Link")
          .setURL("https://top.gg/bot/1030870443005071512?s=05fa7c98112c0")
      );

      await interaction.reply({
        embeds: [MainEmbed],
        components: [row, topgg],
      });
    } else {
      interaction.reply({ content: `No sub command selected.` });
    }
  },
};
/**
 * @Author Reliable Inc.
 * @Copyright ©2022 | Reliable Inc, All rights reserved.
 * @CodedBy Mohtasim Alam Sohom, Sajidur Rahman Tahsin
 */
