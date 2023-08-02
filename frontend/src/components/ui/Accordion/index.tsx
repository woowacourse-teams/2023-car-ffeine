import { css } from 'styled-components';

import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { createContext, useState } from 'react';

import FlexBox from '@common/FlexBox';

import BasePanel from './BasePanel';
import LastPanel from './LastPanel';
import Navigator from './Navigator';

interface AccordionContextType {
  isBasePanelOpen: boolean;
  setIsBasePanelOpen: Dispatch<SetStateAction<boolean>>;
  isLastPanelOpen: boolean;
  setIsLastPanelOpen: Dispatch<SetStateAction<boolean>>;
  basePanelType: BasePanelType;
  setBasePanelType: Dispatch<SetStateAction<BasePanelType>>;
}

export const AccordionContext = createContext<AccordionContextType>(null);

interface Props {
  isBasePanelOpenInDefault?: boolean;
}

export type BasePanelType = 'searchWindow' | 'stationList' | 'serverStationFilters' | null;

const Accordion = ({ isBasePanelOpenInDefault = false, children }: PropsWithChildren<Props>) => {
  const [isBasePanelOpen, setIsBasePanelOpen] = useState(isBasePanelOpenInDefault);
  const [isLastPanelOpen, setIsLastPanelOpen] = useState(false);
  const [basePanelType, setBasePanelType] = useState<BasePanelType>(null);

  return (
    <AccordionContext.Provider
      value={{
        isBasePanelOpen,
        setIsBasePanelOpen,
        isLastPanelOpen,
        setIsLastPanelOpen,
        basePanelType,
        setBasePanelType,
      }}
    >
      <FlexBox gap={0} nowrap css={accordionContainerCss}>
        {children}
      </FlexBox>
    </AccordionContext.Provider>
  );
};

Accordion.Navigator = Navigator;
Accordion.BasePanel = BasePanel;
Accordion.LastPanel = LastPanel;

const accordionContainerCss = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;

export default Accordion;
