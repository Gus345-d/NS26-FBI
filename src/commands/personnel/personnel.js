const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const { recordAudit, recordActivity } = require('../../services/dataStore');

module.exports = {
  data: {
    name: 'personnel',
    description: 'Personnel management commands.',
    options: [
      { name: 'view', description: 'View a personnel record', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member to inspect', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'search', description: 'Search personnel records', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'query', description: 'Search term', type: ApplicationCommandOptionType.String, required: true }] },
      { name: 'history', description: 'View personnel history', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member to inspect', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'profile', description: 'Show a full personnel profile', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member to inspect', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'status', description: 'View current personnel status', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member to inspect', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'rank', description: 'View current personnel rank', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member to inspect', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'office', description: 'View office assignment', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member to inspect', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'create', description: 'Create a base personnel record', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member to create', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'edit', description: 'Edit a personnel record', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member to edit', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'archive', description: 'Archive a personnel record', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member to archive', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'restore', description: 'Restore a personnel record', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member to restore', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'notes', description: 'Show personnel notes', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member to inspect', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'note-add', description: 'Add a personnel note', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member to target', type: ApplicationCommandOptionType.User, required: true }, { name: 'content', description: 'Note content', type: ApplicationCommandOptionType.String, required: true }] },
      { name: 'note-remove', description: 'Remove a personnel note', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member to target', type: ApplicationCommandOptionType.User, required: true }, { name: 'note-id', description: 'Note ID', type: ApplicationCommandOptionType.String, required: true }] },
      { name: 'statistics', description: 'View personnel statistics', type: ApplicationCommandOptionType.Subcommand },
      { name: 'activity', description: 'View personnel activity', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member to inspect', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'certifications', description: 'View personnel certifications', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member to inspect', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'training', description: 'View personnel training', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member to inspect', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'applications', description: 'View personnel applications', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member to inspect', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'promotions', description: 'View personnel promotions', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member to inspect', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'demotions', description: 'View personnel demotions', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member to inspect', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'transfers', description: 'View personnel transfers', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member to inspect', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'assignments', description: 'View personnel assignments', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member to inspect', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'timeline', description: 'View personnel timeline', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member to inspect', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'compare', description: 'Compare two personnel records', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'first', description: 'First member', type: ApplicationCommandOptionType.User, required: true }, { name: 'second', description: 'Second member', type: ApplicationCommandOptionType.User, required: true }] },
      { name: 'export', description: 'Export personnel data', type: ApplicationCommandOptionType.Subcommand, options: [{ name: 'member', description: 'Member to export', type: ApplicationCommandOptionType.User, required: true }] },
    ],
  },
  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    const member = interaction.options.getMember('member') || interaction.options.getUser('member') || interaction.user;
    const query = interaction.options.getString('query');

    const embed = new EmbedBuilder()
      .setTitle('Personnel Command')
      .setDescription(`Executed /personnel ${sub}.`)
      .addFields(
        { name: 'Target', value: member ? `<@${member.id}>` : 'N/A' },
        { name: 'Query', value: query || 'N/A' },
        { name: 'Status', value: 'Recorded in audit log' }
      )
      .setColor(0x1f6feb)
      .setTimestamp();

    recordAudit('personnel', sub, interaction.user, `Personnel command executed: ${sub}`, { targetId: member?.id || null, query: query || null });
    recordActivity('personnel', sub, member?.id || interaction.user.id, `Personnel command ${sub} executed.`);

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
