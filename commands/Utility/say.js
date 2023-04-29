const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  PermissionFlagsBits,
  PermissionBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("repeat whatever you say. requires manage messages perms")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction, client) {
    if (
      interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)
    ) {
      const SayModal = new ModalBuilder()
        .setCustomId("say-modal")
        .setTitle("Say something..");

      const toSay = new TextInputBuilder()
        .setCustomId("to-say")
        .setLabel("Kindly type something to repeat")
        .setStyle(TextInputStyle.Paragraph);

      const SayActionRow = new ActionRowBuilder().addComponents(toSay);

      SayModal.addComponents(SayActionRow);

      await interaction.showModal(SayModal);
    } else {
      interaction.reply({
        content: `You don't have permission to use this command! Required permission: Manage Messages`,
        ephemeral: true,
      });
    }
  },
};
