const { EmbedBuilder, Colors, Embed } = require("discord.js");

module.exports = {
  data: {
    name: `bugRep`,
  },

  async execute(interaction, client) {
    await interaction.reply({
      content:
        "Your submission was received successfully and sent it to official server",
      ephemeral: true,
    });

    const cmdName = interaction.fields.getTextInputValue("cmdName");
    const desc = interaction.fields.getTextInputValue("desc");

    let user = interaction.user.tag;
    let guild = interaction.guild.name;
    let channel = client.channels.cache.get("1029808315481460798");

    const embed = new EmbedBuilder()
      .setTitle("Bug Report")
      .setFooter({ text: "©2022 | Reliable" })
      .setTimestamp()
      .addFields(
        {
          name: `‣ Command Name`,
          value: `> **\`\`\`${cmdName}\`\`\`**`,
        },
        {
          name: `‣ Bug description`,
          value: `> **\`\`\`${desc}\`\`\`**`,
          inline: true,
        },
        {
          name: `‣ Reported From`,
          value: `> **\`${guild}\`**`,
          inline: false,
        },
        {
          name: `‣ Reported By`,
          value: `> **\`${user}\`**`,
          inline: true,
        },
        {
          name: `‣ Reported User Link`,
          value: `> [Click Here](https://discordapp.com/users/${interaction.user.id}/)`,
          inline: true,
        },
        {
          name: `‣ Reported User ID`,
          value: `> **\`${interaction.user.id}\`**`,
          inline: true,
        }
      )

      .setColor("#0398fc");

    channel.send({ embeds: [embed] });
  },
};
