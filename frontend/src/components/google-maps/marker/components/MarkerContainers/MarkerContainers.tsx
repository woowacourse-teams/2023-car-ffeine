import { useExternalValue } from '@utils/external-state';

import { deltaAreaStore } from '@stores/google-maps/deltaAreaStore';

import LargeDeltaAreaMarkerContainer from '../LargeDeltaAreaMarkerContainer';
import MaxDeltaAreaMarkerContainer from '../MaxDeltaAreaMarkerContainer';
import SmallMediumDeltaAreaMarkerContainer from '../SmallMediumDeltaAreaMarkerContainer/SmallMediumDeltaAreaContainer';

const MarkerContainers = () => {
  const deltaAreaState = useExternalValue(deltaAreaStore);

  return (
    <>
      {(deltaAreaState === 'medium' || deltaAreaState === 'small') && (
        <SmallMediumDeltaAreaMarkerContainer />
      )}
      {/* 이 아래는 앞으로 추가될 기능을 미리 대응하는 컴포넌트 */}
      {deltaAreaState === 'large' && <LargeDeltaAreaMarkerContainer />}
      {deltaAreaState === 'max' && <MaxDeltaAreaMarkerContainer />}
    </>
  );
};

export default MarkerContainers;
