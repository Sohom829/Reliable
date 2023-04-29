const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: `rulesmenu`,
  },
  async execute(interaction, client) {
    const rules = interaction.values[0];

    const CommunityRules = new EmbedBuilder()
      .setTitle(
        `<:reliable_moderation:1030443113958875236> Community Rules - ${interaction.guild.name}`
      )
      .setColor("#2F3136")
      .setFooter({ text: "©2022 - 2023 | Reliable | By Discord" })
      .setThumbnail(interaction.guild.iconURL({ size: 1024 }))
      .setTimestamp()
      .setDescription(`<:reliable_dot:1033023030449950812> If you wish to report anyone breaking the rules, you may simply ping or directly message anyone with the Mods roles to deal with the situation accordingly.

<:reliable_dot:1033023030449950812> Do not harass others or organize, promote, or participate in harassment. Disagreements happen and are normal, but making continuous, repetitive, or severe negative comments or circumventing a block or ban can cross the line into harassment and is not okay.

<:reliable_dot:1033023030449950812> Do not organize, promote, or participate in hate speech or hateful conduct. It’s unacceptable to attack a person or a community based on attributes such as their race, ethnicity, caste, national origin, sex, gender identity, gender presentation, sexual orientation, religious affiliation, age, serious illness, disabilities, or other protected classifications.

<:reliable_dot:1033023030449950812> Do not make threats of violence or threaten to harm others. This includes indirect or suggestive threats, as well as sharing or threatening to share someone’s personally identifiable information (also known as doxxing).

<:reliable_dot:1033023030449950812> Do not use Discord for the organization, promotion, or support of violent extremism. This also includes glorifying violent events, the perpetrators of violent acts, or similar behaviors.

<:reliable_dot:1033023030449950812> Do not sexualize children in any way. You cannot share content or links which depict children in a pornographic, sexually suggestive, or violent manner, including illustrated or digitally altered pornography that depicts children (such as lolicon, shotacon, or cub) and conduct grooming behaviors. We report illegal content and grooming to the National Center for Missing and Exploited Children.

<:reliable_dot:1033023030449950812> We strongly discourage and may take action against vigilante behavior, as it can interfere with our investigation and ability to report to law enforcement.

<:reliable_dot:1033023030449950812> Do not make adult content available to anyone under the age of 18. You must be age 18 or older to participate in adult content on Discord. You must apply the age-restricted label to any channels or servers if they contain adult content or other restricted content such as violent content.

<:reliable_dot:1033023030449950812> Do not use adult content in avatars, server banners, server icons, invite splashes, emoji, stickers, or any other space that cannot be age-restricted.`);

    const GamingRules = new EmbedBuilder()
      .setTitle(
        `<:reliable_moderation:1030443113958875236> Gaming Rules - ${interaction.guild.name}`
      )
      .setColor("#2F3136")
      .setFooter({ text: "©2022 - 2023 | Reliable" })
      .setThumbnail(interaction.guild.iconURL({ size: 1024 }))
      .setTimestamp()
      .setDescription(`<:reliable_dot:1033023030449950812> Hate speech is not allowed on Facebook.
<:reliable_dot:1033023030449950812> We define an attack as violent or dehumanizing speech, statements of inferiority, or calls for exclusion or segregation. We also don't allow for the hateful use of racial or misogynistic slurs. Learn more by reading our Community Standards on hate speech.
      
<:reliable_dot:1033023030449950812> We do not tolerate bullying or harassment on Facebook.
      
<:reliable_dot:1033023030449950812> We want you, as a member of our community, to feel safe and respected so you can engage and connect with others. Shaming others or telling them to kill themselves (including text speak “KYS”) is not tolerated. Learn more by reading our Community Standards on bullying and harassment.
      
<:reliable_dot:1033023030449950812> Keep it clean!
      
<:reliable_dot:1033023030449950812> Don't promote sexual misconduct or abuse of any kind. Additionally, we restrict the display of nudity or sexual activity because some people in our community may be sensitive to this type of content. We default to removing sexual imagery to prevent the sharing of non-consensual or underage content. Learn more about our Community Standards for adult nudity and sexual activity and sexual exploitation of adults.
      
<:reliable_dot:1033023030449950812> Don't post content that promotes, encourages, coordinates, or provides instructions for suicide, self-harm, or eating disorders.
      
<:reliable_dot:1033023030449950812> This includes asking others to help you harm yourself, or assisting others in engaging in self-harm or suicidal behavior themselves. Learn more about our suicide and self-injury policies and the resources we provide.
      
<:reliable_dot:1033023030449950812> Don't promote illegal activity.
      
<:reliable_dot:1033023030449950812> We prohibit people from promoting or publicizing violent crime, theft or fraud. We don't want to condone this activity or inspire copycat behavior. We also don't allow people to depict criminal activity or admit to crimes they or their associates have committed. We do, however, allow people to debate or advocate for the legality of criminal activities, as well as address them in a rhetorical or satirical way. Learn more by reading our Community Standards for promoting or publicizing crime.`)
    const GiveawayRules = new EmbedBuilder()
      .setTitle(
        `<:reliable_moderation:1030443113958875236> Giveaway Rules - ${interaction.guild.name}`
      )
      .setColor("#2F3136")
      .setFooter({ text: "©2022 - 2023 | Reliable" })
      .setThumbnail(interaction.guild.iconURL({ size: 1024 }))
      .setTimestamp()
      .setDescription(`<:reliable_dot:1033023030449950812> The prospective renter that you spoke to must chat with you before applying to live at the community. 

<:reliable_dot:1033023030449950812> The prospective renter must not use a third party broker or locator.

<:reliable_dot:1033023030449950812> The prospective renter must sign a lease and move into the community.

<:reliable_dot:1033023030449950812> The prospective renter must sign a full term (typically 12 month) lease. 

<:reliable_dot:1033023030449950812> You must be in good financial standing with your community.

<:reliable_dot:1033023030449950812> We do not tolerate any kind of advertisements, whether it be for other communities or streams. You can post your content in the media channel if it is relevant and provides actual value (Video/Art) | Also Discord server Links and IP!

<:reliable_dot:1033023030449950812> You must be a current, full-time resident of the community with an active lease. Rewards are only issued to current residents.

<:reliable_dot:1033023030449950812> You must be a current resident of the community when the prospective renter moves in. Rewards are only issued to current residents.

<:reliable_dot:1033023030449950812> The prospective renter may have to be a resident of the community for 30, 60, or 90 days following their move-in date. The 30, 60, or 90 day move in requirement is set by your apartment community.

<:reliable_dot:1033023030449950812> Sharing Methods / Rewards. We strictly warned everyone no to share there rewards with others! If someone got caught they will be banned from our rewards and discord server! Please be careful`);

    const ChillRules = new EmbedBuilder()
      .setTitle(
        `<:reliable_moderation:1030443113958875236> Chilling Rules - ${interaction.guild.name}`
      )
      .setColor("#2F3136")
      .setFooter({ text: "©2022 - 2023 | Reliable" })
      .setThumbnail(interaction.guild.iconURL({ size: 1024 }))
      .setTimestamp()
      .setDescription(`<:reliable_dot:1033023030449950812> You must respect all users, regardless of your liking towards them. Treat others the way you want to be treated.
      
<:reliable_dot:1033023030449950812> The use of profanity should be kept to a minimum. However, any derogatory language towards any user is prohibited.
      
<:reliable_dot:1033023030449950812> Don't send a lot of small messages right after each other. Do not disrupt chat by spamming.
      
<:reliable_dot:1033023030449950812> This is a community server and not meant to share this kind of material.
      
<:reliable_dot:1033023030449950812> We do not tolerate any kind of advertisements, whether it be for other communities or streams. You can post your content in the media channel if it is relevant and provides actual value (Video/Art)
      
<:reliable_dot:1033023030449950812> You will be asked to change your name or picture if the staff deems them inappropriate.
      
<:reliable_dot:1033023030449950812> Raiding or mentions of raiding are not allowed.
      
<:reliable_dot:1033023030449950812> Threats to other users of DDoS, Death, DoX, abuse, and other malicious threats are absolutely prohibited and disallowed. 
      
<:reliable_dot:1033023030449950812> Do not join voice chat channels without permission of the people already in there If you see that they have a free spot it is alright to join and ask whether they have an open spot, but leave if your presence is not wanted by whoever was there first.

<:reliable_dot:1033023030449950812> The Admins and Mods will Mute/Kick/Ban per discretion. If you feel mistreated dm an Admin and we will resolve the issue.
  
<:reliable_dot:1033023030449950812> Your presence in this server implies accepting these rules, including all further changes. These changes might be done at any time without notice, it is your responsibility to check for them.`);

    if (rules === "cm_rules") {
      return interaction.reply({ embeds: [CommunityRules] });
    } else if (rules === "gm_rules") {
      return interaction.reply({ embeds: [GamingRules] });
    } else if (rules === "giveaway_rules") {
      return interaction.reply({ embeds: [GiveawayRules] });
    } else if (rules === "chill_rules") {
      return interaction.reply({ embeds: [ChillRules] });
    }
  },
};
