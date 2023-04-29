const {
    SlashCommandBuilder,
    EmbedBuilder,
    Embed,
    Colors,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType
  } = require("discord.js");
  const Schema = require('../../Schemas/family')

  module.exports = {
    data: new SlashCommandBuilder()
      .setName("family")
      .setDescription("All Family commands.")
        .addSubcommand((sub) =>
        sub
                .setName('delete')
                .setDescription('Delete your family!'),
        )
        .addSubcommand((sub) =>
        sub
                .setName('adopt')
                .setDescription('Adopt a member')
                .addUserOption(option => option.setName('user').setDescription('Select a user').setRequired(true))
        )
        .addSubcommand((sub) =>
        sub
                .setName('disown')
                .setDescription('Disown one of your children or a parent')
                .addUserOption(option => option.setName('user').setDescription('Select a user').setRequired(true)),
        )
        .addSubcommand((sub) =>
        sub
                .setName('divorce')
                .setDescription('Divorce your partner')
                .addUserOption(option => option.setName('user').setDescription('Select a user').setRequired(true)),
        )
        .addSubcommand((sub) =>
        sub
                .setName('family')
                .setDescription(`See who's in someone's family!`)
                .addUserOption(option => option.setName('user').setDescription('Select a user').setRequired(false)),
        )
        .addSubcommand((sub) =>
        sub
                .setName('propose')
                .setDescription('Marry a member')
                .addUserOption(option => option.setName('user').setDescription('Select a user').setRequired(true)),
        ),

      async execute(interaction, client) {
        if (interaction.options.getSubcommand() === "propose") {
            const target = interaction.options.getUser('user');
            const author = interaction.user;
            const guild = { Guild: interaction.guild.id };

    if (author.id == target.id) {
        const err_embed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription(
          `**<:reliable_wrong:1043155193077960764> | You cannot marry yourself you dumb.**`
        )
        .setTimestamp()
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" });

        return interaction.reply({ embeds: [err_embed], ephemeral: true });
    } 

    Schema.findOne({ Guild: interaction.guild.id, Partner: author.id }, async (err, data) => {
        if (data) {
            const err_embed = new EmbedBuilder()
            .setTitle("Error")
            .setDescription(
              `**<:reliable_wrong:1043155193077960764> | Someone in the couple is already married!**`
            )
            .setTimestamp()
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" });
    
            return interaction.reply({ embeds: [err_embed], ephemeral: true });
        }
        else {
            Schema.findOne({ Guild: interaction.guild.id, Partner: target.id }, async (err, data) => {
                if (data) {
                    const err_embed = new EmbedBuilder()
                    .setTitle("Error")
                    .setDescription(
                      `**<:reliable_wrong:1043155193077960764> | Someone in the couple is already married!**`
                    )
                    .setTimestamp()
                    .setColor("#2F3136")
                    .setFooter({ text: "©2022 - 2023 | Reliable" });
            
                    return interaction.reply({ embeds: [err_embed], ephemeral: true });
                }
                else {
                    Schema.findOne({ Guild: interaction.guild.id, User: target.id, Parent: author.id }, async (err, data) => {
                        if (data) {
                            const err_embed = new EmbedBuilder()
                            .setTitle("Error")
                            .setDescription(
                              `**<:reliable_wrong:1043155193077960764> | You cannot marry a family member!**`
                            )
                            .setTimestamp()
                            .setColor("#2F3136")
                            .setFooter({ text: "©2022 - 2023 | Reliable" });
                    
                            return interaction.reply({ embeds: [err_embed], ephemeral: true });
                        }
                        else {
                            Schema.findOne({ Guild: interaction.guild.id, User: author.id, Parent: target.id }, async (err, data) => {
                                if (data) {
                                    const err_embed = new EmbedBuilder()
                                    .setTitle("Error")
                                    .setDescription(
                                      `**<:reliable_wrong:1043155193077960764> | You cannot marry a family member!**`
                                    )
                                    .setTimestamp()
                                    .setColor("#2F3136")
                                    .setFooter({ text: "©2022 - 2023 | Reliable" });
                            
                                    return interaction.reply({ embeds: [err_embed], ephemeral: true });
                                }
                                else {
                                    Schema.findOne({ Guild: interaction.guild.id, User: author.id }, async (err, data) => {
                                        if (data) {
                                            if (data.Children.includes(target.id)) {
                                                const err_embed = new EmbedBuilder()
                                                .setTitle("Error")
                                                .setDescription(
                                                  `**<:reliable_wrong:1043155193077960764> | You cannot marry a family member!**`
                                                )
                                                .setTimestamp()
                                                .setColor("#2F3136")
                                                .setFooter({ text: "©2022 - 2023 | Reliable" });
                                        
                                                return interaction.reply({ embeds: [err_embed], ephemeral: true });
                                            }
                                            else {
                                                propose();
                                            }
                                        }
                                        else {
                                            propose();
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })

    function propose() {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('propose_Approve')
                    .setEmoji('<:reliable_right:1042843202429919272>')
                    .setLabel("Approve")
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setCustomId('propose_deny')
                    .setEmoji('<:reliable_wrong:1043155193077960764>')
                    .setLabel("Decline")
                    .setStyle(ButtonStyle.Danger),
            );
            const marryembed = new EmbedBuilder()
            .setTitle("`👰` | Marriage proposal")
            .setDescription(
              `> **${author} has ${target} asked to propose him!** \n**${target} click on one of the buttons**`
            )
            .setTimestamp()
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" });
    
         interaction.reply({ embeds: [marryembed], components: [row], ephemeral: false });


        const filter = i => i.user.id === target.id;

        interaction.channel.awaitMessageComponent({ filter, componentType: ComponentType.Button, time: 60000 }).then(async i => {
            if (i.customId == "propose_Approve") {

                Schema.findOne({ Guild: interaction.guild.id, User: author.id }, async (err, data) => {
                    if (data) {
                        data.Partner = target.id
                        data.save();
                    }
                    else {
                        new Schema({
                            Guild: interaction.guild.id,
                            User: author.id,
                            Partner: target.id
                        }).save();
                    }
                })

                Schema.findOne({ Guild: interaction.guild.id, User: target.id }, async (err, data) => {
                    if (data) {
                        data.Partner = author.id
                        data.save();
                    }
                    else {
                        new Schema({
                            Guild: interaction.guild.id,
                            User: target.id,
                            Partner: author.id
                        }).save();
                    }
                })
                const err_embed = new EmbedBuilder()
                .setTitle("`👰` | Marriage proposal - Approved")
                .setDescription(
                  `> **${author} and ${target} are now married! 🎉**`
                )
                .setTimestamp()
                .setColor("#2F3136")
                .setFooter({ text: "©2022 - 2023 | Reliable" });
                const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('propose_Approve')
                    .setEmoji('<:reliable_right:1042843202429919272>')
                    .setLabel("Approve")
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setCustomId('propose_deny')
                    .setEmoji('<:reliable_wrong:1043155193077960764>')
                    .setLabel("Decline")
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Danger),
            );
                 interaction.editReply({ embeds: [err_embed], components: [row], ephemeral: false });
            }

            if (i.customId == "propose_deny") {
                const err_embed = new EmbedBuilder()
                .setTitle("`👰` | Marriage proposal - Denied")
                .setDescription(
                  `> **${target} loves someone else and chose not to marry ${author}.**`
                )
                .setTimestamp()
                .setColor("#2F3136")
                .setFooter({ text: "©2022 - 2023 | Reliable" });
                const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('propose_Approve')
                    .setEmoji('<:reliable_right:1042843202429919272>')
                    .setLabel("Approve")
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setCustomId('propose_deny')
                    .setEmoji('<:reliable_wrong:1043155193077960764>')
                    .setLabel("Decline")
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Danger),
            );
                 interaction.editReply({ embeds: [err_embed], components: [row], ephemeral: false });
            }
        }).catch(() => {
            const err_embed = new EmbedBuilder()
            .setTitle("`👰` | Marriage proposal - Denied")
            .setDescription(
              `> **${target} has not answered anything! The wedding is canceled**`
            )
            .setTimestamp()
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" });
            const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('propose_Approve')
                .setEmoji('<:reliable_right:1042843202429919272>')
                .setLabel("Approve")
                .setDisabled(true)
                .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
                .setCustomId('propose_deny')
                .setEmoji('<:reliable_wrong:1043155193077960764>')
                .setLabel("Decline")
                .setDisabled(true)
                .setStyle(ButtonStyle.Danger),
        );
             interaction.editReply({ embeds: [err_embed], components: [row], ephemeral: false });
        });
    }
  } else if (interaction.options.getSubcommand() === "family") {

    const target = interaction.options.getUser('user') || interaction.user;
    const data = await Schema.findOne({ Guild: interaction.guild.id, User: target.id });
    const err_embed = new EmbedBuilder()
    .setTitle(`\`👪\` | ${target.username}'s Family`)
    .setThumbnail(target.avatarURL({ size: 1024 }))
    .addFields(
        {
            name: "`🤝` | Partner",
            value: `> ${data && data.Partner ? `<@!${data.Partner}>` : `**\`This user is not married\`**`}`
        },
        {
            name: `\`💑\` | Parent`,
            value: `> ${data && data.Parent.length > 0 ? `${data.Parent.join(", ")}` : `**\`This user has no parents\`**`}`
        },
        {
            name: `\`🧒\` | Children`,
            value: `> ${data && data.Children.length > 0 ? `${data.Children.join(", ")}` : `**\`This user has no children\`**`}`
        }
    )
    .setTimestamp()
    .setColor("#2F3136")
    .setFooter({ text: "©2022 - 2023 | Reliable" });
     interaction.reply({ embeds: [err_embed], ephemeral: false });

} else if (interaction.options.getSubcommand() === "adopt") {
    const target = interaction.options.getUser('user');
    const author = interaction.user;

    if (author.id == target.id) {
        const err_embed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription(
          `> **<:reliable_wrong:1043155193077960764> | You cannot adopt yourself.**`
        )
        .setTimestamp()
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" });
        interaction.reply({ embeds: [err_embed], ephemeral: true });
    }

    if (target.bot) {
        const err_embed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription(
          `> **<:reliable_wrong:1043155193077960764> | You cannot adopt a bot.**`
        )
        .setTimestamp()
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" });
        interaction.reply({ embeds: [err_embed], ephemeral: true });
        }

    const familyMember = await Schema.findOne({ Guild: interaction.guild.id, User: target.id, Parent: author.id });
    const familyMember2 = await Schema.findOne({ Guild: interaction.guild.id, User: author.id, Parent: target.id });
    const familyMember3 = await Schema.findOne({ Guild: interaction.guild.id, User: author.id, Partner: target.id });

    if (familyMember || familyMember2 || familyMember3) {
        const err_embed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription(
          `> **<:reliable_wrong:1043155193077960764> | You cannot adopt a family member!**`
        )
        .setTimestamp()
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" });
        interaction.reply({ embeds: [err_embed], ephemeral: true });
    }

    const checkAdopt = await Schema.findOne({ Guild: interaction.guild.id, Children: target.username });
    if (checkAdopt) {
        const err_embed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription(
          `> **<:reliable_wrong:1043155193077960764> | This user has already been adopted!**`
        )
        .setTimestamp()
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" });
        interaction.reply({ embeds: [err_embed], ephemeral: true });
    }
    const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('adopt_yes')
            .setEmoji('<:reliable_right:1042843202429919272>')
            .setLabel("Approve")
            .setStyle(ButtonStyle.Success),

        new ButtonBuilder()
            .setCustomId('adopt_deny')
            .setEmoji('<:reliable_wrong:1043155193077960764>')
            .setLabel("Decline")
            .setStyle(ButtonStyle.Danger),
    );
    const adoptembed = new EmbedBuilder()
    .setTitle("`👪` | Adoption")
    .setDescription(
      `> **${author} has ${target} asked to adopt him!** \n**${target} click on one of the buttons**`
    )
    .setTimestamp()
    .setColor("#2F3136")
    .setFooter({ text: "©2022 - 2023 | Reliable" });

 interaction.reply({ embeds: [adoptembed], components: [row], ephemeral: false });
    
    const filter = i => i.user.id === target.id;

    interaction.channel.awaitMessageComponent({ filter, componentType: ComponentType.Button, time: 60000 }).then(async i => {
        if (i.customId == "adopt_yes") {

            Schema.findOne({ Guild: interaction.guild.id, User: author.id }, async (err, data) => {
                if (data) {
                    data.Children.push(target.username);
                    data.save();
                }
                else {
                    new Schema({
                        Guild: interaction.guild.id,
                        User: author.id,
                        Children: target.username
                    }).save();
                }
            })

            Schema.findOne({ Guild: interaction.guild.id, User: target.id }, async (err, data) => {
                if (data) {
                    data.Parent.push(author.username);
                    data.save();
                }
                else {
                    new Schema({
                        Guild: interaction.guild.id,
                        User: target.id,
                        Parent: author.username
                    }).save();
                }
            })
            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('adopt_yes')
                    .setEmoji('<:reliable_right:1042843202429919272>')
                    .setLabel("Approve")
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Success),
        
                new ButtonBuilder()
                    .setCustomId('adopt_deny')
                    .setEmoji('<:reliable_wrong:1043155193077960764>')
                    .setLabel("Decline")
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Danger),
            );
            const adoptembed = new EmbedBuilder()
            .setTitle("`👪` | Adoption - Approved")
            .setDescription(
              `> **${author} is now the proud parent of ${target}! 🎉**`
            )
            .setTimestamp()
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" });
        
         interaction.editReply({ embeds: [adoptembed], components: [row], ephemeral: false });
        }

        if (i.customId == "adopt_deny") {
            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('adopt_yes')
                    .setEmoji('<:reliable_right:1042843202429919272>')
                    .setLabel("Approve")
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Success),
        
                new ButtonBuilder()
                    .setCustomId('adopt_deny')
                    .setEmoji('<:reliable_wrong:1043155193077960764>')
                    .setLabel("Decline")
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Danger),
            );
            const adoptembed = new EmbedBuilder()
            .setTitle("`👪` | Adoption - Denied")
            .setDescription(
              `> **${target} don't want to be adopted by ${author}**`
            )
            .setTimestamp()
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" });
        
         interaction.editReply({ embeds: [adoptembed], components: [row], ephemeral: false });
        }
    }).catch(() => {
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('adopt_yes')
                .setEmoji('<:reliable_right:1042843202429919272>')
                .setLabel("Approve")
                .setDisabled(true)
                .setStyle(ButtonStyle.Success),
    
            new ButtonBuilder()
                .setCustomId('adopt_deny')
                .setEmoji('<:reliable_wrong:1043155193077960764>')
                .setLabel("Decline")
                .setDisabled(true)
                .setStyle(ButtonStyle.Danger),
        );
        const adoptembed = new EmbedBuilder()
        .setTitle("`👪` | Adoption - Denied")
        .setDescription(
          `> **${target} has not answered anything! The adoption is canceled**`
        )
        .setTimestamp()
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" });
    
     interaction.editReply({ embeds: [adoptembed], components: [row], ephemeral: false });
    });
} else if (interaction.options.getSubcommand() === "divorce") {

    const target = interaction.options.getUser('user');
    const author = interaction.user;

    if (author.id == target.id) {
        const err_embed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription(
          `> **<:reliable_wrong:1043155193077960764> | You cannot divorce yourself!**`
        )
        .setTimestamp()
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" });
        interaction.reply({ embeds: [err_embed], ephemeral: true });
    }
    if (target.bot) {
        const err_embed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription(
          `> **<:reliable_wrong:1043155193077960764> | You cannot divorce a bot!**`
        )
        .setTimestamp()
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" });
        interaction.reply({ embeds: [err_embed], ephemeral: true });
    } 

    const data = await Schema.findOne({ Guild: interaction.guild.id, User: author.id, Partner: target.id });
    if (data) {
        const data2 = await Schema.findOne({ Guild: interaction.guild.id, User: target.id });
        if (data2) {
            data2.Partner = null;
            data2.save();
        }

        data.Partner = null;
        data.save();
        const err_embed = new EmbedBuilder()
        .setTitle("`👰` | Divorced")
        .setDescription(
          `> **${author} and ${target} have been divorced**`
        )
        .setTimestamp()
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" });
        interaction.reply({ embeds: [err_embed] });
    }
    else {
        const err_embed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription(
          `> **<:reliable_wrong:1043155193077960764> | You are not married at the moment**`
        )
        .setTimestamp()
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" });
        interaction.reply({ embeds: [err_embed], ephemeral: true });
    }
} else if (interaction.options.getSubcommand() === "disown") {
    const target = interaction.options.getUser('user');
    const author = interaction.user;
    const guild = { Guild: interaction.guild.id };

    if (author.id == target.id) {
        const err_embed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription(
          `> **<:reliable_wrong:1043155193077960764> | You cannot disown yourself!**`
        )
        .setTimestamp()
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" });
        return interaction.reply({ embeds: [err_embed], ephemeral: true });
    } 
    if (target.bot) {
        const err_embed = new EmbedBuilder()
        .setTitle("Error")
        .setDescription(
          `> **<:reliable_wrong:1043155193077960764> | You cannot disown a bot!**`
        )
        .setTimestamp()
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" });
        return interaction.reply({ embeds: [err_embed], ephemeral: true });
    }

    Schema.findOne({ Guild: interaction.guild.id, Parent: target.id }, async (err, data) => {
        if (data) {
            Schema.findOne({ Guild: interaction.guild.id, User: data.Parent }, async (err, data2) => {
                if (data2) {
                    const disownembed1 = new EmbedBuilder()
                    .setTitle("`👪` | Disowned")
                    .setDescription(
                      `> **${author} has disowned <@!${data.Parent}>**`
                    )
                    .setTimestamp()
                    .setColor("#2F3136")
                    .setFooter({ text: "©2022 - 2023 | Reliable" });
                     interaction.reply({ embeds: [disownembed1] });
                    data.Parent = null;
                    data.save();
                }
            })
        }
        else {
            Schema.findOne({ Guild: interaction.guild.id, User: author.id }, async (err, data) => {
                if (data) {
                    if (data.Children.includes(target.username)) {
                        const filtered = data.Children.filter((user) => user !== target.username);

                        await Schema.findOneAndUpdate(guild, {
                            Guild: interaction.guild.id,
                            User: author.id,
                            Children: filtered
                        });

                        Schema.findOne({ Guild: interaction.guild.id, Parent: author.id }, async (err, data) => {
                            if (data) {
                                data.Parent = null;
                                data.save();
                            }
                        })
                        const disownembed2 = new EmbedBuilder()
                        .setTitle("`👪` | Disowned")
                        .setDescription(
                          `> **${author} has disowned <@!${target.id}>**`
                        )
                        .setTimestamp()
                        .setColor("#2F3136")
                        .setFooter({ text: "©2022 - 2023 | Reliable" });
                         interaction.reply({ embeds: [disownembed2] });
                    }
                    else {
                        const err_embed = new EmbedBuilder()
                        .setTitle("Error")
                        .setDescription(
                          `> **<:reliable_wrong:1043155193077960764> | You have no children/parents at the moment**`
                        )
                        .setTimestamp()
                        .setColor("#2F3136")
                        .setFooter({ text: "©2022 - 2023 | Reliable" });
                        interaction.reply({ embeds: [err_embed], ephemeral: true });
                    }
                }
                else {
                    const err_embed = new EmbedBuilder()
                    .setTitle("Error")
                    .setDescription(
                      `> **<:reliable_wrong:1043155193077960764> | You have no children/parents at the moment**`
                    )
                    .setTimestamp()
                    .setColor("#2F3136")
                    .setFooter({ text: "©2022 - 2023 | Reliable" });
                    interaction.reply({ embeds: [err_embed], ephemeral: true });
                }
            })
        }
    })
} else if (interaction.options.getSubcommand() === "delete") {
    const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('family_delete')
            .setEmoji('<:reliable_right:1042843202429919272>')
            .setLabel("Approve")
            .setStyle(ButtonStyle.Success),

        new ButtonBuilder()
            .setCustomId('family_stop')
            .setEmoji('<:reliable_wrong:1043155193077960764>')
            .setLabel("Decline")
            .setStyle(ButtonStyle.Danger),
    );
    const adoptembed = new EmbedBuilder()
    .setTitle("`👪` | Family - Reset")
    .setDescription(
      `> **Are you sure you want to reset your family?**`
    )
    .setTimestamp()
    .setColor("#2F3136")
    .setFooter({ text: "©2022 - 2023 | Reliable" });

 interaction.reply({ embeds: [adoptembed], components: [row], ephemeral: false });

const filter = i => i.user.id === interaction.user.id;

interaction.channel.awaitMessageComponent({ filter, time: 60000 })
    .then(async i => {
        if (i.customId == "family_delete") {
            var remove = await Schema.findOneAndDelete({ Guild: interaction.guild.id, User: interaction.user.id });
            const parent = await Schema.findOne({ Guild: interaction.guild.id, Parent: interaction.user.id });
            const partner = await Schema.findOne({ Guild: interaction.guild.id, Partner: interaction.user.id });

            if (parent) {
                parent.Parent = " ";
                parent.save();
            }

            if (partner) {
                partner.Partner = " ";
                partner.save();
            }
            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('family_delete')
                    .setEmoji('<:reliable_right:1042843202429919272>')
                    .setLabel("Approve")
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Success),
        
                new ButtonBuilder()
                    .setCustomId('family_stop')
                    .setEmoji('<:reliable_wrong:1043155193077960764>')
                    .setLabel("Decline")
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Danger),
            );
    
            const adoptembed = new EmbedBuilder()
            .setTitle("`👪` | Family - Reset")
            .setDescription(
              `> **<:reliable_right:1042843202429919272> | Your family has been deleted!**`
            )
            .setTimestamp()
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" });
        
         interaction.editReply({ embeds: [adoptembed], components: [row], ephemeral: false });
        }

        if (i.customId == "family_stop") {
            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('family_delete')
                    .setEmoji('<:reliable_right:1042843202429919272>')
                    .setLabel("Approve")
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Success),
        
                new ButtonBuilder()
                    .setCustomId('family_stop')
                    .setEmoji('<:reliable_wrong:1043155193077960764>')
                    .setLabel("Decline")
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Danger),
            );

            const adoptembed = new EmbedBuilder()
            .setTitle("`👪` | Family - Reset")
            .setDescription(
              `> **<:reliable_right:1042843202429919272> | Your family is safe now.**`
            )
            .setTimestamp()
            .setColor("#2F3136")
            .setFooter({ text: "©2022 - 2023 | Reliable" });
        
         interaction.editReply({ embeds: [adoptembed], components: [row], ephemeral: false });
        }
    })
    .catch((err) => {
        console.log(err)
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('family_delete')
                .setEmoji('<:reliable_right:1042843202429919272>')
                .setLabel("Approve")
                .setDisabled(true)
                .setStyle(ButtonStyle.Success),
    
            new ButtonBuilder()
                .setCustomId('family_stop')
                .setEmoji('<:reliable_wrong:1043155193077960764>')
                .setLabel("Decline")
                .setDisabled(true)
                .setStyle(ButtonStyle.Danger),
        );

        const adoptembed = new EmbedBuilder()
        .setTitle("`👪` | Family - Reset")
        .setDescription(
          `> **Time's up! Cancelled backup loading!**`
        )
        .setTimestamp()
        .setColor("#2F3136")
        .setFooter({ text: "©2022 - 2023 | Reliable" });
    
     interaction.editReply({ embeds: [adoptembed], components: [row], ephemeral: true });
    });
}
 }
}