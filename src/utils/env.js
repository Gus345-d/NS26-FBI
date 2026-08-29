function validateEnv(requiredKeys, env = process.env) {
  const missing = requiredKeys.filter((key) => {
    const value = env[key];
    return value === undefined || value === null || String(value).trim() === '';
  });

  if (missing.length > 0) {
    const missingKey = missing[0];
    throw new Error(`❌ Missing required environment variable: ${missingKey}`);
  }

  return true;
}

module.exports = { validateEnv };
