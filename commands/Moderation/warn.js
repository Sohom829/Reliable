const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Embed,
  Colors,
  ActionRowBuilder,
  AuditLogEvent,
  Events,
  GuildMemberManager,
  PermissionsBitField,
  PermissionFlagsBits,
} = require("discord.js");
const e = require("express");
const moment = require("moment")
const db = require("quick.db")

module.exports = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setName("warn")
    .setDescription("Warn a user or remove a warn")
    .addSubcommand((sub) =>
    sub
      .setName("add")
      .setDescription("add a warning to user")
      .addUserOption((op) =>
        op
          .setName("user")
          .setDescription("user to add warn")
          .setRequired(true)
      )
      .addStringOption((op) =>
        op
          .setName("reason")
          .setDescription("Provide a reason for warn")
          .setRequired(false)
      )
  )
  .addSubcommand((sub) =>
  sub
    .setName("check")
    .setDescription("check your warnings or other")
    .addUserOption((op) =>
      op
        .setName("user")
        .setDescription("check a user")
        .setRequired(true)
    )
)
.addSubcommand((sub) =>
sub
  .setName("removeall")
  .setDescription("user to remove all his warn(s)")
  .addUserOption((op) =>
    op
      .setName("user")
      .setDescription("user to remove")
      .setRequired(true)
  )
)
    .addSubcommand((sub) =>
      sub
        .setName("remove")
        .setDescription("warn to remove")
        .addUserOption((op) =>
          op
            .setName("user")
            .setDescription("user to remove")
            .setRequired(true)
        )
        .addIntegerOption((op) =>
        op
          .setName("amount")
          .setDescription("Amount of warns you want to remove")
          .setRequired(true)
      )
    ),

  async execute(interaction) {
    if (interaction.options.getSubcommand() === "add") {

          const user = interaction.options.getUser("user");
          let reason = interaction.options.getString("reason");
          if (!reason) reason = "No reason provided";
          
          const member = await interaction.guild.members
            .fetch(user.id)
            .catch(console.error);

          if (member.id === interaction.user.id) {
            const err_embed = new EmbedBuilder()
              .setTitle("Error")
              .setDescription(
                "**<:reliable_wrong:1043155193077960764> | You cannot warn yourself!**"
              )
              .setColor("#2F3136")
              .setFooter({ text: "©2022 - 2023 | Reliable" });
            return interaction.reply({ embeds: [err_embed], ephemeral: true });
          }
    
          if (member.id === interaction.client.user.id) {
            const err2_embed = new EmbedBuilder()
              .setTitle("Error")
              .setDescription(
                "**<:reliable_wrong:1043155193077960764> | You cannot warn me!**"
              )
              .setColor("#2F3136")
              .setFooter({ text: "©2022 - 2023 | Reliable" });
            return interaction.reply({ embeds: [err2_embed], ephemeral: true });
          }
    
          if (member.id === interaction.guild.ownerId) {
            const err2_embed = new EmbedBuilder()
              .setTitle("Error")
              .setDescription(
                "**<:reliable_wrong:1043155193077960764> | You cannot warn the owner!**"
              )
              .setColor("#2F3136")
              .setFooter({ text: "©2022 - 2023 | Reliable" });
            return interaction.reply({ embeds: [err2_embed], ephemeral: true });
          }
          if (
            interaction.member.roles.highest.position <
            member.roles.highest.position
          ) {
            const err2_embed = new EmbedBuilder()
              .setTitle("Error")
              .setDescription(
                "**<:reliable_wrong:1043155193077960764> | You cannot warn user who have higher role than you!**"
              )
              .setColor("#2F3136")
              .setFooter({ text: "©2022 - 2023 | Reliable" });
            return interaction.reply({ embeds: [err2_embed], ephemeral: true });
          } else {

          const embed1 = new EmbedBuilder()
          .setDescription(`> **Are you sure you want to warn <@${member.user.id}> | (\`${member.user.tag}\`)?**`)
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" });

         const bcomponents = new ActionRowBuilder().addComponents(
             new ButtonBuilder()
             .setCustomId('YES')
             .setEmoji("<:reliable_right:1042843202429919272>")
             .setLabel('Yes')
             .setStyle('Success'),
 
             new ButtonBuilder()
             .setCustomId('NO')
             .setEmoji("<:reliable_wrong:1043155193077960764>")
             .setLabel('No')
             .setStyle('Danger')
         )
        interaction.reply({ embeds: [embed1], components: [bcomponents] })

         const filter = (i) => i.user.id === interaction.user.id;
         const collector =
         await interaction.channel.createMessageComponentCollector({
           time: 20000,
           filter,
         });

         const embed2 = new EmbedBuilder()
         .setTitle("Warned")
         .addFields(
          {
            name: "Warn Information",
            value: `**\`•\` Member**: <@${member.user.id}> | [**\`${member.user.tag}\`**]
**\`•\` Moderator**: <@${interaction.user.id}> | [**\`${interaction.user.tag}\`**]`
          },
          {
            name: "Reason",
            value: `\`\`\`${reason}\`\`\``
          }
         )
         .setDescription(`> **<:reliable_right:1042843202429919272> | The member was warned!**`)
         .setTimestamp()
         .setColor("#2F3136")
         .setFooter({ text: "©2022 - 2023 | Reliable" });
 
         const embed3 = new EmbedBuilder()
         .setTitle("Cancelled")
         .setDescription(`> **<:reliable_right:1042843202429919272> | Action cancelled by <@${interaction.user.id}>**`)
         .setTimestamp()
         .setColor("#2F3136")
         .setFooter({ text: "©2022 - 2023 | Reliable" });

         collector.on('collect', async (i) => { 
          if(i.customId === 'YES') {

            await interaction.editReply({embeds: [embed2], components: [], ephemeral: true })

            db.set(`warnings_${interaction.guild.id}_${member.id}`, 1);

              const warned = new EmbedBuilder()
              .setTitle("Warning!")
              .setDescription("> **<:reliable_right:1042843202429919272> | You were warned!**")
              .setTimestamp()
              .setColor("#2F3136")
              .setFooter({ text: "©2022 - 2023 | Reliable" })
              .addFields(
                {
                  name: "Warning Information",
                  value: `**\`•\` Guild Name**: **\`${interaction.guild.name}\` | (*${interaction.guild.id}*)**
  **\`•\` Moderator**: <@${interaction.user.id}> | (**\`${interaction.user.tag}\`**)`
                },
                {
                  name: "Reason",
                  value: `\`\`\`${reason}\`\`\``
                }
              );
          member.send({ embeds: [warned] }).catch((err) => {
           const err_embed = new EmbedBuilder()
           .setTitle("Error")
           .setDescription("> **<:reliable_wrong:1043155193077960764> | I can't send messages to the member!**")
           .setTimestamp()
           .setColor("#2F3136")
           .setFooter({ text: "©2022 - 2023 | Reliable" });
  
           interaction.channel.send({ embeds: [err_embed], ephemeral: true })
              })

          collector.stop('success')

          } else if(i.customId === 'NO') {
            interaction.editReply({ embeds: [embed3], components: [] })
            collector.stop('success')
          }
        })
        const embed4 = new EmbedBuilder()
        .setTitle("Error")
        .setDescription("> **<:reliable_wrong:1043155193077960764> | You took too long mate!**")
        .setTimestamp()
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" });
        collector.on('end', async (ignore, error) => {
          if(error && error !== 'success') {
            interaction.editReply({embeds: [embed4], components: [], })
          }
          collector.stop('success')
        })
     }
    } else if (interaction.options.getSubcommand() === "check") {
      
      const user = interaction.options.getUser("user") || interaction.user 
      let warnings = db.get(`warnings_${interaction.guild.id}_${user.id}`);
      if (warnings === null) warnings = 0;

      const embed = new EmbedBuilder()
      .setTitle("Warning(s)")
      .setDescription("> **<:reliable_right:1042843202429919272> |  Loaded warning(s)**")
      .addFields(
        {
          name: "Warning(s) Information",
          value: `**\`•\` Member**: <@${user.id}> | (**\`${user.tag}\`**)
**\`•\` Warning(s)**: __**${warnings}**__ Warning(s)`
        }
      )
      .setTimestamp()
      .setColor("#2F3136")
      .setFooter({ text: "©2022 - 2023 | Reliable" });

      interaction.reply({ embeds: [embed] })
    } else if (interaction.options.getSubcommand() === "removeall") {
      const user = interaction.options.getUser("user");

      const yousure1 = new EmbedBuilder()
      .setDescription(`> **Are you sure you want to remove all warn(s) of <@${user.id}> | (\`${user.tag}\`)?**`)
      .setColor("#2F3136")
      .setFooter({ text: "©2022 - 2023 | Reliable" });

     const components = new ActionRowBuilder().addComponents(
         new ButtonBuilder()
         .setCustomId('YES')
         .setEmoji("<:reliable_right:1042843202429919272>")
         .setLabel('Yes')
         .setStyle('Success'),

         new ButtonBuilder()
         .setCustomId('NO')
         .setEmoji("<:reliable_wrong:1043155193077960764>")
         .setLabel('No')
         .setStyle('Danger')
     )
     await interaction.reply({ embeds: [yousure1], components: [components] })

     const filter = (i) => i.user.id === interaction.user.id;
     const collector =
     await interaction.channel.createMessageComponentCollector({
       time: 20000,
       filter,
     });

     let warnings = db.get(`warnings_${interaction.guild.id}_${user.id}`);
     if (warnings === null) {
      warnings = 0;
      const removeall_err1 = new EmbedBuilder()
      .setTitle("Error")
      .setDescription(`> **<:reliable_wrong:1043155193077960764> | The member doesn't have any warning!**`)
      .setTimestamp()
      .setColor("#2F3136")
      .setFooter({ text: "©2022 - 2023 | Reliable" });

     return interaction.editReply({ embeds: [removeall_err1], components: [], ephemeral: true })
     } else {
     
     const embed2 = new EmbedBuilder()
     .setTitle("Removed all Warning(s)")
     .addFields(
      {
        name: "Warn Information",
        value: `**\`•\` Member**: <@${user.id}> | [**\`${user.tag}\`**]
**\`•\` Moderator**: <@${interaction.user.id}> | [**\`${interaction.user.tag}\`**]`
      }
     )
     .setDescription(`> **<:reliable_right:1042843202429919272> | Removed warning(s) of the member!**`)
     .setTimestamp()
     .setColor("#2F3136")
     .setFooter({ text: "©2022 - 2023 | Reliable" });

     const embed3 = new EmbedBuilder()
     .setTitle("Cancelled")
     .setDescription(`> **<:reliable_right:1042843202429919272> |  Action cancelled by <@${interaction.user.id}>**`)
     .setTimestamp()
     .setColor("#2F3136")
     .setFooter({ text: "©2022 - 2023 | Reliable" });

     collector.on('collect', async (i) => { 
      if(i.customId === 'YES') {
        db.subtract(`warnings_${interaction.guild.id}_${user.id}`, warnings) 
        await interaction.editReply({ embeds: [embed2], components: [], ephemeral: true })
    
          const diswarned = new EmbedBuilder()
          .setTitle("Removed Warning(s)")
          .setDescription("Your all warning was removed!")
          .setTimestamp()
          .setColor("#2F3136")
          .setFooter({ text: "©2022 - 2023 | Reliable" })
          .addFields(
            {
              name: "Warning Information",
              value: `**\`•\` Guild Name**: **\`${interaction.guild.name}\` | (*${interaction.guild.id}*)**
**\`•\` Moderator**: <@${interaction.user.id}> | (**\`${interaction.user.tag}\`**)`
            }
          );
      user.send({ embeds: [diswarned] }).catch((err) => {
       const removeall_err2 = new EmbedBuilder()
       .setTitle("Error")
       .setDescription("> **<:reliable_wrong:1043155193077960764> | I can't send messages to the member!**")
       .setTimestamp()
       .setColor("#2F3136")
       .setFooter({ text: "©2022 - 2023 | Reliable" });

       interaction.channel.send({ embeds: [removeall_err2], ephemeral: true })
          })

      collector.stop('success')

      } else if(i.customId === 'NO') {
        interaction.editReply({ embeds: [embed3], components: [] })
        collector.stop('success')
      }
    })
    const removeall_err3 = new EmbedBuilder()
    .setTitle("Error")
    .setDescription("> **<:reliable_wrong:1043155193077960764> | You took too long mate!**")
    .setTimestamp()
    .setColor("#2F3136")
    .setFooter({ text: "©2022 - 2023 | Reliable" });
    collector.on('end', async (ignore, error) => {
      if(error && error !== 'success') {
        interaction.channel.send({embeds: [removeall_err3], components: [], ephemeral: true })
      }
      collector.stop('success')
    })
  }
} else if (interaction.options.getSubcommand() === "remove") {
  const member = interaction.options.getUser("user");
  const amount = interaction.options.getInteger("amount");
    
  const yousure2 = new EmbedBuilder()
  .setDescription(`> **Are you sure you want to remove warn(s) of <@${member.id}> | (\`${member.tag}\`)?**`)
  .setColor("#2F3136")
  .setFooter({ text: "©2022 - 2023 | Reliable" });

 const components = new ActionRowBuilder().addComponents(
     new ButtonBuilder()
     .setCustomId('YES')
     .setEmoji("<:reliable_right:1042843202429919272>")
     .setLabel('Yes')
     .setStyle('Success'),

     new ButtonBuilder()
     .setCustomId('NO')
     .setEmoji("<:reliable_wrong:1043155193077960764>")
     .setLabel('No')
     .setStyle('Danger')
 )
interaction.reply({ embeds: [yousure2], components: [components] })

 const filter = (i) => i.user.id === interaction.user.id;
 const collector =
 await interaction.channel.createMessageComponentCollector({
   time: 20000,
   filter,
 });

 let warnings = db.get(`warnings_${interaction.guild.id}_${member.id}`);
 if (warnings === null) {
  warnings = 0;
  const remove1 = new EmbedBuilder()
  .setTitle("Error")
  .setDescription(`> **<:reliable_wrong:1043155193077960764> | The member doesn't have any warning!**`)
  .setTimestamp()
  .setColor("#2F3136")
  .setFooter({ text: "©2022 - 2023 | Reliable" });

  return interaction.channel.send({ embeds: [remove1], components: [], ephemeral: true })
 } else {
  db.subtract(`warnings_${interaction.guild.id}_${member.id}`, amount) 
 const embed2 = new EmbedBuilder()
 .setTitle("Removed Warning(s)")
 .addFields(
  {
    name: "Warn Information",
    value: `**\`•\` Member**: <@${member.id}> | [**\`${member.tag}\`**]
**\`•\` Moderator**: <@${interaction.user.id}> | [**\`${interaction.user.tag}\`**]`
  }
 )
 .setDescription(`> **<:reliable_right:1042843202429919272> | Removed warning(s) of the member!**`)
 .setTimestamp()
 .setColor("#2F3136")
 .setFooter({ text: "©2022 - 2023 | Reliable" });

 const embed3 = new EmbedBuilder()
 .setTitle("Cancelled")
 .setDescription(`> **<:reliable_right:1042843202429919272> |  Action cancelled by <@${interaction.user.id}>**`)
 .setTimestamp()
 .setColor("#2F3136")
 .setFooter({ text: "©2022 - 2023 | Reliable" });

 collector.on('collect', async (i) => { 
  if(i.customId === 'YES') {

    await interaction.editReply({embeds: [embed2], components: [], ephemeral: true })
      const warned = new EmbedBuilder()
      .setTitle("Removed Warning(s)")
      .setDescription("> **<:reliable_right:1042843202429919272> | Your warning were removed!**")
      .setTimestamp()
      .setColor("#2F3136")
      .setFooter({ text: "©2022 - 2023 | Reliable" })
      .addFields(
        {
          name: "Warning Information",
          value: `**\`•\` Guild Name**: **\`${interaction.guild.name}\` | (*${interaction.guild.id}*)**
**\`•\` Moderator**: <@${interaction.user.id}> | (**\`${interaction.user.tag}\`**)`
        }
      );
  member.send({ embeds: [warned] }).catch((err) => {
   const remove2 = new EmbedBuilder()
   .setTitle("Error")
   .setDescription("> **<:reliable_wrong:1043155193077960764> | I can't send messages to the member!**")
   .setTimestamp()
   .setColor("#2F3136")
   .setFooter({ text: "©2022 - 2023 | Reliable" });

   interaction.channel.send({ embeds: [remove2], ephemeral: true })
      })

  collector.stop('success')

  } else if(i.customId === 'NO') {
    interaction.editReply({ embeds: [embed3], components: [] })
    collector.stop('success')
  }
})
const remove3 = new EmbedBuilder()
.setTitle("Error")
.setDescription("> **<:reliable_wrong:1043155193077960764> | You took too long mate!**")
.setTimestamp()
.setColor("#2F3136")
.setFooter({ text: "©2022 - 2023 | Reliable" });
collector.on('end', async (ignore, error) => {
  if(error && error !== 'success') {
    interaction.reply({embeds: [remove3], components: [], ephemeral: true })
  }
  collector.stop('success')
})
}
}
  }
};