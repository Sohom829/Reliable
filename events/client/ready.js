const chalk = require("chalk");
const mongoose = require("mongoose");
const Database = process.env.DB;
module.exports = {
  name: "ready",
  once: true,
  
  execute(client) {
      console.log("\n")
      console.log(chalk.yellow(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`))
       console.log(chalk.red("Reliable was Designed by the Relaible Development! Please be careful & ask the developers before using it!"));
       console.log(chalk.green(`${client.user.tag} is online`))    
       console.log(chalk.blue("©2022 Reliable | All rights reserved"))
       console.log(chalk.yellow(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`))    
    
    if(!Database) return console.log(chalk.red("⛔ • Continuing without DataBase"));
    mongoose.connect(Database, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      console.log(chalk.green("✅ • Connected to Database"))
    }).catch((err) => {
      console.log(err)
    });
  }
}

