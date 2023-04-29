const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
  ChannelType,
} = require("discord.js");
const TicketSetup = require("../../Schemas/TicketSetup");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticketsetup")
    .setDescription("Create a ticket message.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addChannelOption((op) =>
      op
        .setName("channel")
        .setDescription(
          "Select the channel wehere the tickets should be created."
        )
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    )
    .addChannelOption((op) =>
      op
        .setName("category")
        .setDescription(
          "Select the parent of where the tickets should be created."
        )
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildCategory)
    )

    .addChannelOption((op) =>
      op
        .setName("transcripts")
        .setDescription(
          "Select the channel of where the transcripts should be sent."
        )
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildCategory)
    )

    .addRoleOption((op) =>
      op
        .setName("handlers")
        .setDescription("Select the ticket handlers role.")
        .setRequired(true)
    )
    .addRoleOption((op) =>
      op
        .setName("everyone")
        .setDescription("Tag the everyone role.")
        .setRequired(true)
    )
    .addStringOption((op) =>
      op
        .setName("description")
        .setDescription("Set the description for the ticket embed.")
        .setRequired(true)
    )
    .addStringOption((op) =>
      op
        .setName("firstbutton")
        .setDescription("Format: (Name of button,Emoji)")
        .setRequired(true)
    )
    .addStringOption((op) =>
      op
        .setName("secondbutton")
        .setDescription("Format: (Name of button,Emoji)")
        .setRequired(true)
    )
    .addStringOption((op) =>
      op
        .setName("thirdbutton")
        .setDescription("Format: (Name of button,Emoji)")
        .setRequired(true)
    )
    .addStringOption((op) =>
      op
        .setName("forthbutton")
        .setDescription("Format: (Name of button,Emoji)")
        .setRequired(true)
    ),

  async execute(interaction) {
    const { guild, options } = interaction;

    try {
      const channel = options.getChannel("channel");
      const category = options.getChannel("category");
      const transcripts = options.getChannel("channel");

      const handlers = options.getRole("handlers");
      const everyone = options.getRole("everyone");

      const description = options.getString("description");
      const firstbutton = options.getString("firstbutton").split(",");
      const secondbutton = options.getString("secondbutton").split(",");
      const thirdbutton = options.getString("thirdbutton").split(",");
      const forthbutton = options.getString("forthbutton").split(",");

      const emoji1 = firstbutton[1];
      const emoji2 = secondbutton[1];
      const emoji3 = thirdbutton[1];
      const emoji4 = forthbutton[1];

      await TicketSetup.findOneAndUpdate(
        { GuildID: guild.id },
        {
          Channel: channel.id,
          Category: category.id,
          Transcripts: transcripts.id,
          Handlers: handlers.id,
          Everyone: everyone.id,
          Description: description,
          Buttons: [
            firstbutton[0],
            secondbutton[0],
            thirdbutton[0],
            forthbutton[0],
          ],
        },
        {
          name: true,
          upsert: true,
        }
      );

      const button = new ActionRowBuilder().setComponents(
        new ButtonBuilder()
          .setCustomId(firstbutton[0])
          .setLabel(firstbutton[0])
          .setStyle(ButtonStyle.Danger)
          .setEmoji(emoji1),
        new ButtonBuilder()
          .setCustomId(secondbutton[0])
          .setLabel(secondbutton[0])
          .setStyle(ButtonStyle.Secondary)
          .setEmoji(emoji2),
        new ButtonBuilder()
          .setCustomId(thirdbutton[0])
          .setLabel(thirdbutton[0])
          .setStyle(ButtonStyle.Primary)
          .setEmoji(emoji3),
        new ButtonBuilder()
          .setCustomId(forthbutton[0])
          .setLabel(forthbutton[0])
          .setStyle(ButtonStyle.Success)
          .setEmoji(emoji4)
      );

      const embed = new EmbedBuilder()
        .setTitle("Ticket - Panel")
        .setDescription(`${description}`)
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" });

      await guild.channels.cache.get(channel.id).send({
        embeds: [embed],
        components: [button],
      });

      const success = new EmbedBuilder()
        .setTitle("Ticket")
        .setDescription(
          "> **<:reliable_right:1042843202429919272> | Ticket embed has been sent.**"
        )
        .setTimestamp()
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" });

      interaction.reply({ embeds: [success], ephemeral: true });
    } catch (err) {
      console.log(err);
      const err_embed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription(
          "> **<:reliable_wrong:1043155193077960764> | Something went wrong! Please make sure to visit `/ticket-guideline`. If you still face this error after completing all the requirements please visit our support server!**"
        )
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" });
      interaction.reply({ embeds: [err_embed], ephemeral: true });
    }
  },
};
