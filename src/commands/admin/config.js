const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'config',
    description: 'Access bot configuration and setup tools.',
    type: 1,
  },
  async execute(interaction) {
    const configEmbed = new EmbedBuilder()
      .setTitle('FBI BOT CONFIGURATION')
      .setDescription('Configuration controls are available in the centralized config layer.')
      .setColor(0x7c4dff)
      .addFields(
        { name: 'Offices', value: 'Configured', inline: true },
        { name: 'Ranks', value: 'Configured', inline: true },
        { name: 'Certifications', value: 'Configured', inline: true },
        { name: 'Statuses', value: 'Configured', inline: true },
        { name: 'Channels', value: 'Configured', inline: true },
        { name: 'Permissions', value: 'Configured', inline: true },
      );

    await interaction.reply({ embeds: [configEmbed] });
  },
};
