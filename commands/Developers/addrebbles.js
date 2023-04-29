const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const db = require("quick.db");
module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("addrebbles")
    .setDescription("adds rebbles to your account")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("The rebbles you want to add")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("The user").setRequired(false)
    ),

  async execute(interaction, client) {
    let user = interaction.options.getUser("user") || interaction.user;
    let amount = interaction.options.getInteger("amount");

    let channel = client.channels.cache.get("1029808182970810499");
    db.add(`money_${user.id}`, amount);
    let bal = db.fetch(`money_${user.id}`);

    const embed = new EmbedBuilder()
      .setTitle("Added Rebbles")
      .setColor("#0398fc")
      .setFooter({ text: "©2022 | Reliable" })
      .setTimestamp()
      .addFields(
        {
          name: "User Name",
          value: `> ${user} (**\`${user.id}\`**)`,
          inline: true,
        },
        {
          name: "Rebbles Amount",
          value: `> **\`₪ ${amount}\`**`,
          inline: true,
        },
        {
          name: "New Balance",
          value: `> **\`₪ ${bal}\`**`,
          inline: true,
        }
      );

    channel.send({ embeds: [embed] });
  },
};
