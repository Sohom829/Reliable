const {
  ChannelType,
  ButtonInteraction,
  EmbedBuilder,
  Embed,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} = require("discord.js");
const TicketSetup = require("../../Schemas/TicketSetup");
const ticketSchema = require("../../Schemas/Ticket");

module.exports = {
  name: "interactionCreate",

  async execute(interaction) {
    const { guild, member, customId, channel } = interaction;
    const { ViewChannel, SendMessages, ManageChannels, ReadMessageHistory } =
      PermissionFlagsBits;
    const ticketId = Math.floor(Math.random() * 9000) + 10000;

    if (!interaction.isButton()) return;

    const data = await TicketSetup.findOne({ GuildID: guild.id });

    if (!data) return;

    if (!data.Buttons.includes(customId)) return;

    try {
      await guild.channels
        .create({
          name: `${member.user.tag}-ticket`,
          type: ChannelType.GuildText,
          parent: data.Catagory,
          permissionOverwrites: [
            {
              id: data.Everyone,
              deny: [ViewChannel, SendMessages, ReadMessageHistory],
            },
            {
              id: member.id,
              allow: [ViewChannel, SendMessages, ReadMessageHistory],
            },
          ],
        })
        .then(async (channel) => {
          const newTicketSchema = await ticketSchema.create({
            GuildID: guild.id,
            MembersID: member.id,
            TicketID: ticketId,
            ChannelID: channel.id,
            Closed: false,
            Locked: false,
            Type: customId,
            Claimed: false,
          });
          const embed = new EmbedBuilder()
            .setTitle(`Ticket - **${customId}** Panel`)
            .setDescription("> **Our team will reach you shortly! Please, describe your issue.**")
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" })
            .setTimestamp();

          const button = new ActionRowBuilder().setComponents(
            new ButtonBuilder()
              .setCustomId("close")
              .setLabel("Close ticket")
              .setStyle(ButtonStyle.Danger)
              .setEmoji("⛔"),
            new ButtonBuilder()
              .setCustomId("lock")
              .setLabel("Lock the ticket")
              .setStyle(ButtonStyle.Primary)
              .setEmoji("🔐"),
            new ButtonBuilder()
              .setCustomId("unlock")
              .setLabel("Unlock the ticket")
              .setStyle(ButtonStyle.Success)
              .setEmoji("🔒"),
            new ButtonBuilder()
              .setCustomId("claim")
              .setLabel("Claim")
              .setStyle(ButtonStyle.Primary)
              .setEmoji("🛄")
          );

          channel.send({
            embeds: [embed],
            components: [button],
          });

          const success_created = new EmbedBuilder()
          .setTitle("Ticket - Opened")
          .setDescription("**<:reliable_right:1042843202429919272> | Successfully created a ticket!**")
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" });
          interaction.reply({ embeds: [success_created], ephemeral: true });
        });
    } catch (err) {
      return console.log(err);
    }
  },
};
