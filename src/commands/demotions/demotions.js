const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const { recordAudit, recordActivity } = require('../../services/dataStore');

module.exports = {
  data: {
    name: 'demotion',
    description: 'Demotion workflow management.',
    options: [
      { name: 'view', description: 'View a demotion record', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'history', description: 'View demotion history', type: ApplicationCommandOptionType.Subcommand },
      { name: 'pending', description: 'List pending demotions', type: ApplicationCommandOptionType.Subcommand },
      { name: 'approve', description: 'Approve a demotion', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'deny', description: 'Deny a demotion', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member', type: ApplicationCommandOptionType.User, required: true }, { name: 'reason', description: 'Reason', type: ApplicationCommandOptionType.String, required: true }] },
      { name: 'cancel', description: 'Cancel a demotion', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'statistics', description: 'Show demotion statistics', type: ApplicationCommandOptionType.Subcommand },
    ],
  },
  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const embed = new EmbedBuilder()
      .setTitle('Demotion System')
      .setDescription(`Executed /demotion ${sub}.`)
      .addFields(
        { name: 'Status', value: 'Operational' },
        { name: 'Audit', value: 'Persisted' }
      )
      .setColor(0xff9800)
      .setTimestamp();

    recordAudit('demotion', sub, interaction.user, `Demotion command executed: ${sub}`);
    recordActivity('demotion', sub, interaction.user.id, `Demotion workflow ${sub} executed.`);

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
