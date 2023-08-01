import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { createContext, useState } from 'react';

import FlexBox from '@common/FlexBox';

import Base from './Base';
import BasePanel from './BasePanel';
import LastPanel from './LastPanel';

interface AccordionContextType {
  isBasePanelOpen: boolean;
  setIsBasePanelOpen: Dispatch<SetStateAction<boolean>>;
  isLastPanelOpen: boolean;
  setIsLastPanelOpen: Dispatch<SetStateAction<boolean>>;
  basePanelType: basePanelType;
  setBasePanelType: Dispatch<SetStateAction<basePanelType>>;
}

export const AccordionContext = createContext<AccordionContextType>(null);

interface Props {
  isBasePanelOpenInDefault?: boolean;
}

export type basePanelType = 'searchWindow' | 'stationList' | 'serverStationFilters';

const Accordion = ({ isBasePanelOpenInDefault = false, children }: PropsWithChildren<Props>) => {
  const [isBasePanelOpen, setIsBasePanelOpen] = useState(isBasePanelOpenInDefault);
  const [isLastPanelOpen, setIsLastPanelOpen] = useState(false);
  const [basePanelType, setBasePanelType] = useState<basePanelType>(null);

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
      <FlexBox gap={0} nowrap>
        {children}
      </FlexBox>
    </AccordionContext.Provider>
  );
};

Accordion.Base = Base;
Accordion.BasePanel = BasePanel;
Accordion.LastPanel = LastPanel;

export default Accordion;
