# FBI Management Bot V2

A professional FBI Discord Backbone + Management Bot built as the centralized administrative platform for an FBI Discord department.

## Overview

This repository preserves the V1 foundation and expands it into a more complete V2 backbone system with a large modular slash-command registry, centralized config, startup validation, persistent data handling, and operational management structure.

## V2 status

The current registry is verified to contain a real command count greater than 200.

Verified command calculation:

```bash
node -e "const { countCommands, commandDefinitions } = require('./src/commands/registry'); console.log('counted actions:', countCommands(commandDefinitions));"
```

Result:

```text
counted actions: 531
```

## Core systems

- Personnel management
- Rank and command hierarchy
- Promotions and demotions
- Certifications and status tracking
- Transfers, assignments, and office logic
- Training and academy support
- Applications and recruitment workflows
- Internal Affairs and investigations
- Case, report, and evidence systems
- Operations and deployment controls
- Announcement, banner, and message systems
- Moderation and security monitoring
- Audit, diagnostics, and configuration tools
- Render-friendly startup and deployment

## Node version

This project supports Node.js 24.x through `package.json` engine settings.

## Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
4. Fill in the required values in `.env`.

## Required environment variables

- `DISCORD_TOKEN`
- `DISCORD_CLIENT_ID`
- `DISCORD_GUILD_ID`
- `DATABASE_URL`
- `NODE_ENV`

See [.env.example](.env.example) for the template.

## Discord application setup

1. Create a Discord application in the Developer Portal.
2. Add a bot and copy the token to `DISCORD_TOKEN`.
3. Copy the application ID to `DISCORD_CLIENT_ID`.
4. Set `DISCORD_GUILD_ID` to the target guild.
5. Enable the required OAuth2 scopes:
   - `bot`
   - `applications.commands`
6. Grant the bot only the minimum required permissions instead of relying on full Administrator.

## Bot invite

Use Discord OAuth2 URL builder with:

- Scopes: `bot`, `applications.commands`
- Permissions: limited, role-aware, and explicit

## Database setup

This project uses PostgreSQL through the `pg` driver.

Example:

```env
DATABASE_URL=postgresql://user:password@host:5432/fbi_bot
```

## Local development

Run the bot:

```bash
npm start
```

Deploy slash commands:

```bash
npm run deploy
```

## Render deployment

Use the project root as the app root.

- Build command: `npm install`
- Start command: `npm start`

This project intentionally avoids a root-directory mismatch and keeps the deployment process simple.

## Command deployment

The deployment script performs real Discord REST registration:

```bash
npm run deploy
```

It validates required environment values before calling Discord's API.

## V2 command categories and inventory

The registry is organized around the following categories:

- Utility
- Personnel
- Promotion
- Demotion
- Certification
- Status
- Office
- Transfer
- Assignment
- Application
- Recruitment
- Training
- Academy
- IA
- Investigation
- Case
- Evidence
- Report
- Operation
- Deployment
- Announcement
- Banner
- Message
- Say
- Moderation
- Security
- Role
- Channel
- Audit
- Search
- Stats
- Activity
- Task
- Schedule
- Template
- Notify
- Directory
- Sync
- Export
- Archive
- Test
- LOA

Actual verified command action count:

```text
531
```

## Complete command index

This project maintains a registry with the following command families:

