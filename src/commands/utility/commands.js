const { EmbedBuilder } = require('discord.js');
const { countCommands, commandDefinitions } = require('../registry');

module.exports = {
  data: { name: 'commands', description: 'Show the available command inventory.', type: 1 },
  async execute(interaction) {
    const total = countCommands(commandDefinitions);
    const embed = new EmbedBuilder()
      .setTitle('FBI Command Inventory')
      .setDescription(`Total registered command actions: ${total}`)
      .addFields({ name: 'Status', value: 'Real command registry loaded' })
      .setColor(0x2e7d32)
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
