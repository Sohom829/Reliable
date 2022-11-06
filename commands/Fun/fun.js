const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Embed,
  Colors,
  ActionRowBuilder,
} = require("discord.js");
const fetch = require("node-fetch");
const Canvacord = require("canvacord");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fun")
    .setDescription("Get all fun commands")
    .addSubcommand((sub) =>
      sub.setName("bird-fact").setDescription("Generate a random bird facts")
    )
    .addSubcommand((sub) =>
      sub.setName("cat-fact").setDescription("Generate a random cat facts")
    )
    .addSubcommand((sub) =>
      sub
        .setName("date-facts")
        .setDescription("Get a fact about a date")
        .addIntegerOption((op) =>
          op.setName("month").setDescription("Type the month").setRequired(true)
        )
        .addIntegerOption((op) =>
          op.setName("date").setDescription("Type the date").setRequired(true)
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
        .setName("eject")
        .setDescription("☢ Eject some from spaceship.")
        .addUserOption((op) =>
          op
            .setName("target")
            .setDescription("Select the target")
            .setRequired(true)
        )
        .addStringOption((op) =>
          op
            .setName("crewmate")
            .setDescription("Type the color (hex not supported)")
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("emergency-meeting")
        .setDescription("Emergency! Mayday!")
        .addUserOption((op) =>
          op
            .setName("target")
            .setDescription("Select the target")
            .setRequired(true)
        )
    )
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
        .setName("jail")
        .setDescription("Jail anyone!")
        .addUserOption((op) =>
          op
            .setName("target")
            .setDescription("Select the target")
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub.setName("joke").setDescription("Generate a random jokes")
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
        .setName("lyrics")
        .setDescription("Gets you any music lyrics")
        .addStringOption((op) =>
          op
            .setName("song")
            .setDescription("Provide a music to request content from.")
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub.setName("meme").setDescription("Generate some memes")
    )
    .addSubcommand((sub) =>
      sub.setName("nuke").setDescription("nuke a server (FAKE) !")
    )
    .addSubcommand((sub) =>
      sub.setName("quotes").setDescription("Sends random quotes")
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
        .setName("year-facts")
        .setDescription("Get a fact about a year")
        .addStringOption((op) =>
          op
            .setName("year")
            .setDescription("Provide the year")
            .setRequired(true)
        )
    ),

  async execute(interaction, client) {
    if (interaction.options.getSubcommand() === "bird-fact") {
      fetch("https://some-random-api.ml/animal/bird")
        .then((res) => res.json())
        .then((json) => {
          const embed = new EmbedBuilder()
            .setTitle("BirdFact")
            .setImage(json.image)
            .addFields({
              name: "Did you know?",
              value: `> ${json.fact}`,
              inline: false,
            })
            .setColor("#0398fc")
            .setFooter({ text: "©2022 | Reliable" });

          interaction.reply({ embeds: [embed] });
        });
    } else if (interaction.options.getSubcommand() === "cat-fact") {
      fetch("https://some-random-api.ml/animal/cat")
        .then((res) => res.json())
        .then((json) => {
          const embed = new EmbedBuilder()
            .setTitle("Cat Fact")
            .addFields({
              name: "Did you know?",
              value: `> ${json.fact}`,
              inline: false,
            })
            .setColor("#0398fc")
            .setFooter({ text: "©2022 | Reliable" })
            .setImage(json.image);

          interaction.reply({ embeds: [embed] });
        });
    } else if (interaction.options.getSubcommand() === "date-facts") {
      let months = interaction.options.getInteger("month") || "";
      let dates = interaction.options.getInteger("date") || "";

      const text = await fetch(
        `http://numbersapi.com/${months}/${dates}/date`
      ).then((res) => res.text());
      const embed = new EmbedBuilder()
        .setTitle("Date Facts")
        .addFields({
          name: "Did you know?",
          value: `> ${text}`,
          inline: false,
        })
        .setColor("#0398fc")
        .setFooter({ text: "©2022 | Reliable" });

      interaction.reply({ embeds: [embed] });
    } else if (interaction.options.getSubcommand() === "distract") {
      const reliable =
        "https://cdn.discordapp.com/avatars/1030870443005071512/afdcde77520cb0d05ced9e77cfd415b7.webp?size=1024";
      const user =
        interaction.options.getUser("target") ||
        "Well, you know what you are doing..";
      const user2 =
        interaction.options.getUser("target-2") ||
        "Well, you know what you are doing..";
      const Embed = new EmbedBuilder()
        .setTitle("Dude watch out")
        .setColor("#0398fc")
        .setImage(
          `https://vacefron.nl/api/distractedbf?&boyfriend=${interaction.user.displayAvatarURL(
            { format: "png" }
          )}&woman=${user2.displayAvatarURL()}&girlfriend=${user.displayAvatarURL(
            { format: "png" }
          )}`
        )
        .setFooter({ text: "©2022 | Reliable" })
        .setTimestamp();
      interaction.reply({ embeds: [Embed] });
    } else if (interaction.options.getSubcommand() === "eject") {
      const user = interaction.options.getUser("target") || interaction.user;
      const color = interaction.options.getString("crewmate") || "";

      const Embed = new EmbedBuilder()
        .setTitle("Ejected")
        .setColor("#0398fc")
        .setImage(
          `https://vacefron.nl/api/ejected?&name=${user.username}&imposter=YES&crewmate=${color}`
        )
        .setFooter({ text: "©2022 | Reliable" })
        .setTimestamp();
      interaction.reply({ embeds: [Embed] });
    } else if (interaction.options.getSubcommand() === "emergency-meeting") {
      const txt = interaction.options.getString("reason") || "";

      const Embed = new EmbedBuilder()
        .setTitle("Emergency Meeting")
        .setColor("#0398fc")
        .setImage(`https://vacefron.nl/api/emergencymeeting?&text=${txt}`)
        .setFooter({ text: "©2022 | Reliable" })
        .setTimestamp();
      interaction.reply({ embeds: [Embed] });
    } else if (interaction.options.getSubcommand() === "first-time") {
      const user = interaction.options.getUser("target") || "";

      const Embed = new EmbedBuilder()
        .setTitle("First Time...")
        .setColor("#0398fc")
        .setImage(
          `https://vacefron.nl/api/firsttime?&user=${user.displayAvatarURL({
            format: "png",
          })}`
        )
        .setFooter({ text: "©2022 | Reliable" })
        .setTimestamp();
      interaction.reply({ embeds: [Embed] });
    } else if (interaction.options.getSubcommand() === "grave") {
      const user = interaction.options.getUser("target") || "";

      const Embed = new EmbedBuilder()
        .setTitle("Rest in peace.")
        .setColor("#0398fc")
        .setImage(
          `https://vacefron.nl/api/grave?&user=${user.displayAvatarURL({
            format: "png",
          })}`
        )
        .setFooter({ text: "©2022 | Reliable" })
        .setTimestamp();
      interaction.reply({ embeds: [Embed] });
    } else if (interaction.options.getSubcommand() === "heaven") {
      const user = interaction.options.getUser("target") || "";

      const Embed = new EmbedBuilder()
        .setTitle("I love heaven!")
        .setColor("#0398fc")
        .setImage(
          `https://vacefron.nl/api/heaven?&user=${user.displayAvatarURL({
            format: "png",
          })}`
        )
        .setFooter({ text: "©2022 | Reliable" })
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
    } else if (interaction.options.getSubcommand() === "joke") {
      fetch("https://some-random-api.ml/joke")
        .then((res) => res.json())
        .then((json) => {
          const embed = new EmbedBuilder()
            .setTitle("Joke")
            .setDescription(`${json.joke}`)
            .setColor("#0398fc")
            .setFooter({ text: "©2022 | Reliable" });

          interaction.reply({ embeds: [embed] });
        });
    } else if (interaction.options.getSubcommand() === "kill") {
      let killed =
        interaction.options.getMember("target") || interaction.member;

      const kill = new EmbedBuilder()
        .setTitle("Omg, You killed someone!")
        .setColor("#0398fc")
        .setFooter({ text: "©2022 | Reliable" })
        .setImage(
          "https://cdn.discordapp.com/attachments/1029807885116506122/1033328186437664818/tenor.gif"
        )
        .setDescription(`You killed ${killed}`);

      await interaction.reply({ embeds: [kill] });
    } else if (interaction.options.getSubcommand() === "lyrics") {
      const lyricsfinder = interaction.options.getString("song") || "";

      const data = await fetch(
        `https://some-random-api.ml/lyrics?title=${lyricsfinder}`
      )
        .then((res) => res.json())
        .then((json) => {
          const embed = new EmbedBuilder()
            .setTitle(`${json.title}`)
            .addFields({
              name: "<:reliable_discordparthner:1030801628741247066> Authors",
              value: `> **\`${json.author}\`**`,
            })
            .setDescription(`>>> ${json.lyrics}`)
            .setColor("#0398fc")
            .setFooter({ text: "©2022 | Reliable" });

          interaction.reply({ embeds: [embed] });
        });
    } else if (interaction.options.getSubcommand() === "meme") {
      let nonNSFW = null;
      if (nonNSFW === null) {
        const response = await axios.get("https://reddit.com/r/meme.json");
        const { data } =
          response.data.data.children[
            Math.floor(Math.random() * response.data.data.children.length)
          ];
        if (data.over_18 === false) nonNSFW = data;
      }
      const embed = new EmbedBuilder()
        .setColor("#0398fc")
        .setTitle(`${nonNSFW.title}`)
        .addFields(
          {
            name: "⬆️ Up Votes",
            value: `${nonNSFW.ups}`,
            inline: true,
          },
          {
            name: "🔰 Meme Author",
            value: `**\`${nonNSFW.author}\`**`,
            inline: false,
          }
        )
        .setFooter({ text: "©2022 | Reliable" })
        .setImage(nonNSFW.url);

      const link2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Meme Link")
          .setStyle("Link")
          .setURL("https://reddit.com/" + nonNSFW.link)
      );

      await interaction.reply({ embeds: [embed], components: [link2] });
    } else if (interaction.options.getSubcommand() === "nuke") {
      const nuke = new EmbedBuilder()
        .setTitle("Nuked the server uhhh")
        .setColor("#0398fc")
        .setFooter({ text: "©2022 | Reliable" })
        .setImage(
          "https://cdn.discordapp.com/attachments/1029807885116506122/1033330807026233465/explosion-boom.gif"
        );

      await interaction.reply({ embeds: [nuke] });
    } else if (interaction.options.getSubcommand() === "qoutes") {
      fetch(`http://quotes.stormconsultancy.co.uk/random.json`)
        .then((res) => res.json())
        .then((json) => {
          const embed = new EmbedBuilder()
            .addFields({
              name: "Quote",
              value: `> *"${json.quote}"* - **${json.author}**`,
              inline: false,
            })
            .setColor("#0398fc")
            .setFooter({ text: "©2022 | Reliable" });

          interaction.reply({ embeds: [embed] });
        });
    } else if (interaction.options.getSubcommand() === "slap") {
      const user =
        interaction.options.getUser("target") ||
        "You cannot slap yourself unless your a stupid boi :)";

      const reason = interaction.options.getString("text") || "Don't Be Gay";

      const Embed = new EmbedBuilder()
        .setTitle("Dudes slapping each other.")
        .setColor("#0398fc")
        .setImage(
          `https://vacefron.nl/api/batmanslap?text1=Why+Man?&text2=${reason}&batman=${interaction.user.displayAvatarURL(
            { format: "png" }
          )}&robin=${user.displayAvatarURL({ format: "png" })}`
        )
        .setFooter({ text: "©2022 | Reliable" })
        .setTimestamp();
      interaction.reply({ embeds: [Embed] });
    } else if (interaction.options.getSubcommand() === "year-facts") {
      let years = interaction.options.getString("year") || "";

      const text = await fetch(`http://numbersapi.com/${years}/year`).then(
        (res) => res.text()
      );
      const embed = new EmbedBuilder()
        .setTitle("Year Facts")
        .addFields({
          name: "Did you know?",
          value: `> ${text}`,
          inline: false,
        })
        .setColor("#0398fc")
        .setFooter({ text: "©2022 | Reliable" });

      interaction.reply({ embeds: [embed] });
    } else {
      interaction.reply({ content: `No slash command choosed.` });
    }
  },
};
/**
 * @Author Reliable Inc.
 * @Copyright ©2022 | Reliable Inc, All rights reserved.
 * @CodedBy Mohtasim Alam Sohom, Sajidur Rahman Tahsin
 */
