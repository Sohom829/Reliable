const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  AttachmentBuilder,
  ActionRowBuilder,
} = require("discord.js");
const fetch = require("node-fetch");
const Canvacord = require("canvacord");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("image")
    .setDescription("Get all image commands")
    .addSubcommand((sub) =>
    sub
      .setName("first-time")
      .setDescription("First time dude?")
      .addUserOption((op) =>
        op
          .setName("target")
          .setDescription("Select the target")
          .setRequired(true)
      )
  )
  .addSubcommand((sub) =>
    sub
      .setName("grave")
      .setDescription("💀 Grave someone.")
      .addUserOption((op) =>
        op
          .setName("target")
          .setDescription("Select the target")
          .setRequired(true)
      )
  )
  .addSubcommand((sub) =>
    sub
      .setName("heaven")
      .setDescription("Returns heaven.")
      .addUserOption((op) =>
        op
          .setName("target")
          .setDescription("Select the target")
          .setRequired(true)
      )
  )
  .addSubcommand((sub) =>
    sub
      .setName("kill")
      .setDescription("kill anybody but in discord")
      .addUserOption((op) =>
        op
          .setName("target")
          .setDescription("Select the target")
          .setRequired(true)
      )
  )
  .addSubcommand((sub) =>
    sub
      .setName("distract")
      .setDescription("Distracted Dude")
      .addUserOption((op) =>
        op
          .setName("target")
          .setDescription("Select the target")
          .setRequired(true)
      )
      .addUserOption((op) =>
        op
          .setName("target-2")
          .setDescription("Select the second target")
          .setRequired(true)
      )
  )
  .addSubcommand((sub) =>
    sub
      .setName("emergency-meeting")
      .setDescription("Emergency! Mayday!")
      .addStringOption((op) =>
        op
          .setName("reason")
          .setDescription("Mention the reason")
          .setRequired(true)
      )
  )
  .addSubcommand((sub) =>
    sub
      .setName("slap")
      .setDescription("Return A Slap Image!")
      .addUserOption((op) =>
        op
          .setName("target")
          .setDescription("Select the target")
          .setRequired(true)
      )
      .addStringOption((op) =>
        op
          .setName("text")
          .setDescription("What you are slapping him?")
          .setRequired(true)
      )
  )
  .addSubcommand((sub) =>
    sub
      .setName("jail")
      .setDescription("Jail anyone!")
      .addUserOption((op) =>
        op
          .setName("target")
          .setDescription("Select the target")
          .setRequired(true)
      )
  ),

    async execute(interaction) {

   if (interaction.options.getSubcommand() === "distract") {
      const user =
        interaction.options.getUser("target") ||
        "Well, you know what you are doing..";
      const user2 =
        interaction.options.getUser("target-2") ||
        "Well, you know what you are doing..";
      const Embed = new EmbedBuilder()
        .setTitle("Dude watch out")
        .setColor("#2F3136")
        .setImage(
          `https://vacefron.nl/api/distractedbf?&boyfriend=${interaction.user.displayAvatarURL(
            { format: "png" }
          )}&woman=${user2.displayAvatarURL()}&girlfriend=${user.displayAvatarURL(
            { format: "png" }
          )}`
        )
        .setFooter({ text: "©2022 - 2023 | Reliable" })
        .setTimestamp();
      interaction.reply({ embeds: [Embed] });
  } else if (interaction.options.getSubcommand() === "grave") {
      const user = interaction.options.getUser("target") || "";

      const Embed = new EmbedBuilder()
        .setTitle("Rest in peace.")
        .setColor("#2F3136")
        .setImage(
          `https://vacefron.nl/api/grave?&user=${user.displayAvatarURL({
            format: "png",
          })}`
        )
        .setFooter({ text: "©2022 - 2023 | Reliable" })
        .setTimestamp();
      interaction.reply({ embeds: [Embed] });
    } else if (interaction.options.getSubcommand() === "heaven") {
      const user = interaction.options.getUser("target") || "";

      const Embed = new EmbedBuilder()
        .setTitle("I love heaven!")
        .setColor("#2F3136")
        .setImage(
          `https://vacefron.nl/api/heaven?&user=${user.displayAvatarURL({
            format: "png",
          })}`
        )
        .setFooter({ text: "©2022 - 2023 | Reliable" })
        .setTimestamp();
      interaction.reply({ embeds: [Embed] });
    } else if (interaction.options.getSubcommand() === "jail") {
      const user =
        interaction.options.getMember("target") || interaction.member;
      let avatar = user.displayAvatarURL({ dynamic: true, format: "png" });
      let image = await Canvacord.Canvas.jail(avatar);
      let attachment = new AttachmentBuilder(image, { name: "jail.png" });

      interaction.reply({
        files: [attachment],
      });
  } else if (interaction.options.getSubcommand() === "emergency-meeting") {
      const txt = interaction.options.getString("reason") || "";

      const Embed = new EmbedBuilder()
        .setTitle("Emergency Meeting")
        .setColor("#2F3136")
        .setImage(`https://vacefron.nl/api/emergencymeeting?&text=${txt}`)
        .setFooter({ text: "©2022 - 2023 | Reliable" })
        .setTimestamp();
      interaction.reply({ embeds: [Embed] });
  } else if (interaction.options.getSubcommand() === "kill") {
      let killed =
        interaction.options.getMember("target") || interaction.member;

      const killgif = [
        "https://nekocdn.com/images/fA_3CqGmB.gif",
        "https://nekocdn.com/images/HNnrdYke.gif",
        "https://nekocdn.com/images/Tiqu_jxP.gif",
        "https://nekocdn.com/images/Tiqu_jxP.gif",
        "https://nekocdn.com/images/512X1rBhh.gif",
        "https://nekocdn.com/images/GS63a0Pu.gif",
        "https://nekocdn.com/images/WA_K5JBL.gif",
        "https://nekocdn.com/images/NZ7EEI0MJ.gif",
        "https://nekocdn.com/images/GinvSokV.gif",
        "https://nekocdn.com/images/7Q9dBd_a.gif",
        "https://cdn.discordapp.com/attachments/1029807885116506122/1033328186437664818/tenor.gif",
      ];

      let kill2 = killgif[Math.floor(Math.random() * killgif.length)];

      const kill = new EmbedBuilder()
        .setTitle("Omg, You killed someone!")
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" })
        .setImage(`${kill2}`)
        .setDescription(`You killed ${killed}`);

      await interaction.reply({ embeds: [kill] });
  } else if (interaction.options.getSubcommand() === "nuke") {
      const nuke = new EmbedBuilder()
        .setTitle("Nuked the server uhhh")
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" })
        .setImage(
          "https://cdn.discordapp.com/attachments/1029807885116506122/1033330807026233465/explosion-boom.gif"
        );

      await interaction.reply({ embeds: [nuke] });
  } else if (interaction.options.getSubcommand() === "slap") {
      const user =
        interaction.options.getUser("target") ||
        "You cannot slap yourself unless your a stupid boi :)";

      const reason = interaction.options.getString("text") || "Don't Be Gay";

      const Embed = new EmbedBuilder()
        .setTitle("Dudes slapping each other.")
        .setColor("#2F3136")
        .setImage(
          `https://vacefron.nl/api/batmanslap?text1=Why+Man?&text2=${reason}&batman=${interaction.user.displayAvatarURL(
            { format: "png" }
          )}&robin=${user.displayAvatarURL({ format: "png" })}`
        )
        .setFooter({ text: "©2022 - 2023 | Reliable" })
        .setTimestamp();
      interaction.reply({ embeds: [Embed] });
  } else if (interaction.options.getSubcommand() === "first-time") {
      const user = interaction.options.getUser("target") || "";

      const Embed = new EmbedBuilder()
        .setTitle("First Time...")
        .setColor("#2F3136")
        .setImage(
          `https://vacefron.nl/api/firsttime?&user=${user.displayAvatarURL({
            format: "png",
          })}`
        );
      } else {
          interaction.reply({ content: "No sub command choosed"})
      }
    }
  }