import { css } from 'styled-components';

import type { PropsWithChildren } from 'react';
import { useEffect, useRef } from 'react';

import { useExternalValue, useSetExternalState } from '@utils/external-state';

import {
  browserWidthStore,
  navigatorAccordionWidthStore,
} from '@stores/layout/componentWidthStore';
import { navigationBarPanelStore } from '@stores/layout/navigationBarPanelStore';

import FlexBox from '@common/FlexBox';

import BasePanel from './BasePanel';
import CloseButton from './CloseButton';
import LastPanel from './LastPanel';
import Menu from './Menu';

export type BasePanelType = 'searchWindow' | 'stationList' | 'serverStationFilters' | null;

const NavigationBar = ({ children }: PropsWithChildren) => {
  const accordionContainerRef = useRef(null);

  const { basePanel, lastPanel } = useExternalValue(navigationBarPanelStore);
  const setNavigatorAccordionWidth = useSetExternalState(navigatorAccordionWidthStore);
  const setBrowserWidth = useSetExternalState(browserWidthStore);

  useEffect(() => {
    setNavigatorAccordionWidth(accordionContainerRef.current.offsetWidth);
    setBrowserWidth((prev) => {
      if (prev === null) {
        return document.body.offsetWidth;
      }
      return prev;
    });
  }, [basePanel, lastPanel]);

  return (
    <FlexBox gap={0} nowrap css={accordionContainerCss} ref={accordionContainerRef}>
      {children}
    </FlexBox>
  );
};

NavigationBar.Menu = Menu;
NavigationBar.BasePanel = BasePanel;
NavigationBar.LastPanel = LastPanel;
NavigationBar.CloseButton = CloseButton;

const accordionContainerCss = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;

export default NavigationBar;
