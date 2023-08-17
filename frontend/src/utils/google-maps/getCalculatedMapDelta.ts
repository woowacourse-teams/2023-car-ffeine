import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import { navigationBarPanelStore } from '@stores/layout/navigationBarPanelStore';

import { BROWSER_WIDTH, NAVIGATOR_PANEL_WIDTH } from '@constants';

import { getDisplayPosition } from '.';

export const getCalculatedMapDelta = () => {
  const navigationComponentWidth = getNavigationComponentWidth();
  const browserWidth = BROWSER_WIDTH;
  const googleMap = getGoogleMapStore().getState();

  const navigatorAccordionWidthRatio = (navigationComponentWidth * 10) / browserWidth;
  const calculatedMapDelta =
    getDisplayPosition(googleMap).longitudeDelta * 2 * navigatorAccordionWidthRatio;

  return calculatedMapDelta;
};

export const getNavigationComponentWidth = () => {
  const { basePanel, lastPanel } = navigationBarPanelStore.getState();
  const navigationComponentWidth =
    (basePanel === null ? 0 : NAVIGATOR_PANEL_WIDTH) +
    (lastPanel === null ? 0 : NAVIGATOR_PANEL_WIDTH);

  return navigationComponentWidth;
};
