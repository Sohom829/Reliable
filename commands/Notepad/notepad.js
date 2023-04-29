const {
    SlashCommandBuilder,
    EmbedBuilder,
    Embed,
    Colors,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require("discord.js");
  const Schema = require('../../Schemas/notes')
  const generator = require('generate-password');

  module.exports = {
    data: new SlashCommandBuilder()
      .setName("notepad")
      .setDescription("Notepad commands.")
      .addSubcommand((sub) =>
        sub
                .setName('add')
                .setDescription('Add a note to your notepad')
                .addStringOption(option => option.setName('note').setDescription('Your note').setRequired(true))
        )
        .addSubcommand((sub) =>
        sub
                .setName('delete')
                .setDescription('Delete a note from your notepad')
                .addStringOption(option => option.setName('id').setDescription('Note id').setRequired(true))
        )
        .addSubcommand((sub) =>
        sub
                .setName('edit')
                .setDescription('Edit a note from your notepad')
                .addStringOption(option => option.setName('id').setDescription('Note id').setRequired(true))
                .addStringOption(option => option.setName('note').setDescription('New note').setRequired(true))
        )
        .addSubcommand((sub) =>
        sub
                .setName('notes')
                .setDescription('Show all your notes')
                .addBooleanOption(option =>
                    option.setName('ephemeral')
                        .setDescription('Whether or not the notes should be hidden or not?'))
        ),

      async execute(interaction, client) {
        if (interaction.options.getSubcommand() === "add") {

            const code = generator.generate({
                length: 4,
                lowercase: false,
                uppercase: false,
                numbers: true
            });
         let note = interaction.options.getString('note');
         Schema.findOne({ Guild: interaction.guild.id, Code: code }, async (err, data) => {
            if (!data) {
                new Schema({
                    Guild: interaction.guild.id,
                    User: interaction.user.id,
                    Code: code,
                    Note: note
                }).save();
                const addembed = new EmbedBuilder()
            .setTitle("Notepad - Added")
            .setDescription("**<:reliable_right:1042843202429919272> | Note has been added! \`/notepad notes\` to see all your notes**")
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

            interaction.reply({ embeds: [addembed], components: [topgg], ephemeral: true })
            }
        })  
  } else if (interaction.options.getSubcommand() === "delete") {

    let id = interaction.options.getString('id');
    Schema.findOne({ Guild: interaction.guild.id, Code: id }, async (err, data) => {
        if (data) {
            Schema.findOneAndDelete({ Guild: interaction.guild.id, Code: id }).then(() => {
                const afkembed = new EmbedBuilder()
                .setTitle("Notepad - Deleted")
                .setDescription(`**<:reliable_right:1042843202429919272> | Note \`(#${id})\` has been deleted!**`)
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
            })
        }
        else {
            const err_embed = new EmbedBuilder()
            .setTitle("Error")
            .setDescription(
              `**<:reliable_wrong:1043155193077960764> | No note found with the id \`(#${id})\`.**`
            )
            .setTimestamp()
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" });

            return interaction.reply({ embeds: [err_embed], ephemeral: true });
        }
    })
   } else if (interaction.options.getSubcommand() === "edit") {
    let id = interaction.options.getString('id');
    let note = interaction.options.getString('note');

    Schema.findOne({ Guild: interaction.guild.id, Code: id }, async (err, data) => {
        if (data) {
            data.Note = note
            data.save();
            const afkembed = new EmbedBuilder()
            .setTitle("Notepad - Edited")
            .setDescription("**<:reliable_right:1042843202429919272> | Note has been edited!**")
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
        }
        else {
            const err_embed = new EmbedBuilder()
            .setTitle("Error")
            .setDescription(
              `**<:reliable_wrong:1043155193077960764> | No note found!**`
            )
            .setTimestamp()
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" });

            return interaction.reply({ embeds: [err_embed], ephemeral: true });
        }
    })

} else if (interaction.options.getSubcommand() === "notes") {
    const boolean = interaction.options.getBoolean('ephemeral');
    const rawboard = await Schema.find({ Guild: interaction.guild.id, User: interaction.user.id })
    if (rawboard.length < 1) {
        const err_embed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription(
          "**<:reliable_wrong:1043155193077960764> | No notes found!**"
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

    const lb = rawboard.map(e => `**\`•\` Note ID:** **\`(#${e.Code})\`**\n\`\`\`${e.Note}\`\`\`\n`);
    const embed = new EmbedBuilder()
    .setTitle(`\`📓\` | Notes - ${interaction.user.username}`)
    .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
    .setDescription(`${lb}`)
    .setTimestamp()
    .setColor("#2F3136")
    .setFooter({ text: "©2022 - 2023 | Reliable" });
    if (boolean == true) {
        await interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
        await interaction.reply({ embeds: [embed] });
        }
}
 }
}