import { memo } from 'react';

import { useExternalValue } from '@utils/external-state';

import { zoomStore } from '@stores/google-maps/zoomStore';

import HighZoomMarkerContainer from './HighZoomMarkerContainer';
import MiddleZoomMarkerContainer from './MiddleZoomMarkerContainer';
import RegionCountMarkersContainer from './RegionCountMarkersContainer';

const MemoizedHighZoomMarkerContainer = memo(HighZoomMarkerContainer);
const MemoizedMiddleZoomMarkerContainer = memo(MiddleZoomMarkerContainer);
const MemoizedRegionCountMarkersContainer = memo(RegionCountMarkersContainer);

const MarkersContainers = () => {
  const markerMode = useExternalValue(zoomStore);

  return (
    <>
      {markerMode.state === 'high' && <MemoizedHighZoomMarkerContainer />}
      {/* 이 아래는 앞으로 추가될 기능을 미리 대응하는 컴포넌트 */}
      {markerMode.state === 'middle' && <MemoizedMiddleZoomMarkerContainer />}
      {markerMode.state === 'low' && <MemoizedRegionCountMarkersContainer />}
    </>
  );
};
export default MarkersContainers;
