const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  AttachmentBuilder,
  ActionRowBuilder,
} = require("discord.js");
const fetch = require("node-fetch");
const { Snake, WouldYouRather, Hangman, Minesweeper, Connect4, TwoZeroFourEight, TicTacToe, Wordle, Trivia, RockPaperScissors } = require('discord-gamecord');
const akinator = require("discord.js-akinator");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("game")
    .setDescription("Get all game commands")
  .addSubcommand((sub) =>
  sub
    .setName("age")
    .setDescription("Predict the age of a name")
    .addStringOption((op) =>
      op
        .setName("name")
        .setDescription("Provide the name")
        .setRequired(true)
    )
)
.addSubcommand((sub) =>
sub
  .setName("rockpaperscissors")
  .setDescription("Play a game of Rock Paper Scissors!")
  .addUserOption((op) =>
    op
      .setName("user")
      .setDescription("Mention a user")
      .setRequired(true)
  )
)
.addSubcommand((sub) =>
sub
.setName("connect4")
.setDescription("Play a game of rock!")
.addUserOption((op) =>
  op
    .setName("user")
    .setDescription("Mention a user")
    .setRequired(true)
)
)
.addSubcommand((sub) =>
sub
.setName("trivia")
.setDescription("Play a game of trivia!")
.addStringOption((option) =>
     option
    .setName('mode')
    .setDescription('The mode to play with (default: single)')
          .addChoices(
    { name: "Single", value: "easy" },
    { name: "Multiple", value: "multiple" }
  )
    .setRequired(false)
)
.addStringOption((option) =>
     option
    .setName('difficulty')
    .setDescription('The difficulty to play with (default: medium)')
          .addChoices(
    { name: "Easy", value: "easy" },
    { name: "Medium", value: "medium" },
    { name: "Hard", value: "hard" }
  )
    .setRequired(false)
)
)
.addSubcommand((sub) =>
sub
.setName("tictactoe")
.setDescription("Play a game of Tic Tac Toe game!")
.addUserOption((op) =>
  op
    .setName("user")
    .setDescription("Mention a user")
    .setRequired(true)
)
)
.addSubcommand((sub) =>
sub.setName("pickupline").setDescription("👉 Generate some pickuplines!")
)
.addSubcommand((sub) =>
sub.setName("snake").setDescription("Play a game of snake!")
)
.addSubcommand((sub) =>
sub.setName("twozerofoureight").setDescription("Play a game of 2048!")
)
.addSubcommand((sub) =>
sub.setName("hangman").setDescription("Play a game of hangman!")
)
.addSubcommand((sub) =>
sub.setName("minesweeper").setDescription("Play a game of minesweeper!")
)
.addSubcommand((sub) =>
sub.setName("wordle").setDescription("Play a game of wordle!")
)
.addSubcommand((sub) =>
sub.setName("akinator").setDescription("Play a game of akinator!")
)
.addSubcommand((sub) =>
sub
  .setName("wouldyou")
  .setDescription("Would you rather")
)
  .addSubcommand((sub) =>
    sub
      .setName("lovemeter")
      .setDescription("Displays love meter between two users.")
      .addUserOption((op) =>
        op.setName("user").setDescription("Mention the user").setRequired(true)
      )
      .addUserOption((op) =>
        op.setName("user2").setDescription("Mention the user").setRequired(false)
      )
  ),

  async execute(interaction) {

  if (interaction.options.getSubcommand() === "wouldyou") {
      const Game = new WouldYouRather({
          message: interaction,
          isSlashGame: true,
          embed: {
            title: 'Would You Rather',
            color: '#2F3136',
          },
          buttons: {
            option1: 'Option 1',
            option2: 'Option 2',
          },
          timeoutTime: 60000,
          errMessage: '> **Unable to fetch question data! Please try again.**',
          playerOnlyMessage: '> **Only {player} can use these buttons.**'
        });
        
        Game.startGame();
       } else if (interaction.options.getSubcommand() === "hangman") {
          const Game = new Hangman({
              message: interaction,
              isSlashGame: true,
              embed: {
                title: 'Hangman',
                color: '#2F3136'
              },
              hangman: { hat: '🎩', head: '😟', shirt: '👕', pants: '🩳', boots: '👞👞' },
              timeoutTime: 60000,
              theme: 'nature',
              winMessage: '> **You won! The word was `{word}`**.',
              loseMessage: '> **You lost! The word was `{word}`**.',
              playerOnlyMessage: '> **Only {player} can use these buttons.**'
            });
            
            Game.startGame();
          } else if (interaction.options.getSubcommand() === "minesweeper") {
              const Game = new Minesweeper({
                  message: interaction,
                  isSlashGame: true,
                  embed: {
                    title: 'Minesweeper',
                    color: '#2F3136',
                    description: 'Click on the buttons to reveal the blocks except mines.',
                    footer: '©2022 - 2023 | Reliable'
                  },
                  emojis: { flag: '🚩', mine: '💣' },
                  mines: 5,
                  timeoutTime: 60000,
                  winMessage: '> **You won the Game! You successfully avoided all the mines.**',
                  loseMessage: '> **You lost the Game! Beaware of the mines next time.**',
                  playerOnlyMessage: '> **Only {player} can use these buttons.**'
                });
                
                Game.startGame();
              } else if (interaction.options.getSubcommand() === "connect4") {
                  const Game = new Connect4({
                      message: interaction,
                      isSlashGame: true,
                      opponent: interaction.options.getUser('user'),
                      embed: {
                        title: 'Connect4 Game',
                        statusTitle: 'Status',
                        color: '#2F3136'
                      },
                      emojis: {
                        board: '⚪',
                        player1: '🔴',
                        player2: '🟡'
                      },
                      timeoutTime: 60000,
                      buttonStyle: 'PRIMARY',
                      turnMessage: '> **{emoji} | Its turn of player {player}**.',
                      winMessage: '> **{emoji} | **{player}** won the Connect4 Game.**',
                      tieMessage: '> **The Game tied! No one won the Game!**',
                      timeoutMessage: '> **The Game went unfinished! No one won the Game!**',
                      playerOnlyMessage: '> **Only {player} and {opponent} can use these buttons.**'
                    });
                    
                    Game.startGame();
                  } else if (interaction.options.getSubcommand() === "twozerofoureight") {
                      const Game = new TwoZeroFourEight({
                          message: interaction,
                          isSlashGame: true,
                          embed: {
                            title: '2048 Game',
                            color: '#2F3136'
                          },
                          emojis: {
                            up: '⬆️',
                            down: '⬇️',
                            left: '⬅️',
                            right: '➡️',
                          },
                          timeoutTime: 60000,
                          buttonStyle: 'PRIMARY',
                          playerOnlyMessage: '> **Only {player} can use these buttons.**'
                        });
                        
                        Game.startGame();
                      } else if (interaction.options.getSubcommand() === "tictactoe") {
                          const Game = new TicTacToe({
                              message: interaction,
                              isSlashGame: true,
                              opponent: interaction.options.getUser('user'),
                              embed: {
                                title: 'Tic Tac Toe',
                                color: '#2F3136',
                                statusTitle: 'Status',
                                overTitle: 'Game Over'
                              },
                              emojis: {
                                xButton: '❌',
                                oButton: '🔵',
                                blankButton: '➖'
                              },
                              timeoutTime: 60000,
                              xButtonStyle: 'DANGER',
                              oButtonStyle: 'SUCCESS',
                              turnMessage: '> **{emoji} | Its turn of player {player}**.',
                              winMessage: '> **{emoji} | {player} won the TicTacToe Game.**',
                              tieMessage: '> **The Game tied! No one won the Game!**',
                              timeoutMessage: '> **The Game went unfinished! No one won the Game!**',
                              playerOnlyMessage: '> **Only {player} and {opponent} can use these buttons.**'
                            });
                            
                            Game.startGame();
  } else if (interaction.options.getSubcommand() === "age") {
      const name = interaction.options.getString("name") || "";

      fetch(`https://api.agify.io/?name=${name}`)
        .then((res) => res.json())
        .then((json) => {
          const Embed = new EmbedBuilder()
            .setTitle("Age Guess")
            .addFields({
              name: "Age Guessing",
              value: `**\`•\` Name**: ${name || "**`Nothing Found`**"}
**\`•\` Age**: ${json.age || "**`Nothing Found`**"}
**\`•\` Count**: ${json.count || "**`Nothing Found`**"}`,
            })
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" })
            .setTimestamp();
          interaction.reply({ embeds: [Embed] });
        });
      } else if (interaction.options.getSubcommand() === "pickupline") {
          try {
            const line = [
              "Do you like raisins? How do you feel about a date?",
              "I hope you know CPR because you take my breath away!",
              "You've made me so nervous that I've totally forgotten my standard pick-up line.",
              "Are you a trap card? Because I’ve fallen for you.",
              "Roses are red, violets are blue, omae wa mo shindeiru",
              "Baby, come with me and you'll be Going Merry.",
              "I think I need a paralyze heal! Because you're stunning!",
              "I'm no photographer, but I can picture us together.",
              "Do you have a Death Note? Because everytime you smile, I feel like I'm having a heart attack!",
              "Are you Saitama? Because you've got me down in one move!",
              "Are you French? Because Eiffel for you.",
              "You must be better than Kuuhaku. Because when I first saw you, you already won my heart!",
              "I must be in a museum, because you truly are a work of art.",
              "Do you believe in fate? How about you stay the night? (Fate/Night; this one wasn't too apparant..)",
              "Just say yes and I'll give you more than seven Eurekas!",
              "You're like the 3D Maneuver gear. I won't stand a chance in this world without you!",
              "You remind me of Menma. Because even when I can't see you, I still feel you inside my heart!",
              "If I just had a Geass, I'd command you to be mine!",
              "Extra cursed student or not, I wont even think of ignoring you! (From anime *another*; not too apparant..rip)",
              "I don't need a Sharingan to see how beautiful you are!",
              "Are you Kikyo? Because I think you shot an arrow through my heart!",
              "Even if it means risking my existence, I'll cross different world lines just to find you! (Steins;Gate)",
              "Hey! Are you the railgun? Because I can feel a spark! (Toaru Kagaku no Railgun)",
              "Are you from the Bath House? Because you take my spirit away. (Spirited Away)",
              "Omae wa mo shindeiru!",
              "You must be Kira, because you just gave me a heart attack!",
              "You're cooler than Grey's ice shell!",
              "You're more delicious than Ciel's soul!",
              "Our love is like Grell, it never seems to die!",
              "We were born to make history!!",
              "If you were a potato, you would be a good potato.",
              "I don't need a Death Note, your beauty is killer!",
              "I love you as much as Ryuk loves apples!",
              "I'll buy you ice cream, just be careful not to drop it  ...🍦",
              "Call me All Might, because I’m just looking to Texas Smash!",
              "There is something wrong with my cell phone. It doesn't have your number in it.",
              "I don't need pickup lines, because they don't work on corpses.",
              "Kanye feel the love?",
              "You can take me to flavour town!!",
              "Hey, you're pretty good!!",
              "I'd go full homo for you!",
              "I'm a bot that no one can beat so get your mind out of this thing",
              "I wish they'd all die, except for you!",
            ];
    
            const Embed = new EmbedBuilder()
              .setTimestamp()
              .setColor("#2F3136")
              .setFooter({ text: "©2022 - 2023 | Reliable" })
              .setTitle(`Pickup Line`)
              .setDescription(
                `\`\`\`${line[Math.round(Math.random() * (line.length - 1))]}\`\`\``
              );
    
            interaction.reply({ embeds: [Embed] });
          } catch (err) {
            console.log(err);
            const err_embed = new EmbedBuilder()
              .setTitle("Error")
              .setDescription(
                "**<:reliable_wrong:1043155193077960764> | Pickup Machine crashed! Trying to fix it.**"
              )
              .setTimestamp()
              .setColor("#2F3136")
              .setFooter({ text: "©2022 - 2023 | Reliable" });
    
            interaction.reply({ embeds: [err_embed], ephemeral: true });
          }
        } else if (interaction.options.getSubcommand() === "lovemeter") {
          try {
            const user = interaction.options.getMember("user");
            const user2 =
              interaction.options.getMember("user2") || interaction.member;
            if (user.id === user2.id) {
              const err_embed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription(
                  "**<:reliable_wrong:1043155193077960764> |  I can only calculate love percentage between two different people.**"
                )
                .setTimestamp()
                .setColor("#2F3136")
                .setFooter({ text: "©2022 - 2023 | Reliable" });
    
              interaction.reply({ embeds: [err_embed], ephemeral: true });
            }
    
            const love = Math.random() * 100;
            const loveIndex = Math.floor(love / 10);
            const loveLevel = "❤️".repeat(loveIndex) + "♡".repeat(10 - loveIndex);
    
            const Embed = new EmbedBuilder()
              .setTimestamp()
              .setColor("#2F3136")
              .setFooter({ text: "©2022 - 2023 | Reliable" })
              .setTitle(`❤️ | Love`)
              .addFields(
                {
                  name: "**`•`** Lovers",
                  value: `**\`${user.displayName}\`** and **\`${user2.displayName}\`**`,
                  inline: true,
                },
                {
                  name: "**`•`** Love Meter",
                  value: `**\`${Math.floor(love)}%\`: \`${loveLevel}\`**`,
                  inline: true,
                }
              );
            interaction.reply({ embeds: [Embed] });
          } catch (err) {
            const err_embed = new EmbedBuilder()
              .setTitle("Error")
              .setDescription(
                "**<:reliable_wrong:1043155193077960764> | Love Machine crashed! Trying to fix it.**"
              )
              .setTimestamp()
              .setColor("#2F3136")
              .setFooter({ text: "©2022 - 2023 | Reliable" });
    
            interaction.reply({ embeds: [err_embed], ephemeral: true });
          }
      } else if (interaction.options.getSubcommand() === "snake") {

          const Game = new Snake({
              message: interaction,
              isSlashGame: true,
              embed: {
                title: 'Snake Game',
                overTitle: 'Game Over',
                color: '#2F3136'
              },
              emojis: {
                board: '⬛',
                food: '🍎',
                up: '⬆️', 
                down: '⬇️',
                left: '⬅️',
                right: '➡️',
              },
              stopButton: 'Stop',
              timeoutTime: 60000,
              snake: { head: '🟢', body: '🟩', tail: '🟢', over: '💀' },
              foods: ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽'],
              playerOnlyMessage: '> **Only {player} can use these buttons.**'
            });
      
      Game.startGame();

  } else if (interaction.options.getSubcommand() === "wordle") {

      const Game = new Wordle({
          message: interaction,
          isSlashGame: true,
          embed: {
            title: 'Wordle',
            color: '#2F3136',
          },
          customWord: null,
          timeoutTime: 60000,
          winMessage: '> **You won! The word was `{word}`**.',
          loseMessage: '> **You lost! The word was `{word}`**.',
          playerOnlyMessage: '> **Only {player} can use these buttons.**'
        });
        
        Game.startGame();

      } else if (interaction.options.getSubcommand() === "trivia") {

          const Game = new Trivia({
              message: interaction,
              isSlashGame: true,
              embed: {
                title: 'Trivia',
                color: '#2F3136',
                description: '> **You have `60` seconds to guess the answer.**'
              },
              timeoutTime: 60000,
              buttonStyle: 'PRIMARY',
              trueButtonStyle: 'SUCCESS',
              falseButtonStyle: 'DANGER',
              mode: interaction.options.getString("mode") || 'single',
              difficulty: interaction.options.getString("difficulty") || 'medium',
              winMessage: '> **You won! The correct answer is `{answer}`.**',
              loseMessage: '> **You lost! The correct answer is `{answer}`.**',
              errMessage: '> **Unable to fetch question data! Please try again.**',
              playerOnlyMessage: '> **Only {player} can use these buttons.**'
            });
            
            Game.startGame();
          } else if (interaction.options.getSubcommand() === "rockpaperscissors") {

            const Game = new RockPaperScissors({
              message: interaction,
              isSlashGame: true,
              opponent: interaction.options.getUser('user'),
              embed: {
                title: 'Rock Paper Scissors',
                color: '#2F3136',
                description: '> **Press a button below to make a choice.**'
              },
              buttons: {
                rock: 'Rock',
                paper: 'Paper',
                scissors: 'Scissors'
              },
              emojis: {
                rock: '🌑',
                paper: '📰',
                scissors: '✂️'
              },
              timeoutTime: 60000,
              buttonStyle: 'PRIMARY',
              pickMessage: '> **You choose {emoji}.**',
              winMessage: '**{player}** won the Game! Congratulations!',
              tieMessage: '> **The Game tied! No one won the Game!**',
              timeoutMessage: '> **The Game went unfinished! No one won the Game!**',
              playerOnlyMessage: '> **Only {player} and {opponent} can use these buttons.**'
            });
              
              Game.startGame();
          } else if (interaction.options.getSubcommand() === "akinator") {

              akinator(interaction, {
                  language: "en", // Defaults to "en"
                  childMode: "false", // Defaults to "false"
                  gameType: "character", // Defaults to "character"
                  useButtons: "true", // Defaults to "false"
                  embedColor: "#2F3136" // Defaults to "Random"
              });

        } else {
          interaction.reply({ content: `No slash command choosed.` });
        }
  }
}

/**
 * @Author Reliable Inc.
 * @Copyright ©2022 - 2023 | Reliable Inc, All rights reserved.
 * @CodedBy Mohtasim Alam Sohom, Sajidur Rahman Tahsin
 */