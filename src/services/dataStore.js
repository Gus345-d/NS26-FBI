const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(process.cwd(), 'data');
const STORE_PATH = path.join(DATA_DIR, 'bot-store.json');

const defaultState = {
  personnel: [],
  audit: [],
  activity: [],
  commands: [],
  logs: [],
};

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadStore() {
  ensureDataDir();

  try {
    if (!fs.existsSync(STORE_PATH)) {
      fs.writeFileSync(STORE_PATH, JSON.stringify(defaultState, null, 2));
      return structuredClone(defaultState);
    }

    const raw = fs.readFileSync(STORE_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    return { ...defaultState, ...parsed };
  } catch (error) {
    console.warn('⚠️ Data store failed to load. Reinitializing to defaults.');
    fs.writeFileSync(STORE_PATH, JSON.stringify(defaultState, null, 2));
    return structuredClone(defaultState);
  }
}

function saveStore(store) {
  ensureDataDir();
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2));
}

function getStore() {
  return loadStore();
}

function recordCommandAction(category, action, user, payload = {}) {
  const store = getStore();
  const entry = {
    id: `ACT-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    category,
    action,
    user: user?.id || 'system',
    userTag: user?.tag || 'system',
    timestamp: new Date().toISOString(),
    payload,
  };

  store.commands.push(entry);
  saveStore(store);
  return entry;
}

function recordAudit(category, action, actor, summary = '', details = {}) {
  const store = getStore();
  const entry = {
    id: `${category.toUpperCase().slice(0, 3)}-${String(store.audit.length + 1).padStart(5, '0')}`,
    category,
    action,
    actor: actor?.id || 'system',
    actorTag: actor?.tag || 'system',
    summary,
    details,
    timestamp: new Date().toISOString(),
  };

  store.audit.push(entry);
  saveStore(store);
  return entry;
}

function recordActivity(category, action, memberId, summary = '') {
  const store = getStore();
  const entry = {
    id: `ACT-${String(store.activity.length + 1).padStart(5, '0')}`,
    category,
    action,
    memberId,
    summary,
    timestamp: new Date().toISOString(),
  };

  store.activity.push(entry);
  saveStore(store);
  return entry;
}

module.exports = {
  getStore,
  saveStore,
  loadStore,
  recordCommandAction,
  recordAudit,
  recordActivity,
};
