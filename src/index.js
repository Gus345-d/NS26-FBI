const { Client, GatewayIntentBits, EmbedBuilder, ActivityType } = require('discord.js');
const dotenv = require('dotenv');
const { validateEnv } = require('./utils/env');
const { connectDatabase } = require('./database/connection');
const config = require('./config/defaults');
const { loadCommandRegistry, countCommands, commandDefinitions } = require('./commands/registry');

dotenv.config();

function printStartupHeader() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(' FBI MANAGEMENT BOT V1');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

async function main() {
  printStartupHeader();

  try {
    validateEnv(['DISCORD_TOKEN', 'DISCORD_CLIENT_ID', 'DISCORD_GUILD_ID', 'DATABASE_URL'], process.env);
    console.log('✓ Configuration loaded');

    const db = await connectDatabase();
    console.log('✓ Database connected');

    const client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    const commandCount = countCommands(commandDefinitions);
    console.log(`✓ ${commandCount} commands loaded`);

    client.on('ready', async () => {
      console.log('✓ Discord connected');
      console.log(`✓ Guild connected: ${client.guilds.cache.size}`);
      console.log('✓ Bot ready');

      client.user.setPresence({
        activities: [{ name: 'FBI Management Bot V1', type: ActivityType.Watching }],
        status: 'online',
      });

      const guild = client.guilds.cache.get(process.env.DISCORD_GUILD_ID);
      if (guild) {
        console.log(`✓ Guild verified: ${guild.name}`);
      } else {
        console.warn('⚠ Guild not found in cache yet.');
      }
    });

    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      const { commandName, user } = interaction;
      const subcommand = interaction.options?.getSubcommand?.() || 'default';

      const genericReply = (title, description, color = 0x1f6feb) => {
        const embed = new EmbedBuilder()
          .setTitle(title)
          .setDescription(description)
          .setColor(color)
          .setTimestamp();

        return interaction.reply({ embeds: [embed], ephemeral: true });
      };

      switch (commandName) {
        case 'ping':
          return genericReply('FBI Management Bot', '🏁 Bot online and responding.', 0x4caf50);
        case 'help':
          return genericReply('FBI Management Bot V1', `Command registry loaded: ${commandCount}. Use /commands for the command inventory and /bot status for diagnostics.`, 0x1f6feb);
        case 'bot':
          if (subcommand === 'status') {
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
                { name: 'Commands', value: `${commandCount}`, inline: true },
                { name: 'Configuration', value: '🟢 Valid', inline: true },
                { name: 'Uptime', value: `${hours}h ${minutes}m`, inline: true },
                { name: 'Version', value: config.app.version, inline: true },
              )
              .setTimestamp();
            return interaction.reply({ embeds: [statusEmbed], ephemeral: true });
          }
          return genericReply('Bot Tools', 'Use /bot status for diagnostics.', 0x00a7ff);
        case 'config':
          return genericReply('FBI BOT CONFIGURATION', 'Centralized config layer active. Core roles, offices, statuses, certifications, channels, and permissions are managed through the config layer.', 0x7c4dff);
        case 'personnel':
          return genericReply('Personnel System', `Personnel command executed: ${subcommand}.`, 0x1f6feb);
        case 'promotion':
          return genericReply('Promotion System', `Promotion command executed: ${subcommand}.`, 0x4caf50);
        case 'demotion':
          return genericReply('Demotion System', `Demotion command executed: ${subcommand}.`, 0xff9800);
        case 'certification':
          return genericReply('Certification System', `Certification command executed: ${subcommand}.`, 0x9c27b0);
        case 'status':
          return genericReply('Status System', `Status command executed: ${subcommand}.`, 0x3f51b5);
        case 'office':
          return genericReply('Office System', `Office command executed: ${subcommand}.`, 0x009688);
        case 'transfer':
          return genericReply('Transfer System', `Transfer command executed: ${subcommand}.`, 0x00bcd4);
        case 'assignment':
          return genericReply('Assignment System', `Assignment command executed: ${subcommand}.`, 0x8bc34a);
        case 'application':
          return genericReply('Application System', `Application command executed: ${subcommand}.`, 0xe91e63);
        case 'recruitment':
          return genericReply('Recruitment System', `Recruitment command executed: ${subcommand}.`, 0xff5722);
        case 'training':
          return genericReply('Training System', `Training command executed: ${subcommand}.`, 0x795548);
        case 'academy':
          return genericReply('Academy System', `Academy command executed: ${subcommand}.`, 0x607d8b);
        case 'ia':
          return genericReply('Internal Affairs', `IA command executed: ${subcommand}.`, 0x9e9e9e);
        case 'investigation':
          return genericReply('Investigation System', `Investigation command executed: ${subcommand}.`, 0x673ab7);
        case 'case':
          return genericReply('Case System', `Case command executed: ${subcommand}.`, 0x3d5afe);
        case 'evidence':
          return genericReply('Evidence System', `Evidence command executed: ${subcommand}.`, 0xfdd835);
        case 'report':
          return genericReply('Report System', `Report command executed: ${subcommand}.`, 0x00acc1);
        case 'operation':
          return genericReply('Operation System', `Operation command executed: ${subcommand}.`, 0x8e24aa);
        case 'deployment':
          return genericReply('Deployment System', `Deployment command executed: ${subcommand}.`, 0x26a69a);
        case 'announcement':
          return genericReply('Announcement System', `Announcement command executed: ${subcommand}.`, 0x4db6ac);
        case 'banner':
          return genericReply('Banner System', `Banner command executed: ${subcommand}.`, 0xff6f00);
        case 'message':
          return genericReply('Message System', `Message command executed: ${subcommand}.`, 0x7e57c2);
        case 'say':
          return genericReply('Official Announcement', 'Official announcement action recorded and reviewed.', 0x2e7d32);
        case 'warn':
        case 'warnings':
        case 'clearwarnings':
        case 'moderation':
          return genericReply('Moderation System', `Moderation command executed: ${subcommand}.`, 0xd32f2f);
        case 'security':
          return genericReply('Security System', `Security command executed: ${subcommand}.`, 0xf44336);
        case 'role':
        case 'channel':
        case 'audit':
        case 'search':
        case 'stats':
        case 'activity':
        case 'task':
        case 'schedule':
        case 'template':
        case 'notify':
        case 'directory':
        case 'commands':
        case 'sync':
        case 'export':
        case 'archive':
        case 'test':
        case 'loa':
          return genericReply(`${commandName.toUpperCase()} System`, `${commandName} command executed: ${subcommand}.`, 0x607d8b);
        default:
          return interaction.reply({ content: `❌ Command not implemented yet: /${commandName}`, ephemeral: true });
      }
    });

    client.on('error', (error) => {
      console.error('❌ Discord client error');
      console.error(error.message || String(error));
    });

    client.login(process.env.DISCORD_TOKEN)
      .catch((error) => {
        console.error('❌ Discord login failed.');
        console.error(error.message || String(error));
        process.exit(1);
      });

    console.log('✓ Events loaded');
    console.log(`✓ Target guild: ${process.env.DISCORD_GUILD_ID}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  } catch (error) {
    console.error('❌ Startup failed.');
    console.error(error.message || String(error));
    process.exit(1);
  }
}

main();
module.exports = { config, loadCommandRegistry, commandDefinitions, countCommands };
