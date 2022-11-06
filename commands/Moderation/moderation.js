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
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mod")
    .setDescription("Moderation commands")
    .setDefaultMemberPermissions(
      PermissionFlagsBits.BanMembers ||
        PermissionFlagsBits.Administrator ||
        PermissionFlagsBits.KickMembers ||
        PermissionFlagsBits.ManageMessages ||
        PermissionFlagsBits.ManageRoles ||
        PermissionFlagsBits.TimeoutMembers
    )
    .addSubcommand((sub) =>
      sub
        .setName("ban")
        .setDescription("Ban a member from this guild.")
        .addUserOption((op) =>
          op
            .setName("target")
            .setDescription("Select a member who you want to ban")
            .setRequired(true)
        )
        .addStringOption((op) =>
          op
            .setName("reason")
            .setDescription("Provide a reason for ban")
            .setRequired(false)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("kick")
        .setDescription("kick a member from this guild.")
        .addUserOption((op) =>
          op
            .setName("target")
            .setDescription("Select a member who you want to kick")
            .setRequired(true)
        )
        .addStringOption((op) =>
          op
            .setName("reason")
            .setDescription("Provide a reason for kick")
            .setRequired(false)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("clear")
        .setDescription("Clear a specified amount of message.")
        .addIntegerOption((option) =>
          option
            .setName("amount")
            .setDescription("Enter amount to clear message")
            .setRequired(true)
        )
        .addUserOption((op) =>
          op
            .setName("target")
            .setDescription("Select a user who you wants to clear")
            .setRequired(false)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("timeout")
        .setDescription("timeout a member from this guild.")
        .addUserOption((op) =>
          op
            .setName("target")
            .setDescription("Select a member who you want to timeout")
            .setRequired(true)
        )
        .addIntegerOption((op) =>
          op
            .setName("time")
            .setDescription("set the time for timeout (in minutes)")
            .setRequired(true)
        )
        .addStringOption((op) =>
          op
            .setName("reason")
            .setDescription("Provide a reason for timeout")
            .setRequired(false)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("role-member-info")
        .setDescription("Shows list of members having a role.")
        .addRoleOption((op) =>
          op.setName("role").setDescription("Select a role").setRequired(true)
        )
    ),

  async execute(interaction, client) {
    if (interaction.options.getSubcommand() === "ban") {
      const { channel, options } = interaction;

      const user = options.getUser("target") || "You can't ban yourself!";

      let reason = interaction.options.getString("reason");
      const member = await interaction.guild.members
        .fetch(user.id)
        .catch(console.error);

      if (!reason) reason = "No reason provided";
      if (member.id === interaction.user.id) {
        const err_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription("❌ | You cannot ban yourself!")
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" });
        return interaction.reply({ embeds: [err_embed] });
      }

      if (
        interaction.member.roles.highest.position <
        member.roles.highest.position
      ) {
        const err2_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription(
            "❌ | You cannot ban user who have higher role than you!"
          )
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" });
        return interaction.reply({ embeds: [err2_embed] });
      }
      member.ban({ deleteMessageDays: 1, reason: reason }).catch(console.error);

      const bannedEmbed = new EmbedBuilder()
        .setColor("#0398fc")
        .setFooter({ text: "©2022 | Reliable" })
        .setTitle(`Banned a member..`)
        .addFields(
          {
            name: "‣ Banned",
            value: `**\`${user.tag}\`**`,
            inline: true,
          },
          {
            name: "‣ Reason",
            value: `**\`${reason}\`**`,
            inline: true,
          }
        );

      interaction.channel.send({ embeds: [bannedEmbed] });

      await interaction.reply({
        content: `Done. Banned ${user.tag}`,
        ephemeral: true,
      });
    } else if (interaction.options.getSubcommand() === "kick") {
      const { channel, options } = interaction;

      const user = options.getUser("target");
      let reason = interaction.options.getString("reason");
      const member = await interaction.guild.members
        .fetch(user.id)
        .catch(console.error);

      if (!reason) reason = "No reason provided";
      if (member.id === interaction.user.id) {
        const err_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription("❌ | You cannot kick yourself!")
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" });
        return interaction.reply({ embeds: [err_embed] });
      }

      if (
        interaction.member.roles.highest.position <
        member.roles.highest.position
      ) {
        const err2_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription(
            "❌ | You cannot kick user who have higher role than you!"
          )
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" });
        return interaction.reply({ embeds: [err2_embed] });
      }
      member.kick(reason).catch(console.error);

      const kickedEmbed = new EmbedBuilder()
        .setColor("#0398fc")
        .setTitle(`Kicked a member..`)
        .setFooter({ text: "©2022 | Reliable" })
        .addFields(
          {
            name: "‣ Kicked",
            value: `**\`${user.tag}\`**`,
            inline: true,
          },
          {
            name: "‣ Reason",
            value: `**\`${reason}\`**`,
            inline: true,
          }
        );

      interaction.channel.send({ embeds: [kickedEmbed] });
      await interaction.reply({
        content: `Done. Kicked ${user.tag}`,
        ephemeral: true,
      });
    } else if (interaction.options.getSubcommand() === "clear") {
      const { channel, options } = interaction;

      const Amount = options.getInteger("amount");
      const Target = options.getUser("target");

      const Messages = await channel.messages.fetch();

      const Response = new EmbedBuilder().setColor("#0398fc");

      if (Target) {
        let i = 0;
        const filtered = [];
        (await Messages).filter((m) => {
          if (m.author.id === Target.id && Amount > i) {
            filtered.push(m);
            i++;
          }
        });

        await channel.bulkDelete(filtered, true).then((messages) => {
          Response.setDescription(
            Response.setTitle(
              `Cleared Messages`
            )`> **Cleared \`${messages.size}\`** **from ${Target}**.`
          );
          Response.setFooter({ text: "©2022 | Reliable" });
          interaction.reply({ embeds: [Response] });
        });
      } else {
        if (Amount > 100) {
          interaction.reply({
            content: `Amount must be less than or equal to 100`,
            ephemeral: true,
          });
        }
        await channel.bulkDelete(Amount, true).then((messages) => {
          Response.setTitle("Cleared Messages");
          Response.setDescription(
            `> **Cleared \`${messages.size}\`** **from this channel.**`
          );
          Response.setFooter({ text: "©2022 | Reliable" });
          interaction.reply({ embeds: [Response] });
        });
      }
    } else if (interaction.options.getSubcommand() === "timeout") {
      const { channel, options } = interaction;

      const user = options.getUser("target");
      let reason = interaction.options.getString("reason");
      let time = interaction.options.getInteger("time");
      const member = await interaction.guild.members
        .fetch(user.id)
        .catch(console.error);

      if (!reason) reason = "No reason provided";
      if (member.id === interaction.user.id) {
        const error_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription("❌ | You cannot timeout yourself!")
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" });
        return interaction.reply({ embeds: [error_embed] });
      }

      if (
        interaction.member.roles.highest.position <
        member.roles.highest.position
      ) {
        const error2_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription(
            "❌ | You cannot timeout user who have higher role than you!"
          )
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" });
        return interaction.reply({ embeds: [error2_embed] });
      }
      member
        .timeout(time == null ? null : time * 60 * 1000, reason)
        .catch(console.error);

      const timoutEMBED = new EmbedBuilder()
        .setColor("#0398fc")
        .setTitle(`Timeout`)
        .setFooter({ text: "©2022 | Reliable" })
        .setTimestamp()
        .addFields(
          {
            name: "‣ Timeout to",
            value: `**\`${user.tag}\`**`,
            inline: true,
          },
          {
            name: "‣ Timeout Duration",
            value: `**\`${time}m\`**`,
            inline: true,
          },
          {
            name: "‣ Reason",
            value: `**\`${reason}\`**`,
            inline: true,
          }
        );

      interaction.reply({ embeds: [timoutEMBED] });
    } else if (interaction.options.getSubcommand() === "role-member-info") {
      const role = interaction.options.getRole("role");
      let membersWithRole = interaction.guild.members.cache
        .filter((member) => {
          return member.roles.cache.find((r) => r.name === role.name);
        })
        .map((member) => {
          return member.user.username;
        });
      if (membersWithRole > 2048) {
        const err_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription("> **Sorry, the role member list is too big!*")
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" });
      }
      const rolemember = new EmbedBuilder()
        .setColor("#0398fc")
        .setTitle(`Role Member Info`)
        .addFields(
          {
            name: "Role Name",
            value: `**${role.name}** (\`${role.id}\`)`,
            inline: true,
          },
          {
            name: "User(s) in it",
            value: `>>> ${membersWithRole.join("\n")}`,
            inline: false,
          }
        )
        .setFooter({ text: "©2022 | Reliable" });

      interaction.reply({ embeds: [rolemember], ephemeral: true });
    }
  },
};
/**
 * @Author Reliable Inc.
 * @Copyright ©2022 | Reliable Inc, All rights reserved.
 * @CodedBy Mohtasim Alam Sohom, Sajidur Rahman Tahsin
 */
