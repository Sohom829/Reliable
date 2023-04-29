const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: `select`,
  },
  async execute(interaction, client) {
    const selected = interaction.values[0];
    const ModerationEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} - Moderation Panel`)
      .setColor("#2F3136")
      .setFooter({ text: "Made with 🖤 by Sohom829#8350 & Alpha•#9258" })
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setDescription(
        `• __**Moderation Commands**__
        
\`\`\`yml\n
mod kick: Kicks a member
mod ban: Bans a member
mod clear: Clears messages in channel
mod timeout: Sets timeout to a user
mod rolememberinfo: Shows you the users are in the role mentioned
warn add: Adds warn to a user
warn remove: Removes warn of a user
warn check: Check warning(s) of a user
warn removeall: Remove all warns of a user
mod lock: Locks a channel
mod unlock: Unlocks a channel
mod list-bans: Lists banned users of the server
mod addrole: Adds a role to a user
mod removerole: Removes a role from a user\`\`\``
      );

    const BotEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} - Default Panel`)
      .setColor("#2F3136")
      .setFooter({ text: "Made with 🖤 by Sohom829#8350 & Alpha•#9258" })
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
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
      .setColor("#2F3136")
      .setFooter({ text: "Made with 🖤 by Sohom829#8350 & Alpha•#9258" })
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setDescription(
        `• __**Information Commands**__
        
\`\`\`yml\n
info covid-world-wide: Track worldwide COVID-19 case
info covid-countries: Track a country COVID-19 cases
info user: get user info
info member-count: see the total members of your server
info reddit: request random content from Reddit via subreddits.
info server: Displays information about the server.
info role: View info about a role
info channel: View info about a channel
info roleperms: Shows a role permissions
info userperms: Shows a user permissions
info pokemon: Returns pokemon information
info firstmessage: Fetches First Message in a Channel
info oldestmember: Gets information of the oldest discord user in the server.
info youngestmember: Gets information of the youngest discord user in the server.
info anime: Search for information about Anime by given name
info npm: Check for packages on npm
info twitter: Gets twitter account information
info apod: Astronomy Picture of the Day
info translate: Translate text to any language
info movie: returns movie information
info weather: Shows a location weather
info country: Shows a country information
info worldclock: Information about worldclock.
\`\`\``
      );
    const FunEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} - Fun Panel`)
      .setColor("#2F3136")
      .setFooter({ text: "Made with 🖤 by Sohom829#8350 & Alpha•#9258" })
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setDescription(
        `• __**Fun Commands**__
        
\`\`\`yml\n
fun bird-fact: Generate a random bird facts
fun cat-fact: Generate a random cat facts
fun joke: Funny Jokes
fun quotes: Sends random quotes
fun meme: Generate some memes
fun date-facts: Get a fact about a date
fun year-facts: Get a fact about a year
fun lyrics: Gets you any music lyrics
fun 8ball: Ask the magical ball
fun pp: PP size
fun roast: Roast someone.
fun reverse: Send reverse words.
hack: Hack a user.
\`\`\``
      );

    const ImageEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} - Image Panel`)
      .setColor("#2F3136")
      .setFooter({ text: "Made with 🖤 by Sohom829#8350 & Alpha•#9258" })
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setDescription(
        `• __**Image Commands**__
        
\`\`\`yml\n
image kill: kill anybody but in discord
image nuke: nuke a server (FAKE) !
image slap: Returns a slap Image!
image grave: Grave someone.
image jail: Jail anyone!
image distract: Distracted Dude
image heaven: Returns heaven.
image firsttime: First time dude?
image emergency-meeting: Emergency! Mayday!
\`\`\``
      );

      const NotepadEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} - Notepad Panel`)
      .setColor("#2F3136")
      .setFooter({ text: "Made with 🖤 by Sohom829#8350 & Alpha•#9258" })
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setDescription(
        `• __**Notepad Commands**__
        
\`\`\`yml\n
notepad add: Add your notes.
notepad delete: Delete your notes.
notepad edit: Edit your notes.
notepad notes: List your notes.
\`\`\``
      );

    const ServerEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} - Server Management Panel`)
      .setColor("#2F3136")
      .setFooter({ text: "Made with 🖤 by Sohom829#8350 & Alpha•#9258" })
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setDescription(
        `• __**Server Management Commands**__
        
\`\`\`yml\n
announce: Announce any thing with embed
setup-rules: Setup basic rules for your server
say: repeat whatever you say. requires manage messages perms
\`\`\``
      );

    const EconomyEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} - Economy Panel`)
      .setColor("#2F3136")
      .setFooter({ text: "Made with 🖤 by Sohom829#8350 & Alpha•#9258" })
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setDescription(
        `• __**Economy Commands**__
        
\`\`\`yml\n
economy work: work and earn rebbles
economy balance: Gets a user balance
economy daily: Daily Rewards
economy deposit: deposit your money to bank
economy withdraw: withdraw your money from bank
economy beg: Begs for rebbles
economy pay: Pays someone rebbles
economy slots: Starts a slot game
economy hunt: Hunts animals and gives you rebbles
economy search: Searchs some rebbles
economy leaderboard: See the global rebbles riches
\`\`\``
      );

    const GiveawayEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} - Giveaway Panel`)
      .setColor("#2F3136")
      .setFooter({ text: "Made with 🖤 by Sohom829#8350 & Alpha•#9258" })
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
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
      .setColor("#2F3136")
      .setFooter({ text: "Made with 🖤 by Sohom829#8350 & Alpha•#9258" })
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setDescription(
        `• __**Minecraft Commands**__
        
