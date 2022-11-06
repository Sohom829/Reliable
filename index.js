const {
  Client,
  Collection,
  GatewayIntentBits,
  EmbedBuilder,
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
    { name: `/help`, type: 2 },
    { name: `with ${client.guilds.cache.size} Servers`, type: 0 },
    {
      name: `${client.guilds.cache.reduce(
        (a, b) => a + b.memberCount,
        0
      )} Members`,
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
    reaction: "🎉",
    lastChance: {
      enabled: true,
      content: "⚠️ **LAST CHANCE TO ENTER !** ⚠️",
      threshold: 10000,
      embedColor: "#0398fc",
    },
  },
});

console.log(chalk.green(" ✅ • Reliable Anticrash Connected"));
process.on("unhandledRejection", (reason, p) => {
  console.log(chalk.red(" [🔰 Reliable Manager] —— Unhandled Rejection/Catch"));
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.log(chalk.red(" [🔰 Reliable Manager] —— Uncaught Exception/Catch"));
  console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log(
    chalk.red("[🔰 Reliable Manager] —— Uncaught Exception/Catch (MONITOR)")
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
