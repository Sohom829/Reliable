const {
  Client,
  Collection,
  GatewayIntentBits,
  EmbedBuilder,
  Colors,
  ReactionManager,
} = require("discord.js");
const chalk = require("chalk");
const fs = require("fs");
const express = require("express");
const config = require("./config");
const app = express();
const process = require("node:process");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

app.get("/", (req, res) => {
  res.send("Reliable System Loaded");
});

app.listen(3001, () => {
  console.log("");
});
require("dotenv").config();
// const keepAlive = require('./server.js'); [IF YOU USE REPLIT] [REMOVE '//']

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandsArray = [];

const functionFolders = fs.readdirSync("./functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./functions/${folder}`)
    .filter((file) => file.endsWith(".js"));

  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}
client.on("ready", () => {
  const activities = [
    { name: `/bot help`, type: 2 },
    { name: `with ${client.guilds.cache.size} Servers`, type: 0 },
    {
      name: `${client.guilds.cache.reduce((a,b) => a+b.memberCount, 0)} Members`,
      type: 3,
    },
    { name: `Reliable Development`, type: 5 },
  ];
  const status = ["dnd", "idle"];
  let i = 0;
  setInterval(() => {
    if (i >= activities.length) i = 0;
    client.user.setActivity(activities[i]);
    i++;
  }, 5000);

  let s = 0;
  setInterval(() => {
    if (s >= activities.length) s = 0;
    client.user.setStatus(status[s]);
    s++;
  }, 30000);
});

const { GiveawaysManager } = require("discord-giveaways");
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./giveaways.json",
  default: {
    botsCanWin: false,
    embedColor: "#0398fc",
    image:
      "https://t3.ftcdn.net/jpg/01/96/01/64/360_F_196016432_MTICUoNu3JyK91qoNblvjOziBkNV3D4F.jpg",
    embedColorEnd: "#0398fc",
    reaction: "<:reliable_giveaway:1038804433116614718>",
    lastChance: {
      enabled: true,
      content:
        "<a:reliable_alert:1039201857819648000> **LAST CHANCE TO ENTER !** <a:reliable_alert:1039201857819648000>",
      threshold: 10000,
      embedColor: "#0398fc",
      pauseOptions: {
        isPaused: true,
        content:
          "<a:reliable_alert:1039201857819648000>  **THIS GIVEAWAY IS PAUSED !** <a:reliable_alert:1039201857819648000>",
        unpauseAfter: null,
        embedColor: "#0398fc",
        infiniteDurationText: "`**NEVER**`",
      },
    },
  },
});

const { Player } = require("discord-music-player");
const player = new Player(client, {
  leaveOnEmpty: false,
});

client.player = player;

new Player(client, {
  leaveOnEnd: true,
  leaveOnStop: true,
  leaveOnEmpty: true,
  deafenOnJoin: true,
  timeout: 10,
  volume: 150,
  quality: "high",
});

client.on("guildCreate", (guild) => {
  const channelId = "1029808552790994954";
  const channel = client.channels.cache.get(channelId);
  const embed10 = new EmbedBuilder()
    .setTitle("Reliable - Server Joining Log")
    .setDescription(
      `> **<:reliable_alert2:1047568844752945183>  SERVER ALERT**`
    )
    .setFooter({ text: "©2022 | Reliable" })
    .setTimestamp()
    .addFields(
      {
        name: "`🤩` | Guild Info",
        value: `**\`•\` Guild Name**: **\`${guild.name}\`**
**\`•\` Guild ID**: **\`${guild.id}\`**
**\`•\` Guild Members**: **\`${guild.memberCount}\`**`,
      },
      {
        name: "`👑` | Guild Owner Info",
        value: `**\`•\` Owner Name**: **<@${guild.ownerId}>**
**\`•\` Owner ID**: **\`${guild.ownerId}\`**
**\`•\` Guild Members**: **\`${guild.memberCount}\`**`,
      },
      {
        name: "`🏆` | Reliable Statistics",
        value: `**\`•\` Total Guilds**: **\`${client.guilds.cache.size}\`**
**\`•\` Total Users**: **\`${guild.ownerId}\`**
**\`•\` Guild Members**: **\`${client.users.cache.size}\`**`,
      }
    );
  channel.send({ embeds: [embed10] });
});

client.on("guildDelete", (guild) => {
  const channelId = "1029808650438590464";
  const channel = client.channels.cache.get(channelId);
  const embed11 = new EmbedBuilder()
    .setTitle("Reliable - Server Leave Log")
    .setDescription(
      `> **<:reliable_alert2:1047568844752945183>  SERVER ALERT**`
    )
    .setFooter({ text: "©2022 | Reliable" })
    .setTimestamp()
    .addFields(
      {
        name: "`🤩` | Guild Info",
        value: `**\`•\` Guild Name**: **\`${guild.name}\`**
**\`•\` Guild ID**: **\`${guild.id}\`**
**\`•\` Guild Members**: **\`${guild.memberCount}\`**`,
      },
      {
        name: "`👑` | Guild Owner Info",
        value: `**\`•\` Owner Name**: **<@${guild.ownerId}>**
**\`•\` Owner ID**: **\`${guild.ownerId}\`**
**\`•\` Guild Members**: **\`${guild.memberCount}\`**`,
      },
      {
        name: "`🏆` | Reliable Statistics",
        value: `**\`•\` Total Guilds**: **\`${client.guilds.cache.size}\`**
**\`•\` Total Users**: **\`${client.users.cache.size}\`**`,
      }
    );
  channel.send({ embeds: [embed11] });
});

console.log(
  chalk.cyan("[ INFORMATION ]") +
    chalk.white.bold(" | ") +
    chalk.blue(`${new Date().toLocaleDateString()}`) +
    chalk.white.bold(" | ") +
    chalk.cyan("AntiCrash Connection") +
    chalk.white(": ") +
    chalk.greenBright(`Connected`)
);
process.on("unhandledRejection", (reason, p) => {
  console.log(
    chalk.greenBright("[ ANTICRASH ]") +
      chalk.white.bold(" | ") +
      chalk.red.bold(`${new Date().toLocaleDateString()}`) +
      chalk.white.bold(" | ") +
      chalk.cyan("Unhandled") +
      chalk.white(": ") +
      chalk.red.bold(`Rejection/Catch`)
  );
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.log(
    chalk.greenBright("[ ANTICRASH ]") +
      chalk.white.bold(" | ") +
      chalk.red.bold(`${new Date().toLocaleDateString()}`) +
      chalk.white.bold(" | ") +
      chalk.cyan("Uncaught") +
      chalk.white(": ") +
      chalk.red.bold(`Exception/Catch`)
  );
  console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log(
    chalk.greenBright("[ ANTICRASH ]") +
      chalk.white.bold(" | ") +
      chalk.red.bold(`${new Date().toLocaleDateString()}`) +
      chalk.white.bold(" | ") +
      chalk.cyan("Uncaught") +
      chalk.white(": ") +
      chalk.red.bold(`Exception/Catch (MONITOR)`)
  );
  console.log(err, origin);
});
const secret = process.env.Secret;
if (secret !== process.env.Token) {
  throw new TypeError("Secret is not same as Secret");
}
client.handleCommands();
client.handleEvents();
client.handleComponents();
client.login(process.env.Token);

/**
 * @INFO
 * Bot Coded by IamSohom829#0829 & Alpha•#9258
 * You can't use this codes without permissions!
 */
