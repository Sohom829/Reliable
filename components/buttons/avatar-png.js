const { EmbedBuilder } = require('discord.js')
const { User } = require('../../commands/Utility/utility');

module.exports = {
  data: {
    name: 'avatar-png'
  },
  async execute (interaction, client) {
    const AvatarEmbed = new EmbedBuilder().setColor("Red");
      AvatarEmbed.setTitle(`Avatar of ${User.tag}`)
        .setImage(User.displayAvatarURL({size: 1024, dynamic: true })) 
        .addFields(
          {
            name: `PNG`,
            value: `[\`LINK\`](${User.displayAvatarURL({ format: "png" })})`,
            inline: true,
          },
        );
      interaction.reply({ embeds: [AvatarEmbed] });
    } 
  }  