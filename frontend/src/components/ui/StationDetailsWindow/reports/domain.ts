import { getTypedObjectKeys } from '@utils/getTypedObjectKeys';

import type { StationDetailsWithoutChargers } from '@type/stations';

export const findDifferentKeys = (
  formStation: StationDetailsWithoutChargers,
  originStation: StationDetailsWithoutChargers
) =>
  getTypedObjectKeys<StationDetailsWithoutChargers>(formStation).filter(
    (key) => formStation[key] !== originStation[key]
  );
