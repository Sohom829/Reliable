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
const ms = require("ms");

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
      sub.setName("pickupline").setDescription("👉 Generate some pickuplines!")
    )
    .addSubcommand((sub) =>
      sub
        .setName("lovemeter")
        .setDescription("Displays love meter between two users.")
        .addUserOption((op) =>
          op.setName("user").setDescription("Mention the user").setRequired(true)
        )
        .addUserOption((op) =>
          op.setName("user2").setDescription("Mention the user").setRequired(false)
        )
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
        .setName("8ball")
        .setDescription("🎱 Ask the magic 8ball a question")
        .addStringOption((op) =>
          op
            .setName("question")
            .setDescription("The question you want to ask the magic 8ball")
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("reverse")
        .setDescription("◀ Sends the same message that you had sent but reversed.")
        .addStringOption((op) =>
          op
            .setName("text")
            .setDescription("The text to reverse")
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub
      .setName("pp")
      .setDescription("PP size")
      .addUserOption((option) =>
        option
          .setName("user")
          .setDescription("User to PP rate")
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
        .setName("age")
        .setDescription("Predict the age of a name")
        .addStringOption((op) =>
          op
            .setName("name")
            .setDescription("Provide the name")
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub.setName("advice").setDescription("Gives you random advices")
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
    } else if (interaction.options.getSubcommand() === "first-time") {
      const user = interaction.options.getUser("target") || "";

      const Embed = new EmbedBuilder()
        .setTitle("First Time...")
        .setColor("#0398fc")
        .setImage(
          `https://vacefron.nl/api/firsttime?&user=${user.displayAvatarURL({
            format: "png",
          })}`
        );
    } else if (interaction.options.getSubcommand() === "advice") {
      fetch(`https://api.adviceslip.com/advice`)
        .then((res) => res.json())
        .then((json) => {
          const Embed = new EmbedBuilder()
            .setTitle("Advice")
            .setDescription(`> **${json.slip.advice}**`)
            .setColor("#0398fc")
            .setFooter({ text: "©2022 | Reliable" })
            .setTimestamp();
          interaction.reply({ embeds: [Embed] });
        });
    } else if (interaction.options.getSubcommand() === "age") {
      const name = interaction.options.getString("name") || "";

      fetch(`https://api.agify.io/?name=${name}`)
        .then((res) => res.json())
        .then((json) => {
          const Embed = new EmbedBuilder()
            .setTitle("Age Guess")
            .addFields({
              name: "Age Guessing",
              value: `**\`•\` Name**: ${name || "**`Nothing Found`**"}
**\`•\` Age**: ${json.age || "**`Nothing Found`**"}
**\`•\` Count**: ${json.count || "**`Nothing Found`**"}`,
            })
            .setColor("#0398fc")
            .setFooter({ text: "©2022 | Reliable" })
            .setTimestamp();
          interaction.reply({ embeds: [Embed] });
        });
    } else if (interaction.options.getSubcommand() === "8ball") {
      const inquiry = interaction.options.getString("question");
      try {
        const fortunes = [
          "yep!",
          "i guess",
          "probably not",
          "YES YES YES!!!11",
          "hell no",
          "um.. what?",
          "sorry, say again?",
          "what is that",
          "you know what just ask someone else",
          "i mean sure, if you believe",
          "without doubt",
          "without doubt      no",
          "sorry son",
          "possibly",
          "in one universe out of 9876567... yes",
        ];
        const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];

        const Embed = new EmbedBuilder()
          .setTimestamp()
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" })
          .setTitle(`${inquiry}`)
          .setDescription(`**🎱 | \`${fortune}\`**`);

        interaction.reply({ embeds: [Embed] });
      } catch (err) {
        console.log(err);

        const err_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription(
            "**❌ | The magical 8ball is having some issues please try again later!**"
          )
          .setTimestamp()
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" });

        interaction.reply({ embeds: [err_embed], ephemeral: true });
      }
    } else if (interaction.options.getSubcommand() === "pp") {
      const member = interaction.options.getMember("user")

      try {
        const size = Math.floor(Math.random() * 21)
      
        let PP = "8"
      
        for (let i = 0; i < size; i++) {
          PP += "="
        }
      
        PP += "D"

        const Embed = new EmbedBuilder()
          .setTimestamp()
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" })
          .setTitle(`${member.displayName}'s PP`)
          .setDescription(`\`\`\`${PP}\`\`\``);

        interaction.reply({ embeds: [Embed] });
      } catch (err) {
        console.log(err);

        const err_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription(
            "**❌ | The pp is having some issues please try again later.**"
          )
          .setTimestamp()
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" });

        interaction.reply({ embeds: [err_embed], ephemeral: true });
      }
    } else if (interaction.options.getSubcommand() === "reverse") {

      try {
        const text = interaction.options.getString("text")
        const converted = text.split("").reverse().join("");

        const Embed = new EmbedBuilder()
          .setTimestamp()
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" })
          .setTitle(`◀ | Reversed`)
          .setDescription(`\`\`\`${converted}\`\`\``);

        interaction.reply({ embeds: [Embed] });
      } catch (err) {
        console.log(err);

        const err_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription(
            "**❌ | Reverse Machine crashed! Trying to fix it.**"
          )
          .setTimestamp()
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" });

        interaction.reply({ embeds: [err_embed], ephemeral: true });
      }
    } else if (interaction.options.getSubcommand() === "pickupline") {

      try {
        const line = [
          "Do you like raisins? How do you feel about a date?",
          "I hope you know CPR because you take my breath away!",
          "You've made me so nervous that I've totally forgotten my standard pick-up line.",
          "Are you a trap card? Because I’ve fallen for you.",
          "Roses are red, violets are blue, omae wa mo shindeiru",
          "Baby, come with me and you'll be Going Merry.",
          "I think I need a paralyze heal! Because you're stunning!",
          "I'm no photographer, but I can picture us together.",
          "Do you have a Death Note? Because everytime you smile, I feel like I'm having a heart attack!",
          "Are you Saitama? Because you've got me down in one move!",
          "Are you French? Because Eiffel for you.",
          "You must be better than Kuuhaku. Because when I first saw you, you already won my heart!",
          "I must be in a museum, because you truly are a work of art.",
          "Do you believe in fate? How about you stay the night? (Fate/Night; this one wasn't too apparant..)",
          "Just say yes and I'll give you more than seven Eurekas!",
          "You're like the 3D Maneuver gear. I won't stand a chance in this world without you!",
          "You remind me of Menma. Because even when I can't see you, I still feel you inside my heart!",
          "If I just had a Geass, I'd command you to be mine!",
          "Extra cursed student or not, I wont even think of ignoring you! (From anime *another*; not too apparant..rip)",
          "I don't need a Sharingan to see how beautiful you are!",
          "Are you Kikyo? Because I think you shot an arrow through my heart!",
          "Even if it means risking my existence, I'll cross different world lines just to find you! (Steins;Gate)",
          "Hey! Are you the railgun? Because I can feel a spark! (Toaru Kagaku no Railgun)",
          "Are you from the Bath House? Because you take my spirit away. (Spirited Away)",
          "Omae wa mo shindeiru!",
          "You must be Kira, because you just gave me a heart attack!",
          "You're cooler than Grey's ice shell!",
          "You're more delicious than Ciel's soul!",
          "Our love is like Grell, it never seems to die!",
          "We were born to make history!!",
          "If you were a potato, you would be a good potato.",
          "I don't need a Death Note, your beauty is killer!",
          "I love you as much as Ryuk loves apples!",
          "I'll buy you ice cream, just be careful not to drop it  ...🍦",
          "Call me All Might, because I’m just looking to Texas Smash!",
          "There is something wrong with my cell phone. It doesn't have your number in it.",
          "I don't need pickup lines, because they don't work on corpses.",
          "Kanye feel the love?",
          "You can take me to flavour town!!",
          "Hey, you're pretty good!!",
          "I'd go full homo for you!",
          "I'm a bot that no one can beat so get your mind out of this thing",
          "I wish they'd all die, except for you!",
        ];

        const Embed = new EmbedBuilder()
          .setTimestamp()
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" })
          .setTitle(`Pickup Line`)
          .setDescription(`\`\`\`${line[Math.round(Math.random() * (line.length - 1))]}\`\`\``);

        interaction.reply({ embeds: [Embed] });
      } catch (err) {
        console.log(err);

        const err_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription(
            "**❌ | Pickup Machine crashed! Trying to fix it.**"
          )
          .setTimestamp()
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" });

        interaction.reply({ embeds: [err_embed], ephemeral: true });
      }
    } else if (interaction.options.getSubcommand() === "lovemeter") {

      try {
        const user = interaction.options.getMember('user');
        const user2 = interaction.options.getMember('user2') || interaction.member;
        if (user.id === user2.id) {
          const err_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription(
            "**❌ | I can only calculate love percentage between two different people.**"
          )
          .setTimestamp()
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" });

          interaction.reply({ embeds: [err_embed], ephemeral: true })
        }

        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = '❤️'.repeat(loveIndex) + '♡'.repeat(10 - loveIndex);

        const Embed = new EmbedBuilder()
          .setTimestamp()
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" })
          .setTitle(`❤️ | Love`)
          .addFields(
            {
              name: "**`•`** Lovers",
              value: `**\`${user.displayName}\`** and **\`${user2.displayName}\`**`,
              inline: true
            },
            {
              name: "**`•`** Love Meter",
              value: `**\`${Math.floor(love)}%\`: \`${loveLevel}\`**`,
              inline: true
            },
          )
        interaction.reply({ embeds: [Embed] });
      } catch (err) {
        console.log(err)

        const err_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription(
            "**❌ | Love Machine crashed! Trying to fix it.**"
          )
          .setTimestamp()
          .setColor("#0398fc")
          .setFooter({ text: "©2022 | Reliable" });

        interaction.reply({ embeds: [err_embed], ephemeral: true });
      }
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
