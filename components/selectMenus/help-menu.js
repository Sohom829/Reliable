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
        `• __**Moderation Commands**__
        
\`\`\`yml\n
mod kick: Kicks a member
mod ban: Bans a member
mod clear: Clears messages in channel
mod timeout: Sets timeout to a user
mod rolememberinfo: Shows you the users are in the role mentioned
warn add: Adds warn to a user
warn remove: Removes warn of a user\`\`\``
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
        `• __**Bot Commands**__
        
\`\`\`yml\n
bot info: Returns bot information
bot credits: Returns bot creators
bot help: Returns this menu
bot ping: Returns bot ping
bot uptime: Returns bot uptime\`\`\``
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
        `• __**Information Commands**__
        
\`\`\`yml\n
info covid-world-wide: Track worldwide COVID-19 case
info covid-countries: Track a country COVID-19 cases
quotes: Sends random quotes
info user: get user info
info member-count: see the total members of your server
info reddit: request random content from Reddit via subreddits.
info server: Displays information about the server.
info role: View info about a role
info channel: View info about a channel
info roleperms: Shows a role permissions
info userperms: Shows a user permissions
info pokemon: Returns pokemon information
info anime: Search for information about Anime by given name
info npm: Check for packages on npm
\`\`\``
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
        `• __**Fun Commands**__
        
\`\`\`yml\n
fun kill: kill anybody but in discord
fun nuke: nuke a server (FAKE) !
fun bird-fact: Generate a random bird facts
fun cat-fact: Generate a random cat facts
fun joke: Funny Jokes
fun slap: Returns a slap Image!
fun grave: Grave someone.
fun jail: Jail anyone!
fun distract: Distracted Dude
fun eject: Eject some from spaceship.
fun heaven: Returns heaven.
fun firsttime: First time dude?
fun emergency-meeting: Emergency! Mayday!
fun meme: Generate some memes
fun date-facts: Get a fact about a date
fun year-facts: Get a fact about a year
fun lyrics: Gets you any music lyrics
fun age: Predict the age of a name
\`\`\``
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
        `• __**Giveaway Commands**__
        
\`\`\`yml\n
giveaway start: Start a giveaway
giveaway reroll: Reroll a giveaway
giveaway end: End a giveaway
giveaway delete: Deletes a giveaway
giveaway pause: Pauses a giveaway
giveaway unpause: Unpauses a giveaway
\`\`\``
      );

    const MinecraftEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} - Minecraft Panel`)
      .setColor("#0398fc")
      .setFooter({ text: "Made with 🖤 by Sohom829#8350 & Alpha•#9258" })
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setImage(
        `https://media.discordapp.net/attachments/1029807885116506122/1034897221109424178/IMG_20221025_221311.jpg`
      )
      .setDescription(
        `• __**Minecraft Commands**__
        
\`\`\`yml\n
minecraft server-status: Shows you any server status
\`\`\``
      );

    const UtilityEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} - Utility Panel`)
      .setColor("#0398fc")
      .setFooter({ text: "Made with 🖤 by Sohom829#8350 & Alpha•#9258" })
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setImage(
        `https://media.discordapp.net/attachments/1029807885116506122/1034897221109424178/IMG_20221025_221311.jpg`
      )
      .setDescription(
        `• __**Utility Commands**__
        
\`\`\`yml\n
utility wikipedia: Search something in wikipedia.
utility avatar: Get user avatar
utility choose: choose something for you
utility server-icon: Get server icon.
say: repeat whatever you say. requires manage messages perms
\`\`\``
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
      return interaction.reply({ embeds: [MinecraftEmbed], ephemeral: true });
    } else if (selected === "seventh_option") {
      return interaction.reply({ embeds: [UtilityEmbed], ephemeral: true });
    }
  },
};
