import { setupWorker } from 'msw';

import { memberHandlers } from './handlers/memberHandlers';
import { stationReportHandlers } from './handlers/station-details/reports/stationReportHandlers';
import { stationReviewHandlers } from './handlers/station-details/reviews/stationReviewHandlers';
import { stationDetailHandlers } from './handlers/station-details/stationDetailHandlers';
import { statisticsHandlers } from './handlers/station-details/statisticsHandlers';
import { memberFilterHandlers } from './handlers/station-filters/memberFilterHandlers';
import { serverFilterHandlers } from './handlers/station-filters/serverFilterHandlers';
import { stationHandlers } from './handlers/station-markers/stationHandlers';
import { stationSearchHandlers } from './handlers/stationSearchHandlers';

export const worker = setupWorker(
  ...memberHandlers,
  ...stationSearchHandlers,
  ...stationHandlers,
  ...stationDetailHandlers,
  ...statisticsHandlers,
  ...memberFilterHandlers,
  ...serverFilterHandlers,
  ...stationReportHandlers,
  ...stationReviewHandlers
);
