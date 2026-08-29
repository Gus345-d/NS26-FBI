const test = require('node:test');
const assert = require('node:assert/strict');

const { validateEnv } = require('../src/utils/env');

test('validateEnv requires configured Discord settings', () => {
  const env = { DISCORD_TOKEN: 'token', DISCORD_CLIENT_ID: 'id' };
  assert.throws(() => validateEnv(['DISCORD_TOKEN', 'DISCORD_CLIENT_ID', 'DISCORD_GUILD_ID'], env), {
    message: /DISCORD_GUILD_ID/
  });
});

test('validateEnv accepts the required configuration values', () => {
  const env = {
    DISCORD_TOKEN: 'token',
    DISCORD_CLIENT_ID: '123',
    DISCORD_GUILD_ID: '456'
  };
  assert.doesNotThrow(() => validateEnv(['DISCORD_TOKEN', 'DISCORD_CLIENT_ID', 'DISCORD_GUILD_ID'], env));
});
