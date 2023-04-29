const chalk = require("chalk");
const mongoose = require("mongoose");
require("dotenv").config();
const Database = process.env.DB;
const { logTaDAsync, renderDoubledLinesAsync } = require("syc-logger");
module.exports = {
  name: "ready",
  once: true,

  execute(client) {
    const line = renderDoubledLinesAsync(30);
    console.log("");
    console.log(
      chalk.white.bold("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫") +
        chalk.blue.bold("Bot Info") +
        chalk.white.bold("┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    );
    console.log(
      chalk.white(
        `${
          client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1
            ? "Users:"
            : "User:"
        }`
      ),
      chalk.red(
        `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`
      ),
      chalk.white("||"),
      chalk.white(`${client.guilds.cache.size > 1 ? "Servers:" : "Server:"}`),
      chalk.red(`${client.guilds.cache.size}`)
    );
    console.log(
      chalk.white(`Prefix:` + chalk.red(" /")),
      chalk.white("||"),
      chalk.white(`Commands:`),
      chalk.red(`${client.commands.size}`)
    );

    console.log("");
    console.log(
      chalk.white.bold("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫") +
        chalk.blue.bold("Statistics") +
        chalk.white.bold("┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    );
    console.log(
      chalk.white(`Running on Node`),
      chalk.green(process.version),
      chalk.white("on"),
      chalk.green(`${process.platform} ${process.arch}`)
    );
    console.log(
      chalk.white("Memory:"),
      chalk.green(`${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}`),
      chalk.white("MB")
    );
    console.log(
      chalk.white("RSS:"),
      chalk.green(
        `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}`
      ),
      chalk.white("MB")
    );
    console.log("");
    console.log(
      chalk.white.bold("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫") +
        chalk.blue.bold("Client Status") +
        chalk.white.bold("┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    );

    mongoose
      .connect(Database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log(
          chalk.cyan("[ INFORMATION ]") +
            chalk.white.bold(" | ") +
            chalk.blue(`${new Date().toLocaleDateString()}`) +
            chalk.white.bold(" | ") +
            chalk.cyan("Mongo DB Connection") +
            chalk.white(": ") +
            chalk.greenBright(`Connected`)
        );
      });
    if (!Database) return;
    console.log(
      chalk.cyan("[ INFORMATION ]") +
        chalk.white.bold(" | ") +
        chalk.blue(`${new Date().toLocaleDateString()}`) +
        chalk.white.bold(" | ") +
        chalk.cyan("Mongo DB Connection") +
        chalk.white(": ") +
        chalk.greenBright(`Disconnected`)
    );
    console.log(
      chalk.cyan("[ INFORMATION ]") +
        chalk.white.bold(" | ") +
        chalk.blue(`${new Date().toLocaleDateString()}`) +
        chalk.white.bold(" | ") +
        chalk.cyan("Logged in as") +
        chalk.white(": ") +
        chalk.greenBright(`${client.user.tag}`)
    );
  },
};
