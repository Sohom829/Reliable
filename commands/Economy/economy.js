const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Embed,
  Colors,
  ActionRowBuilder,
  AttachmentBuilder,
} = require("discord.js");
const ms = require("parse-ms");
const Jwork = require("../../JSON/work.json");
const JworkR = Jwork[Math.floor(Math.random() * Jwork.length)];
const db = require("quick.db");
const slotItems = ["🍇", "🍉", "🍌", "🍎", "🍒"];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("economy")
    .setDescription("Get all economy commands")
    .addSubcommand((sub) =>
      sub
        .setName("balance")
        .setDescription("Check your/anyone balance")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("Mention the user")
            .setRequired(false)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("deposit")
        .setDescription("Deposits money to bank")
        .addIntegerOption((option) =>
          option
            .setName("amount")
            .setDescription("The rebbles you want to deposit")
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("leaderboard")
        .setDescription("Top rebbles owner in this server")
    )  
    .addSubcommand((sub) =>
      sub
        .setName("withdraw")
        .setDescription("Withdraw bank money to your wallet")
        .addIntegerOption((option) =>
          option
            .setName("amount")
            .setDescription("The rebbles you want to deposit")
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("slots")
        .setDescription("Start a slot and earn some rebbles")
        .addIntegerOption((option) =>
          option
            .setName("amount")
            .setDescription("The rebbles you want to spend")
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("pay")
        .setDescription("Pay someone rebbles")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("The user you want to give the rebbles")
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("amount")
            .setDescription("Amount of the rebbles")
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub.setName("daily").setDescription("Daily rebbles!")
    )
    .addSubcommand((sub) =>
      sub.setName("weekly").setDescription("Weekly rebbles!")
    )
    .addSubcommand((sub) =>
      sub.setName("beg").setDescription("Beg for rebbles")
    )
    .addSubcommand((sub) =>
      sub.setName("hunt").setDescription("Hunt animals and earn rebbles")
    )
    .addSubcommand((sub) =>
      sub.setName("search").setDescription("Search for some rebbles")
    )
    .addSubcommand((sub) =>
      sub.setName("work").setDescription("Work to earn rebbles")
    ),

  async execute(interaction, client) {
    if (interaction.options.getSubcommand() === "work") {
      let author = await db.fetch(`work_${interaction.user.id}`);
      let timeout = 10800000;
      if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));

        let timeEmbed = new EmbedBuilder()
          .setTitle("Timeout!")
          .setDescription(
            `> **You need some rest man. Come back after \`${time.hours}\`h \`${time.minutes}\`m \`${time.seconds}\`s**`
          )
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setTimestamp();

        interaction.reply({ embeds: [timeEmbed], ephemeral: true });
      } else {
        let amount = Math.floor(Math.random() * 4000) + 1;
        let embed1 = new EmbedBuilder()
          .setTitle("Great work!")
          .addFields(
            {
              name: "Work",
              value: `> **\`${JworkR}\`**`,
              inline: false,
            },
            {
              name: "You were given",
              value: `\`-\` ₪ ${amount} Rebbles!`,
              inline: true,
            }
          )
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setTimestamp();

        interaction.reply({ embeds: [embed1] });

        db.add(`works_${interaction.user.id}`, 1);
        db.add(`money_${interaction.user.id}`, amount);
        db.set(`work_${interaction.user.id}`, Date.now());
      }
    } else if (interaction.options.getSubcommand() === "balance") {
      let user = interaction.options.getUser("user") || interaction.user;

      try {
        let bal = db.fetch(`money_${user.id}`);
        if (bal === null) bal = 0;
        let bank = await db.fetch(`bank_${user.id}`);
        if (bank === null) bank = 0;
        let net_worth = bal + bank;

        const balanceembed = new EmbedBuilder()
          .setTitle("Rebble Balance")
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setTimestamp()
          .addFields({
            name: "`💱` | Information",
            value: `**\`•\` User Name**: ${user} (**\`${user.id}\`**)
**\`•\` Wallet**: **\`₪ ${bal}\`**`,
            inline: false,
          });

          const components = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId("YES")
              .setLabel(`Net worth: ₪ ${net_worth}`)
              .setStyle("Secondary")
              .setDisabled(true),
            new ButtonBuilder()
              .setCustomId("NO")
              .setLabel(`Bank: ₪ ${bank}`)
              .setStyle("Secondary")
              .setDisabled(true));

        interaction.reply({ embeds: [balanceembed], components: [components] });
      } catch (err) {
        console.log(err);
      }
    } else if (interaction.options.getSubcommand() === "daily") {
      let timeout = 86400000;
      let amount = 200;
      let daily = await db.fetch(`daily_${interaction.user.id}`);

      if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));

        let timeEmbed = new EmbedBuilder()
          .setTitle("Timeout!")
          .setDescription(
            `> **You've already claimed your daily rewards. Come back after \`${time.hours}\`h \`${time.minutes}\`m \`${time.seconds}\`s**`
          )
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setTimestamp();

        interaction.reply({ embeds: [timeEmbed], ephemeral: true });
      } else {
        const dailyembed = new EmbedBuilder()
          .setTitle("Daily Rewards")
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setTimestamp()
          .addFields({
            name: "`💱` | You've Clamied",
            value: `**\`-\` ₪ \`${amount}\` Rebbles!**`,
            inline: false,
          });
        interaction.reply({ embeds: [dailyembed] });

        db.add(`money_${interaction.user.id}`, amount);
        db.set(`daily_${interaction.user.id}`, Date.now());
      }
    } else if (interaction.options.getSubcommand() === "weekly") {
      let timeout = 604800000;
      let amount = 5000;
      let weekly = await db.fetch(`weekly_${interaction.user.id}`);

      if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
        let time = ms(timeout - (Date.now() - weekly));

        let timeEmbed = new EmbedBuilder()
          .setTitle("Timeout!")
          .setDescription(
            `> **You've already claimed your weekly rewards. Come back after \`${time.days}\`d \`${time.hours}\`h \`${time.minutes}\`m \`${time.seconds}\`s**`
          )
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setTimestamp();

        interaction.reply({ embeds: [timeEmbed], ephemeral: true });
      } else {
        const weeklyembed = new EmbedBuilder()
          .setTitle("Weekly Rewards")
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setTimestamp()
          .addFields({
            name: "`💱` | You've Clamied",
            value: `**\`-\` ₪ \`${amount}\` Rebbles!**`,
            inline: false,
          });
        interaction.reply({ embeds: [weeklyembed] });

        db.add(`money_${interaction.user.id}`, amount);
        db.set(`weekly_${interaction.user.id}`, Date.now());
      }
    } else if (interaction.options.getSubcommand() === "beg") {
      let timeout = 120000;
      let amount = 50;

      let beg = await db.fetch(`beg_${interaction.user.id}`);

      if (beg !== null && timeout - (Date.now() - beg) > 0) {
        let time = ms(timeout - (Date.now() - beg));

        let timeEmbed = new EmbedBuilder()
          .setTitle("Timeout!")
          .setDescription(
            `> **Dude, do some activites begging can't make you rich lol. Come back after \`${time.minutes}\`m \`${time.seconds}\`s**`
          )
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setTimestamp();

        interaction.reply({ embeds: [timeEmbed], ephemeral: true });
      } else {
        let moneyEmbed = new EmbedBuilder()
          .setTitle("Begging")
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setTimestamp()
          .addFields({
            name: "`🥺` | You've begged and got",
            value: `**\`-\` ₪ \`${amount}\` Rebbles!**`,
            inline: false,
          });

        interaction.reply({ embeds: [moneyEmbed] });
        db.add(`money_${interaction.user.id}`, amount);
        db.add(`begs_${interaction.user.id}`, 1);
        db.set(`beg_${interaction.user.id}`, Date.now());
      }
    } else if (interaction.options.getSubcommand() === "deposit") {
      let member = db.fetch(`money_${interaction.user.id}`);
      let amount = interaction.options.getInteger("amount");

      if (member < amount) {
        let embed4 = new EmbedBuilder()
          .setTitle("Error")
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setDescription(
            "> **`Mah man, you don't have enough rebbles to deposit`**"
          );

        interaction.reply({ embeds: [embed4], ephemeral: true });
      } else {
        const deposited = new EmbedBuilder()
          .setTitle("Deposited Successfully")
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setTimestamp()
          .addFields({
            name: "`💱` | I've Deposited Your",
            value: `**\`-\` ₪ \`${amount}\` Rebbles!**`,
            inline: false,
          });
        interaction.reply({ embeds: [deposited] });

        db.subtract(`money_${interaction.user.id}`, amount);
        db.add(`bank_${interaction.user.id}`, amount);
      }
    } else if (interaction.options.getSubcommand() === "withdraw") {
      let member = db.fetch(`bank_${interaction.user.id}`);
      let amount = interaction.options.getInteger("amount");

      if (member < amount) {
        let embed4 = new EmbedBuilder()
          .setTitle("Error")
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setDescription(
            "> **`Chill dude, you don't have enough money at bank to withdraw!`**"
          );

        interaction.reply({ embeds: [embed4], ephemeral: true });
      } else {
        const withdrawn = new EmbedBuilder()
          .setTitle("Withdrawn Successfully")
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setTimestamp()
          .addFields({
            name: "`💱` | I've Withdrawn Your",
            value: `**\`-\` ₪ \`${amount}\` Rebbles!**`,
            inline: false,
          });
        interaction.reply({ embeds: [withdrawn] });

        db.subtract(`bank_${interaction.user.id}`, amount);
        db.add(`money_${interaction.user.id}`, amount);
      }
    } else if (interaction.options.getSubcommand() === "pay") {
      let member = db.fetch(`bank_${interaction.user.id}`);
      const user = interaction.options.getUser("user");
      let amount = interaction.options.getInteger("amount");

      if (user.id === interaction.user.id) {
        const err_embed = new EmbedBuilder()
          .setTitle("Error")
          .setDescription("**You can't give yourself rebbles!**")
          .setTimestamp()
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" });

        interaction.reply({ embeds: [err_embed], ephemeral: true });
      }

      if (member < amount) {
        let embed4 = new EmbedBuilder()
          .setTitle("Error")
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setDescription(
            "> **`You don't have enough rebbles to give someone!`**"
          );

        interaction.reply({ embeds: [embed4], ephemeral: true });
      } else {
        const paid = new EmbedBuilder()
          .setTitle("Rebbles paid")
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setTimestamp()
          .addFields({
            name: "`💱` | You have paid",
            value: `**\`-\` ₪ \`${amount}\` Rebbles to ${user}**`,
            inline: false,
          });
        interaction.reply({ embeds: [paid] });

        db.add(`money_${user.id}`, amount);
        db.subtract(`money_${interaction.user.id}`, amount);
      }
    } else if (interaction.options.getSubcommand() === "slots") {
      let member = db.fetch(`money_${interaction.user.id}`);
      let amount = interaction.options.getInteger("amount");
      let money = parseInt(amount);
      let win = false;
      let timeout = 300000;
      let slots = await db.fetch(`slots_${interaction.user.id}`);
  
      if (slots !== null && timeout - (Date.now() - slots) > 0) {
        let time = ms(timeout - (Date.now() - slots));

        let timeEmbed = new EmbedBuilder()
          .setTitle("Timeout!")
          .setDescription(
            `> **Dude, you need to rest man. Come back after \`${time.hours}\`h \`${time.minutes}\`m \`${time.seconds}\`s**`
          )
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setTimestamp();
           interaction.reply({ embeds: [timeEmbed], ephemeral: true });

      } else {

      if (member < amount) {
        let embed4 = new EmbedBuilder()
          .setTitle("Error")
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .setDescription("> **`You're betting more than you can effort! please check your wallet!`**");

        interaction.reply({ embeds: [embed4], ephemeral: true });
      } else {
        db.set(`slots_${interaction.user.id}`, Date.now());
        let number = [];
        for (let i = 0; i < 3; i++) {
          number[i] = Math.floor(Math.random() * slotItems.length);
        }

        if (number[0] == number[1] && number[1] == number[2]) {
          money *= 2;
          win = true;
        } else if (
          number[0] == number[1] ||
          number[0] == number[2] ||
          number[1] == number[2]
        ) {
          money *= 2;
          win = true;
        }

        if (win) {
          const win = new EmbedBuilder()
            .setTitle("Slots")
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" })
            .setTimestamp()
            .setDescription(
              `\`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${
                slotItems[number[2]]
              }\``
            )
            .addFields({
              name: "`🎰` | You have won the slot! You were given",
              value: `**\`-\` ₪ \`${money}\` Rebbles**`,
              inline: false,
            });
           interaction.reply({ embeds: [win] });
          db.add(`money_${interaction.user.id}`, money);
        } else {
          const lost = new EmbedBuilder()
            .setTitle("Slots")
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" })
            .setTimestamp()
            .setDescription(
              `${slotItems[number[0]]} | ${slotItems[number[1]]} | ${
                slotItems[number[2]]
              }`
            )
            .addFields({
              name: "`🎰` | You lost the slot! I've taken your rebbles",
              value: `**\`-\` ₪ \`${money}\` Rebbles**`,
              inline: false,
            });
           interaction.reply({ embeds: [lost] });
          db.subtract(`money_${interaction.user.id}`, money);
        }
      }
    }
    } else if (interaction.options.getSubcommand() === "hunt") {

        let hunt = await db.fetch(`hunted_${interaction.user.id}`);
        let timeout = 1800320;
  
        if (hunt !== null && timeout - (Date.now() - hunt) > 0) {
          let time = ms(timeout - (Date.now() - hunt));
  
          let timeEmbed = new EmbedBuilder()
            .setTitle("Timeout!")
            .setDescription(
              `> **Dude, you need to give animals some peace. Come back after \`${time.hours}\`h \`${time.minutes}\`m \`${time.seconds}\`s**`
            )
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" })
            .setTimestamp();
            interaction.reply({ embeds: [timeEmbed], ephemeral: true });

        } else {
        
          let money =
          Math.round(Math.random() * 10) || Math.round(Math.random() * 1300);
        let worked = [
          `Deer`,
          `Wolf`,
          `Bear`,
          `Panda`,
          `white-tailed deer`,
          `moose`,
          `elk`,
          `caribou`,
          `bighorn sheep`,
          `pronghorn`,
          `boar`,
          `cat`,
          `armadillo`,
        ];
        let job = Math.floor(Math.random() * worked.length);
        let randomElement = worked[job];

          const hunting = new EmbedBuilder()
            .setTitle("You Went Hunting")
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" })
            .setTimestamp()
            .addFields(
              {
                name: "`🍖` | You hunted",
                value: `**\`-\` \`${randomElement}\`**`,
                inline: false,
              },
              {
                name: "`💸` | Selled for",
                value: `**\`-\` ₪ \`${money}\` Rebbles**`,
                inline: false,
              }
            );
          interaction.reply({ embeds: [hunting] });

          db.add(`money_${interaction.user.id}`, money);
          db.set(`searched_${interaction.user.id}`, Date.now());
        }
      } else if (interaction.options.getSubcommand() === "search") {

        let search = await db.fetch(`searched_${interaction.user.id}`);
        let timeout = 1800000;
  
        if (search !== null && timeout - (Date.now() - search) > 0) {
          let time = ms(timeout - (Date.now() - search));
  
          let timeEmbed = new EmbedBuilder()
            .setTitle("Timeout!")
            .setDescription(
              `> **Dude, you need to get some rest man. Come back after \`${time.hours}\`h \`${time.minutes}\`m \`${time.seconds}\`s**`
            )
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" })
            .setTimestamp();
            interaction.reply({ embeds: [timeEmbed], ephemeral: true });

        } else {
        
          let money =
          Math.round(Math.random() * 5) ||
          Math.round(Math.random() * 100) ||
          Math.round(Math.random() * 150) ||
          Math.round(Math.random() * 200) ||
          Math.round(Math.random() * 312) ||
          Math.round(Math.random() * 234);
      
          let worked = [
              `McDonald`,
              `Dumpster`,
              `Home`,
              `Sony`,
              `Roblox`,
              `Fortnite`,
              `Call of duty`,
              `School`,
              `Store`,
              `Your Book`,
              `Your pant`,
              `Wallet`
      ];
      var job = Math.floor(Math.random() * worked.length);
      var randomElement = worked[job]

          const searching = new EmbedBuilder()
            .setTitle("You Searched and Found")
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" })
            .setTimestamp()
            .addFields(
              {
                name: "`🔎` | You Searched at",
                value: `**\`-\` \`${randomElement}\`**`,
                inline: false,
              },
              {
                name: "`💸` | You got",
                value: `**\`-\` ₪ \`${money}\` Rebbles**`,
                inline: false,
              }
            );
          interaction.reply({ embeds: [searching] });

          db.add(`money_${interaction.user.id}`, money);
          db.set(`searched_${interaction.user.id}`, Date.now());
        }
      } else if (interaction.options.getSubcommand() === "leaderboard") {

            let money = db.all().filter(data => data.ID.startsWith(`money_`)).sort((a, b) => b.data - a.data);
            if (!money.length) {
                let noEmbed = new EmbedBuilder()
                .setTitle("Empty Leaderboard")
                .setDescription(
                  `> **Nothing Found!**`
                )
                .setColor("#2F3136")
                .setFooter({ text: "©2022 - 2023 | Reliable" })
                .setTimestamp();
                interaction.reply({ embeds: [noEmbed], ephemeral: true });
            };
    
            money.length = 10;
            var finalLb = "";
            for (var i in money) {
                if (money[i].data === null) money[i].data = 0
                finalLb += `**\`(#${money.indexOf(money[i]) + 1})\`** ${client.users.cache.get(money[i].ID.split('_')[1]) ? client.users.cache.get(money[i].ID.split('_')[1]).tag : ""} - **\`${money[i].data}\`** ₪\n`;
            };

          const leaderboard = new EmbedBuilder()
            .setTitle(`Leaderboard of Global Riches`)
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" })
            .setTimestamp()
            .addFields(
              {
                name: "`10` | Rich Peoples",
                value: `${finalLb}`,
                inline: false,
              }
            );
          interaction.reply({ embeds: [leaderboard] });
  
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
