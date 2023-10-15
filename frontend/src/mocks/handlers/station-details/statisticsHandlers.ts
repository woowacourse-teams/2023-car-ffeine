import { getCongestionStatistics } from '@mocks/data/congestions';
import { getStations } from '@mocks/data/stations';
import { rest } from 'msw';

import { ENGLISH_DAYS_OF_WEEK_FULL_TO_SHORT } from '@constants/congestion';
import { DEVELOP_SERVER_URL } from '@constants/server';

import type { ShortEnglishDaysOfWeek } from '@type';

export const statisticsHandlers = [
  rest.get(`${DEVELOP_SERVER_URL}/stations/:stationId/statistics`, async (req, res, ctx) => {
    const stations = await getStations();
    const stationId = req.url.pathname
      .split('?')[0]
      .replace(/\/api\/stations\//, '')
      .replace(/\/statistics/, '');
    const dayOfWeek = req.url.searchParams.get('dayOfWeek') as ShortEnglishDaysOfWeek;

    const fullCongestionStatistics = getCongestionStatistics(stations, stationId);
    const congestionStatistics = {
      ...fullCongestionStatistics,
      congestion: {
        standard: [
          ...fullCongestionStatistics['congestion']['standard'][
            ENGLISH_DAYS_OF_WEEK_FULL_TO_SHORT[dayOfWeek]
          ],
        ],
        quick: [
          ...fullCongestionStatistics['congestion']['quick'][
            ENGLISH_DAYS_OF_WEEK_FULL_TO_SHORT[dayOfWeek]
          ],
        ],
      },
    };

    return res(ctx.json(congestionStatistics), ctx.delay(1000), ctx.status(200));
  }),
];
