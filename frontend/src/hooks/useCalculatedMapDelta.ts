import { useExternalValue } from '@utils/external-state';

import { browserWidthStore, navigatorAccordionWidthStore } from '@stores/componentWidthStore';

export const useCalculatedMapDelta = () => {
  const navigatorAccordionWidth = useExternalValue(navigatorAccordionWidthStore);
  const browserWidth = useExternalValue(browserWidthStore);

  if (browserWidth === null) {
    return 0;
  }

  const navigatorAccordionWidthRatio = (navigatorAccordionWidth / browserWidth) * 100;

  return navigatorAccordionWidthRatio;
};
