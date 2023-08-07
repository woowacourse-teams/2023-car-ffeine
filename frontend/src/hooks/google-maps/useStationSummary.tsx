import { useExternalValue, useSetExternalState } from '@utils/external-state';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import { getStationSummaryWindowStore } from '@stores/google-maps/stationSummaryWindowStore';
import { markerInstanceStore } from '@stores/markerInstanceStore';
import { selectedStationIdStore } from '@stores/selectedStationStore';

import StationSummaryWindow from '@ui/StationSummaryWindow';

import type { StationSummary } from '@type';

import { useCalculatedMapDelta } from './useCalculatedMapDelta';

export const useStationSummary = () => {
  const googleMap = useExternalValue(getGoogleMapStore());
  const infoWindowInstance = useExternalValue(getStationSummaryWindowStore());
  const stationMarkers = useExternalValue(markerInstanceStore);
  const calculatedMapDelta = useCalculatedMapDelta();
  const setSelectedStationId = useSetExternalState(selectedStationIdStore);

  const openStationSummary = (
    station: StationSummary,
    stationMarkerInstance?: google.maps.marker.AdvancedMarkerElement
  ) => {
    const { stationId } = station;
    const stationMarker = stationMarkers.find(
      (stationMarker) => stationMarker.stationId === stationId
    );
    const markerInstance = stationMarkerInstance ?? stationMarker.markerInstance;
    const { lat, lng } = markerInstance.position as google.maps.LatLngLiteral;

    setSelectedStationId(stationId);

    googleMap.panTo({ lat, lng: lng - calculatedMapDelta / 2 });

    infoWindowInstance.infoWindowInstance.open({
      anchor: markerInstance,
      map: googleMap,
    });

    infoWindowInstance.stationSummaryRoot.render(<StationSummaryWindow station={station} />);
  };

  return { openStationSummary };
};
