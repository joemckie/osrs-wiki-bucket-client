import { it } from '@jest/globals';
import { queryBucket } from './query-bucket';

it('generates the query', async () => {
  const data = await queryBucket('dropsline', {
    select: {
      item_name: true,
      drop_json: true,
    },
    limit: 1000,
  });

  const t = await queryBucket('combat_achievement', {
    select: {
      attack_level: true,
      name: true,
      league_region: true,
      tier: true,
    },
  });
});
