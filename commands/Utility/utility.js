const {
  SlashCommandBuilder,
  EmbedBuilder,
  Embed,
  Colors,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const math = require("mathjs");
const WomboDream = require("dream-api");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("utility")
    .setDescription("Utility commands.")
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
        .setName("art")
        .setDescription("AI Generated Art")
        .addStringOption((op) =>
          op.setName("query").setDescription("Image Query").setRequired(true)
        )
        .addIntegerOption((op) =>
          op.setName("style").setDescription("Style of Art").setRequired(false)
        )
    )
    .addSubcommand((sub) =>
      sub.setName("iss-location").setDescription("Shows ISS location")
    )
    .addSubcommand((sub) =>
      sub
        .setName("bmi")
        .setDescription("Calculate your BMI Index.")
        .addIntegerOption((op) =>
          op
            .setName("weight")
            .setDescription("Provide your weight in kilograms.")
            .setRequired(true)
        )
        .addIntegerOption((op) =>
          op
            .setName("height")
            .setDescription("Provide your height in centimeters.")
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
    )
    .addSubcommand((sub) =>
      sub
        .setName("calculate")
        .setDescription("Calculate and solve equations")
        .addStringOption((option) =>
          option
            .setName("equation")
            .setDescription(
              "Specify an equation. example: 231+231, 231/2132, 122x242"
            )
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("news")
        .setDescription("Shows top 5 news headlines")
        .addStringOption((option) =>
          option
            .setName("country")
            .setDescription("Specify the country")
            .setRequired(false)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("timer")
        .setDescription("Set a timer")
        .addIntegerOption((option) =>
          option
            .setName("seconds")
            .setDescription("The time in seconds")
            .setMinValue(1)
            .setMaxValue(86400)
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("reminder")
            .setDescription("What to remind you about")
            .setRequired(true)
        )
    ),
  async execute(interaction, client) {
    if (interaction.options.getSubcommand() === "avatar") {
      const { options } = interaction;

      const User = interaction.options.getUser("user");

      const AvatarEmbed = new EmbedBuilder().setColor("#2F3136");
      if (User) {
        AvatarEmbed.setTitle(`${User.tag}'s Avatar`)
          .setFooter({ text: "©2022 - 2023 | Reliable" })
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
          .setFooter({ text: "©2022 - 2023 | Reliable" })
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
        .setColor("#2F3136")
        .setTitle(`${interaction.guild.name} Icon`)
        .setFooter({ text: "©2022 - 2023 | Reliable" })
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
              .setColor("#2F3136")
              .setFooter({ text: "©2022 - 2023 | Reliable" });

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
    } else if (interaction.options.getSubcommand() === "timer") {
      const time = interaction.options.getInteger("seconds");
      const subject = interaction.options.getString("reminder");
      const milliseconds = time * 1000;

      const createdEmbed = new EmbedBuilder()
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" })
        .setTimestamp()
        .setTitle("Timer Set")
        .setAuthor({
          name: `${interaction.member.user.tag}'s Timer ⏱️`,
          iconURL: interaction.member.displayAvatarURL({
            size: 4096,
            dynamic: true,
          }),
        })
        .addFields(
          {
            name: "**`•`** Remind You About",
            value: `> **\`${subject}\`**`,
            inline: true,
          },
          {
            name: "**`•`** Time Set to",
            value: `> **\`${time} seconds\`**`,
            inline: true,
          }
        );
      await interaction.reply({
        embeds: [createdEmbed],
      });

      const doneEmbed = new EmbedBuilder()
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" })
        .setTitle("Timer Up!")
        .setAuthor({
          name: `${interaction.member.user.tag}'s Timer ⏱️`,
          iconURL: interaction.member.displayAvatarURL({
            size: 4096,
            dynamic: true,
          }),
        })
        .addFields(
          {
            name: "**`•`** Reminded about",
            value: `> **\`${subject}\`**`,
            inline: true,
          },
          {
            name: "**`•`** Time was set to",
            value: `> **\`${time} seconds\`**`,
            inline: true,
          }
        )
        .setTimestamp();

      setTimeout(async () => {
        await interaction
          .editReply({
            embeds: [doneEmbed],
            content: `<@${interaction.member.id}>`,
          })
          .catch((err) => {
            return;
          });
      }, milliseconds);
    } else if (interaction.options.getSubcommand() === "calculate") {
      const equation = interaction.options.getString("equation");
      const answer = math.evaluate(equation);

      try {
        const embed = new EmbedBuilder()
          .setTitle("Equation Solved")
          .addFields(
            {
              name: "**`•`** Equation",
              value: `> \`${equation}\`**`,
            },
            {
              name: "**`•`** Answer",
              value: `**\`${answer}\`**`,
            }
          )
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setTimestamp();

        interaction.reply({ embeds: [embed] });
      } catch (err) {
        const err_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription(
            "The provided equation has some issues! Please [click here](https://www.rapidtables.com/math/symbols/Basic_Math_Symbols.html) to learn more!"
          )
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setTimestamp();
      }
    } else if (interaction.options.getSubcommand() === "iss-location") {
      fetch("http://api.open-notify.org/iss-now.json")
        .then((res) => res.json())
        .then((out) => {
          var iss_info = out;
          var position = iss_info["iss_position"];
          var latitude = position["latitude"];
          var longitude = position["longitude"];

          const Embed = new EmbedBuilder()
            .setTitle("International Space Station Location")
            .setColor("#2F3136")
            .addFields(
              {
                name: "**`•`** Latitude",
                value: `> **\`${latitude}\`**`,
                inline: true,
              },
              {
                name: "**`•`** Longitude",
                value: `> **\`${longitude}\`**`,
                inline: true,
              }
            )
            .setImage(
              `http://c.files.bbci.co.uk/8C58/production/_115182953_issspaceindexsml.jpg`
            )
            .setFooter({ text: "©2022 - 2023 | Reliable" })
            .setTimestamp();
          interaction.reply({ embeds: [Embed] });
        });
    } else if (interaction.options.getSubcommand() === "art") {
      try {
        const query = interaction.options.getString("query");
        const sty = interaction.options.getInteger("style");

        const GetStyle = await fetch(
          "https://paint.api.wombo.ai/api/styles/"
        ).then((res) => res.json());
        const style = GetStyle.map((style) => {
          return {
            id: style.id,
            name: style.name,
          };
        });

        if (!sty) {
          const style_embed = new EmbedBuilder()
            .setTitle("Style List")
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" })
            .setTimestamp()
            .setDescription(
              "> **Please specify a style, and re-run the command with the style number!**"
            )
            .addFields({
              name: "Styles",
              value: style
                .map((style) => `\`${style.id}\` = \`${style.name}\``)
                .join("\n"),
            });
           interaction.reply({ embeds: [style_embed], ephemeral: true });
        }

        const embed = new EmbedBuilder()
          .setTitle("Generating")
          .addFields(
            {
              name: "**`•`** Query",
              value: `> **\`${query}\`**`,
              inline: true,
            },
            {
              name: "**`•`** Status",
              value: `> **\`Generating Your Image\`**`,
              inline: true,
            }
          )
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setTimestamp();
         interaction.reply({ embeds: [embed] });

        styName = " ";
        for (let i = 0; i < GetStyle.length; i++) {
          if (sty == GetStyle[i].id) {
            styName = GetStyle[i].name;
          }
        }

        let image = await WomboDream.generateImage(sty, query);

        console.log(query);
        console.log(sty);
        console.log(interaction.guild.name);

        const Embed = new EmbedBuilder()
          .setTimestamp()
          .setImage(image.result.final)
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setTitle(`Generated Successfully`)
          .addFields(
            {
              name: "**`•`** Requested Art",
              value: `> **\`${query.toUpperCase()}\`**`,
              inline: true,
            },
            {
              name: "**`•`** Style",
              value: `> **\`${styName.toUpperCase()}\`**`,
              inline: true,
            }
          );
        interaction.editReply({ embeds: [Embed] });
      } catch (err) {
        console.log(err)
        const err_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription("**❌ | Something went wrong. You must check styles!**")
          .setTimestamp()
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" });

        interaction.reply({ embeds: [err_embed], ephemeral: true });
      }
    } else if (interaction.options.getSubcommand() === "news") {
      try {
        const country = interaction.options.getString("country");

        if (!country) {
          const optionembed = new EmbedBuilder()
            .setTitle("Error")
            .addFields({
              name: "**`•`** Country Options",
              value: "**❌ | Put correct country (ex: Belgium or BE)**",
            })
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" })
            .setTimestamp();

          interaction.reply({ embeds: [optionembed], ephemeral: true });
        }
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=5&apiKey=7a11772cc0a2412a8764ac62155c4612`
        );
        const json = await response.json();
        const articleArr = json.articles;
        let processArticle = (article) => {
          const embed = new EmbedBuilder()
            .setTitle(article.title)
            .setDescription(
              `> **${article.description || "No Description Found!"}**`
            )
            .setImage(article.urlToImage)
            .setURL(article.url)
            .setTimestamp()
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" });
          return embed;
        };
        async function processArray(array) {
          for (const article of array) {
            const msg = await processArticle(article);
            interaction.channel.send({ embeds: [msg] });
          }
        }
        await processArray(articleArr);
      } catch (e) {
        console.log(e);
      }
    } else if (interaction.options.getSubcommand() === "bmi") {
      try {
        const weight = interaction.options.getInteger("weight");
        const height = interaction.options.getInteger("height");

        if (weight < 50 || weight > 600)
          return interaction.reply(
            "Weight cannot be less than 50 kilograms or cannot exceed 600 kilograms."
          );
        if (height < 50 || height > 275)
          return interaction.reply(
            "Height cannot be less than 50 centimeters or more than 275 meters."
          );

        const bmi = (weight / ((height * height) / 10000)).toFixed(2);
        let category;
        if (bmi < 18.5) category = "🍉 | Underweight";
        if (bmi > 24.9) category = "🏋️| Overweight";
        if (bmi > 30) category = "🦸‍♂️ | Obesity";
        if (bmi < 24.9 && bmi > 18.5) category = "🤗 | Normal";
        const embed = new EmbedBuilder()
          .setTitle("BMI")
          .addFields(
            {
              name: "**`•`** Weight",
              value: `> **\`${weight}\`**`,
              inline: true,
            },
            {
              name: "**`•`** Height",
              value: `> **\`${height}\`**`,
              inline: true,
            },
            {
              name: "**`•`** BMI",
              value: `> **\`${bmi}\`**`,
              inline: true,
            },
            {
              name: "**`•`** Category",
              value: `> **\`${category}\`**`,
              inline: true,
            }
          )
          .setTimestamp()
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" });

        interaction.reply({ embeds: [embed] });
      } catch (err) {
        const err_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription("**❌ | Invalid values were provided.**")
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setTimestamp();

        interaction.reply({ embeds: [err_embed], ephemeral: true });
      }
    } else {
      interaction.reply({ content: `No sub command choosen` });
    }
  },
};
