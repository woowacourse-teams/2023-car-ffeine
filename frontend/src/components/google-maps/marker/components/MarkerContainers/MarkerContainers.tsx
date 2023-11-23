import { useExternalValue } from '@utils/external-state';

import { deltaAreaStore } from '@stores/google-maps/deltaAreaStore';

import LargeDeltaAreaMarkerContainer from '../LargeDeltaAreaMarkerContainer';
import MaxDeltaAreaMarkerContainer from '../MaxDeltaAreaMarkerContainer';
import SmallMediumDeltaAreaMarkerContainer from '../SmallMediumDeltaAreaMarkerContainer';

const MarkerContainers = () => {
  const deltaAreaState = useExternalValue(deltaAreaStore);

  return (
    <>
      {(deltaAreaState === 'medium' || deltaAreaState === 'small') && (
        <SmallMediumDeltaAreaMarkerContainer />
      )}
      {deltaAreaState === 'large' && <LargeDeltaAreaMarkerContainer />}
      {deltaAreaState === 'max' && <MaxDeltaAreaMarkerContainer />}
    </>
  );
};

export default MarkerContainers;
