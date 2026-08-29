const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: { name: 'source', description: 'Display the bot source categories and version.', type: 1 },
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('FBI Management Bot V1')
      .setDescription('V2 expansion framework installed.')
      .addFields(
        { name: 'Core', value: 'Infrastructure, config, DB, startup validation' },
        { name: 'Expansion', value: 'Personnel, promotions, demotions, certifications, operations' },
        { name: 'State', value: 'Persistent and modular' }
      )
      .setColor(0x607d8b)
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
