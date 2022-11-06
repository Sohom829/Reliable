const {
  SlashCommandBuilder,
  EmbedBuilder,
  Embed,
  Colors,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("utility")
    .setDescription("Urility commands.")
    .addSubcommand((sub) =>
      sub
        .setName("avatar")
        .setDescription("Get user avatar")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("mention a user to get avatar")
            .setRequired(false)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("choose")
        .setDescription("I choose something for you")
        .addStringOption((option) =>
          option
            .setName("1st")
            .setDescription("The 1st thing to choose from")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("2nd")
            .setDescription("The 2nd thing to choose from")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("3rd")
            .setDescription("The 3rd thing to choose from")
            .setRequired(false)
        )
        .addStringOption((option) =>
          option
            .setName("4th")
            .setDescription("The 4th thing to choose from")
            .setRequired(false)
        )
        .addStringOption((option) =>
          option
            .setName("5th")
            .setDescription("The 5th thing to choose from")
            .setRequired(false)
        )
        .addStringOption((option) =>
          option
            .setName("6th")
            .setDescription("The 6th thing to choose from")
            .setRequired(false)
        )
        .addStringOption((option) =>
          option
            .setName("7th")
            .setDescription("The 7th thing to choose from")
            .setRequired(false)
        )
        .addStringOption((option) =>
          option
            .setName("8th")
            .setDescription("The 8th thing to choose from")
            .setRequired(false)
        )
        .addStringOption((option) =>
          option
            .setName("9th")
            .setDescription("The 9th thing to choose from")
            .setRequired(false)
        )
        .addStringOption((option) =>
          option
            .setName("10th")
            .setDescription("The 10th thing to choose from")
            .setRequired(false)
        )
    )
    .addSubcommand((sub) =>
      sub.setName("server-icon").setDescription("Get server icon.")
    )
    .addSubcommand((sub) =>
      sub
        .setName("wikipedia")
        .setDescription("Search something in wikipedia.")
        .addStringOption((option) =>
          option
            .setName("article")
            .setDescription("The article you want to know about")
            .setRequired(true)
        )
    ),
  async execute(interaction, client) {
    if (interaction.options.getSubcommand() === "avatar") {
      const { options } = interaction;

      const User = interaction.options.getUser("user");

      const AvatarEmbed = new EmbedBuilder().setColor("#0398fc");
      if (User) {
        AvatarEmbed.setTitle(`${User.tag}'s Avatar`)
          .setFooter({ text: "©2022 | Reliable" })
          .setImage(User.displayAvatarURL({ size: 1024, dynamic: true }));

        const jpgButton = new ButtonBuilder()
          .setLabel(`Avatar Link`)
          .setStyle(ButtonStyle.Link)
          .setURL(
            `${User.displayAvatarURL({
              size: 1024,
              dynamic: true,
              format: "jpg",
            })}`
          );

        return interaction.reply({
          embeds: [AvatarEmbed],
          components: [new ActionRowBuilder().addComponents(jpgButton)],
        });
      } else {
        AvatarEmbed.setTitle(`Your Avatar`)
          .setFooter({ text: "©2022 | Reliable" })
          .setImage(
            interaction.user.displayAvatarURL({ size: 1024, dynamic: true })
          );

        const jpgButton = new ButtonBuilder()
          .setLabel(`Avatar Link`)
          .setStyle(ButtonStyle.Link)
          .setURL(
            `${interaction.user.displayAvatarURL({
              size: 1024,
              dynamic: true,
              format: "jpg",
            })}`
          );

        return interaction.reply({
          embeds: [AvatarEmbed],
          components: [new ActionRowBuilder().addComponents(jpgButton)],
        });
      }
    } else if (interaction.options.getSubcommand() === "choose") {
      const choice1 = interaction.options.getString("1st");
      const choice2 = interaction.options.getString("2nd");
      const choice3 = interaction.options.getString("3rd");
      const choice4 = interaction.options.getString("4th");
      const choice5 = interaction.options.getString("5th");
      const choice6 = interaction.options.getString("6th");
      const choice7 = interaction.options.getString("7th");
      const choice8 = interaction.options.getString("8th");
      const choice9 = interaction.options.getString("9th");
      const choice10 = interaction.options.getString("10th");

      let responsevalues = [choice1, choice2];

      if (choice3) {
        responsevalues.push(choice3);
      }

      if (choice4) {
        responsevalues.push(choice4);
      }

      if (choice5) {
        responsevalues.push(choice5);
      }

      if (choice6) {
        responsevalues.push(choice6);
      }

      if (choice7) {
        responsevalues.push(choice7);
      }

      if (choice8) {
        responsevalues.push(choice8);
      }

      if (choice9) {
        responsevalues.push(choice9);
      }

      if (choice10) {
        responsevalues.push(choice10);
      }

      const response =
        responsevalues[Math.floor(Math.random() * responsevalues.length)];

      await interaction.reply({ content: `> **I Choose \`${response}\`**` });
    } else if (interaction.options.getSubcommand() === "server-icon") {
      const servericon = new EmbedBuilder()
        .setColor("#0398fc")
        .setTitle(`${interaction.guild.name} Icon`)
        .setFooter({ text: "©2022 | Reliable" })
        .setImage(interaction.guild.iconURL({ size: 1024 }));

      const jpgButton = new ButtonBuilder()
        .setLabel(`Icon Link`)
        .setStyle(ButtonStyle.Link)
        .setURL(`${interaction.guild.iconURL({ size: 1024 })}`);

      return interaction.reply({
        embeds: [servericon],
        components: [new ActionRowBuilder().addComponents(jpgButton)],
      });
    } else if (interaction.options.getSubcommand() === "wikipedia") {
      const article = interaction.options.getString("article") || "";
      try {
        fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${article}`)
          .then((res) => res.json())
          .then((json) => {
            const embed = new EmbedBuilder()
              .setThumbnail("https://i.imgur.com/fnhlGh5.png")
              .setTitle(json.title)
              .setDescription(`> ${json.extract}`)
              .setColor("#0398fc")
              .setFooter({ text: "©2022 | Reliable" });

            const button_link = new ButtonBuilder()
              .setLabel(`More Information`)
              .setStyle(ButtonStyle.Link)
              .setEmoji("<:reliable_wikipedia:1038342247260885052>")
              .setURL(`${json.content_urls.desktop.page}`);

            interaction.reply({
              embeds: [embed],
              components: [new ActionRowBuilder().addComponents(button_link)],
            });
          });
      } catch {
        return interaction.reply({
          content: `> **\`Sorry! Seems like the topic you searched was not correct! Please try again later!\`**`,
          ephemeral: true,
        });
      }
    } else {
      interaction.reply({ content: `No sub command choosen` });
    }
  },
};
