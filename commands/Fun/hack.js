const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const ms = require("ms");
const fetch = require("node-fetch");
const generator = require('generate-password');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hack")
    .setDescription("heck someone")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user to heck")
        .setRequired(true)
    ),

  async execute(interaction) {
    const victim = interaction.options.getMember("target");
    const password = generator.generate({
      length: 10,
      symbols: true,
      numbers: true
  });

    const hacked = new EmbedBuilder()
    .setTitle("`💻` | Hacking")
    .setDescription(`> **The hack on \`${victim.displayName}\` started...**`)
    .addFields(
      {
        name: "**`•`** Status",
        value: "**`█▒▒▒▒▒▒▒▒▒`**"
      }
    )
    .setTimestamp()
    .setColor("#2F3136")
    .setFooter({ text: "©2022 - 2023 | Reliable" })
    await interaction.reply({ embeds: [hacked] }).catch((err) => {});
    const time = "1s";
    setTimeout(async function () {
      const hacked = new EmbedBuilder()
      .setTitle("`💻` | Hacking")
      .setDescription(`> **Searching for Discord login...**`)
      .addFields(
        {
          name: "**`•`** Status",
          value: "**`██▒▒▒▒▒▒▒▒`**"
        }
      )
      .setTimestamp()
      .setColor("#2F3136")
      .setFooter({ text: "©2022 - 2023 | Reliable" })
      await interaction.editReply({ embeds: [hacked] }).catch((err) => {}).catch((err) => {});
    }, ms(time));

    const time1 = "6s";
    setTimeout(async function () {
        const hacked = new EmbedBuilder()
        .setTitle("`💻` | Hacking")
        .setDescription(`> **Discord Email Information Found.**`)
        .addFields(
          {
            name: "`📧` | Email",
            value: `> **\`${victim.displayName}@gmail.com\`**`,
            inline: true
          },
          {
            name: "`🔑` | Password",
            value: `> **\`${password}\`**`,
            inline: true
          },
          {
            name: "**`•`** Status",
            value: "**`███▒▒▒▒▒▒▒`**"
          },
        )
        .setTimestamp()
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" })
        await interaction.editReply({ embeds: [hacked] }).catch((err) => {});
    }, ms(time1));

    const time2 = "9s";
    setTimeout(async function () {
        const hacked = new EmbedBuilder()
        .setTitle("`💻` | Hacking")
        .setDescription(`> **Search for Discord token...**`)
        .addFields(
          {
            name: "**`•`** Status",
            value: "**`█████▒▒▒▒▒`**"
          }
        )
        .setTimestamp()
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" })
        await interaction.editReply({ embeds: [hacked] }).catch((err) => {});
    }, ms(time2));

    const time3 = "15s";
    setTimeout(async function () {
      fetch(`https://some-random-api.ml/bottoken?${victim.id}`).then((res) => res.json()).catch({}).then(async (json) => {
        const hacked = new EmbedBuilder()
        .setTitle("`💻` | Hacking")
        .setDescription(`> **The users discord account token was found!**`)
        .addFields(
          {
            name: "`🔧` | Discord Token",
            value: `\`\`\`${json.token}\`\`\``
          },
          {
            name: "**`•`** Status",
            value: "**`██████▒▒▒▒`**"
          }
        )
        .setTimestamp()
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" })
        await interaction.editReply({ embeds: [hacked] }).catch((err) => {});
    })
    }, ms(time3));

    const time4 = "21s";
    setTimeout(async function () {
        const hacked = new EmbedBuilder()
        .setTitle("`💻` | Hacking")
        .setDescription(`> **Searching for IP address..**`)
        .addFields(
          {
            name: "**`•`** Status",
            value: "**`███████▒▒▒`**"
          }
        )
        .setTimestamp()
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" })
        await interaction.editReply({ embeds: [hacked] }).catch((err) => {});
    }, ms(time4));

    const time5 = "28s";
    setTimeout(async function () {
        const hacked = new EmbedBuilder()
        .setTitle("`💻` | Hacking")
        .setDescription(`> **Ip Found!**`)
        .addFields(
          {
            name: "`📻` | Ip Address",
            value: "```127.0.0.1```"
          },
          {
            name: "**`•`** Status",
            value: "**`███████▒▒▒`**"
          }
        )
        .setTimestamp()
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" })
        await interaction.editReply({ embeds: [hacked] }).catch((err) => {});
    }, ms(time5));

    const time6 = "31s";
    setTimeout(async function () {
       const hacked = new EmbedBuilder()
      .setTitle("`💻` | Hacking")
      .setDescription(`> **Collecting Information from \`Educational Folder\`...**`)
      .addFields(
        {
          name: "**`•`** Status",
          value: "**`████████▒▒`**"
        }
      )
      .setTimestamp()
      .setColor("#2F3136")
      .setFooter({ text: "©2022 - 2023 | Reliable" })
      await interaction.editReply({ embeds: [hacked] }).catch((err) => {});
    }, ms(time6));

    const time7 = "38s";
    setTimeout(async function () {
      const hacked = new EmbedBuilder()
      .setTitle("`💻` | Hacking")
      .setDescription(`> **Found! Sending it to parents...**`)
      .addFields(
        {
          name: "**`•`** Status",
          value: "**`█████████▒`**"
        }
      )
      .setTimestamp()
      .setColor("#2F3136")
      .setFooter({ text: "©2022 - 2023 | Reliable" })
      await interaction.editReply({ embeds: [hacked] }).catch((err) => {});
    }, ms(time7));

    const time8 = "41s";
    setTimeout(async function () {
        const hacked = new EmbedBuilder()
        .setTitle("`💻` | Hacked")
        .setDescription(`> **Finished Hacking \`${victim.displayName}\`**`)
        .addFields(
          {
            name: "**`•`** Status",
            value: "**`██████████`**"
          }
        )
        .setTimestamp()
        .setImage("https://miro.medium.com/max/498/0*rAg_eCxAcqYyj1Lc")
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" })
        await interaction.editReply({ embeds: [hacked] }).catch((err) => {});
    }, ms(time8));
  },
};
