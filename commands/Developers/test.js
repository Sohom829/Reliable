const { EmbedBuilder, SlashCommandBuilder, Embed, Colors, ActionRowBuilder, Events, SelectMenuBuilder } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
  .setName("test")
  .setDescription("testing"),

   async execute(interaction, client) {
     const MainEmbed = new EmbedBuilder()
     .setColor("#0398fc")
        .setFooter({ text: "Made with 🖤 by Sohom829#8350 & Alpha•#9258" })
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setImage(
          `https://media.discordapp.net/attachments/1029807885116506122/1034897221109424178/IMG_20221025_221311.jpg`
        )
        .setTitle(`${client.user.username} - Command Panel`)
     .setDescription("Select a category from the menu");
     
     		const row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('select')
					.setPlaceholder('No category selected')
					.addOptions(
						{
							label: 'Moderation',
							description: 'View Moderation Commands',
							value: `first_option`,
						},
						{
							label: 'Info',
							description: 'View Info Commands',
							value: 'second_option',
						},
            {
              label: 'Fun',
              description: 'View Fun commands',
              value: 'third_option'
            },
            {
              label: 'Bot',
              description: 'View default bot commands',
              value: 'fourth_option'
            }
					),
			);

		await interaction.reply({ embeds: [MainEmbed], components: [row] });
   }
}