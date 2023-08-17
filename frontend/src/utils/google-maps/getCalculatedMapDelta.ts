import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import { browserWidthStore } from '@stores/layout/componentWidthStore';
import { navigationBarPanelStore } from '@stores/layout/navigationBarPanelStore';

import { getDisplayPosition } from '.';

export const getCalculatedMapDelta = () => {
  const navigationComponentWidth = getNavigationComponentWidth();
  const browserWidth = browserWidthStore.getState();
  const googleMap = getGoogleMapStore().getState();

  const navigatorAccordionWidthRatio = (navigationComponentWidth * 10) / browserWidth;
  const calculatedMapDelta =
    getDisplayPosition(googleMap).longitudeDelta * 2 * navigatorAccordionWidthRatio;

  return calculatedMapDelta;
};

export const getNavigationComponentWidth = () => {
  const { basePanel, lastPanel } = navigationBarPanelStore.getState();
  const navigationComponentWidth =
    (basePanel === null ? 0 : 34) + (lastPanel === null ? 0 : 34) + 10;

  return navigationComponentWidth;
};
