
const config = require('../config.json');

module.exports = {
    giveaway: (config.everyoneMention ? "@everyone\n\n" : "")+"<a:reliable_rewards:1039201211196383333> **GIVEAWAY** <a:reliable_rewards:1039201211196383333>",
    giveawayEnded: (config.everyoneMention ? "@everyone\n\n" : "")+"<a:reliable_rewards:1039201211196383333> **GIVEAWAY ENDED** <a:reliable_rewards:1039201211196383333>",
    inviteToParticipate: "> React with <:reliable_giveaway:1038804433116614718> to participate!",
    dropMessage: "> Be the first to react with React with <:reliable_giveaway:1038804433116614718> to participate!",
    drawing: '> **`Drawing`**: {timestamp}',
    winMessage: "Congratulations, {winners}! You won **{this.prize}**!",
    embedFooter: "Giveaways",
    noWinner: "> **`Giveaway cancelled, no valid participations.`**",
    hostedBy: "Hosted by: {this.hostedBy}",
    winners: "winner(s)",
    endedAt: "Ended at"
};