import { expect, it } from 'vitest';
import { queryBucket } from './query-bucket';
import { server } from '../mocks/node';
import { http, HttpResponse } from 'msw';
import { constants } from './config/constants';
import type { DropsLineBucket } from './schemas/buckets/dropsline-bucket-schema';
import type { LimitedResponse } from './types/limited-response';

it('selects the correct fields', async () => {
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
  });

  expect(data).toEqual([
    {
      item_name: 'Abyssal whip',
      drop_json: '{"id":12345,"quantity":1}',
    },
  ]);
});

it('queries the correct bucket', async () => {
  const expectedBucket = 'dropsline';

  server.use(
    http.get(`${constants.wikiUrl}/api.php`, ({ request }) => {
      const url = new URL(request.url);

      const bucket = url.searchParams
        .get('query')
        ?.match(/bucket\("([^)]+)"\)/)?.[1];

      if (bucket !== expectedBucket) {
        throw new Error(
          `Expected to query the ${expectedBucket} bucket. Received: ${bucket}`,
        );
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

  const data = await queryBucket(expectedBucket, {
    select: {
      item_name: true,
      drop_json: true,
    },
  });

  expect(data).toEqual([
    {
      item_name: 'Abyssal whip',
      drop_json: '{"id":12345,"quantity":1}',
    },
  ]);
});

it('sets the correct limit', async () => {
  const expectedLimit = 1234;

  server.use(
    http.get(`${constants.wikiUrl}/api.php`, ({ request }) => {
      const url = new URL(request.url);

      const limit = url.searchParams
        .get('query')
        ?.match(/limit\(([^)]+)\)/)?.[1];

      if (limit !== `${expectedLimit}`) {
        throw new Error(
          `Expected a limit of ${expectedLimit}. Received: ${limit}`,
        );
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
    limit: expectedLimit,
  });

  expect(data).toEqual([
    {
      item_name: 'Abyssal whip',
      drop_json: '{"id":12345,"quantity":1}',
    },
  ]);
});

it('sets the correct offset', async () => {
  const expectedOffset = 1234;

  server.use(
    http.get(`${constants.wikiUrl}/api.php`, ({ request }) => {
      const url = new URL(request.url);

      const offset = url.searchParams
        .get('query')
        ?.match(/offset\(([^)]+)\)/)?.[1];

      if (offset !== `${expectedOffset}`) {
        throw new Error(
          `Expected an offset of ${expectedOffset}. Received: ${offset}`,
        );
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
    offset: expectedOffset,
  });

  expect(data).toEqual([
    {
      item_name: 'Abyssal whip',
      drop_json: '{"id":12345,"quantity":1}',
    },
  ]);
});

it('sets the correct where clause when a full condition is provided', async () => {
  const expectedWhere = '"item_name","=","Abyssal whip"';

  server.use(
    http.get(`${constants.wikiUrl}/api.php`, ({ request }) => {
      const url = new URL(request.url);

      const where = url.searchParams
        .get('query')
        ?.match(/where\(([^)]+)\)/)?.[1];

      if (where !== `${expectedWhere}`) {
        throw new Error(
          `Expected a where clause of ${expectedWhere}. Received: ${where}`,
        );
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
    where: {
      field: 'item_name',
      operator: '=',
      value: 'Abyssal whip',
    },
  });

  expect(data).toEqual([
    {
      item_name: 'Abyssal whip',
      drop_json: '{"id":12345,"quantity":1}',
    },
  ]);
});

it('sets the correct where clause when a condition with an omitted operand is provided', async () => {
  const expectedWhere = '"item_name","Abyssal whip"';

  server.use(
    http.get(`${constants.wikiUrl}/api.php`, ({ request }) => {
      const url = new URL(request.url);

      const where = url.searchParams
        .get('query')
        ?.match(/where\(([^)]+)\)/)?.[1];

      if (where !== `${expectedWhere}`) {
        throw new Error(
          `Expected a where clause of ${expectedWhere}. Received: ${where}`,
        );
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
    where: {
      field: 'item_name',
      value: 'Abyssal whip',
    },
  });

  expect(data).toEqual([
    {
      item_name: 'Abyssal whip',
      drop_json: '{"id":12345,"quantity":1}',
    },
  ]);
});
