const { Client } = require('pg');

let client;

function getDatabaseClient() {
  if (!client) {
    client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    });
  }

  return client;
}

async function connectDatabase() {
  const db = getDatabaseClient();
  if (db._connected === true || db.connectionStream && db.connectionStream.readyState === 'open') {
    return db;
  }

  await db.connect();
  return db;
}

module.exports = {
  getDatabaseClient,
  connectDatabase,
};
