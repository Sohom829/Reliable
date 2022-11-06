const fs = require('fs');
var AsciiTable = require('ascii-table')
var table = new AsciiTable();
const chalk = require("chalk");
table.setHeading('Events', 'Stats').setBorder('|', '=', "0", "0")
module.exports = (client) => {
    client.handleEvents = async () => {
        const eventFolders = fs.readdirSync(`./events`);
        for (const folder of eventFolders) {
            const eventFiles = fs
            .readdirSync(`./events/${folder}`)
            .filter((file) => file.endsWith(".js"));

            switch (folder) {
                case "client":
                    for (const file of eventFiles) {
                        const event = require(`../../events/${folder}/${file}`);
                        if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
                        else client.on(event.name, (...args) => event.execute(...args, client))
                      table.addRow(event.name, '✅');
                    }
                    break;
            
                default:
                    break;
            }
        }
    }
  console.log(chalk.red(table.toString()))
}

/**
 * @INFO
 * Bot Coded by IamSohom829#0829 & Alpha•#9258
 * You can't use this codes without permissions! 
 */