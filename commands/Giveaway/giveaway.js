const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Embed,
  Colors,
  ActionRowBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const { execute } = require("./giveaway");
const ms = require("ms");
const config = require("../../config.json");
const messages = require("../../utils/messages");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("giveaway")
    .setDescription("Get all giveaway commands")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addSubcommand((sub) =>
      sub
        .setName("start")
        .setDescription("🎉 Starts a giveaway")
        .addStringOption((option) =>
          option
            .setName("duration")
            .setDescription(
              "How long the giveaway should last for. Example values: 1m, 1h, 1d"
            )
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("winners")
            .setDescription("How many winners the giveaway should have")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("prize")
            .setDescription("What the prize of the giveaway should be")
            .setRequired(true)
        )
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("The channel to start the giveaway in")
            .setRequired(false)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("reroll")
        .setDescription("🔃 Selects a new giveaway winner")
        .addStringOption((option) =>
          option
            .setName("giveaway")
            .setDescription("The giveaway to reroll (message ID or prize)")
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("delete")
        .setDescription("🚮 Deletes the giveaway")
        .addStringOption((option) =>
          option
            .setName("giveaway-message-id")
            .setDescription(
              "The giveaway to pause (message ID or giveaway prize)"
            )
            .setRequired(true)
        )
    )
    .addSubcommand((cmd) =>
      cmd
        .setName("pause")
        .setDescription("⏸️ Pauses the giveaway")
        .addStringOption((option) =>
          option
            .setName("giveaway-message-id")
            .setDescription(
              "The giveaway to pause (message ID or giveaway prize)"
            )
            .setRequired(true)
        )
    )
    .addSubcommand((cmd) =>
      cmd
        .setName("unpause")
        .setDescription("⏯️ Unpauses the giveaway")
        .addStringOption((option) =>
          option
            .setName("giveaway-message-id")
            .setDescription(
              "The giveaway to unpause (message ID or giveaway prize)"
            )
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("end")
        .setDescription("⏹️ Ends the giveaway")
        .addStringOption((option) =>
          option
            .setName("giveaway-message-id")
            .setDescription(
              "The giveaway to end (message ID or giveaway prize)"
            )
            .setRequired(true)
        )
    ),
  async execute(interaction, client) {
    if (interaction.options.getSubcommand() === "start") {
      const giveawayChannel =
        interaction.options.getChannel("channel") || interaction.channel;
      const giveawayDuration = interaction.options.getString("duration");
      const giveawayWinnerCount = interaction.options.getInteger("winners");
      const giveawayPrize = interaction.options.getString("prize");

      if (!giveawayChannel.isTextBased()) {
        const err_embed2 = new EmbedBuilder()
          .setTitle("Error")
          .setDescription(":x: | **Selected channel is not text-based.**")
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" })
          .setTimestamp();
        interaction.reply({ embeds: [err_embed2], ephemeral: true });
      }

      client.giveawaysManager.start(giveawayChannel, {
        duration: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: giveawayWinnerCount,
        hostedBy: interaction.user,
        messages: {
          giveaway:
            (config.everyoneMention ? "@everyone\n\n" : "") +
            "<a:reliable_rewards:1039201211196383333> **GIVEAWAY** <a:reliable_rewards:1039201211196383333>",
          giveawayEnded:
            (config.everyoneMention ? "@everyone\n\n" : "") +
            "<a:reliable_rewards:1039201211196383333> **GIVEAWAY ENDED** <a:reliable_rewards:1039201211196383333>",
          inviteToParticipate:
            "> **React with <:reliable_giveaway:1038804433116614718> to participate!**",
          dropMessage:
            "> Be the first to react with React with <:reliable_giveaway:1038804433116614718> to participate!",
          drawing: "> **`Ends in`**: {timestamp}",
          winMessage: "**Congratulations, {winners}! You won `{this.prize}`**!",
          embedFooter: "©2022 | Reliable",
          noWinner:
            "> **`Giveaway cancelled, Not enough entrants to determine a winner!`**",
          hostedBy: `> **\`Hosted by\`**: ${interaction.user}`,
          paused:
            '"<a:reliable_alert:1039201857819648000> **GIVEAWAY PAUSED** <a:reliable_alert:1039201857819648000> ',
          infiniteDurationText: "**`NEVER`**",
          error: "> **`Reroll cancelled, no valid participations`**",
          congrat:
            "**New winner(s): {winners}! Congratulations, your prize is `{this.prize}`**!",
          winners: "> **Winner(s)**",
          endedAt: "Ended at",
        },
      });

      const giveaway = new EmbedBuilder()
        .setTitle("Success")
        .setDescription(
          `✅ | **The giveaway for the \`${giveawayPrize}\` is starting in ${giveawayChannel}!**`
        )
        .setColor("#0398fc")
        .setFooter({ text: "©2022 | Reliable" })
        .setTimestamp();

      await interaction.reply({ embeds: [giveaway], ephemeral: true });
    }

    if (interaction.options.getSubcommand() === "reroll") {
      const query = interaction.options.getString("giveaway");
      const giveaway =
        client.giveawaysManager.giveaways.find(
          (g) => g.prize === query && g.guildId === interaction.guild.id
        ) ||
        client.giveawaysManager.giveaways.find(
          (g) => g.messageId === query && g.guildId === interaction.guild.id
        );

      if (!giveaway) {
        const err_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription(
            `❌ | **Unable to find a giveaway for \`${query}\`.**`
          )
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" })
          .setTimestamp();

        interaction.reply({ embeds: [err_embed], ephemeral: true });
      }

      if (!giveaway.ended) {
        const err_embed2 = new EmbedBuilder()
          .setTitle("Error")
          .setDescription(`❌ | **The giveaway is not ended yet.**`)
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" })
          .setTimestamp();

        interaction.reply({ embeds: [err_embed2], ephemeral: true });
      }

      client.giveawaysManager
        .reroll(giveaway.messageId)
        .then(() => {
          const rerolled = new EmbedBuilder()
            .setTitle("Success")
            .setDescription(`✅ | **Giveaway rerolled!**`)
            .setColor("#0398fc")
            .setFooter({ text: "©2022 | Reliable" })
            .setTimestamp();

          interaction.reply({ embeds: [rerolled] });
        })
        .catch((e) => {
          interaction.reply({
            content: e,
            ephemeral: true,
          });
        });
    }

    if (interaction.options.getSubcommand() === "pause") {
      const getGiveaway = interaction.options.getString("giveaway-message-id");

      const giveaway =
        client.giveawaysManager.giveaways.find(
          (g) => g.prize === getGiveaway && g.guildId === interaction.guild.id
        ) ||
        client.giveawaysManager.giveaways.find(
          (g) =>
            g.messageId === getGiveaway && g.guildId === interaction.guild.id
        );

      if (!giveaway) {
        const err_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription(
            `❌ | Unable to find a giveaway for \`${getGiveaway}\``
          )
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" })
          .setTimestamp();

        interaction.reply({ embeds: [err_embed], ephemeral: true });
      }

      if (giveaway.pauseOptions.isPaused) {
        const err_embed2 = new EmbedBuilder()
          .setTitle("Error")
          .setDescription(`❌ | This giveaway is already paused.`)
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" })
          .setTimestamp();

        interaction.reply({ embeds: [err_embed2], ephemeral: true });
      }

      client.giveawaysManager.pause(giveaway.messageId).then(() => {
        const paused = new EmbedBuilder()
          .setTitle("Success")
          .setDescription(`✅ | Giveaway paused!`)
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" })
          .setTimestamp();

        interaction.reply({ embeds: [paused], ephemeral: true });
      });
    }

    if (interaction.options.getSubcommand() === "unpause") {
      const getGiveaway = interaction.options.getString("giveaway-message-id");

      const giveaway =
        client.giveawaysManager.giveaways.find(
          (g) => g.prize === getGiveaway && g.guildId === interaction.guild.id
        ) ||
        client.giveawaysManager.giveaways.find(
          (g) =>
            g.messageId === getGiveaway && g.guildId === interaction.guild.id
        );

      if (!giveaway) {
        const err_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription(
            `❌ | Unable to find a giveaway for \`${getGiveaway}\``
          )
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" })
          .setTimestamp();

        interaction.reply({ embeds: [err_embed], ephemeral: true });
      }

      if (!giveaway.pauseOptions.isPaused) {
        const err_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription(`❌ | This giveaway is not paused.`)
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" })
          .setTimestamp();

        interaction.reply({ embeds: [err_embed], ephemeral: true });
      }

      client.giveawaysManager.unpause(giveaway.messageId).then(() => {
        const unpaused = new EmbedBuilder()
          .setTitle("Success")
          .setDescription(`✅ | Giveaway unpaused!`)
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" })
          .setTimestamp();

        interaction.reply({ embeds: [unpaused], ephemeral: true });
      });
    }
    if (interaction.options.getSubcommand() === "delete") {
      const getGiveaway = interaction.options.getString("giveaway-message-id");
      const giveaway =
        client.giveawaysManager.giveaways.find(
          (g) => g.prize === getGiveaway && g.guildId === interaction.guild.id
        ) ||
        client.giveawaysManager.giveaways.find(
          (g) =>
            g.messageId === getGiveaway && g.guildId === interaction.guild.id
        );

      if (!giveaway) {
        const err_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription(
            `❌ | Unable to find a giveaway for \`${getGiveaway}\``
          )
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" })
          .setTimestamp();

        interaction.reply({ embeds: [err_embed], ephemeral: true });
      }

      client.giveawaysManager.delete(giveaway.messageId).then(() => {
        const deleted = new EmbedBuilder()
          .setTitle("Success")
          .setDescription(`✅ | Deleted the Giveaway!`)
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" })
          .setTimestamp();

        interaction.reply({ embeds: [deleted], ephemeral: true });
      });
    }

    if (interaction.options.getSubcommand() === "end") {
      const query = interaction.options.getString("giveaway-message-id");
      const giveaway =
        client.giveawaysManager.giveaways.find(
          (g) => g.prize === query && g.guildId === interaction.guild.id
        ) ||
        client.giveawaysManager.giveaways.find(
          (g) => g.messageId === query && g.guildId === interaction.guild.id
        );

      if (!giveaway) {
        const err_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription(
            `❌ | **Unable to find a giveaway for \`${query}\`.**`
          )
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" })
          .setTimestamp();

        interaction.reply({ embeds: [err_embed], ephemeral: true });
      }

      if (giveaway.ended) {
        const err_embed2 = new EmbedBuilder.setTitle("Error")
          .setDescription(`❌ | **This giveaway is already ended.**`)
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" })
          .setTimestamp();

        interaction.reply({ embeds: [err_embed2], ephemeral: true });
      }

      client.giveawaysManager.end(giveaway.messageId).then(() => {
        const ended = new EmbedBuilder()
          .setTitle("Success")
          .setDescription(`**✅ | Giveaway ended!**`)
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" })
          .setTimestamp();

        interaction.reply({ embeds: [ended], ephemeral: true }).catch((e) => {
          interaction.reply({
            content: e,
            ephemeral: true,
          });
        });
      });
    }
  },
};

/**
 * @Author Reliable Inc.
 * @Copyright ©2022 | Reliable Inc, All rights reserved.
 * @CodedBy Mohtasim Alam Sohom, Sajidur Rahman Tahsin
 **/
