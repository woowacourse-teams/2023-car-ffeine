import type { Meta } from '@storybook/react';
import { styled } from 'styled-components';

import { useContext } from 'react';

import FlexBox from '@common/FlexBox';

import type { BasePanelType } from '.';
import Accordion, { AccordionContext } from '.';
import { useAccordionAction } from './hooks/useAccordionAction';

const meta = {
  title: 'UI/Accordion',
  component: Accordion,
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;

export const Default = () => {
  const renderBasePanel = (displayBasePanelType: BasePanelType) => {
    switch (displayBasePanelType) {
      case 'searchWindow':
        return <BaseContainer />;
      case 'serverStationFilters':
        return <BaseContainerBlue />;
      case 'stationList':
        return <BaseContainerRed />;
    }
  };

  return (
    <Accordion>
      <Accordion.Menu />
      <Accordion.BasePanel render={renderBasePanel} />
      <Accordion.LastPanel render={() => <LastContainer />} />
      <OpenTriggerButton />
    </Accordion>
  );
};

const OpenTriggerButton = () => {
  const { handleOpenLastPanel } = useAccordionAction();
  const { isBasePanelOpen, isLastPanelOpen } = useContext(AccordionContext);

  return (
    <>
      {isBasePanelOpen && !isLastPanelOpen && (
        <FlexBox direction="column" gap={2} height="fit-content" width="fit-content">
          <button onClick={handleOpenLastPanel} style={{ border: '1px solid', padding: '1rem' }}>
            마지막 패널 열기
          </button>
        </FlexBox>
      )}
    </>
  );
};

const BaseContainer = styled.div`
  width: 34rem;
  height: 100vh;
  border: 1px solid lightgrey;
  border-radius: 0;
`;

const BaseContainerBlue = styled.div`
  width: 34rem;
  height: 100vh;
  border: 1px solid lightgrey;
  background-color: blue;
`;

const BaseContainerRed = styled.div`
  width: 34rem;
  height: 100vh;
  border: 1px solid lightgrey;
  background-color: red;
`;

const LastContainer = styled.div`
  width: 34rem;
  height: 100vh;
  border: 1px solid lightgrey;
  border-left: none;
`;
