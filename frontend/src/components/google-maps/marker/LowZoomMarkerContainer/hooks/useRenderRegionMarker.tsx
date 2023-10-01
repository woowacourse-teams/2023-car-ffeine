import { createRoot } from 'react-dom/client';

import { useExternalValue } from '@utils/external-state';

import { getGoogleMapStore, googleMapActions } from '@stores/google-maps/googleMapStore';

import { ZOOM_BREAKPOINTS } from '@constants/googleMaps';

import RegionMarker from '../components/RegionMarker';
import type { Region } from '../types';

export const useRenderRegionMarker = () => {
  const googleMap = useExternalValue(getGoogleMapStore());

  const renderRegionMarker = (region: Region) => {
    const { latitude, longitude, count, regionName } = region;

    const container = document.createElement('div');

    const markerInstance = new google.maps.marker.AdvancedMarkerElement({
      position: { lat: latitude, lng: longitude },
      map: googleMap,
      title: regionName,
      content: container,
    });

    createRoot(container).render(<RegionMarker count={count} regionName={regionName} />);

    markerInstance.addListener('click', () => {
      // TODO: 중간 단계 (서버) 클러스터링 구현 이후에 ZOOM_BREAKPOINTS.middle로 변경 예정
      googleMapActions.moveTo({ lat: latitude, lng: longitude }, ZOOM_BREAKPOINTS.high);
    });

    return () => {
      markerInstance.map = null;
    };
  };

  return { renderRegionMarker };
};
