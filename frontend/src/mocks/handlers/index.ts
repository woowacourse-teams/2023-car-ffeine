import { carHandler } from './car/carHandler';
import { loginHandlers } from './login/loginHandlers';
import { memberHandlers } from './memberHandlers';
import { stationReportHandlers } from './station-details/reports/stationReportHandlers';
import { stationReviewHandlers } from './station-details/reviews/stationReviewHandlers';
import { stationDetailHandlers } from './station-details/stationDetailHandlers';
import { statisticsHandlers } from './station-details/statisticsHandlers';
import { memberFilterHandlers } from './station-filters/memberFilterHandlers';
import { serverFilterHandlers } from './station-filters/serverFilterHandlers';
import { stationHandlers } from './station-markers/stationHandlers';
import { stationMarkerHandlers } from './station-markers/stationMarkerHandlers';
import { stationSearchHandlers } from './stationSearchHandlers';

export const handlers = [
  ...memberHandlers,
  ...stationSearchHandlers,
  ...stationHandlers,
  ...stationDetailHandlers,
  ...statisticsHandlers,
  ...memberFilterHandlers,
  ...serverFilterHandlers,
  ...stationReportHandlers,
  ...stationReviewHandlers,
  ...loginHandlers,
  ...carHandler,
  ...stationMarkerHandlers,
];
