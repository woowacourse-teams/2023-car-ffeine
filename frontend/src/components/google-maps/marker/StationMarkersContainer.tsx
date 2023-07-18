import { useExternalValue } from '@utils/external-state';

import { googleMapStore } from '@stores/googleMapStore';

import { useStations } from '@hooks/useStations';

import StationMarker from './StationMarker';

const StationMarkersContainer = () => {
  const googleMap = useExternalValue(googleMapStore());
  const { data: stations, isSuccess } = useStations(googleMap);

  if (!stations || !isSuccess) {
    return <></>;
  }

  return (
    <>
      {stations.map((station) => {
        return <StationMarker key={station.stationId} station={station} />;
      })}
    </>
  );
};

export default StationMarkersContainer;
