import { version } from '../../package.json';

export const constants = {
  wikiUrl: 'https://oldschool.runescape.wiki',
  userAgent: `osrs-wiki-bucket-client/${version} (https://github.com/joemckie/osrs-wiki-bucket-client)`,
} as const;
