import { createRoot } from 'react-dom/client';

import StyledClusterMarker from '@marker/components/LargeDeltaAreaMarkerContainer/components/StyledClusterMarker';
import RegionMarker from '@marker/components/MaxDeltaAreaMarkerContainer/components/RegionMarker';
import type { Region } from '@marker/components/MaxDeltaAreaMarkerContainer/types';
import CarFfeineMarker from '@marker/components/SmallMediumDeltaAreaMarkerContainer/components/CarFfeineMarker';
import {
  addMarkerInstanceToExternalStore,
  createMarkerDomElement,
  createMarkerInstance,
  getDefaultMarkerDesign,
  removeMarkerInstanceFromExternalStore,
} from '@marker/utils';

import { getGoogleMapStore, googleMapActions } from '@stores/google-maps/googleMapStore';

import { useStationInfoWindow } from '@hooks/google-maps/useStationInfoWindow';
import useMediaQueries from '@hooks/useMediaQueries';

import { useNavigationBar } from '@ui/Navigator/NavigationBar/hooks/useNavigationBar';
import StationDetailsWindow from '@ui/StationDetailsWindow';

import type { ClusterMarker, StationMarker } from '@type';

export const useMarker = () => {
  const screen = useMediaQueries();
  const { openLastPanel } = useNavigationBar();
  const { openStationInfoWindow } = useStationInfoWindow();

  const renderDefaultMarker = (station: StationMarker) => {
    const { latitude, longitude, stationId } = station;

    const defaultMarkerDesign = getDefaultMarkerDesign(station.availableCount > 0);
    const markerInstance = createMarkerInstance(latitude, longitude);

    markerInstance.content = defaultMarkerDesign.element;

    bindStationMarkerClickEvent(markerInstance, stationId);
    addMarkerInstanceToExternalStore(markerInstance, stationId);

    return () => {
      markerInstance.map = null;
      removeMarkerInstanceFromExternalStore(stationId);
    };
  };

  const renderCarffeineMarker = (station: StationMarker) => {
    const { latitude, longitude, stationId } = station;
    const markerInstance = createMarkerInstance(latitude, longitude);
    const container = createMarkerDomElement();

    markerInstance.content = container;

    bindStationMarkerClickEvent(markerInstance, stationId);
    addMarkerInstanceToExternalStore(markerInstance, stationId);

    createRoot(container).render(<CarFfeineMarker {...station} />);

    return () => {
      markerInstance.map = null;
      removeMarkerInstanceFromExternalStore(stationId);
    };
  };

  const renderClusterMarker = (cluster: ClusterMarker) => {
    const { latitude, longitude, count } = cluster;

    const markerInstance = createMarkerInstance(latitude, longitude);
    const container = createMarkerDomElement();

    markerInstance.content = container;

    bindClusterMarkerClickEvent(markerInstance, cluster);
    createRoot(container).render(<StyledClusterMarker count={count} />);

    return () => {
      markerInstance.map = null;
    };
  };

  const renderRegionMarker = (region: Region) => {
    const { latitude, longitude, count, regionName } = region;

    const markerInstance = createMarkerInstance(latitude, longitude);
    const container = createMarkerDomElement();

    markerInstance.title = regionName;
    markerInstance.content = container;

    bindRegionMarkerClickEvent(markerInstance, region);
    createRoot(container).render(<RegionMarker count={count} regionName={regionName} />);

    return () => {
      markerInstance.map = null;
    };
  };

  const bindStationMarkerClickEvent = (
    markerInstance: google.maps.marker.AdvancedMarkerElement,
    stationId: string
  ) => {
    markerInstance.addListener('click', () => {
      openStationInfoWindow(stationId, markerInstance);

      if (!screen.get('isMobile')) {
        openLastPanel(<StationDetailsWindow stationId={stationId} />);
      }
    });
  };

  const bindClusterMarkerClickEvent = (
    markerInstance: google.maps.marker.AdvancedMarkerElement,
    cluster: ClusterMarker
  ) => {
    const { latitude, longitude } = cluster;

    markerInstance.addListener('click', () => {
      const currentZoom = getGoogleMapStore().getState().getZoom();

      googleMapActions.moveTo({ lat: latitude, lng: longitude }, currentZoom + 1);
    });
  };

  const bindRegionMarkerClickEvent = (
    markerInstance: google.maps.marker.AdvancedMarkerElement,
    region: Region
  ) => {
    const { latitude, longitude } = region;

    markerInstance.addListener('click', () => {
      googleMapActions.moveTo({ lat: latitude, lng: longitude }, 12);
    });
  };

  return {
    renderDefaultMarker,
    renderCarffeineMarker,
    renderClusterMarker,
    renderRegionMarker,
  };
};
