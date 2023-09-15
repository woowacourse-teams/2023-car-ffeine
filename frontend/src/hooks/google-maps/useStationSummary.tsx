import { useExternalValue, useSetExternalState } from '@utils/external-state';
import { getDisplayPosition } from '@utils/google-maps';
import { getCalculatedMapDelta } from '@utils/google-maps/getCalculatedMapDelta';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import { markerInstanceStore } from '@stores/google-maps/markerInstanceStore';
import { getStationSummaryWindowStore } from '@stores/google-maps/stationSummaryWindowStore';
import { selectedStationIdStore } from '@stores/selectedStationStore';

import useMediaQueries from '@hooks/useMediaQueries';

import StationSummaryWindow from '@ui/StationSummaryWindow';

export const useStationSummary = () => {
  const googleMap = useExternalValue(getGoogleMapStore());
  const infoWindowInstance = useExternalValue(getStationSummaryWindowStore());
  const setSelectedStationId = useSetExternalState(selectedStationIdStore);
  const screen = useMediaQueries();

  const moveMapToStationMarker = (
    stationId: string,
    markerInstance: google.maps.marker.AdvancedMarkerElement
  ) => {
    const { latitudeDelta } = getDisplayPosition(getGoogleMapStore().getState());
    const { lat, lng } = markerInstance.position as google.maps.LatLngLiteral;
    const calculatedMapDelta = getCalculatedMapDelta();

    setSelectedStationId(stationId);

    const latitude = screen.get('isMobile') ? lat + latitudeDelta / 3 : lat;
    const longitude = screen.get('isMobile') ? lng : lng - calculatedMapDelta / 2;

    googleMap.panTo({ lat: latitude, lng: longitude });
  };

  const openStationSummary = (
    stationId: string,
    stationMarkerInstance?: google.maps.marker.AdvancedMarkerElement
  ) => {
    const stationMarker = markerInstanceStore
      .getState()
      .find((stationMarker) => stationMarker.stationId === stationId);
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
