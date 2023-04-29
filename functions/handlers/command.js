const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();
const fs = require("fs");
const chalk = require("chalk");
var AsciiTable = require("ascii-table");
const { logTaDAsync, renderLines, logEmoji } = require("syc-logger");
var table = new AsciiTable();
table
  .setHeading("━━━━━━━━━━━━━┫ Slash Commands ┣━━━━━━━━━━━━━", "")
  .setBorder("|", "═", "0", "0");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandsArray } = client;

      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandsArray.push(command.data.toJSON());

        table.addRow(command.data.name, "» Success «");
      }
    }

    const clientId = process.env.CLIENT_ID;
    const rest = new REST({ version: `9` }).setToken(process.env.Token);

    try {
      console.log(
        chalk.cyan("[ INFORMATION ]") +
          chalk.white.bold(" | ") +
          chalk.blue(`${new Date().toLocaleDateString()}`) +
          chalk.white.bold(" | ") +
          chalk.cyan("Application Commands (/)") +
          chalk.white(": ") +
          chalk.greenBright(`Refresing`)
      );
      console.log(chalk.cyan.bold(table.toString()));

      await rest.put(Routes.applicationCommands(clientId), {
        body: client.commandsArray,
      });
      console.log(
        chalk.cyan("[ INFORMATION ]") +
          chalk.white.bold(" | ") +
          chalk.blue(`${new Date().toLocaleDateString()}`) +
          chalk.white.bold(" | ") +
          chalk.cyan("Slash Commands (/)") +
          chalk.white(": ") +
          chalk.greenBright(`Connected`)
      );
    } catch (err) {
      console.log(err);
    }
  };
};

/**
 * @INFO
 * Bot Coded by IamSohom829#0829 & Alpha•#9258
 * You can't use this codes without permissions!
 */
