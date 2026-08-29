const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const { recordAudit, recordActivity } = require('../../services/dataStore');

module.exports = {
  data: {
    name: 'certification',
    description: 'Certification platform.',
    options: [
      { name: 'grant', description: 'Grant certification', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member', type: ApplicationCommandOptionType.User, required: true }, { name: 'certification', description: 'Certification name', type: ApplicationCommandOptionType.String, required: true }] },
      { name: 'revoke', description: 'Revoke certification', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member', type: ApplicationCommandOptionType.User, required: true }, { name: 'certification', description: 'Certification name', type: ApplicationCommandOptionType.String, required: true }] },
      { name: 'view', description: 'View a certification record', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'list', description: 'List certifications', type: ApplicationCommandOptionType.Subcommand },
      { name: 'history', description: 'View certification history', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'expire', description: 'Mark a certification as expired', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member', type: ApplicationCommandOptionType.User, required: true }, { name: 'certification', description: 'Certification name', type: ApplicationCommandOptionType.String, required: true }] },
      { name: 'renew', description: 'Renew a certification', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member', type: ApplicationCommandOptionType.User, required: true }, { name: 'certification', description: 'Certification name', type: ApplicationCommandOptionType.String, required: true }] },
      { name: 'suspend', description: 'Suspend a certification', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member', type: ApplicationCommandOptionType.User, required: true }, { name: 'certification', description: 'Certification name', type: ApplicationCommandOptionType.String, required: true }] },
      { name: 'restore', description: 'Restore a suspended certification', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member', type: ApplicationCommandOptionType.User, required: true }, { name: 'certification', description: 'Certification name', type: ApplicationCommandOptionType.String, required: true }] },
      { name: 'search', description: 'Search certifications', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'query', description: 'Search term', type: ApplicationCommandOptionType.String, required: true }] },
      { name: 'statistics', description: 'Display certification statistics', type: ApplicationCommandOptionType.Subcommand },
    ],
  },
  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const embed = new EmbedBuilder()
      .setTitle('Certification System')
      .setDescription(`Executed /certification ${sub}.`)
      .addFields({ name: 'Status', value: 'Operational' })
      .setColor(0x9c27b0)
      .setTimestamp();

    recordAudit('certification', sub, interaction.user, `Certification command executed: ${sub}`);
    recordActivity('certification', sub, interaction.user.id, `Certification workflow ${sub} executed.`);

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
