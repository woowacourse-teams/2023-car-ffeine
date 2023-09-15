import { createRoot } from 'react-dom/client';

import { getStoreSnapshot, useExternalValue } from '@utils/external-state/tools';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import type { StationMarkerInstance } from '@stores/google-maps/markerInstanceStore';
import { selectedStationIdStore } from '@stores/selectedStationStore';

import { useStationSummary } from '@hooks/google-maps/useStationSummary';
import useMediaQueries from '@hooks/useMediaQueries';

import CarFfeineMarker from '@ui/CarFfeineMarker/index';
import StationDetailsWindow from '@ui/StationDetailsWindow';
import { useNavigationBar } from '@ui/compound/NavigationBar/hooks/useNavigationBar';

import type { StationMarker } from '@type';

export const useRenderStationMarker = () => {
  const googleMap = getStoreSnapshot(getGoogleMapStore());

  const { openStationSummary } = useStationSummary();
  const { openLastPanel } = useNavigationBar();
  const screen = useMediaQueries();
  const selectedStationId = useExternalValue(selectedStationIdStore);

  const createNewMarkerInstances = (
    prevMarkerInstances: StationMarkerInstance[],
    markers: StationMarker[]
  ) => {
    const newMarkers = markers.filter((marker) =>
      prevMarkerInstances.every((prevMarker) => prevMarker.stationId !== marker.stationId)
    );

    const newMarkerInstances = newMarkers.map((marker) => {
      const { latitude: lat, longitude: lng, stationName, stationId } = marker;

      const markerInstance = new google.maps.marker.AdvancedMarkerElement({
        position: { lat, lng },
        title: stationName,
      });

      return {
        stationId,
        markerInstance,
      };
    });

    bindMarkerClickHandler(newMarkerInstances);

    return newMarkerInstances;
  };

  const removeMarkersOutsideBounds = (
    prevMarkerInstances: StationMarkerInstance[],
    currentMarkers: StationMarker[]
  ) => {
    const markersOutOfBounds = prevMarkerInstances.filter(
      (prevMarker) =>
        !currentMarkers.some((currentMarker) => currentMarker.stationId === prevMarker.stationId)
    );

    markersOutOfBounds.forEach((marker) => {
      marker.markerInstance.map = null;
    });
  };

  const getRemainedMarkerInstances = (
    prevMarkerInstances: StationMarkerInstance[],
    currentMarkers: StationMarker[]
  ) => {
    return prevMarkerInstances.filter((markerInstance) =>
      currentMarkers.some((marker) => marker.stationId === markerInstance.stationId)
    );
  };

  const renderMarkerInstances = (
    newMarkerInstances: StationMarkerInstance[],
    markers: StationMarker[]
  ) => {
    newMarkerInstances.forEach(({ markerInstance, stationId }) => {
      const container = document.createElement('div');

      markerInstance.content = container;
      markerInstance.map = googleMap;

      const markerInformation = markers.find(
        (stationMarker) => stationMarker.stationId === stationId
      );
      createRoot(container).render(<CarFfeineMarker {...markerInformation} />);
    });

    // 검색 결과 간단 정보창을 열어주기 위해 필요한 로직입니다. (로직 개선 예정)
    openSelectedMarkerSummary(newMarkerInstances);
  };

  const bindMarkerClickHandler = (markerInstances: StationMarkerInstance[]) => {
    markerInstances.forEach(({ markerInstance, stationId }) => {
      markerInstance.addListener('click', () => {
        openStationSummary(stationId, markerInstance);

        if (!screen.get('isMobile')) {
          openLastPanel(<StationDetailsWindow stationId={stationId} />);
        }
      });
    });
  };

  // 검색 결과 간단 정보창을 열어주기 위해 필요한 로직입니다. (로직 개선 예정)
  const openSelectedMarkerSummary = (markerInstances: StationMarkerInstance[]) => {
    const selectedMarker = markerInstances.find(({ stationId }) => stationId === selectedStationId);

    if (selectedMarker !== undefined) {
      openStationSummary(selectedStationId, selectedMarker.markerInstance);

      if (!screen.get('isMobile')) {
        openLastPanel(<StationDetailsWindow stationId={selectedStationId} />);
      }
    }
  };

  return {
    createNewMarkerInstances,
    removeMarkersOutsideBounds,
    getRemainedMarkerInstances,
    renderMarkerInstances,
  };
};
