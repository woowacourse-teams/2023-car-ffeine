import { useExternalValue, useSetExternalState } from '@utils/external-state';
import { getCalculatedMapDelta } from '@utils/google-maps/getCalculatedMapDelta';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import { markerInstanceStore } from '@stores/google-maps/markerInstanceStore';
import { getStationSummaryWindowStore } from '@stores/google-maps/stationSummaryWindowStore';
import { selectedStationIdStore } from '@stores/selectedStationStore';

import StationSummaryWindow from '@ui/StationSummaryWindow';

import type { StationSummary } from '@type';

export const useStationSummary = () => {
  const googleMap = useExternalValue(getGoogleMapStore());
  const infoWindowInstance = useExternalValue(getStationSummaryWindowStore());
  const stationMarkers = useExternalValue(markerInstanceStore);
  const setSelectedStationId = useSetExternalState(selectedStationIdStore);

  const moveMapToStationMarker = (
    stationId: string,
    markerInstance: google.maps.marker.AdvancedMarkerElement
  ) => {
    const { lat, lng } = markerInstance.position as google.maps.LatLngLiteral;
    const calculatedMapDelta = getCalculatedMapDelta();

    setSelectedStationId(stationId);

    googleMap.panTo({ lat, lng: lng - calculatedMapDelta / 2 });
  };

  const openStationSummary = (
    stationId: string,
    stationMarkerInstance?: google.maps.marker.AdvancedMarkerElement
  ) => {
    const stationMarker = stationMarkers.find(
      (stationMarker) => stationMarker.stationId === stationId
    );
    const markerInstance = stationMarkerInstance ?? stationMarker.markerInstance;

    moveMapToStationMarker(stationId, markerInstance);
    setSelectedStationId(stationId);

    infoWindowInstance.infoWindowInstance.open({
      anchor: markerInstance,
      map: googleMap,
    });

    infoWindowInstance.stationSummaryRoot.render(<StationSummaryWindow stationId={stationId} />);
  };

  return { openStationSummary };
};
