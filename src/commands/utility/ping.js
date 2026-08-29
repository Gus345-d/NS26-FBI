const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'ping',
    description: 'Check whether the FBI bot is online.',
    type: 1,
  },
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('FBI Management Bot')
      .setDescription('🏁 Bot online and responding.')
      .setColor(0x4caf50)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
