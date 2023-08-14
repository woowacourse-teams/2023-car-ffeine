import { createRoot } from 'react-dom/client';

import { useExternalValue, useSetExternalState } from '@utils/external-state';
import { getStoreSnapshot } from '@utils/external-state/tools';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import { markerInstanceStore } from '@stores/google-maps/markerInstanceStore';
import { selectedStationIdStore } from '@stores/selectedStationStore';

import CarFfeineMarker from '@ui/CarFfeineMarker';
import StationDetailsWindow from '@ui/StationDetailsWindow';
import { useNavigationBar } from '@ui/compound/NavigationBar/hooks/useNavigationBar';

import type { StationSummary } from '@type';

import { useStationSummary } from './useStationSummary';

export const useGoogleMap = () => {
  const googleMap = useExternalValue(getGoogleMapStore());
  const setMarkerInstanceState = useSetExternalState(markerInstanceStore);
  const setSelectedStationId = useSetExternalState(selectedStationIdStore);
  const selectedStationId = getStoreSnapshot(selectedStationIdStore);

  const { openLastPanel } = useNavigationBar();
  const { openStationSummary } = useStationSummary();

  const renderStationMarker = (station: StationSummary) => {
    const { latitude, longitude, stationName, stationId } = station;
    const container = document.createElement('div');

    const markerInstance = new google.maps.marker.AdvancedMarkerElement({
      position: { lat: latitude, lng: longitude },
      map: googleMap,
      title: stationName,
      content: container,
    });

    const markerRoot = createRoot(container);
    markerRoot.render(<CarFfeineMarker {...station} />);

    markerInstance.addListener('click', () => {
      openStationSummary(station, markerInstance);
      openLastPanel(<StationDetailsWindow />);
    });

    setMarkerInstanceState((previewsMarkerInstances) => [
      ...previewsMarkerInstances,
      {
        stationId,
        markerInstance,
      },
    ]);

    if (selectedStationId === stationId) {
      openStationSummary(station, markerInstance);
    }

    return () => {
      const selectedStationId = getStoreSnapshot(selectedStationIdStore);

      setMarkerInstanceState((prevMarkerInstances) =>
        prevMarkerInstances.filter((stationMarker) => stationMarker.stationId !== stationId)
      );

      if (selectedStationId === stationId) {
        setSelectedStationId(null);
      }

      markerInstance.map = null;
    };
  };

  return { renderStationMarker };
};
