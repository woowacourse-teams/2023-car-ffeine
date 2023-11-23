import { useExternalValue } from '@utils/external-state';

import { deltaAreaStore } from '@stores/google-maps/deltaAreaStore';

import CarffeineMarkerRenderer from './components/marker/CarffeineMarkerRenderer';
import DefaultMarkerRenderer from './components/marker/DefaultMarkerRenderer';
import { useStationMarkersQuery } from './hooks/useStationMarkersQuery';

const SmallMediumDeltaAreaMarkerContainer = () => {
  const { data: stationMarkers, isSuccess } = useStationMarkersQuery();
  const deltaAreaState = useExternalValue(deltaAreaStore);

  if (!isSuccess) {
    return <></>;
  }

  return (
    <>
      {stationMarkers.map((stationMarker) => {
        if (deltaAreaState === 'small') {
          return <CarffeineMarkerRenderer key={stationMarker.stationId} station={stationMarker} />;
        }
        if (deltaAreaState === 'medium') {
          return <DefaultMarkerRenderer key={stationMarker.stationId} station={stationMarker} />;
        }
      })}
    </>
  );
};

export default SmallMediumDeltaAreaMarkerContainer;
