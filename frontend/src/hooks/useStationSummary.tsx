import { useExternalValue, useSetExternalState } from '@utils/external-state';

import { getBriefStationInfoWindowStore } from '@stores/briefStationInfoWindowStore';
import { getGoogleMapStore } from '@stores/googleMapStore';
import { markerInstanceStore } from '@stores/markerInstanceStore';
import { selectedStationIdStore } from '@stores/selectedStationStore';

import BriefStationInfo from '../components/ui/BriefStationInfo';
import { useCalculatedMapDelta } from './useCalculatedMapDelta';

import type { StationSummary } from 'types';

export const useStationSummary = () => {
  const googleMap = useExternalValue(getGoogleMapStore());
  const infoWindowInstance = useExternalValue(getBriefStationInfoWindowStore());
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

    infoWindowInstance.briefStationInfoRoot.render(<BriefStationInfo station={station} />);
  };

  return { openStationSummary };
};
