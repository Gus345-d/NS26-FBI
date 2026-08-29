function buildGroup(name, subcommands) {
  return {
    name,
    description: `${name} command group`,
    options: subcommands.map((subcommand) => ({
      name: subcommand,
      description: `${subcommand} for ${name}`,
      type: 1,
    })),
  };
}

const commandDefinitions = [
  { name: 'ping', description: 'Check whether the FBI bot is online.', type: 1 },
  { name: 'help', description: 'View available FBI management commands.', type: 1 },
  { name: 'bot', description: 'Bot diagnostic and status tools.', options: [{ name: 'status', description: 'Show bot and environment status.', type: 1 }, { name: 'info', description: 'Show bot details.', type: 1 }, { name: 'uptime', description: 'Show uptime.', type: 1 }, { name: 'latency', description: 'Show latency.', type: 1 }, { name: 'database', description: 'Check database health.', type: 1 }, { name: 'commands', description: 'Inspect registered commands.', type: 1 }, { name: 'configuration', description: 'Inspect configuration health.', type: 1 }, { name: 'permissions', description: 'Inspect permission health.', type: 1 }, { name: 'roles', description: 'Inspect role health.', type: 1 }, { name: 'channels', description: 'Inspect channel health.', type: 1 }, { name: 'diagnostics', description: 'Run complete diagnostics.', type: 1 }] },
  { name: 'config', description: 'Access bot configuration and setup tools.', options: [{ name: 'view', description: 'View configuration', type: 1 }, { name: 'validate', description: 'Validate configuration', type: 1 }, { name: 'reload', description: 'Reload configuration', type: 1 }, { name: 'channels', description: 'Configure channels', type: 1 }, { name: 'roles', description: 'Configure roles', type: 1 }, { name: 'ranks', description: 'Configure ranks', type: 1 }, { name: 'offices', description: 'Configure offices', type: 1 }, { name: 'certifications', description: 'Configure certifications', type: 1 }, { name: 'statuses', description: 'Configure statuses', type: 1 }, { name: 'permissions', description: 'Configure permissions', type: 1 }, { name: 'banners', description: 'Configure banners', type: 1 }, { name: 'logging', description: 'Configure logging', type: 1 }, { name: 'announcements', description: 'Configure announcements', type: 1 }, { name: 'database', description: 'Configure database settings', type: 1 }] },
  buildGroup('personnel', ['view','search','create','edit','archive','restore','history','notes','note-add','note-remove','note-edit','profile','statistics','activity','status','rank','office','certifications','training','applications','promotions','demotions','transfers','assignments','timeline','compare','export']),
  buildGroup('promotion', ['view','history','pending','approve','deny','schedule','cancel','reason','statistics']),
  buildGroup('demotion', ['view','history','pending','approve','deny','cancel','statistics']),
  buildGroup('certification', ['grant','revoke','view','list','history','expire','renew','suspend','restore','search','statistics']),
  buildGroup('status', ['set','remove','view','history','search','schedule','expire','extend','cancel','list','statistics']),
  buildGroup('office', ['assign','remove','view','list','history','search','validate','missing','configured']),
  buildGroup('transfer', ['request','approve','deny','cancel','history','view','pending','reason','statistics']),
  buildGroup('assignment', ['create','view','edit','remove','list','history','search','assign']),
  buildGroup('application', ['view','search','list','status','accept','deny','review','assign','notes','interview','schedule','withdraw','reopen','archive','statistics']),
  buildGroup('recruitment', ['open','close','applicant','interview','accept','deny','assign','statistics','status','queue']),
  buildGroup('training', ['create','edit','cancel','start','end','view','list','schedule','attendee-add','attendee-remove','attendance','pass','fail','incomplete','certificate','history','instructor','statistics','search']),
  buildGroup('academy', ['class-create','class-edit','class-cancel','class-view','classes','enroll','unenroll','roster','attendance','graduate','fail','instructor','schedule','history','statistics']),
  buildGroup('ia', ['create','view','search','list','assign','unassign','update','note','evidence','status','close','reopen','outcome','history','statistics']),
  buildGroup('investigation', ['create','view','search','list','assign','unassign','update','status','close','reopen','notes','evidence','timeline','statistics']),
  buildGroup('case', ['create','view','search','list','assign','unassign','update','status','close','reopen','archive','notes','timeline','statistics']),
  buildGroup('evidence', ['add','view','search','list','edit','archive','attach','remove','history','record']),
  buildGroup('report', ['create','view','search','list','edit','submit','review','approve','reject','archive','history']),
  buildGroup('operation', ['create','view','list','edit','cancel','start','end','assign','remove','roster','status','notes','history']),
  buildGroup('deployment', ['create','view','list','start','end','cancel','assign','roster','status','ping','history']),
  buildGroup('announcement', ['create','edit','preview','send','schedule','cancel','history','templates','template-create','template-delete','status']),
  buildGroup('banner', ['add','remove','list','view','set-default','preview','rename','status']),
  buildGroup('message', ['send','preview','banner','embed','edit','delete','schedule','cancel','history','status']),
  { name: 'say', description: 'Send an official announcement from authorized staff.', options: [{ name: 'message', description: 'Official announcement content', type: 3 }, { name: 'channel', description: 'Announcement channel', type: 3 }, { name: 'banner', description: 'Optional banner URL', type: 3 }, { name: 'embed', description: 'Optional embed mode', type: 3 }, { name: 'mention', description: 'Optional mention', type: 3 }] },
  buildGroup('warn', ['member','history','remove','clear','stats','search']),
  buildGroup('warnings', ['member','view','clear','search','history']),
  buildGroup('clearwarnings', ['member','all','history']),
  buildGroup('moderation', ['warn','warnings','warn-remove','warnings-clear','timeout','untimeout','kick','ban','unban','softban','ban-history','mod-history','mod-note','mod-search','mod-stats']),
  buildGroup('security', ['status','audit','lockdown','unlock','antiraid','antispam','joins','suspicious','rolechanges','channelchanges','permissionchanges','alerts','settings']),
  buildGroup('role', ['add','remove','check','info','members','hierarchy','compare','configured','missing','validate']),
  buildGroup('channel', ['info','permissions','status','validate','configured','missing','announce','log-test']),
  buildGroup('audit', ['search','user','action','target','date','export','statistics','latest','view']),
  buildGroup('search', ['personnel','applications','cases','investigations','training','certifications','promotions','demotions','transfers','reports']),
  buildGroup('stats', ['server','personnel','promotions','demotions','training','applications','moderation','offices','certifications','activity','operations']),
  buildGroup('activity', ['view','user','add','remove','history','stats','leaderboard','period']),
  buildGroup('task', ['create','assign','view','list','edit','complete','cancel','overdue','history']),
  buildGroup('schedule', ['create','view','edit','cancel','list','today','week','assign']),
  buildGroup('template', ['create','edit','delete','list','view','use']),
  buildGroup('notify', ['user','role','office','command','schedule','list','cancel']),
  buildGroup('directory', ['rank','office','certification','status','callsign']),
  { name: 'commands', description: 'Visible command inventory.', options: [{ name: 'all', description: 'List all commands', type: 1 }, { name: 'personal', description: 'List your commands', type: 1 }, { name: 'help', description: 'Show help for commands', type: 1 }] },
  buildGroup('sync', ['user','personnel','roles','all']),
  buildGroup('export', ['personnel','audit','training','applications','promotions','cases']),
  buildGroup('archive', ['personnel','applications','cases','reports','evidence','records']),
  buildGroup('test', ['ping','database','permissions','roles','channels','configuration','logging']),
  buildGroup('loa', ['request','view','list','approve','deny','cancel','extend','end','history','pending','active','statistics']),
  buildGroup('announce', ['send','history','preview','schedule','template','cancel','status']),
  buildGroup('directory', ['rank','office','certification','status','callsign'])
];

function countCommands(list) {
  return list.reduce((total, command) => total + 1 + (Array.isArray(command.options) ? command.options.length : 0), 0);
}

function loadCommandRegistry() {
  return commandDefinitions.map((command) => ({ ...command, toJSON: undefined }));
}

module.exports = { loadCommandRegistry, commandDefinitions, countCommands };
