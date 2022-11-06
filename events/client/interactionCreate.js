const config = require('../../config.json');
const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const BlackListGuild = require("../../Schemas/BlackListGuild");
const BlackListUser = require("../../Schemas/BlackListUser");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
           const GuildData = await BlackListGuild.findOne({Guild: interaction.guild.id}).catch((err) => {});
        const UserData = await BlackListUser.findOne({User: interaction.user.id}).catch((err) => {});
        const Embed = new EmbedBuilder()
        .setColor("#0398fc")
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setTimestamp()
          
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);

          if ( command.developer && interaction.user.id !== "967657941937291265")
            return interaction.reply({
                content: `> **Sorry, This command was made for developers can be used by only <@967657941937291265> or <@783661052738011176>!**`,
                ephemeral: true,
            });
            if (GuildData)
            return interaction.reply({
              embeds: [
                Embed.setTitle(`<:reliable_blacklist:1032352444501475448> Server Blacklisted`)
                 .setDescription(`> **Your server was blacklisted! Please visit our support server. The reason is provided below! If not Go to our support server and mention the support team or developers!**`)
                 .setColor("#0398fc")
                 .setFooter({text: "©2022 | Reliable"})
                     .addFields(
			{ name: "‣ Server Blacklisted on", value: `> <t:${parseInt(GuildData.Time / 1000)}:R>`, inline: true },
			{ name: "‣ Reason", value: `> **\`${GuildData.Reason}\`**`, inline: true }
                              )]});
              
          if (UserData)
            return interaction.reply({embeds: [
                Embed.setTitle(`<:reliable_blacklist:1032352444501475448> User Blacklisted`)
                 .setDescription(`> **You have been blacklisted from using this bot! Please read the reason. If there is no reason provided please visit our support server and mention the support team or developers!**`)
              
                 .setColor("#0398fc")
                 .setFooter({text: "©2022 | Reliable"})
                     .addFields(
			{ name: "‣ User Blacklisted on", value: `> <t:${parseInt(UserData.Time / 1000)}:R>`, inline: true },
			{ name: "‣ Reason", value: `> **\`${UserData.Reason}\`**`, inline: true }
                              )
            ]});              

            if (!command) return;


               try {
                await command.execute(interaction, client); 
            } catch (err) {
                console.log(err);
                await interaction.reply({
                    content: "> **Sorry, but something seems doesn't work! Please visit the support server and mention the developers or support team.**",
                    ephemeral: true
                })
            }
           
            

            
                  
        }
        
        else if (interaction.isButton()) {
          const { buttons } = client;
          const { customId } = interaction;
          const button = buttons.get(customId);

          if(!button) return new Error(`> **There is no code for button.**`);

                 

          try {
            await button.execute(interaction, client);
          } catch (err) {
            console.log(err);
          }
        } else if (interaction.isModalSubmit()) {
          if (interaction.customId === 'bugRep') {
		await interaction.reply({ content: 'Your submission was received successfully and sent it to official server', ephemeral: true});

            	const cmdName = interaction.fields.getTextInputValue('cmdName');
	const desc = interaction.fields.getTextInputValue('desc');

            let user = interaction.user.tag;
    let guild = interaction.guild.name;
		let channel = client.channels.cache.get("1029808315481460798");

            const embed = new EmbedBuilder() 
		.setTitle("Bug Report")
    .setFooter({text: "©2022 | Reliable"})
    .setTimestamp()
		.addFields(
      {
        name: `‣ Command Name`,
        value: `> **\`\`\`${cmdName}\`\`\`**`
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
        },        
)
      
		.setColor('#0398fc')

     channel.send({embeds: [embed]}); 
	} else if(interaction.customId == 'say-modal') {
            const toSay = interaction.fields.getTextInputValue('to-say');

            interaction.reply({content: `> You Said, ${toSay}`, ephemeral: true});

            await interaction.channel.send({content: `${toSay}`});
            
  }
        } else if (interaction.isSelectMenu()) {
          const { selectMenus } = client;
          const { customId } = interaction;
          const menu = selectMenus.get(customId);

          if(!menu) return new Error("There is no code for this select menu");

          try {
            await menu.execute(interaction, client)
          } catch (error) {
            console.error(error);
          }
    }
}
}
/**
 * @INFO
 * Bot Coded by IamSohom829#0829 & Alpha•#9258
 * You can't use this codes without permissions! 
 */