const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Embed,
  Colors,
  ActionRowBuilder,
} = require("discord.js");
const fetch = require("node-fetch");
const Canvacord = require("canvacord");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("info command")
    .addSubcommand((sub) =>
      sub
        .setName("anime")
        .setDescription("💮 Search for information about Anime by given name")
        .addStringOption((option) =>
          option.setName("query").setDescription("Anime name").setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("channel")
        .setDescription("View info about a channel")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("Mention the channel")
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("covid-countries")
        .setDescription("Track a country COVID-19 cases")
        .addStringOption((op) =>
          op
            .setName("country")
            .setDescription("Provide a country")
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("covid-world-wide")
        .setDescription("Track worldwide COVID-19 cases")
    )
    .addSubcommand((sub) =>
      sub
        .setName("member-count")
        .setDescription("see the total members of your server")
    )
    .addSubcommand((sub) =>
      sub
        .setName("npm")
        .setDescription("Check for packages on npm")
        .addStringOption((op) =>
          op
            .setName("name")
            .setDescription("Provide a name to request content from.")
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("pokemon")
        .setDescription("Returns pokemon information")
        .addStringOption((op) =>
          op
            .setName("name")
            .setDescription("Provide a name to request content from.")
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("reddit")
        .setDescription("Request random content from Reddit via subreddits.")
        .addStringOption((op) =>
          op
            .setName("subreddit")
            .setDescription("Provide a subreddit to request content from.")
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("role")
        .setDescription("View info about a role")
        .addRoleOption((option) =>
          option
            .setName("role")
            .setDescription("The role to view info of")
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("role-perm")
        .setDescription("Shows a role permissions")
        .addRoleOption((op) =>
          op
            .setName("target")
            .setDescription("Select the target")
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("server")
        .setDescription("Displays information about the server.")
    )
    .addSubcommand((sub) =>
      sub
        .setName("user")
        .setDescription("get user info")
        .addUserOption((op) =>
          op
            .setName("target")
            .setDescription("Select the target")
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("user-perms")
        .setDescription("Shows a user's permissions")
        .addUserOption((op) =>
          op
            .setName("target")
            .setDescription("Select the target")
            .setRequired(true)
        )
    ),

  async execute(interaction, client) {
    if (interaction.options.getSubcommand() == "anime") {
      const search = interaction.options.getString("query");
      await interaction.deferReply();
      mal.getInfoFromName(search).then((data) => {
        if (data.rating !== "Rx - Hentai") {
          const embed = new EmbedBuilder()
            .setAuthor({ name: `My Anime List search result for ${search}` })
            .setImage(data.picture)
            .setColor("#0398fc")
            .addFields(
              {
                name: "‣ English Title",
                value: `> **\`${data.englishTitle || "None!"}\`**`,
                inline: false,
              },
              {
                name: "‣ Japanese Title",
                value: `> **\`${data.japaneseTitle || "None!"}\`**`,
                inline: false,
              },
              {
                name: "‣ Type",
                value: `> **\`${data.type || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Episodes",
                value: `> **\`${data.episodes || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Rating",
                value: `> **\`${data.rating || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Aired",
                value: `> **\`${data.aired || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Score",
                value: `> **\`${data.score || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Favorite",
                value: `> **\`${data.favorites || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Ranked",
                value: `> **\`${data.ranked || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Duration",
                value: `> **\`${data.duration || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Studios",
                value: `> **\`${data.studios || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Popularity",
                value: `> **\`${data.popularity || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Members",
                value: `> **\`${data.members || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Score Stats",
                value: `> **\`${data.scoreStats || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Source",
                value: `> **\`${data.source || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Synonyms",
                value: `> **\`${data.synonyms || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Status",
                value: `> **\`${data.status || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Identifier",
                value: `> **\`${data.id || "None!"}\`**`,
                inline: true,
              }
            )
            .setFooter({ text: "©2022 | Reliable" })
            .setTimestamp();
          const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setStyle(ButtonStyle.Link)
              .setURL(data.url)
              .setLabel("View more about this")
          );
          interaction.editReply({ embeds: [embed], components: [row] });
        } else {
          const embed = new EmbedBuilder()
            .setAuthor({ name: `My Anime List search result for ${search}` })
            .setColor("#0398fc")
            .addFields(
              {
                name: "‣ English Title",
                value: `> **\`${data.englishTitle || "None!"}\`**`,
                inline: false,
              },
              {
                name: "‣ Japanese Title",
                value: `> **\`${data.japaneseTitle || "None!"}\`**`,
                inline: false,
              },
              {
                name: "‣ Type",
                value: `> **\`${data.type || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Episodes",
                value: `> **\`${data.episodes || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Rating",
                value: `> **\`${data.rating || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Aired",
                value: `> **\`${data.aired || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Score",
                value: `> **\`${data.score || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Favorite",
                value: `> **\`${data.favorites || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Ranked",
                value: `> **\`${data.ranked || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Duration",
                value: `> **\`${data.duration || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Studios",
                value: `> **\`${data.studios || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Popularity",
                value: `> **\`${data.popularity || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Members",
                value: `> **\`${data.members || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Score Stats",
                value: `> **\`${data.scoreStats || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Source",
                value: `> **\`${data.source || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Synonyms",
                value: `> **\`${data.synonyms || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Status",
                value: `> **\`${data.status || "None!"}\`**`,
                inline: true,
              },
              {
                name: "‣ Identifier",
                value: `> **\`${data.id || "None!"}\`**`,
                inline: true,
              }
            )
            .setFooter({ text: "©2022 | Reliable" })
            .setTimestamp();
          const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setStyle(ButtonStyle.Link)
              .setURL(data.url)
              .setLabel("View more about this")
          );
          interaction.editReply({ embeds: [embed], components: [row] });
        }
      });
    } else if (interaction.options.getSubcommand() === "channel") {
      let channel = interaction.options.getChannel("channel") || "";

      const embed = new EmbedBuilder()
        .setTitle(`Channel Information`)
        .setThumbnail(
          interaction.guild.iconURL({
            format: "png",
            dynamic: true,
            size: 1024,
          })
        )
        .setFooter({ text: "©2022 | Reliable" })
        .addFields(
          {
            name: "<:reliable_support:1031443305399074836> Channel Name",
            value: `> **\`${channel.name}\`**`,
            inline: false,
          },
          {
            name: ":underage: NSFW",
            value: `> **\`${channel.nsfw}\`**`,
            inline: true,
          },
          {
            name: ":id: Channel ID",
            value: `> **\`${channel.id}\`**`,
            inline: false,
          },
          {
            name: ":file_folder: Channel Type",
            value: `> **\`${channel.type}\`**`,
            inline: true,
          },
          {
            name: ":clipboard: Channel Description",
            value: `> **\`${channel.topic}\`**`,
            inline: true,
          },
          {
            name: ":calendar: Channel Created At",
            value: `> **\`${channel.createdAt}\`**`,
            inline: false,
          }
        )
        .setColor("#0398fc");

      interaction.reply({ embeds: [embed] });
    } else if (interaction.options.getSubcommand() === "covid-countries") {
      let countries = interaction.options.getString("country") || "";
      fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
        .then((response) => response.json())
        .then((data) => {
          let confirmed = data.confirmed.value.toLocaleString();
          let recovered = data.recovered.value.toLocaleString();
          let deaths = data.deaths.value.toLocaleString();

          const embed = new EmbedBuilder()
            .setTitle(`Coronavirus | Countries Stats`)
            .setDescription(
              `>>> Coronavirus disease (COVID-19) is an infectious disease caused by the SARS-CoV-2 virus. Coronavirus disease (COVID-19) is an infectious disease caused by the SARS-CoV-2 virus.
Most people who fall sick with COVID-19 will experience mild to moderate symptoms and recover without special treatment. However, some will become seriously ill and require medical attention.
The virus can spread from an infected person’s mouth or nose in small liquid particles when they cough, sneeze, speak, sing or breathe. These particles range from larger respiratory droplets to smaller aerosols. It is important to practice respiratory etiquette, for example by coughing into a flexed elbow, and to stay home and self-isolate until you recover if you feel unwell.`
            )
            .setColor("#0398fc")
            .setTimestamp()
            .setImage(
              "https://www.fda.gov/files/how-you-can-make-a-difference-1600x900.png"
            )
            .setFooter({ text: "©2022 | Reliable" })
            .addFields(
              {
                name: "Country Name",
                value: `> **\`${countries}\`**`,
                inline: true,
              },

              {
                name: "Total Confirmed Cases",
                value: `> **\`${confirmed}\`**`,
                inline: true,
              },
              {
                name: "Total Recovered",
                value: `> **\`${recovered}\`**`,
                inline: true,
              },
              {
                name: "Total Deaths",
                value: `> **\`${deaths}\`**`,
                inline: true,
              }
            );
          interaction.reply({ embeds: [embed] });
        })
        .catch((e) => {
          const err_embed = new EmbedBuilder()
            .setTitle("Error")
            .setDescription("❌ | Invaild Country")
            .setColor("#0398fc")
            .setTimestamp()
            .setFooter({ text: "©2022 | Reliable" });

          interaction.reply({ embeds: [err_embed], ephemeral: true });
        });
    } else if (interaction.options.getSubcommand() === "covid-world-wide") {
      fetch(`https://covid19.mathdro.id/api`)
        .then((response) => response.json())
        .then((data) => {
          let confirmed = data.confirmed.value.toLocaleString();
          let recovered = data.recovered.value.toLocaleString();
          let deaths = data.deaths.value.toLocaleString();

          const embed = new EmbedBuilder()
            .setTitle(`Coronavirus | Worldwide Stats`)
            .setDescription(
              `>>> Coronavirus disease (COVID-19) is an infectious disease caused by the SARS-CoV-2 virus. Coronavirus disease (COVID-19) is an infectious disease caused by the SARS-CoV-2 virus.
Most people who fall sick with COVID-19 will experience mild to moderate symptoms and recover without special treatment. However, some will become seriously ill and require medical attention.
The virus can spread from an infected person’s mouth or nose in small liquid particles when they cough, sneeze, speak, sing or breathe. These particles range from larger respiratory droplets to smaller aerosols. It is important to practice respiratory etiquette, for example by coughing into a flexed elbow, and to stay home and self-isolate until you recover if you feel unwell.`
            )
            .setColor("#0398fc")
            .setTimestamp()
            .setImage(
              "https://www.fda.gov/files/how-you-can-make-a-difference-1600x900.png"
            )
            .setFooter({ text: "©2022 | Reliable" })
            .addFields(
              {
                name: "Location",
                value: `> **\`WorldWide\`**`,
                inline: true,
              },

              {
                name: "Total Confirmed Cases",
                value: `> **\`${confirmed}\`**`,
                inline: true,
              },
              {
                name: "Total Recovered",
                value: `> **\`${recovered}\`**`,
                inline: true,
              },
              {
                name: "Total Deaths",
                value: `> **\`${deaths}\`**`,
                inline: true,
              }
            );
          interaction.reply({ embeds: [embed] });
        });
    } else if (interaction.options.getSubcommand() === "member-count") {
      const embed = new EmbedBuilder()
        .setColor("#0398fc")
        .setFooter({ text: "©2022 | Reliable" })
        .setTitle(`Membercount`)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .addFields(
          {
            name: "<a:reliable_members:1030037727485362197> Total Members",
            value: `\`\`\`${interaction.guild.memberCount}\`\`\``,
            inline: true,
          },
          {
            name: ":couple: Total Humans",
            value: `\`\`\`${
              members.filter((member) => !member.user.bot).size
            }\`\`\``,
            inline: true,
          },
          {
            name: "<:reliable_verifedbot:1030802332298006598> Total Bots",
            value: `\`\`\`${
              members.filter((member) => member.user.bot).size
            }\`\`\``,
            inline: true,
          }
        )
        .setTimestamp();
      interaction.reply({ embeds: [embed] });
    } else if (interaction.options.getSubcommand() === "npm") {
      const target = interaction.options.getString("name") || "";
      const body = await fetch(`https://registry.npmjs.com/${target}`)
        .then((res) => res.json())
        .then((json) => {
          const embed = new EmbedBuilder()

            .setColor("#0398fc")
            .setTitle("NPM Searched")
            .setImage(
              "https://www.bleepstatic.com/content/posts/2018/07/12/npm.png"
            )
            .setDescription(
              `> **\`${json.description}\`**` || "**`No description`**`"
            )
            .addFields(
              {
                name: "Package Name",
                value: `> **\`${json.name}\`**`,
                inline: false,
              },
              {
                name: "Author",
                value: `> **\`${
                  json.author ? json.author.name : "Unknown"
                }\`**`,
                inline: false,
              },
              {
                name: "Version",
                value: `> **\`${json["dist-tags"].latest}\`**`,
                inline: false,
              },
              {
                name: "License",
                value: `> **\`${json.license || "None"}\`**`,
                inline: true,
              },
              {
                name: "Creation Date",
                value: `**\`${moment
                  .utc(json.time.created)
                  .format("YYYY/MM/DD hh:mm:ss")}\`**`,
                inline: true,
              },
              {
                name: "Modification Date",
                value: `> **\`${
                  json.time.modified
                    ? moment
                        .utc(json.time.modified)
                        .format("YYYY/MM/DD hh:mm:ss")
                    : "None"
                }\`**`,
                inline: true,
              },
              {
                name: "Maintainers",
                value: `> **\`${json.maintainers
                  .map((user) => user.name)
                  .join(", ")}\`**`,
                inline: true,
              }
            );

          interaction.reply({ embeds: [embed] });
        });
    } else if (interaction.options.getSubcommand() === "pokemon") {
      const poke2 = interaction.options.getString("name") || "";

      const data = await fetch(
        `https://some-random-api.ml/pokemon/pokedex?pokemon=${poke2}`
      )
        .then((res) => res.json())
        .then((json) => {
          const embed = new EmbedBuilder()
            .setTitle(`${json.name}`)
            .setThumbnail(`http://i.some-random-api.ml/pokemon/${poke2}.gif`)
            .setDescription(`> ${json.description}`)
            .addFields(
              {
                name: "ID",
                value: `> **\`${json.id}\`**`,
              },
              {
                name: "Type",
                value: `> **\`${json.type}\`**`,
              },
              {
                name: "Species",
                value: `> **\`${json.species}\`**`,
              },
              {
                name: "Abilities",
                value: `> **\`${json.abilities}\`**`,
              },
              {
                name: "Height",
                value: `> **\`${json.height}\`**`,
              },
              {
                name: "Weight",
                value: `> **\`${json.weight}\`**`,
              },
              {
                name: "Base Experience",
                value: `> **\`${json.base_experience}\`**`,
              },
              {
                name: "Gender",
                value: `> **\`${json.gender}\`**`,
              },
              {
                name: "Egg Groups",
                value: `> **\`${json.egg_groups}\`**`,
              },

              {
                name: "Generation",
                value: `> **\`${json.generation}\`**`,
                inline: true,
              }
            )
            .setColor("#0398fc")
            .setFooter({ text: "©2022 | Reliable" });

          return interaction.reply({ embeds: [embed] });
        });
    } else if (interaction.options.getSubcommand() === "reddit") {
      const subreddit = interaction.options.getString("subreddit") || "";
      const embed = new EmbedBuilder().setColor("Red");
      const reactions = ["😂", "🤨"];

      try {
        const response = await axios.get(
          `https://meme-api.herokuapp.com/gimme/${encodeURIComponent(
            subreddit
          )}`
        );

        if (response.data.nsfw && !interaction.channel.nsfw) {
          embed
            .setTitle("🔞 NSFW content")
            .setDescription(
              "No **Age-Restricted** content allowed in this channel. Go to a channel where **NSFW** is *enabled*."
            );
          return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        embed
          .setColor("#0398fc")
          .setTitle("Reddit Searched")
          .setFooter({ text: "©2022 | Reliable" })
          .addFields(
            {
              name: `‣ Reddit Title`,
              value: `> **\`${response.data.title}\`**`,
              inline: false,
            },
            {
              name: `‣ Reddit URL`,
              value: `> **[Click here](${response.data.postLink})**`,
              inline: false,
            },
            {
              name: `‣ Reddit Rating`,
              value: `> **\`${response.data.ups}\`**`,
              inline: false,
            },
            {
              name: `‣ Reddit By`,
              value: `> **[${response.data.author}](https://reddit.com/user/${response.data.author})**`,
              inline: false,
            }
          )
          .setImage(response.data.url);

        const reply = await interaction.reply({
          embeds: [embed],
          fetchReply: true,
        });
        reactions.forEach((reaction) => reply.react(reaction).catch(() => {}));
      } catch (error) {
        embed
          .setTitle("🔍 Unable to reach API")
          .setDescription(`A connection to the API could not be established.`);

        if (error.response?.data?.message)
          embed
            .setTitle("🔍 Unable to find content or subreddit")
            .setDescription(error.response.data.message);

        interaction.reply({ embeds: [embed], ephemeral: true });
      }
    } else if (interaction.options.getSubcommand() === "role") {
      const role = interaction.options.getRole("role");
      const displayed = role.hoist === true ? "Yes" : "No";
      const mentionable = role.mentionable === true ? "Yes" : "No";
      const createdts = new Date(role.createdTimestamp + 6 * 3600000);
      const createdtime = createdts.toLocaleString();

      const embed = new EmbedBuilder()
        .setColor("#0398fc")
        .setFooter({ text: "©2022 | Reliable" })
        .addFields(
          { name: "‣ Role Name", value: `> <@&${role.id}>`, inline: true },
          { name: "‣ Role ID", value: `> **\`${role.id}\`**`, inline: true },
          {
            name: "‣ Users in Role",
            value: `> **\`${role.members.size}\` Users**`,
            inline: true,
          }
        )
        .addFields(
          {
            name: "‣ Mentionable",
            value: `> **\`${mentionable}\`**`,
            inline: true,
          },
          {
            name: "‣ Displayed Seperately?",
            value: `> **\`${displayed}\`**`,
            inline: true,
          },
          {
            name: "‣ Role Creation Date",
            value: `> **\`${createdtime}\`**`,
            inline: true,
          },
          { name: "‣ Color", value: `> **\`${role.hexColor}\`**`, inline: true }
        );

      await interaction.reply({ embeds: [embed] });
    } else if (interaction.options.getSubcommand() === "role-perm") {
      const role = interaction.options.getRole("target");
      const rolePermissions = role.permissions.toArray();

      const embed = new EmbedBuilder()
        .setTitle(`Role Permissions`)
        .addFields(
          {
            name: "‣ Role Name",
            value: `> <@&${role.id}> (${role.id})`,
            inline: true,
          },
          {
            name: "‣ Role Permissions",
            value: `\`\`\`${rolePermissions || "None"}\`\`\``,
            inline: false,
          }
        )
        .setTimestamp()
        .setColor("#0398fc")
        .setFooter({ text: "©2022 | Reliable" });
      interaction.reply({ embeds: [embed], ephemeral: true });
    } else if (interaction.options.getSubcommand() === "server") {
      const { guild } = interaction;
      const { members, channels, emojis, roles, stickers } = guild;

      const sortedRoles = roles.cache
        .map((role) => role)
        .slice(1, roles.cache.size)
        .sort((a, b) => b.position - a.position);
      const userRoles = sortedRoles.filter((role) => !role.managed);
      const managedRoles = sortedRoles.filter((role) => role.managed);
      const botCount = members.cache.filter((member) => member.user.bot).size;

      const maxDisplayRoles = (roles, maxFieldLength = 1024) => {
        let totalLength = 0;
        const result = [];

        for (const role of roles) {
          const roleString = `<@&${role.id}>`;

          if (roleString.length + totalLength > maxFieldLength) break;

          totalLength += roleString.length + 1; // +1 as it's likely we want to display them with a space between each role, which counts towards the limit.
          result.push(roleString);
        }

        return result.length;
      };

      const splitPascal = (string, separator) =>
        string.split(/(?=[A-Z])/).join(separator);
      const toPascalCase = (string, separator = false) => {
        const pascal =
          string.charAt(0).toUpperCase() +
          string
            .slice(1)
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
        return separator ? splitPascal(pascal, separator) : pascal;
      };

      const getChannelTypeSize = (type) =>
        channels.cache.filter((channel) => type.includes(channel.type)).size;

      const totalChannels = getChannelTypeSize([
        ChannelType.GuildText,
        ChannelType.GuildNews,
        ChannelType.GuildVoice,
        ChannelType.GuildStageVoice,
        ChannelType.GuildForum,
        ChannelType.GuildPublicThread,
        ChannelType.GuildPrivateThread,
        ChannelType.GuildNewsThread,
        ChannelType.GuildCategory,
      ]);

      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("#0398fc")
            .setTitle(`${guild.name}'s Information`)
            .setThumbnail(guild.iconURL({ size: 1024 }))
            .setFooter({ text: "©2022 | Reliable" })
            .setImage(guild.bannerURL({ size: 1024 }))
            .addFields(
              {
                name: "**`📝`** | Description",
                value: `> ${guild.description || "**`**`None`**`**"}`,
              },
              {
                name: "**`🌐`** | General",
                value: [
                  `‣ **Created On** <t:${parseInt(
                    guild.createdTimestamp / 1000
                  )}:R>`,
                  `‣ **Server ID** **\`${guild.id}\`**`,
                  `‣ **Owner** <@${guild.ownerId}> (**\`${guild.ownerId}\`**)`,
                  `‣ **Language** **\`${new Intl.DisplayNames(["en"], {
                    type: "language",
                  }).of(guild.preferredLocale)}\`**`,
                  `‣ **Vanity URL** ${guild.vanityURLCode || "**`None`**"}`,
                ].join("\n"),
              },
              {
                name: "<a:reliable_info:1030410449579147314> | Features",
                value:
                  guild.features
                    ?.map(
                      (feature) =>
                        `<:reliable_dot:1033023030449950812> ${toPascalCase(
                          feature,
                          " "
                        )}`
                    )
                    ?.join("\n") || "**`None`**",
                inline: true,
              },
              {
                name: "<:reliable_moderation:1030443113958875236> | Security",
                value: [
                  `**\`👀\`** **Explicit Filter**  **\`${splitPascal(
                    GuildExplicitContentFilter[guild.explicitContentFilter],
                    " "
                  )}\`**`,
                  `**\`🔞\`** **NSFW Level** **\`${splitPascal(
                    GuildNSFWLevel[guild.nsfwLevel],
                    " "
                  )}\`**`,
                  `**\`🔒\`** **Verification Level** **\`${splitPascal(
                    GuildVerificationLevel[guild.verificationLevel],
                    " "
                  )}\`**`,
                ].join("\n"),
                inline: true,
              },
              {
                name: `<a:reliable_members:1030037727485362197> | Users (**\`${guild.memberCount}\`**)`,
                value: [
                  `**\`👨‍👩‍👧‍👦\`** **Members** **\`${
                    guild.memberCount - botCount
                  }\`**`,
                  `**\`🤖\`** **Bots** **\`${botCount}\`**`,
                ].join("\n"),
                inline: true,
              },
              {
                name: `<:reliable_earlysupporter:1030801808400056421> | Roles (**\`${maxDisplayRoles(
                  userRoles
                )}\` of \`${userRoles.length}\`**)`,
                value: `${
                  userRoles.slice(0, maxDisplayRoles(userRoles)).join(" ") ||
                  "**`None`**"
                }`,
              },
              {
                name: `**\`👷‍♂️\`** | Managed Roles (**\`${maxDisplayRoles(
                  managedRoles
                )}\` of \`${managedRoles.length}\`**)`,
                value: `${
                  managedRoles
                    .slice(0, maxDisplayRoles(managedRoles))
                    .join(" ") || "**`None`**"
                }`,
              },
              {
                name: `**\`🍃\`** | Channels, Threads & Categories (**\`${totalChannels}\`**)`,
                value: [
                  `‣ **Text** **\`${getChannelTypeSize([
                    ChannelType.GuildText,
                    ChannelType.GuildForum,
                    ChannelType.GuildNews,
                  ])}\`**`,
                  `‣ **Voice** **\`${getChannelTypeSize([
                    ChannelType.GuildVoice,
                    ChannelType.GuildStageVoice,
                  ])}\`**`,
                  `‣ **Threads** **\`${getChannelTypeSize([
                    ChannelType.GuildPublicThread,
                    ChannelType.GuildPrivateThread,
                    ChannelType.GuildNewsThread,
                  ])}\`**`,
                  `‣ **Categories** **\`${getChannelTypeSize([
                    ChannelType.GuildCategory,
                  ])}\`**`,
                ].join("\n"),
                inline: true,
              },
              {
                name: `**\`🍂\` | **Emojis & Stickers (**\`${
                  emojis.cache.size + stickers.cache.size
                }\`**)`,
                value: [
                  `‣ **Animated** **\`${
                    emojis.cache.filter((emoji) => emoji.animated).size
                  }\`**`,
                  `‣ **Static** **\`${
                    emojis.cache.filter((emoji) => !emoji.animated).size
                  }\`**`,
                  `‣ **Stickers** **\`${stickers.cache.size}\`**`,
                ].join("\n"),
                inline: true,
              },
              {
                name: "**`🍁` | ** Nitro",
                value: [
                  `‣ **Tier** **\`${guild.premiumTier || "**`None`**"}\`**`,
                  `‣ **Boosts** **\`${
                    guild.premiumSubscriptionCount || "**`None`**"
                  }\`**`,
                  `‣ **Boosters** **\`${
                    guild.members.cache.filter(
                      (member) => member.roles.premiumSubscriberRole
                    ).size || "**`None`**"
                  }\`**`,
                  `‣ **Total Boosters** **\`${
                    guild.members.cache.filter((member) => member.premiumSince)
                      .size
                  }\`**`,
                ].join("\n"),
                inline: true,
              },
              {
                name: "`🧧` | Banner",
                value: guild.bannerURL() ? "** **" : "**`None`**",
              }
            ),
        ],
        ephemeral: false,
      });
    } else if (interaction.options.getSubcommand() === "user") {
      const target =
        interaction.options.getMember("target") || interaction.member;
      const { user, presence, roles } = target;
      const formatter = new Intl.ListFormat("en-GB", {
        style: "narrow",
        type: "conjunction",
      });

      await user.fetch();

      const statusType = {
        idle: "1FJj7pX.png",
        dnd: "fbLqSYv.png",
        online: "JhW7v9d.png",
        invisible: "dibKqth.png",
      };

      const activityType = [
        "🕹 Playing",
        "🎙 Streaming",
        "🎧 Listening to",
        "📺 Watching",
        "🤹🏻‍♀️ Custom",
        "🏆 Competing in",
      ];

      const clientType = [
        { name: "desktop", text: "Computer", emoji: "💻" },
        { name: "mobile", text: "Phone", emoji: "📱" },
        { name: "web", text: "Website", emoji: "🔌" },
        { name: "offline", text: "Offline", emoji: "💤" },
      ];

      const badges = {
        BugHunterLevel1:
          "<:reliable_bughunter:1030800879680507954 [**`Bug Hunter Level 1`**]",
        BugHunterLevel2:
          "<:reliable_bughunter2:1030800967207243836 [**`Bug Hunter Level 2`**]",
        CertifiedModerator:
          "<:reliable_moderation:1030443113958875236> [**`Certified Moderator`**]",
        HypeSquadOnlineHouse1:
          "<:reliable_hypersquadbravery:1030801385706500150> [**`HyperSquad Bravery`**]",
        HypeSquadOnlineHouse2:
          "<:reliable_hypesquadbrilliance:1030800522787176448> [**`HyperSquad Brilliance`**]",
        HypeSquadOnlineHouse3:
          "<:reliable_hypersquadbalance:1030801362126114910> [**`HyperSquad Balance`**]",
        Hypesquad:
          "<:reliable_hypesquadbrilliance:1030800522787176448>  [**`HyperSquad Brilliance`**]",
        Partner:
          "<:reliable_discordparthner:1030801628741247066> [**`Discord Parthner`**]",
        PremiumEarlySupporter:
          "<:reliable_earlysupporter:1030801808400056421>  [**`Early Supporter`**]",
        Staff:
          "<:reliable_DiscordStaff:1030802121945260042> [**`Discord Staff`**]",
        VerifiedBot:
          "<:reliable_verifedbot:1030802332298006598> [**`Verified Bot`**]",
        VerifiedDeveloper:
          "<a:reliable_developer:1030802329139675156> [**`Verified Developer`**]",
      };

      const maxDisplayRoles = (roles, maxFieldLength = 1024) => {
        let totalLength = 0;
        const result = [];

        for (const role of roles) {
          const roleString = `<@&${role.id}>`;

          if (roleString.length + totalLength > maxFieldLength) break;

          totalLength += roleString.length + 1; // +1 as it's likely we want to display them with a space between each role, which counts towards the limit.
          result.push(roleString);
        }

        return result.length;
      };

      const sortedRoles = roles.cache
        .map((role) => role)
        .sort((a, b) => b.position - a.position)
        .slice(0, roles.cache.size - 1);

      const clientStatus =
        presence?.clientStatus instanceof Object
          ? Object.keys(presence.clientStatus)
          : "offline";
      const userFlags = user.flags.toArray();

      const deviceFilter = clientType.filter((device) =>
        clientStatus.includes(device.name)
      );
      const devices = !Array.isArray(deviceFilter)
        ? new Array(deviceFilter)
        : deviceFilter;

      const embed = new EmbedBuilder()

        .setColor("#0398fc")
        .setFooter({ text: "©2022 | Reliable" })
        .setAuthor({
          name: user.tag,
          iconURL: `https://i.imgur.com/${
            statusType[presence?.status || "invisible"]
          }`,
        })
        .setImage(user.bannerURL({ size: 1024 }))

        .addFields(
          { name: "`🆔` | ID", value: `**\`${user.id}\`**` },
          {
            name: " `⭐` | Activities",
            value:
              presence?.activities
                .map(
                  (activity) =>
                    `\` ${activityType[activity.type]} ${activity.name} \` `
                )
                .join("\n") || "**`None`**",
          },
          {
            name: "`🤝🏻` | Joined Server",
            value: `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`,
            inline: true,
          },
          {
            name: " `📆` | Account Created",
            value: `<t:${parseInt(user.createdTimestamp / 1000)}:R>`,
            inline: true,
          },
          {
            name: " `🦸🏻‍♀️` | Nickname",
            value: `**\`${user.nickname || "**`None`**"}\`**`,
            inline: true,
          },
          {
            name: `\`🍂\` | Roles (${maxDisplayRoles(sortedRoles)} of ${
              sortedRoles.length
            })`,
            value: `${
              sortedRoles.slice(0, maxDisplayRoles(sortedRoles)).join(" ") ||
              "**`None`**"
            }`,
          },
          {
            name: `\`🎋\` | Badges (${userFlags.length})`,
            value: userFlags.length
              ? formatter.format(userFlags.map((flag) => `**${badges[flag]}**`))
              : "**`None`**",
          },
          {
            name: `\`🎀\` | Devices`,
            value: devices
              .map((device) => `**\`${device.emoji} ${device.text}\`**`)
              .join("\n"),
            inline: true,
          },
          {
            name: " `🖤` | Boosting Server",
            value: `${
              roles.premiumSubscriberRole
                ? `**\`Since\`** <t:${parseInt(
                    target.premiumSinceTimestamp / 1000
                  )}:R>`
                : "**`No`**"
            }`,
            inline: true,
          },
          {
            name: " `🎏` | Banner",
            value: user.bannerURL() ? "** **" : "**`None`**",
          }
        );

      const avatarbutton = new ButtonBuilder()
        .setLabel(`Avatar Link`)
        .setEmoji("<:reliable_earlysupporter:1030801808400056421>")
        .setStyle(ButtonStyle.Link)
        .setURL(
          `${user.avatarURL({ size: 1024, dynamic: true, format: "png" })}`
        );

      await interaction.reply({
        embeds: [embed],
        components: [new ActionRowBuilder().addComponents(avatarbutton)],
        ephemeral: false,
      });
    } else if (interaction.options.getSubcommand() === "user-perm") {
      const member =
        interaction.options.getMember("target") || interaction.member;
      const memberPermissions = member.permissions.toArray();

      const embed = new EmbedBuilder()
        .setTitle(`User Permissions`)
        .addFields(
          {
            name: "‣ User Name",
            value: `> <@${member.id}> (${member.id})`,
            inline: true,
          },
          {
            name: "‣ User Permissions",
            value: `\`\`\`${memberPermissions}\`\`\``,
            inline: false,
          }
        )
        .setTimestamp()
        .setColor("#0398fc")
        .setFooter({ text: "©2022 | Reliable" });
      interaction.reply({ embeds: [embed], ephemeral: true });
    } else {
      interaction.reply({ content: `No sub command choosed` });
    }
  },
};
/**
 * @Author Reliable Inc.
 * @Copyright ©2022 | Reliable Inc, All rights reserved.
 * @CodedBy Mohtasim Alam Sohom, Sajidur Rahman Tahsin
 */
