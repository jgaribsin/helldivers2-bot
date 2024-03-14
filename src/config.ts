import 'dotenv/config';
require('newrelic');
import {version} from '../package.json';
import {Faction} from './api-wrapper';
const isProd = process.env.NODE_ENV === 'production';

const configObj: Record<string, string | number | undefined> = {
  // Bot config
  BOT_TOKEN: process.env.BOT_TOKEN,
  BOT_OWNER: process.env.BOT_OWNER || '319226464786710539',

  // Cron job intervals
  PERSISTENT_MESSAGE_INTERVAL: '*/10 * * * *', // every 10 minutes
  API_UPDATE_INTERVAL: '*/10 * * * * *', // every 10 seconds
  STATUS_UPDATE_INTERVAL: '*/3 * * * * *', // every 3 seconds
  DB_DATA_INTERVAL: '0 * * * *', // every 1 hour
  COMPARE_INTERVAL: '*/10 * * * * *', // every 10 seconds

  // Database config
  DATABASE_URL: process.env.DATABASE_URL,

  // Bot Commands
  EMBED_COLOUR: process.env.EMBED_COLOUR || 'DarkPurple',
  FOOTER_MESSAGE:
    'Bug reports and suggestions welcome in Discord!\n' +
    `/discord | v${version} | made by Major`,
  DISCORD_INVITE: 'https://discord.gg/levialliance',

  // Project info
  VERSION: version,
};

const config: Record<string, string> = {};
// assert all env vars as non-null and populate config with only strings
Object.keys(configObj).forEach(key => {
  const value = configObj[key];
  if (value === undefined)
    throw new Error(`${key} environment variable required!`);

  config[key] = value as string;
});

const helldiversConfig: {
  factionSprites: Record<Faction, string>;
  altSprites: Record<Faction, string>;
} = {
  factionSprites: {
    Automaton:
      'https://helldiverscompanionimagescdn.b-cdn.net/icons/factions/Automatons.png',
    Humans:
      'https://helldiverscompanionimagescdn.b-cdn.net/icons/factions/Humans.png',
    Terminids:
      'https://helldiverscompanionimagescdn.b-cdn.net/icons/factions/Terminids.png',
    Total:
      'https://helldiverscompanionimagescdn.b-cdn.net/icons/factions/Humans.png',
  },
  altSprites: {
    Automaton:
      'https://helldiverscompanionimagescdn.b-cdn.net/icons/factions/Automatons.png',
    Humans:
      'https://cdn.discordapp.com/emojis/1215225140934213662.webp?size=128&quality=lossless',
    Terminids:
      'https://helldiverscompanionimagescdn.b-cdn.net/icons/factions/Terminids.png',
    Total:
      'https://cdn.discordapp.com/emojis/1215225140934213662.webp?size=128&quality=lossless',
  },
};

export {config, helldiversConfig, isProd};
