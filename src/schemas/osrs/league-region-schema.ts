import z from 'zod';

export const leagueRegionSchema = z
  .string()
  .transform((val) => val.split(','))
  .pipe(
    z.array(
      z.enum([
        'Misthalin',
        'Karamja',
        'Asgarnia',
        'Fremennik Province',
        'Kandarin',
        'Kharidian Desert',
        'Morytania',
        'Tirannwn',
        'Wilderness',
        'Kebos and Kourend',
        'Varlamore',
      ]),
    ),
  );
