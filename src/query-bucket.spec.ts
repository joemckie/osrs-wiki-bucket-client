import { expect, it } from 'vitest';
import { queryBucket } from './query-bucket';
import { server } from '../mocks/node';
import { http, HttpResponse } from 'msw';
import { constants } from './config/constants';
import type { DropsLineBucket } from './schemas/buckets/dropsline-bucket-schema';
import type { LimitedResponse } from './types/limited-response';

it('handles select fields', async () => {
  server.use(
    http.get(`${constants.wikiUrl}/api.php`, ({ request }) => {
      const url = new URL(request.url);

      const select = url.searchParams
        .get('query')
        ?.match(/select\(([^)]+)\)/)?.[1];

      if (select !== '"item_name","drop_json"') {
        throw new Error(`Unexpected select fields: ${select}`);
      }

      return HttpResponse.json<
        LimitedResponse<DropsLineBucket, 'item_name' | 'drop_json'>
      >({
        bucket: [
          {
            item_name: 'Abyssal whip',
            drop_json: '{"id":12345,"quantity":1}',
          },
        ],
      });
    }),
  );

  const data = await queryBucket('dropsline', {
    select: {
      item_name: true,
      drop_json: true,
    },
    limit: 1000,
  });

  expect(data).toEqual([
    {
      item_name: 'Abyssal whip',
      drop_json: '{"id":12345,"quantity":1}',
    },
  ]);
});