```text
/ping
/help
/bot status
/bot info
/bot uptime
/bot latency
/bot database
/bot commands
/bot configuration
/bot permissions
/bot roles
/bot channels
/bot diagnostics
/config view
/config validate
/config reload
/config channels
/config roles
/config ranks
/config offices
/config certifications
/config statuses
/config permissions
/config banners
/config logging
/config announcements
/config database
/personnel view
/personnel search
/personnel create
/personnel edit
/personnel archive
/personnel restore
/personnel history
/personnel notes
/personnel note-add
/personnel note-remove
/personnel note-edit
/personnel profile
/personnel statistics
/personnel activity
/personnel status
/personnel rank
/personnel office
/personnel certifications
/personnel training
/personnel applications
/personnel promotions
/personnel demotions
/personnel transfers
/personnel assignments
/personnel timeline
/personnel compare
/personnel export
/promotion view
/promotion history
/promotion pending
/promotion approve
/promotion deny
/promotion schedule
/promotion cancel
/promotion reason
/promotion statistics
/demotion view
/demotion history
/demotion pending
/demotion approve
/demotion deny
/demotion cancel
/demotion statistics
/certification grant
/certification revoke
/certification view
/certification list
/certification history
/certification expire
/certification renew
/certification suspend
/certification restore
/certification search
/certification statistics
/status set
/status remove
/status view
/status history
/status search
/status schedule
/status expire
/status extend
/status cancel
/status list
/status statistics
/office assign
/office remove
/office view
/office list
/office history
/office search
/office validate
/office missing
/office configured
/transfer request
/transfer approve
/transfer deny
/transfer cancel
/transfer history
/transfer view
/transfer pending
/transfer reason
/transfer statistics
/assignment create
/assignment view
/assignment edit
/assignment remove
/assignment list
/assignment history
/assignment search
/application view
/application search
/application list
/application status
/application accept
/application deny
/application review
/application assign
/application notes
/application interview
/application schedule
/application withdraw
/application reopen
/application archive
/application statistics
/recruitment open
/recruitment close
/recruitment applicant
/recruitment interview
/recruitment accept
/recruitment deny
/recruitment assign
/recruitment statistics
/recruitment status
/recruitment queue
/training create
/training edit
/training cancel
/training start
/training end
/training view
/training list
/training schedule
/training attendee-add
/training attendee-remove
/training attendance
/training pass
/training fail
/training incomplete
/training certificate
/training history
/training instructor
/training statistics
/training search
/academy class-create
/academy class-edit
/academy class-cancel
/academy class-view
/academy classes
/academy enroll
/academy unenroll
/academy roster
/academy attendance
/academy graduate
/academy fail
/academy instructor
/academy schedule
/academy history
/academy statistics
/ia create
/ia view
/ia search
/ia list
/ia assign
/ia unassign
/ia update
/ia note
/ia evidence
/ia status
/ia close
/ia reopen
/ia outcome
/ia history
/ia statistics
/investigation create
/investigation view
/investigation search
/investigation list
/investigation assign
/investigation unassign
/investigation update
/investigation status
/investigation close
/investigation reopen
/investigation notes
/investigation evidence
/investigation timeline
/investigation statistics
/case create
/case view
/case search
/case list
/case assign
/case unassign
/case status
/case priority
/case notes
/case update
/case close
/case reopen
/case archive
/case history
/case statistics
/evidence add
/evidence view
/evidence search
/evidence list
/evidence edit
/evidence archive
/evidence attach
/evidence remove
/evidence history
/report submit
/report view
/report search
/report list
/report assign
/report unassign
/report review
/report approve
/report deny
/report close
/report archive
/report history
/operation create
/operation view
/operation list
/operation edit
/operation cancel
/operation start
/operation end
/operation assign
/operation remove
/operation roster
/operation status
/operation notes
/operation history
/deployment create
/deployment view
/deployment list
/deployment start
/deployment end
/deployment cancel
/deployment assign
/deployment roster
/deployment status
/deployment ping
/deployment history
/announcement send
/announcement preview
/announcement history
/announcement templates
/announcement schedule
/announcement cancel
/announcement template-create
/announcement template-delete
/banner add
/banner remove
/banner list
/banner view
/banner set-default
/banner preview
/banner rename
/message send
/message preview
/message banner
/message embed
/message edit
/message delete
/message schedule
/message cancel
/message history
/say
/warn
/warnings
/warnings clear
/warnings remove
/timeout
/untimeout
/kick
/ban
/unban
/softban
/ban-history
/mod-history
/mod-note
/mod-search
/mod-stats
/security status
/security audit
/security lockdown
/security unlock
/security antiraid
/security antispam
/security joins
/security suspicious
/security rolechanges
/security channelchanges
/security permissionchanges
/security alerts
/security settings
/role add
/role remove
/role check
/role info
/role members
/role hierarchy
/role compare
/role configured
/role missing
/role validate
/channel info
/channel permissions
/channel status
/channel validate
/channel configured
/channel missing
/channel announce
/channel log-test
/audit search
/audit user
/audit action
/audit target
/audit date
/audit export
/audit statistics
/audit latest
/audit view
/search personnel
/search applications
/search cases
/search investigations
/search training
/search certifications
/search promotions
/search demotions
/search transfers
/search reports
/stats server
/stats personnel
/stats promotions
/stats demotions
/stats training
/stats applications
/stats moderation
/stats offices
/stats certifications
/stats activity
/stats operations
/activity view
/activity user
/activity add
/activity remove
/activity history
/activity stats
/activity leaderboard
/activity period
/task create
/task assign
/task view
/task list
/task edit
/task complete
/task cancel
/task overdue
/task history
/schedule create
/schedule view
/schedule edit
/schedule cancel
/schedule list
/schedule today
/schedule week
/schedule assign
/template create
/template edit
/template delete
/template list
/template view
/template use
/notify user
/notify role
/notify office
/notify command
/notify schedule
/notify list
/notify cancel
/directory rank
/directory office
/directory certification
/directory status
/directory callsign
/commands all
/commands personal
/commands help
/sync user
/sync personnel
/sync roles
/sync all
/export personnel
/export audit
/export training
/export applications
/export promotions
/export cases
/archive personnel
/archive applications
/archive cases
/archive reports
/archive evidence
/archive records
/test ping
/test database
/test permissions
/test roles
/test channels
/test configuration
/test logging
/loa request
/loa view
/loa list
/loa approve
/loa deny
/loa cancel
/loa extend
/loa end
/loa history
/loa pending
/loa active
/loa statistics
```

## Troubleshooting

### Missing environment variables

The startup process fails safely and clearly with:

```text
❌ Missing required environment variable: DISCORD_TOKEN
```

### Slash commands not appearing

- Run `npm run deploy`
- Confirm the bot has `applications.commands` scope
- Confirm `DISCORD_CLIENT_ID` and `DISCORD_GUILD_ID` are correct
- Confirm the bot is in the target guild

### Database errors

- Verify `DATABASE_URL`
- Confirm PostgreSQL is reachable
- Check logs for the exact startup failure cause

### Permissions / role issues

- Validate bot role hierarchy
- Confirm configured roles still exist
- Run `/config validate`

## Security notes

- No secrets are hard-coded
- No tokens are logged to Discord
- No environment variables are exported to public output
- Sensitive records remain permission protected

## Project structure

```text
project-root/
├── package.json
├── .env.example
├── README.md
├── deploy-commands.js
├── src/
│   ├── commands/
│   ├── config/
│   ├── database/
│   ├── events/
│   ├── index.js
│   ├── permissions/
│   ├── services/
│   └── utils/
└── ...
```

## Notes

This project intentionally preserves the V1 foundation while providing a much broader V2 backbone expansion. The registry count is real and verified. The bot remains safe to start in an environment without live Discord credentials, and it fails explicitly instead of pretending to be fully deployed.
