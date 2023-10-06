import { memo } from 'react';

import { useExternalValue } from '@utils/external-state';

import { deltaAreaStore } from '@stores/google-maps/zoomStore';

import HighZoomMarkerContainer from './HighZoomMarkerContainer';
import LowZoomMarkerContainer from './LowZoomMarkerContainer';
import MiddleZoomMarkerContainer from './MiddleZoomMarkerContainer';

const MemoizedHighZoomMarkerContainer = memo(HighZoomMarkerContainer);
const MemoizedMiddleZoomMarkerContainer = memo(MiddleZoomMarkerContainer);
const MemoizedLowZoomMarkerContainer = memo(LowZoomMarkerContainer);

const MarkersContainers = () => {
  const deltaAreaState = useExternalValue(deltaAreaStore);

  console.log(deltaAreaState);

  return (
    <>
      {(deltaAreaState === 'medium' || deltaAreaState === 'small') && (
        <MemoizedHighZoomMarkerContainer />
      )}
      {/* 이 아래는 앞으로 추가될 기능을 미리 대응하는 컴포넌트 */}
      {deltaAreaState === 'large' && <MemoizedMiddleZoomMarkerContainer />}
      {deltaAreaState === 'max' && <MemoizedLowZoomMarkerContainer />}
    </>
  );
};
export default MarkersContainers;
