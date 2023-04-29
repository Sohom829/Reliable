const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const ticketSchema = require("../../Schemas/Ticket");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Ticket actions")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addStringOption((op) =>
      op
        .setName("action")
        .setDescription("Add or remove members from the ticket")
        .setRequired(true)
        .addChoices(
          { name: "Add", value: "add" },
          { name: "Remove", value: "remove" }
        )
    )
    .addUserOption((op) =>
      op
        .setName("member")
        .setDescription(
          "Select a member from the discord server to perform the action on."
        )
        .setRequired(true)
    ),

  async execute(interaction) {
    const { guild, options, channel } = interaction;

    const action = options.getString("action");
    const member = options.getUser("member");

    const embed = new EmbedBuilder();

    switch (action) {
      case "add":
        ticketSchema.findOne(
          { GuildID: guild.Id, ChannelID: channel.id },
          async (err, data) => {
            if (err) throw err;
            if (!data)
              return interaction.reply({
                embeds: [
                  embed
                    .setTitle("Error")
                    .setDescription(
                      "> **<:reliable_wrong:1043155193077960764> | Something went wrong! Please make sure to visit `/ticket-guideline`. If you still face this error after completing all the requirements please visit our support server!**"
                    )
                    .setColor("#2F3136")
                    .setFooter({ text: "©2022 - 2023 | Reliable" }),
                ],
                ephemeral: true,
              });

            if (data.MembersID.Includes(member.id))
              return interaction.reply({
                embeds: [
                  embed
                    .setTitle("Error")
                    .setDescription(
                      "> **<:reliable_wrong:1043155193077960764> | Something went wrong! Please make sure to visit `/ticket-guideline`. If you still face this error after completing all the requirements please visit our support server!**"
                    )
                    .setColor("#2F3136")
                    .setFooter({ text: "©2022 - 2023 | Reliable" }),
                ],
                ephemeral: true,
              });

            data.MembersID.push(member.id);

            channel.permissionOverwrites.edit(member.id, {
              sendMessages: true,
              viewChannel: true,
              ReadMessagesHistory: true,
            });

            interaction.reply({
              embeds: [
                embed
                  .setTitle("Ticket - Panel")
                  .setDescription(
                    `> **<:reliable_right:1042843202429919272> | <@${member.id}> || \`${member.tag}\` has been added to the ticket.**`
                  )
                  .setColor("#2F3136")
                  .setFooter({ text: "©2022 - 2023 | Reliable" }),
              ],
            });

            data.save();
          }
        );

        break;
      case "remove":
        ticketSchema.findOne(
          { GuildID: guild.id, ChannelID: channel.id },
          async (err, data) => {
            if (err) throw err;
            if (!data)
              return interaction.reply({
                embeds: [
                  embed
                    .setTitle("Error")
                    .setDescription(
                      "> **<:reliable_wrong:1043155193077960764> | Something went wrong! Please make sure to visit `/ticket-guideline`. If you still face this error after completing all the requirements please visit our support server!**"
                    )
                    .setColor("#2F3136")
                    .setFooter({ text: "©2022 - 2023 | Reliable" }),
                ],
                ephemeral: true,
              });

            if (data.MembersID.Includes(member.id))
              return interaction.reply({
                embeds: [
                  embed
                    .setTitle("Error")
                    .setDescription(
                      "> **<:reliable_wrong:1043155193077960764> | Something went wrong! Please make sure to visit `/ticket-guideline`. If you still face this error after completing all the requirements please visit our support server!**"
                    )
                    .setColor("#2F3136")
                    .setFooter({ text: "©2022 - 2023 | Reliable" }),
                ],
                ephemeral: true,
              });

            data.MembersID.push(member.id);

            channel.permissionOverwrites.edit(member.id, {
              sendMessages: false,
              viewChannel: false,
              ReadMessagesHistory: false,
            });

            interaction.reply({
              embeds: [
                embed
                  .setTitle("Ticket - Panel")
                  .setDescription(
                    `> **<:reliable_right:1042843202429919272> | <@${member.id}> || \`${member.tag}\` has been removed to the ticket.**`
                  )
                  .setColor("#2F3136")
                  .setFooter({ text: "©2022 - 2023 | Reliable" }),
              ],
            });

            data.save();
          }
        );

        break;
    }
  },
};
