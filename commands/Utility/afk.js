const {
    SlashCommandBuilder,
    EmbedBuilder,
    Embed,
    Colors,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require("discord.js");
  const Schema = require('../../Schemas/afk')

  module.exports = {
    data: new SlashCommandBuilder()
      .setName("afk")
      .setDescription("AFK commands.")
      .addSubcommand((sub) =>
        sub
          .setName("set")
          .setDescription("Set an AFK status.")
          .addStringOption((option) =>
            option
              .setName("reason")
              .setDescription("Reason behind why your afk.")
              .setRequired(false)
          )
      )
      .addSubcommand((sub) =>
        sub
          .setName("remove")
          .setDescription("Remove an AFK status.")
      )
      .addSubcommand((sub) =>
        sub
          .setName("list")
          .setDescription("List AFK members")
      ),
      async execute(interaction, client) {
        if (interaction.options.getSubcommand() === "set") {
       const reason = interaction.options.getString('reason') || `Not specified`;

       Schema.findOne({ Guild: interaction.guild.id, User: interaction.user.id }, async (err, data) => {
        if (data) {
            const err_embed = new EmbedBuilder()
            .setTitle("Error")
            .setDescription(
              "**<:reliable_wrong:1043155193077960764> | You're already afk!**"
            )
            .setTimestamp()
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" });

            return interaction.reply({ embeds: [err_embed], ephemeral: true });
        }
        else {
            new Schema({
                Guild: interaction.guild.id,
                User: interaction.user.id,
                Message: reason
            }).save();
 
            const afkembed = new EmbedBuilder()
            .setTitle("AFK - ON")
            .setDescription("**<:reliable_right:1042843202429919272> | Your AFK has been set up successfully**")
            .setTimestamp()
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" });

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

            interaction.reply({ embeds: [afkembed], components: [topgg], ephemeral: true })

            const afkeverytone = new EmbedBuilder()
            .setTitle("AFK - User")
            .setDescription(`> **${interaction.user}** **\`is now afk!\`**`)
            .addFields(
                {
                    name: "**`•`** Reason",
                    value: `\`\`\`${reason}\`\`\``
                }
            )
            .setTimestamp()
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" });

            return interaction.channel.send({ embeds: [afkeverytone] })

        }
    })
  } else if (interaction.options.getSubcommand() === "list") {

    const rawboard = await Schema.find({ Guild: interaction.guild.id })

    if (rawboard.length < 1) { 
        const err_embed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription(
          "**<:reliable_wrong:1043155193077960764> | No data found!**"
        )
        .setTimestamp()
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" });

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

        return interaction.reply({ embeds: [err_embed], components: [topgg], ephemeral: true });
    }

    const lb = rawboard.map(e => `<@!${e.User}> - **Reason** **\`${e.Message}\`**\n`);

    const embed = new EmbedBuilder()
    .setTitle(`🚫 | AFK users - ${interaction.guild.name}`)
    .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
    .setDescription(`${lb}`)
    .setTimestamp()
    .setColor("#2F3136")
    .setFooter({ text: "©2022 - 2023 | Reliable" });


    await interaction.reply({ embeds: [embed] });

   } else if (interaction.options.getSubcommand() === "remove") {

    Schema.findOne({ Guild: interaction.guild.id, User: interaction.user.id }, async (err, data) => {
        if (!data) {
            const err_embed = new EmbedBuilder()
            .setTitle("Error")
            .setDescription(
              "**<:reliable_wrong:1043155193077960764> | Your not AFK**"
            )
            .setTimestamp()
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" });

            return interaction.reply({ embeds: [err_embed], ephemeral: true });
            } else {
                Schema.findOneAndDelete({ Guild: interaction.guild.id, User: interaction.user.id }).then(() => {
                    const afkembed = new EmbedBuilder()
                    .setTitle("AFK - OFF")
                    .setDescription("**<:reliable_right:1042843202429919272> | Your AFK has been removed successfully**")
                    .setTimestamp()
                    .setColor("#2F3136")
                    .setFooter({ text: "©2022 - 2023 | Reliable" });
        
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

                    interaction.reply({ embeds: [afkembed], components: [topgg], ephemeral: true })
        
        
                const afkeverytone = new EmbedBuilder()
                .setTitle("AFK - User")
                .setDescription(`> **${interaction.user}** **\`is no longer afk!\`**`)
                .setTimestamp()
                .setColor("#2F3136")
                .setFooter({ text: "©2022 - 2023 | Reliable" });
        
                   interaction.channel.send({ embeds: [afkeverytone] })
                })
            }
        })
  }
 }
}