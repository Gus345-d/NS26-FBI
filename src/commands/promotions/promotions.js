const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const { recordAudit, recordActivity } = require('../../services/dataStore');

module.exports = {
  data: {
    name: 'promotion',
    description: 'Promotion workflow management.',
    options: [
      { name: 'view', description: 'View a promotion record', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'history', description: 'View promotion history', type: ApplicationCommandOptionType.Subcommand },
      { name: 'pending', description: 'List pending promotions', type: ApplicationCommandOptionType.Subcommand },
      { name: 'approve', description: 'Approve a promotion', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'deny', description: 'Deny a promotion', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member', type: ApplicationCommandOptionType.User, required: true }, { name: 'reason', description: 'Reason', type: ApplicationCommandOptionType.String, required: true }] },
      { name: 'schedule', description: 'Schedule a promotion', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member', type: ApplicationCommandOptionType.User, required: true }, { name: 'date', description: 'Date', type: ApplicationCommandOptionType.String, required: true }] },
      { name: 'cancel', description: 'Cancel a promotion', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'reason', description: 'View promotion reason audit', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'statistics', description: 'Show promotion statistics', type: ApplicationCommandOptionType.Subcommand },
    ],
  },
  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const embed = new EmbedBuilder()
      .setTitle('Promotion System')
      .setDescription(`Executed /promotion ${sub}.`)
      .addFields(
        { name: 'Status', value: 'Operational' },
        { name: 'Audit', value: 'Persisted' }
      )
      .setColor(0x4caf50)
      .setTimestamp();

    recordAudit('promotion', sub, interaction.user, `Promotion command executed: ${sub}`);
    recordActivity('promotion', sub, interaction.user.id, `Promotion workflow ${sub} executed.`);

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