\`\`\`yml\n
minecraft server-status: Shows you any server status
minecraft favicon: Gets minecraft server icon
\`\`\``
      );

    const GameEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} - Games Panel`)
      .setColor("#2F3136")
      .setFooter({ text: "Made with 🖤 by Sohom829#8350 & Alpha•#9258" })
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setDescription(
        `• __**Games Commands**__
        
\`\`\`yml\n
game age: Predict the age of a name
game lovemeter: Displays love meter between two users.
game pickupline: Generate some pickuplines!
game snake: Play a snake game!
game wouldyou: Play a wouldyourather game!
game hangman: Play a hangman game!
game minesweeper: Play a minesweeper game!
game connect4: Play a connect4 Game!
game rockpaperscissors: Play a Rock Paper Scissors Game!
game twozerofoureight: Play a 2048 Game!
game tictactoe: Play a Tic Tac Toe Game!
game wordle: Play a wordle Game!
game trivia: Play a trivia Game!
game akinator: Play a akinator Game!
\`\`\``
      );

      const TicketEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} - Ticket Panel`)
      .setColor("#2F3136")
      .setFooter({ text: "Made with 🖤 by Sohom829#8350 & Alpha•#9258" })
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setDescription(
        `• __**Ticket Commands**__
        
\`\`\`yml\n
ticketsetup: Create a ticket message.
ticket-guideline: Facing error? Execute this command and know how to fix the issue.
ticket: Add or remove members from the ticket
\`\`\``
      );
      const BirthdayEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} - Birthday Panel`)
      .setColor("#2F3136")
      .setFooter({ text: "Made with 🖤 by Sohom829#8350 & Alpha•#9258" })
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setDescription(
        `• __**Birthday Commands**__
        
\`\`\`yml\n
birthday set: Save a birthday date and month.
birthday check: Check birtdays!
birthday list: List birthdays!
birthday remove: Delete a birthday date.
\`\`\``
      );

      const AfkEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} - Afk Panel`)
      .setColor("#2F3136")
      .setFooter({ text: "Made with 🖤 by Sohom829#8350 & Alpha•#9258" })
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setDescription(
        `• __**AFK Commands**__
        
\`\`\`yml\n
afk set: Set as AFK Status.
afk list: List of AFK users.
afk remove: Remove AFK Status
\`\`\``
      );

    const UtilityEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} - Utility Panel`)
      .setColor("#2F3136")
      .setFooter({ text: "Made with 🖤 by Sohom829#8350 & Alpha•#9258" })
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setDescription(
        `• __**Utility Commands**__
        
\`\`\`yml\n
utility wikipedia: Search something in wikipedia.
utility avatar: Get user avatar
utility choose: choose something for you
utility server-icon: Get server icon.
utility timer: Sets timer for you
utility calculator: Calculate and solve equations
utility art: AI Generated Art
utility iss-location: Get information about ISS Location.
utility news: Shows top 5 news
utility bmi: Calculate your BMI Index.
\`\`\``
      );
      const FamilyEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} - Family Panel`)
      .setColor("#2F3136")
      .setFooter({ text: "Made with 🖤 by Sohom829#8350 & Alpha•#9258" })
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setDescription(
        `• __**Family Commands**__
        
\`\`\`yml\n
family propose: Propose your love.
family divorce: Divorce your partner.
family adopt: Adopt a new member.
family disown: Disown a member.
family delete: Delete your family.
\`\`\``
      );

    if (selected === "first_option") {
      return interaction.reply({ embeds: [ModerationEmbed], ephemeral: true });
    } else if (selected === "second_option") {
      return interaction.reply({ embeds: [InfoEmbed], ephemeral: true });
    } else if (selected === "third_option") {
      return interaction.reply({ embeds: [FunEmbed], ephemeral: true });
    } else if (selected === "fourth_option") {
      return interaction.reply({ embeds: [EconomyEmbed], ephemeral: true });
    } else if (selected === "fifth_option") {
      return interaction.reply({ embeds: [ServerEmbed], ephemeral: true });
    } else if (selected === "sixth_option") {
      return interaction.reply({ embeds: [GiveawayEmbed], ephemeral: true });
    } else if (selected === "seventh_option") {
      return interaction.reply({ embeds: [BotEmbed], ephemeral: true });
    } else if (selected === "eighth_option") {
      return interaction.reply({ embeds: [MinecraftEmbed], ephemeral: true });
    } else if (selected === "nineth_option") {
      return interaction.reply({ embeds: [UtilityEmbed], ephemeral: true });
    } else if (selected === "tenth_option") {
      return interaction.reply({ embeds: [ImageEmbed], ephemeral: true });
    } else if (selected === "eleventh_option") {
      return interaction.reply({ embeds: [GameEmbed], ephemeral: true });
    } else if (selected === "tweleveth_option") {
      return interaction.reply({ embeds: [TicketEmbed], ephemeral: true });
    } else if (selected === "thirdteen_option") {
      return interaction.reply({ embeds: [AfkEmbed], ephemeral: true });
    } else if (selected === "forthteen_option") {
      return interaction.reply({ embeds: [BirthdayEmbed], ephemeral: true });
    } else if (selected === "fifthteen_option") {
      return interaction.reply({ embeds: [NotepadEmbed], ephemeral: true });
    } else if (selected === "sixteen_option") {
      return interaction.reply({ embeds: [FamilyEmbed], ephemeral: true });
    }
  },
};
