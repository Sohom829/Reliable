const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonStyle,
  ButtonBuilder,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket-guideline")
    .setDescription(
      "Facing error? Execute this command and know how to fix the issue."
    ),

  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle("Ticket - Guideline")
      .setDescription(
        "> **Thanks for choosing me while setting up your ticket feature! Here is the guideline how you can set up me!**"
      )
      .addFields(
        {
          name: "__Ticket - Setup__",
          value: `>>> First thing we need to do is setup the panel. To do this you need to execute \`/ticketsetup\` After doing this you will see a interface. You will see a options called **Channel, Catagory, Transcript**. After you fillup this you will see a option called **Handlers**. Mention the role who will manage the ticket section. After that, here is the part where Users mistakes. The button desiging section. Here you will see options called **First Button, Second Button, Third Button, Forth Button**. Here, you will see at the option description saying **Format: (Name of button,Emoji)**. So, for an example you can put \`Report Bugs,🔎\`. There will be no space between the **Name** and **Emoji** just put a "," between the **Name** and **Emoji**. That's it. You will need to compelete each button options and your ready go!`,
        },
        {
          name: "__Ticket - Adding/Removing__",
          value: `>>> If you want to add a user to any ticket just execute \`/ticket add <@user>\`. If you want to remove any user just execute \`/ticket remove <@user>\`.`,
        },
        {
          name: "__Ticket - Other Supports__",
          value: `>>> If you still face any kind of issues, Please join our support server.`,
        }
      )
      .setColor("#2F3136")
      .setTimestamp()
      .setFooter({ text: "©2022 - 2023 | Reliable" });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Invite Reliable")
        .setEmoji("<:reliable_invite:1031443216664371231>")
        .setStyle(ButtonStyle.Link)
        .setURL(
          `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`
        ),
      new ButtonBuilder()
        .setLabel("Support Server")
        .setEmoji("<:reliable_support:1031443305399074836>")
        .setStyle(ButtonStyle.Link)
        .setURL("https://dsc.gg/reliable-support"),
      new ButtonBuilder()
        .setLabel("Top.GG")
        .setEmoji("<:reliable_topgg:1034324522305855561>")
        .setStyle("Link")
        .setURL("https://top.gg/bot/1030870443005071512?s=05fa7c98112c0")
    );

    interaction.reply({ embeds: [embed], components: [row] });
  },
};
