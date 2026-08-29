const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'help',
    description: 'View available FBI management commands.',
    type: 1,
  },
  async execute(interaction) {
    const helpEmbed = new EmbedBuilder()
      .setTitle('FBI Management Bot V1')
      .setDescription('Official FBI command directory. Core commands include /ping, /help, /bot status, /promote, /demote, /status set, /certification grant, /announce, and /say.')
      .setColor(0x1f6feb)
      .addFields(
        { name: 'Utility', value: '/ping, /help, /bot status' },
        { name: 'Personnel', value: '/personnel view, /personnel search' },
        { name: 'Rank', value: '/promote, /demote' },
        { name: 'Status', value: '/status set, /status view' },
        { name: 'Announcements', value: '/announce, /say' }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [helpEmbed] });
  },
};
