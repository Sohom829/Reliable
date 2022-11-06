const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: `select`,
  },
  async execute(interaction, client) {
    const selected = interaction.values[0];
    const ModerationEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} - Moderation Panel`)
      .setColor("#0398fc")
      .setFooter({ text: "Made with 🖤 by Sohom829#8350 & Alpha•#9258" })
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setImage(
        `https://media.discordapp.net/attachments/1029807885116506122/1034897221109424178/IMG_20221025_221311.jpg`
      )
      .setDescription(
        `\`mod kick\`, \`mod ban\`, \`mod clear\`, \`mod timeout\`, \`mod rolememberinfo\`, \`warn add\`, \`warn remove\``
      );

    const BotEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} - Default Panel`)
      .setColor("#0398fc")
      .setFooter({ text: "Made with 🖤 by Sohom829#8350 & Alpha•#9258" })
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setImage(
        `https://media.discordapp.net/attachments/1029807885116506122/1034897221109424178/IMG_20221025_221311.jpg`
      )
      .setDescription(
        `\`bot info\`, \`bot credits\`, \`bot help\`, \`bot ping\`, \`bot uptime\``
      );

    const InfoEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} - Information Panel`)
      .setColor("#0398fc")
      .setFooter({ text: "Made with 🖤 by Sohom829#8350 & Alpha•#9258" })
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setImage(
        `https://media.discordapp.net/attachments/1029807885116506122/1034897221109424178/IMG_20221025_221311.jpg`
      )
      .setDescription(
        `\`info covid-world-wide\`, \`info covid-countries\`, \`quotes\`, \`info user\`, \`info member-count\`, \`info reddit\`, \`info server\`, \`info-role\`, \`info channel\`, \`info roleperms\`, \`info userperms\`, \`info pokemon\`, \`info anime\`, \`info npm\``
      );
    const FunEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} - Fun Panel`)
      .setColor("#0398fc")
      .setFooter({ text: "Made with 🖤 by Sohom829#8350 & Alpha•#9258" })
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setImage(
        `https://media.discordapp.net/attachments/1029807885116506122/1034897221109424178/IMG_20221025_221311.jpg`
      )
      .setDescription(
        `\`fun kill\`, \`fun nuke\`, \`fun bird-fact\`, \`fun cat-fact\`, \`fun joke\`, \`fun slap\`, \`fun grave\`, \`fun jail\`, \`fun distract\`, \`fun eject\`, \`fun heaven\`, \`fun firsttime\`, \`fun emergency-meeting\`, \`fun meme\`, \`fun date-facts\`, \`fun year-facts\`, \`info lyrics\``
      );
    const GiveawayEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} - Giveaway Panel`)
      .setColor("#0398fc")
      .setFooter({ text: "Made with 🖤 by Sohom829#8350 & Alpha•#9258" })
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setImage(
        `https://media.discordapp.net/attachments/1029807885116506122/1034897221109424178/IMG_20221025_221311.jpg`
      )
      .setDescription(
        `\`giveaway start\`, \`giveaway end\`, \`giveaway reroll\` `
      );
    const UtilityEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} - Giveaway Panel`)
      .setColor("#0398fc")
      .setFooter({ text: "Made with 🖤 by Sohom829#8350 & Alpha•#9258" })
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setImage(
        `https://media.discordapp.net/attachments/1029807885116506122/1034897221109424178/IMG_20221025_221311.jpg`
      )
      .setDescription(
        `\`utility wikipedia\`, \`utility avatar\`, \`utility choose\`, \`utility server-icon\` `
      );

    if (selected === "first_option") {
      return interaction.reply({ embeds: [ModerationEmbed], ephemeral: true });
    } else if (selected === "second_option") {
      return interaction.reply({ embeds: [InfoEmbed], ephemeral: true });
    } else if (selected === "third_option") {
      return interaction.reply({ embeds: [FunEmbed], ephemeral: true });
    } else if (selected === "fourth_option") {
      return interaction.reply({ embeds: [BotEmbed], ephemeral: true });
    } else if (selected === "fifth_option") {
      return interaction.reply({ embeds: [GiveawayEmbed], ephemeral: true });
    } else if (selected === "sixth_option") {
      return interaction.reply({ embeds: [UtilityEmbed], ephemeral: true });
    }
  },
};
