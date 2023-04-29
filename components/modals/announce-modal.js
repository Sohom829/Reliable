const { Embed, EmbedBuilder, Colors } = require("discord.js");

module.exports = {
  data: {
    name: "modal",
  },

  async execute(interaction, client) {
    const Color = interaction.fields.getTextInputValue("announceColor");
    const Title = interaction.fields.getTextInputValue("announceTitle");
    const Description = interaction.fields.getTextInputValue("announceDesc");
    const Ping = interaction.fields.getTextInputValue("pingEveryone");
    const Footer =
      interaction.fields.getTextInputValue("announceFooter") ||
      `${interaction.guild.name}`;

    if (Ping === "false") {
      const AnnounceEmbed = new EmbedBuilder()
        .setColor(`${Color}`)
        .setTitle(`${Title}`)
        .setDescription(`${Description}`)
        .setFooter({ text: `${Footer} ` });
      await interaction.reply({ content: `Announced!`, ephemeral: true });
      interaction.channel.send({ embeds: [AnnounceEmbed] });
    } else {
      const AnnounceEmbed = new EmbedBuilder()
        .setColor(`${Color}`)
        .setTitle(`${Title}`)
        .setDescription(`${Description}`)
        .setFooter({ text: `${Footer} ` });
      await interaction.reply({
        content: `Announced with everyone ping!`,
        ephemeral: true,
      });
      interaction.channel.send({
        content: `@everyone`,
        embeds: [AnnounceEmbed],
      });
    }
  },
};
