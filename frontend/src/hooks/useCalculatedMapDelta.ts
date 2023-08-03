import { useExternalValue } from '@utils/external-state';
import { getDisplayPosition } from '@utils/google-maps';

import { browserWidthStore, navigatorAccordionWidthStore } from '@stores/componentWidthStore';
import { getGoogleMapStore } from '@stores/googleMapStore';

export const useCalculatedMapDelta = () => {
  const navigatorAccordionWidth = useExternalValue(navigatorAccordionWidthStore);
  const browserWidth = useExternalValue(browserWidthStore);
  const map = useExternalValue(getGoogleMapStore());

  if (browserWidth === null) {
    return 0;
  }

  const navigatorAccordionWidthRatio = navigatorAccordionWidth / browserWidth;

  console.log(getDisplayPosition(map).longitudeDelta * 2 * navigatorAccordionWidthRatio);

  return navigatorAccordionWidthRatio;
};
