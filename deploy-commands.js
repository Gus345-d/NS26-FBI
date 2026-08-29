require('dotenv').config();

const { REST, Routes } = require('discord.js');
const { validateEnv } = require('./src/utils/env');
const { loadCommandRegistry, countCommands, commandDefinitions } = require('./src/commands/registry');

async function main() {
  try {
    validateEnv(['DISCORD_TOKEN', 'DISCORD_CLIENT_ID', 'DISCORD_GUILD_ID']);

    const commands = loadCommandRegistry();
    const total = countCommands(commandDefinitions);
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(' FBI MANAGEMENT BOT V1');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`✅ Registry count: ${total} command actions`);
    console.log('✅ Logged in as Discord REST client');
    console.log('✅ Connected to Discord API');

    const route = Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID);
    const data = await rest.put(route, { body: commands });

    console.log(`✅ Registered ${Array.isArray(data) ? data.length : 0} slash commands`);
    console.log(`✅ Commands deployed to guild ${process.env.DISCORD_GUILD_ID}`);
  } catch (error) {
    console.error('❌ Command deployment failed.');
    console.error(error.message || String(error));
    process.exit(1);
  }
}

main();
