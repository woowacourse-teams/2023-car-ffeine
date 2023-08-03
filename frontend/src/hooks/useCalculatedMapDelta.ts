import { useExternalValue } from '@utils/external-state';
import { getDisplayPosition } from '@utils/google-maps';

import { browserWidthStore, navigatorAccordionWidthStore } from '@stores/componentWidthStore';
import { getGoogleMapStore } from '@stores/googleMapStore';

export const useCalculatedMapDelta = () => {
  const navigatorAccordionWidth = useExternalValue(navigatorAccordionWidthStore);
  const browserWidth = useExternalValue(browserWidthStore);
  const googleMap = useExternalValue(getGoogleMapStore());

  if (browserWidth === null) {
    return 0;
  }

  const navigatorAccordionWidthRatio = navigatorAccordionWidth / browserWidth;

  return getDisplayPosition(googleMap).longitudeDelta * 2 * navigatorAccordionWidthRatio;
};
