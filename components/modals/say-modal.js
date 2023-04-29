module.exports = {
    data: {
      name: "say-modal",
    },
  
    async execute(interaction, client) {
      const toSay = interaction.fields.getTextInputValue("to-say");
  
      interaction.reply({ content: `> You Said, ${toSay}`, ephemeral: true });
  
      await interaction.channel.send({ content: `${toSay}` });
    },
  };
  