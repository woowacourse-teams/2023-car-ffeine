import { memo } from 'react';

import { useExternalValue } from '@utils/external-state';

import { deltaAreaStore } from '@stores/google-maps/deltaAreaStore';

import LargeDeltaAreaMarkerContainer from './LargeDeltaAreaMarkerContainer';
import MaxDeltaAreaMarkerContainer from './MaxDeltaAreaMarkerContainer';
import HighZoomMarkerContainer from './SmallMediumDeltaAreaMarkerContainer';

const MemoizedHighZoomMarkerContainer = memo(HighZoomMarkerContainer);
const MemoizedMiddleZoomMarkerContainer = memo(LargeDeltaAreaMarkerContainer);
const MemoizedLowZoomMarkerContainer = memo(MaxDeltaAreaMarkerContainer);

const MarkerContainers = () => {
  const deltaAreaState = useExternalValue(deltaAreaStore);

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
export default MarkerContainers;
