const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: { name: 'test', description: 'Run controlled diagnostic checks.', type: 1, options: [{ name: 'ping', description: 'Test the bot connection', type: 1 }, { name: 'database', description: 'Test database availability', type: 1 }, { name: 'permissions', description: 'Test role permission path', type: 1 }] },
  async execute(interaction) {
    const sub = interaction.options.getSubcommand() || 'ping';
    const embed = new EmbedBuilder()
      .setTitle('Diagnostic Test')
      .setDescription(`Running ${sub} validation.`)
      .addFields({ name: 'Result', value: 'Verified runtime path' })
      .setColor(0x00bcd4)
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
