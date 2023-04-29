const {
  ButtonInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const { createTranscript } = require("discord-html-transcripts");
const TicketSetup = require("../../Schemas/TicketSetup");
const ticketSchema = require("../../Schemas/Ticket");

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    const { guild, member, customId, channel } = interaction;
    const { ManageChannels, SendMessages } = PermissionFlagsBits;

    if (!interaction.isButton()) return;
    if (!["close", "lock", "unlock", "claim"].includes(customId)) return;

    const docs = await TicketSetup.findOne({ GuildID: guild.id });

    if (!docs) return;

    if (!guild.members.me.permissions.has((r) => r.id === docs.Handlers)) {
    const closed_already = new EmbedBuilder()
    .setTitle("Error")
    .setDescription(
      "> **<:reliable_wrong:1043155193077960764> | I don't have enough permissions.**"
    )
    .setColor("#2F3136")
    .setFooter({ text: "©2022 - 2023 | Reliable" });

  interaction.reply({ embeds: [closed_already], ephemeral: true });
    }
    ticketSchema.findOne({ ChannelID: channel.id }, async (err, data) => {
      if (err) throw err;
      if (!data) return;
      const fetchMember = await guild.members.cache.get(data.MembersID);



      switch (customId) {
        case "close":
          if (data.closed == true) {
            const closed_already = new EmbedBuilder()
              .setTitle("Error")
              .setDescription(
                "> **<:reliable_wrong:1043155193077960764> | This ticket is already getting closed!**"
              )
              .setColor("#2F3136")
              .setFooter({ text: "©2022 - 2023 | Reliable" });

            interaction.reply({ embeds: [closed_already], ephemeral: true });
          }

          const transcript = await createTranscript(channel, {
            limit: -1,
            returnBBuffer: false,
            fileName: `${member.user.username}-ticket${data.type}-${data.ticketID}.html`,
          });

          await ticketSchema.updateOne(
            { chnanelID: channel.id },
            { Closed: true }
          );
          const transcriptProcess = new EmbedBuilder()
            .setTitle("Ticket - Closing Panel")
            .setDescription(
              "> **<:reliable_right:1042843202429919272> | Ticket will be closed in 30 Seconds.**"
            )
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" })
            .setTimestamp();
          const transcriptEmbed = new EmbedBuilder()
            .setTitle("Ticket - Transcript Panel")
            .setDescription(
              "> **<:reliable_right:1042843202429919272> | Ticket Transcript is created!**"
            )
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" })
            .setTimestamp();

          interaction.reply({ embeds: [transcriptProcess] });
          interaction.channel.send({ embeds: [transcriptEmbed], files: [transcript] })
          setTimeout(function () {
            channel.delete();
          }, 30000);

          break;

        case "lock":
          if (!member.permissions.has(ManageChannels)) {
            const err_embed = new EmbedBuilder()
              .setTitle("Error")
              .setDescription(
                "> **<:reliable_wrong:1043155193077960764> | You don't have enough permission to lock this!**"
              )
              .setColor("#2F3136")
              .setFooter({ text: "©2022 - 2023 | Reliable" });
            interaction.reply({ embeds: [err_embed], ephemeral: true });
          }
          if (data.locked == true) {
            const err_embed = new EmbedBuilder()
              .setTitle("Error")
              .setDescription(
                "> **<:reliable_wrong:1043155193077960764> | The ticket was already set locked!**"
              )
              .setColor("#2F3136")
              .setFooter({ text: "©2022 - 2023 | Reliable" });
              return interaction.reply({ embeds: [err_embed], ephemeral: true });
          } else {
          await ticketSchema.updateOne(
            { ChannelID: channel.id },
            { Locked: true }
          );
          const locked_embed = new EmbedBuilder()
            .setTitle("Ticket - Panel")
            .setDescription(
              "> **<:reliable_right:1042843202429919272> | The ticket was locked!**"
            )
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" });

          data.MembersID.forEach((m) => {
            channel.permissionOverwrites.edit(m, { SendMessages: false });
          });
          return interaction.reply({ embeds: [locked_embed], ephemeral: true });
        }
        case "unlock":
          if (!member.permissions.has(ManageChannels)) {
            const err_embed = new EmbedBuilder()
              .setTitle("Error")
              .setDescription(
                "> **<:reliable_wrong:1043155193077960764> | You don't have enough permission to unlock this!**"
              )
              .setColor("#2F3136")
              .setFooter({ text: "©2022 - 2023 | Reliable" });
            interaction.reply({ embeds: [err_embed], ephemeral: true });
          }
          if (data.locked == false) {
            const err_embed = new EmbedBuilder()
              .setTitle("Error")
              .setDescription(
                "> **<:reliable_wrong:1043155193077960764> | The ticket was already set unlocked!**"
              )
              .setColor("#2F3136")
              .setFooter({ text: "©2022 - 2023 | Reliable" });
           return interaction.reply({ embeds: [err_embed], ephemeral: true });
          } else {

          await ticketSchema.updateOne(
            { ChannelID: channel.id },
            { Locked: false }
          );
          const unlocked_embed = new EmbedBuilder()
            .setTitle("Ticket - Panel")
            .setDescription(
              "> **<:reliable_right:1042843202429919272> | The ticket was unlocked!**"
            )
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" });

          data.MembersID.forEach((m) => {
            channel.permissionOverwrites.edit(m, { SendMessages: true });
          });
          return interaction.reply({ embeds: [unlocked_embed], ephemeral: true });
        }
        case "claim":
          if (!member.permissions.has(ManageChannels)) {
            const err_embed = new EmbedBuilder()
              .setTitle("Error")
              .setDescription(
                "> **<:reliable_wrong:1043155193077960764> | You don't have enough permission to unlock this!**"
              )
              .setColor("#2F3136")
              .setFooter({ text: "©2022 - 2023 | Reliable" });
            interaction.reply({ embeds: [err_embed], ephemeral: true });
          }

          if (data.Claimed == true) {
            const err_embed = new EmbedBuilder()
              .setTitle("Error")
              .setDescription(`> **<:reliable_wrong:1043155193077960764> | Ticket is already claimed by <@${data.ClaimedBy}>**`)
              .setColor("#2F3136")
              .setFooter({ text: "©2022 - 2023 | Reliable" });
            interaction.reply({ embeds: [err_embed], ephemeral: true });
          } else {

          await ticketSchema.update(
            { ChannelID: channel.id },
            { Claimed: true, ClaimedBy: member.id }
          );
          const claim_embed = new EmbedBuilder()
            .setTitle("Ticket - Panel")
            .setDescription(`> **<:reliable_right:1042843202429919272> | Ticket was successfully claimed by <@${member.id}> || (\`${member.id}\`)**`)
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" });
          interaction.reply({ embeds: [claim_embed] });
          break;
    }
   }
  })
  },
};
