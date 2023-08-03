import { useExternalValue } from '@utils/external-state';

import { getBriefStationInfoWindowStore } from '@stores/briefStationInfoWindowStore';
import { getGoogleMapStore } from '@stores/googleMapStore';
import { markerInstanceStore } from '@stores/markerInstanceStore';

import BriefStationInfo from '../components/ui/BriefStationInfo';

import type { StationSummary } from 'types';

export const useStationSummary = () => {
  const googleMap = useExternalValue(getGoogleMapStore());
  const infoWindowInstance = useExternalValue(getBriefStationInfoWindowStore());
  const stationMarkers = useExternalValue(markerInstanceStore);

  const openStationSummary = (
    station: StationSummary,
    stationMarkerInstance?: google.maps.marker.AdvancedMarkerElement
  ) => {
    const stationMarker = stationMarkers.find(
      (stationMarker) => stationMarker.stationId === station.stationId
    );
    const markerInstance = stationMarkerInstance ?? stationMarker.markerInstance;

    googleMap.panTo(markerInstance.position);

    infoWindowInstance.infoWindowInstance.open({
      anchor: markerInstance,
      map: googleMap,
    });

    infoWindowInstance.briefStationInfoRoot.render(<BriefStationInfo station={station} />);
  };

  return { openStationSummary };
};
