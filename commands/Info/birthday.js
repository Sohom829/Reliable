const {
    SlashCommandBuilder,
    EmbedBuilder,
    Embed,
    Colors,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require("discord.js");
  const Schema = require('../../Schemas/birthday')

  module.exports = {
    data: new SlashCommandBuilder()
      .setName("birthday")
      .setDescription("BirthDay commands.")
      .addSubcommand((sub) =>
        sub
        .setName('set')
        .setDescription('Set your birthday')
          .addIntegerOption((option) =>
            option
              .setName("day")
              .setDescription("The day number that is your birthday.")
              .setRequired(true)
          )
          .addIntegerOption((option) =>
            option
              .setName("month")
              .setDescription("The month number that is your birthday.")
              .setRequired(true)
          ),
      )
      .addSubcommand((sub) =>
        sub
        .setName('check')
        .setDescription('Check your birthday')
      )
      .addSubcommand((sub) =>
        sub
        .setName('delete')
        .setDescription('Delete your birthday')
      )
      .addSubcommand((sub) =>
        sub
        .setName('list')
        .setDescription('Get to see all birthdays')
      ),
      async execute(interaction, client) {
        if (interaction.options.getSubcommand() === "set") {

            const months = {
                1: "January",
                2: "February",
                3: "March",
                4: "April",
                5: "May",
                6: "June",
                7: "July",
                8: "August",
                9: "September",
                10: "October",
                11: "November",
                12: "December"
            };
        
            const day = interaction.options.getInteger('day');
            const month = interaction.options.getInteger('month');
        
            if (!day || day > 31) {
                const err_embed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription(
                  "**<:reliable_wrong:1043155193077960764> | Wrong day format!**"
                )
                .setTimestamp()
                .setColor("#2F3136")
                .setFooter({ text: "©2022 - 2023 | Reliable" });
    
                return interaction.reply({ embeds: [err_embed], ephemeral: true });
            }
        
            if (!month || month > 12) {
                const err_embed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription(
                  "**<:reliable_wrong:1043155193077960764> | Wrong month format!**"
                )
                .setTimestamp()
                .setColor("#2F3136")
                .setFooter({ text: "©2022 - 2023 | Reliable" });
    
                return interaction.reply({ embeds: [err_embed], ephemeral: true });
            }
        
            const convertedDay = suffixes(day);
            const convertedMonth = months[month];
            const birthdayString = `${convertedDay} of ${convertedMonth}`;

            Schema.findOne({ Guild: interaction.guild.id, User: interaction.user.id }, async (err, data) => {
                if (data) {
                    data.Birthday = birthdayString;
                    data.save();
                }
                else {
                    new Schema({
                        Guild: interaction.guild.id,
                        User: interaction.user.id,
                        Birthday: birthdayString
                    }).save();
                }
            })
            const embed = new EmbedBuilder()
            .setTitle("Birthday - Setup")
            .setDescription(
              "**<:reliable_right:1042843202429919272> | Birthday has been set successfully**"
            )
            .setTimestamp()
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" });

             interaction.reply({ embeds: [embed] });
        
        function suffixes(number) {
            const converted = number.toString();
        
            const lastChar = converted.charAt(converted.length - 1);
        
            return lastChar == "1" ?
                `${converted}st` : lastChar == "2" ?
                    `${converted}nd` : lastChar == '3'
                        ? `${converted}rd` : `${converted}th`
        }

  } else if (interaction.options.getSubcommand() === "list") {

    const rawBirthdayboard = await Schema.find({ Guild: interaction.guild.id })

    if (rawBirthdayboard.length < 1) { 
        const err_embed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription(
          "**<:reliable_wrong:1043155193077960764> | No Birthdays found!**"
        )
        .setTimestamp()
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

      interaction.reply({ embeds: [err_embed], components: [topgg], ephemeral: true });
        } else {

        const lb = rawBirthdayboard.map(e => `**<@!${e.User}>** - **\`${e.Birthday}\`** `);
        const embed = new EmbedBuilder()
        .setTitle(`🎂 | Birthdays - ${interaction.guild.name}`)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setDescription(`${lb}`)
        .setTimestamp()
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" });
    
    
        await interaction.reply({ embeds: [embed] });
    }

   } else if (interaction.options.getSubcommand() === "check") {

    Schema.findOne({ Guild: interaction.guild.id, User: interaction.user.id }, async (err, data) => {
        if (!data) {
            const err_embed = new EmbedBuilder()
            .setTitle("Error")
            .setDescription(
              "**<:reliable_wrong:1043155193077960764> | No birthday found!**"
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


            return interaction.reply({ embeds: [err_embed], components: [topgg], ephemeral: true })
            } else {
                const afkeverytone = new EmbedBuilder()
                .setTitle("Birthday - Check")
                .setDescription(`> **${interaction.user.username}** **\`Birthday is on\`**`)
                .addFields(
                    {
                        name: "**`•`** Birthday Date",
                        value: `**\`${data.Birthday}\`**`
                    }
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

                interaction.reply({ embeds: [afkeverytone], components: [topgg] })
                
            }
        })
    } else if (interaction.options.getSubcommand() === "delete") {

        Schema.findOne({ Guild: interaction.guild.id, User: interaction.user.id }, async (err, data) => {
            if (!data) {
                const err_embed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription(
                  "**<:reliable_wrong:1043155193077960764> | No birthday found!**"
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
    
    
                return interaction.reply({ embeds: [err_embed], components: [topgg], ephemeral: true })
            }
    
            Schema.findOneAndDelete({ Guild: interaction.guild.id, User: interaction.user.id }).then(() => {
                const embed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription(
                  "**<:reliable_right:1042843202429919272> | Deleted your birthday**"
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

         return interaction.reply({ embeds: [embed], components: [topgg] })
            })
        })

    }
 }
}