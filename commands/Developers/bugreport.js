const { 
    EmbedBuilder, 
    Colors,
    Embed,
    ChatInputCommandInteraction, 
    ApplicationCommandOptionType,
    SlashCommandBuilder,
  ActionRowBuilder, 
  ModalBuilder, 
  TextInputBuilder, 
  TextInputStyle
} = require("discord.js");

module.exports = {
  data: 
    new SlashCommandBuilder()
    .setName("bugreport")
    .setDescription("Facing errors? Report it now to my developers!"),
    /**
     * @param {ChatInputCommandInteraction} interaction 
    */
  
    async execute(interaction, client) {
      
		let user = interaction.user.tag;
    let guild = interaction.guild.name;
		let channel = client.channels.cache.get("1029808315481460798")

    const modal = new ModalBuilder()
			.setCustomId('bugRep')
			.setTitle('Bug report');

      const cmdName = new TextInputBuilder()
			.setCustomId('cmdName')
			.setLabel("Command Name?")
			.setStyle(TextInputStyle.Short);

		const desc = new TextInputBuilder()
			.setCustomId('desc')
			.setLabel("Describe the issue that you are facing")
			.setStyle(TextInputStyle.Paragraph);

      const firstActionRow = new ActionRowBuilder().addComponents(cmdName);
		const secondActionRow = new ActionRowBuilder().addComponents(desc);

		
		modal.addComponents(firstActionRow, secondActionRow);

      await interaction.showModal(modal);

      
      
	/*	const embed = new EmbedBuilder() 
		.setTitle("Bug Report")
    .setFooter({text: "©2022 | Reliable"})
    .setTimestamp()
		.addFields(
            {
          name: `‣ Bug`,
          value: `> **\`\`\`${bug}\`\`\`**`,
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
        },        
)
      
		.setColor('#0398fc')

     channel.send({embeds: [embed]}); 

      await interaction.reply({content: `> **Successfully reported the bug: \`\`\`${bug}\`\`\` to the official Server**`, ephemeral: true})
      */
	}
}