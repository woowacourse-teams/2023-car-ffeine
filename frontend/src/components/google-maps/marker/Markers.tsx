import { memo } from 'react';

import CityClusteredMarkersContainer from '@marker/CityClusteredMarkersContainer';
import ServerClusteredMarkersContainer from '@marker/ServerClusteredMarkersContainer';
import StationMarkersContainer from '@marker/StationMarkersContainer';

import { useExternalValue } from '@utils/external-state';

import { markerModeStore } from '@stores/google-maps/markerModeStore';

const MemoizedStationMarkersContainer = memo(StationMarkersContainer);
const MemoizedServerClusteredMarkersContainer = memo(ServerClusteredMarkersContainer);
const MemoizedCityClusteredMarkersContainer = memo(CityClusteredMarkersContainer);

const Markers = () => {
  const markerMode = useExternalValue(markerModeStore);

  return (
    <>
      {markerMode.state === 'town' && <MemoizedStationMarkersContainer />}
      {/* 이 아래는 앞으로 추가될 기능을 미리 대응하는 컴포넌트 */}
      {markerMode.state === 'city' && <MemoizedServerClusteredMarkersContainer />}
      {markerMode.state === 'country' && <MemoizedCityClusteredMarkersContainer />}
    </>
  );
};
export default Markers;
