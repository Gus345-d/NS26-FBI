const { EmbedBuilder } = require('discord.js');
const config = require('../../config/defaults');

module.exports = {
  data: {
    name: 'bot',
    description: 'Bot diagnostic and status tools.',
    options: [
      {
        name: 'status',
        description: 'Show bot and environment status.',
        type: 1,
      },
    ],
  },
  async execute(interaction, client, db) {
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);

    const statusEmbed = new EmbedBuilder()
      .setTitle('FBI MANAGEMENT BOT')
      .setDescription('System health overview')
      .setColor(0x00a7ff)
      .addFields(
        { name: 'Discord', value: client.isReady() ? '🟢 Connected' : '🔴 Disconnected', inline: true },
        { name: 'Database', value: db && db._connected ? '🟢 Connected' : '🟡 Pending', inline: true },
        { name: 'Guild', value: client.guilds.cache.has(process.env.DISCORD_GUILD_ID) ? '🟢 Connected' : '🟡 Pending', inline: true },
        { name: 'Commands', value: '🟢 Registered', inline: true },
        { name: 'Configuration', value: '🟢 Valid', inline: true },
        { name: 'Uptime', value: `${hours}h ${minutes}m`, inline: true },
        { name: 'Version', value: config.app.version, inline: true },
      )
      .setTimestamp();

    await interaction.reply({ embeds: [statusEmbed] });
  },
};
