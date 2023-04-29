const config = require("../../config.json");
const {
  ChatInputCommandInteraction,
  EmbedBuilder,
  InteractionType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");
const BlackListGuild = require("../../Schemas/BlackListGuild");
const BlackListUser = require("../../Schemas/BlackListUser");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const GuildData = await BlackListGuild.findOne({
        Guild: interaction.guild.id,
      }).catch((err) => {});
      const UserData = await BlackListUser.findOne({
        User: interaction.user.id,
      }).catch((err) => {});
      const Embed = new EmbedBuilder()
        .setColor("#2F3136")
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setTimestamp();

      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);

      if (command.developer && interaction.user.id !== "783661052738011176")
        return interaction.reply({
          content: `> **Sorry, This command was made for developers can be used by only <@967657941937291265> or <@783661052738011176>!**`,
          ephemeral: true,
        });
      if (GuildData)
        return interaction.reply({
          embeds: [
            Embed.setTitle(
              `<:reliable_blacklist:1032352444501475448> Server Blacklisted`
            )
              .setDescription(
                `> **Your server was blacklisted! Please visit our support server. The reason is provided below! If not Go to our support server and mention the support team or developers!**`
              )
              .setColor("#2F3136")
              .setFooter({ text: "©2022 | Reliable" })
              .addFields(
                {
                  name: "‣ Server Blacklisted on",
                  value: `> <t:${parseInt(GuildData.Time / 1000)}:R>`,
                  inline: true,
                },
                {
                  name: "‣ Reason",
                  value: `> **\`${GuildData.Reason}\`**`,
                  inline: true,
                }
              ),
          ],
        });

      if (UserData)
        return interaction.reply({
          embeds: [
            Embed.setTitle(
              `<:reliable_blacklist:1032352444501475448> User Blacklisted`
            )
              .setDescription(
                `> **You have been blacklisted from using this bot! Please read the reason. If there is no reason provided please visit our support server and mention the support team or developers!**`
              )

              .setColor("#2F3136")
              .setFooter({ text: "©2022 | Reliable" })
              .addFields(
                {
                  name: "‣ User Blacklisted on",
                  value: `> <t:${parseInt(UserData.Time / 1000)}:R>`,
                  inline: true,
                },
                {
                  name: "‣ Reason",
                  value: `> **\`${UserData.Reason}\`**`,
                  inline: true,
                }
              ),
          ],
        });

      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (err) {
        console.log(err);
        const embed = new EmbedBuilder()
        .setTitle("Error - Commands")
        .setDescription("> **Seems like, your using wrong commands or it is broken. If you belive it's broken then, please join our discord server by clicking the below buttons.**")
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" })


        const topgg = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel("Vote Reliable")
            .setEmoji("<:reliable_topgg:1034324522305855561>")
            .setStyle("Link")
            .setURL("https://top.gg/bot/1030870443005071512?s=05fa7c98112c0"),
          new ButtonBuilder()
            .setLabel("Support Server")
            .setEmoji("<:reliable_support:1031443305399074836>")
            .setStyle(ButtonStyle.Link)
            .setURL("https://dsc.gg/reliable-support"),
          new ButtonBuilder()
            .setLabel("Invite Reliable")
            .setEmoji("<:reliable_invite:1031443216664371231>")
            .setStyle("Link")
            .setURL("https://dsc.gg/reliable-bot")
        );
        return interaction.reply({ embeds: [embed], components: [topgg], ephemeral: true });
      }
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);

      if (!button) return new Error(`> **There is no code for button.**`);

      try {
        await button.execute(interaction, client);
      } catch (err) {
        console.log(err);
      }
    } else if (interaction.type == InteractionType.ModalSubmit) {
      const { modals } = client;
      const { customId } = interaction;

      const modal = modals.get(customId);

      if (!modal) return new ReferenceError("There is no code for modal.");

      try {
       await modal.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.isStringSelectMenu()) {
      const { selectMenus } = client;
      const { customId } = interaction;
      const menu = selectMenus.get(customId);

      if (!menu) return new Error("There is no code for this select menu");

      try {
        await menu.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    }
  },
};
/**
 * @INFO
 * Bot Coded by IamSohom829#0829 & Alpha•#9258
 * You can't use this codes without permissions!
 */
