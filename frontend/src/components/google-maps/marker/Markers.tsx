import { memo } from 'react';

import { useExternalValue } from '@utils/external-state';

import { zoomStore } from '@stores/google-maps/zoomStore';

import CityClusteredMarkersContainer from './CityClusteredMarkersContainer';
import ServerClusteredMarkersContainer from './ServerClusteredMarkersContainer';
import StationMarkersContainer from './StationMarkersContainer';

const MemoizedStationMarkersContainer = memo(StationMarkersContainer);
const MemoizedServerClusteredMarkersContainer = memo(ServerClusteredMarkersContainer);
const MemoizedCityClusteredMarkersContainer = memo(CityClusteredMarkersContainer);

const Markers = () => {
  const markerMode = useExternalValue(zoomStore);

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
