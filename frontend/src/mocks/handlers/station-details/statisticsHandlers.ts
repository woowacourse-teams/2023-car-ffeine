import { getCongestionStatistics } from '@mocks/data';
import { rest } from 'msw';

import { ENGLISH_DAYS_OF_WEEK_LONG_TO_SHORT, SHORT_ENGLISH_DAYS_OF_WEEK } from '@constants/congestion';
import { DEVELOP_SERVER_URL } from '@constants/server';

export const statisticsHandlers = [
  rest.get(`${DEVELOP_SERVER_URL}/stations/:stationId/statistics`, (req, res, ctx) => {
    const stationId = req.url.pathname
      .split('?')[0]
      .replace(/\/api\/stations\//, '')
      .replace(/\/statistics/, '');
    const dayOfWeek = req.url.searchParams.get(
      'dayOfWeek'
    ) as (typeof SHORT_ENGLISH_DAYS_OF_WEEK)[number];

    const fullCongestionStatistics = getCongestionStatistics(stationId);
    const congestionStatistics = {
      ...fullCongestionStatistics,
      congestion: {
        standard: [
          ...fullCongestionStatistics['congestion']['standard'][
            ENGLISH_DAYS_OF_WEEK_LONG_TO_SHORT[dayOfWeek]
          ],
        ],
        quick: [
          ...fullCongestionStatistics['congestion']['quick'][
            ENGLISH_DAYS_OF_WEEK_LONG_TO_SHORT[dayOfWeek]
          ],
        ],
      },
    };

    return res(ctx.json(congestionStatistics), ctx.delay(1000), ctx.status(200));
  }),
];
