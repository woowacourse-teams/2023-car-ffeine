import { css } from 'styled-components';

import type { PropsWithChildren } from 'react';

import FlexBox from '@common/FlexBox';

import BasePanel from './BasePanel';
import CloseButton from './CloseButton';
import LastPanel from './LastPanel';
import Menu from './Menu';

export type BasePanelType = 'searchWindow' | 'stationList' | 'serverStationFilters' | null;

const NavigationBar = ({ children }: PropsWithChildren) => {
  return (
    <FlexBox gap={0} nowrap css={accordionContainerCss}>
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
