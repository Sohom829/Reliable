const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  ActionRowBuilder,
} = require("discord.js");
const fetch = require("node-fetch");
const Canvacord = require("canvacord");
const axios = require("axios");
const e = require("express");

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
      sub.setName("advice").setDescription("Gives you random advices")
    )
    .addSubcommand((sub) =>
      sub.setName("quotes").setDescription("Sends random quotes")
    )
    .addSubcommand((sub) =>
    sub
      .setName("roast")
      .setDescription("Roast someone.")
      .addUserOption((op) =>
        op
          .setName("user")
          .setDescription("Mention the user you want to roast.")
          .setRequired(true)
      )
  )    
    .addSubcommand((sub) =>
    sub
      .setName("reverse")
      .setDescription(
        "◀ Sends the same message that you had sent but reversed."
      )
      .addStringOption((op) =>
        op
          .setName("text")
          .setDescription("The text to reverse")
          .setRequired(true)
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
      sub.setName("joke").setDescription("Generate a random jokes")
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
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" });

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
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" })
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
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" });

      interaction.reply({ embeds: [embed] });
    } else if (interaction.options.getSubcommand() === "quotes") {
      fetch("https://api.popcat.xyz/quote")
        .then((res) => res.json())
        .then((json) => {
          const Embed = new EmbedBuilder()
            .setTitle(`Quotes`)
            .setColor("#2F3136")
            .setDescription(`>>> **${json.quote}**`)
            .setFooter({ text: "©2022 - 2023 | Reliable" });
          interaction.reply({ embeds: [Embed] });
        });
    } else if (interaction.options.getSubcommand() === "joke") {
      fetch("https://some-random-api.ml/joke")
        .then((res) => res.json())
        .then((json) => {
          const embed = new EmbedBuilder()
            .setTitle("Joke")
            .setDescription(`${json.joke}`)
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" });

          interaction.reply({ embeds: [embed] });
        });
    } else if (interaction.options.getSubcommand() === "lyrics") {
      const lyricsfinder = interaction.options.getString("song") || "";

      const data = await fetch(
        `https://some-random-api.ml/lyrics?title=${lyricsfinder}`
      )
        .then((res) => res.json())
        .then((json) => {
          const embed = new EmbedBuilder()
            .setTitle(`${json.title || "N/A"}`)
            .addFields({
              name: "<:reliable_discordparthner:1030801628741247066> Authors",
              value: `> **\`${json.author || "N/A"}\`**`,
            })
            .setDescription(`>>> ${json.lyrics || "**`N/A`**"}`)
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" });

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
        .setColor("#2F3136")
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
        .setFooter({ text: "©2022 - 2023 | Reliable" })
        .setImage(nonNSFW.url);

      const link2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Meme Link")
          .setStyle("Link")
          .setURL("https://reddit.com/" + nonNSFW.link)
      );

      await interaction.reply({ embeds: [embed], components: [link2] });
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
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" });

      interaction.reply({ embeds: [embed] });
    } else if (interaction.options.getSubcommand() === "advice") {
      fetch(`https://api.adviceslip.com/advice`)
        .then((res) => res.json())
        .then((json) => {
          const Embed = new EmbedBuilder()
            .setTitle("Advice")
            .setDescription(`> **${json.slip.advice}**`)
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" })
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
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setTitle(`${inquiry}`)
          .setDescription(`**🎱 | \`${fortune}\`**`);

        interaction.reply({ embeds: [Embed] });
      } catch (err) {
        const err_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription(
            "**<:reliable_wrong:1043155193077960764> | The magical 8ball is having some issues please try again later!**"
          )
          .setTimestamp()
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" });

        interaction.reply({ embeds: [err_embed], ephemeral: true });
      }
    } else if (interaction.options.getSubcommand() === "pp") {
      const member = interaction.options.getMember("user");

      try {
        const size = Math.floor(Math.random() * 21);

        let PP = "8";

        for (let i = 0; i < size; i++) {
          PP += "=";
        }

        PP += "D";

        const Embed = new EmbedBuilder()
          .setTimestamp()
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setTitle(`${member.displayName}'s PP`)
          .setDescription(`\`\`\`${PP}\`\`\``);

        interaction.reply({ embeds: [Embed] });
      } catch (err) {
        const err_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription(
            "**<:reliable_wrong:1043155193077960764> | The pp is having some issues please try again later.**"
          )
          .setTimestamp()
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" });

        interaction.reply({ embeds: [err_embed], ephemeral: true });
      }
    } else if (interaction.options.getSubcommand() === "reverse") {
      try {
        const text = interaction.options.getString("text");
        const converted = text.split("").reverse().join("");

        const Embed = new EmbedBuilder()
          .setTimestamp()
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setTitle(`◀ | Reversed`)
          .setDescription(`\`\`\`${converted}\`\`\``);

        interaction.reply({ embeds: [Embed] });
      } catch (err) {
        console.log(err);
        const err_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription(
            "**<:reliable_wrong:1043155193077960764> | Reverse Machine crashed! Trying to fix it.**"
          )
          .setTimestamp()
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" });

        interaction.reply({ embeds: [err_embed], ephemeral: true });
      }
    } else if (interaction.options.getSubcommand() === "roast") {
      try {
        const user = interaction.options.getUser("user")
        if (interaction.user.id === user.id) {
          const err_embed = new EmbedBuilder()
            .setTitle("Error")
            .setDescription(
              "**<:reliable_wrong:1043155193077960764> |  Dude, seriously? You want to roast yourself?**"
            )
            .setTimestamp()
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" });

          interaction.reply({ embeds: [err_embed], ephemeral: true });
        }
        var roasts = [
          "*Puts you in the oven.*",
          "You're so stupid.",
          "Sorry, I can't hear you over how annoying you are.",
          "I've got better things to do.",
          "You're as dumb as Cleverbot.",
          "Your IQ is lower than the Mariana Trench.",
          "You're so annoying even the flies stay away from your stench.",
          "Go away, please.",
          "I'd give you a nasty look but you've already got one.",
          "It looks like your face caught fire and someone tried to put it out with a hammer.",
          "Your family tree must be a cactus because everyone on it is a prick.",
          "Someday you will go far, and I hope you stay there.",
          "The zoo called. They're wondering how you got out of your cage.",
          "I was hoping for a battle of wits, but you appear to be unarmed.",
          "You are proof that evolution can go in reverse.",
          "Brains aren't everything, in your case, they're nothing.",
          "Sorry I didn't get that, I don't speak idiot.",
          "Why is it acceptable for you to be an idiot, but not for me to point it out?",
          "We all sprang from apes, but you did not spring far enough.",
          "Even monkeys can go to space, so clearly you lack some potential.",
          "It's brains over brawn, yet you have neither.",
          "You look like a monkey, and you smell like one too.",
          "Even among idiots you're lacking.",
          "You fail even when you're doing absolutely nothing.",
          "If there was a vote for 'least likely to succeed' you'd win first prize.",
          "I'm surrounded by idiots... Or, wait, that's just you.",
          "I wanna go home. Well, really I just want to get away from the awful aroma you've got going there.",
          "Every time you touch me I have to go home and wash all my clothes nine times just to get a normal smell back.",
          "If I had a dollar for every brain you don't have, I'd have one dollar.",
          "I'd help you succeed but you're incapable.",
          "Your hairline is built like a graph chart, positive and negative forces attract but the clippers and your hair repel.",
          "I know a good joke! You!",
          "You have two parts of your brain, 'left' and 'right'. In the left side, there's nothing right. In the right side, there's nothing left.",
          "Is your ass jealous of the amount of shit that just came out of your mouth?",
          "I don't engage in mental combat with the unarmed.",
          "Two wrongs don't make a right, take your parents as an example.",
          "Your birth certificate is an apology letter from the condom factory.",
          "You sound reasonable. It must be time to up my medication!",
          "You must have been born on a highway because that's where most accidents happen.",
          "You're so ugly, when your mom dropped you off at school she got a fine for littering.",
          "If laughter is the best medicine, your face must be curing the world.",
          "I'd like to see things from your point of view but I can't seem to get my head that far up my ass.",
          "The only way you'll ever get laid is if you crawl up a chicken's ass and wait.",
          "I'm jealous of all the people that haven't met you!",
          "If I had a face like yours, I'd sue my parents.",
          "There's only one problem with your face. I can see it.",
          "Don't you love nature, despite what it did to you?",
          "What language are you speaking? Cause it sounds like bullshit.",
          "Stupidity is not a crime so you are free to go.",
          "You are what happens when women drink during pregnancy.",
          "When I look at you, I wish I could meet you again for the first time… and walk past.",
          "You are the sun in my life… now get 93 million miles away from me.",
          "You have such a beautiful face… But let’s put a bag over that personality.",
          "There is someone out there for everyone. For you, it’s a therapi",
          "So, a thought crossed your mind? Must have been a long and lonely journey.",
          "You have a room temperature IQ - if the room is in Antarctica.",
          "If you really want to know about mistakes, you should ask your parents.",
          "I would ask you how old you are but I know you can't count that high.",
          "Do you want to know how I get all these insults? I use something called intelligence.",
          "I was going to give you a nasty look, but you already have one.",
          "I don't know what your problem is, but I'll bet it's hard to pronounce.",
          "Brains aren't everything. In your case they're nothing.",
          "As an outsider, what do you think of the human race?",
          "You look like a before picture.",
          "Oh, what? Sorry. I was trying to imagine you with a personality.",
          "You're the reason the gene pool needs a lifeguard.",
          "We can always tell when you are lying. Your lips move.",
          "I may love to shop but I'm not buying your bullshit.",
          "Hell is wallpapered with all your deleted selfies.",
          "You are living proof that manure can sprout legs and walk.",
          "You do realize makeup isn't going to fix your stupidity?",
          "Calling you an idiot would be an insult to all stupid people.",
          "You have the perfect face for radio.",
          "Aww, it's so cute when you try to talk about things you don't understand.",
          "If I wanted to hear from an asshole, I'd fart.",
          "What's the difference between you and an egg? Eggs get laid!",
          "You look like a rock smashed into a pile of sand, rolled into a blunt, and got smoked through an asthma inhaler.",
          "Your advice is about as useful as a paper-mache bomb shelter.",
          "Is it sad that your theme song might as well have a 0/0 signature?",
          "You're so fat, you make the galaxy look like it's on the molecular scale.",
      ];
        const Embed = new EmbedBuilder()
          .setTimestamp()
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setTitle(`😓 | Roasted`)
          .setDescription(`> **<@${user.id}>** \`${roasts[Math.floor(Math.random() * roasts.length)]}\``);

        interaction.reply({ embeds: [Embed] });
      } catch (err) {
        console.log(err);
        const err_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription(
            "**<:reliable_wrong:1043155193077960764> | Something went wrong.**"
          )
          .setTimestamp()
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" });

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
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setTitle(`Pickup Line`)
          .setDescription(
            `\`\`\`${line[Math.round(Math.random() * (line.length - 1))]}\`\`\``
          );

        interaction.reply({ embeds: [Embed] });
      } catch (err) {
        console.log(err);
        const err_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription(
            "**<:reliable_wrong:1043155193077960764> | Pickup Machine crashed! Trying to fix it.**"
          )
          .setTimestamp()
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" });

        interaction.reply({ embeds: [err_embed], ephemeral: true });
      }
    } else if (interaction.options.getSubcommand() === "lovemeter") {
      try {
        const user = interaction.options.getMember("user");
        const user2 =
          interaction.options.getMember("user2") || interaction.member;
        if (user.id === user2.id) {
          const err_embed = new EmbedBuilder()
            .setTitle("Error")
            .setDescription(
              "**<:reliable_wrong:1043155193077960764> |  I can only calculate love percentage between two different people.**"
            )
            .setTimestamp()
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" });

          interaction.reply({ embeds: [err_embed], ephemeral: true });
        }

        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "❤️".repeat(loveIndex) + "♡".repeat(10 - loveIndex);

        const Embed = new EmbedBuilder()
          .setTimestamp()
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setTitle(`❤️ | Love`)
          .addFields(
            {
              name: "**`•`** Lovers",
              value: `**\`${user.displayName}\`** and **\`${user2.displayName}\`**`,
              inline: true,
            },
            {
              name: "**`•`** Love Meter",
              value: `**\`${Math.floor(love)}%\`: \`${loveLevel}\`**`,
              inline: true,
            }
          );
        interaction.reply({ embeds: [Embed] });
      } catch (err) {
        const err_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription(
            "**<:reliable_wrong:1043155193077960764> | Love Machine crashed! Trying to fix it.**"
          )
          .setTimestamp()
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" });

        interaction.reply({ embeds: [err_embed], ephemeral: true });
      }
    } else {
      interaction.reply({ content: `No slash command choosed.` });
    }
  },
};
/**
 * @Author Reliable Inc.
 * @Copyright ©2022 - 2023 | Reliable Inc, All rights reserved.
 * @CodedBy Mohtasim Alam Sohom, Sajidur Rahman Tahsin
 */
