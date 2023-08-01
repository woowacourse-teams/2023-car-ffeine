import type { Meta } from '@storybook/react';
import { css, styled } from 'styled-components';

import { useContext, useState } from 'react';

import FlexBox from '@common/FlexBox';

import type { basePanelType } from '.';
import Accordion, { AccordionContext } from '.';
import { useAccordionAction } from './hooks/useAccordionAction';

const meta = {
  title: 'UI/Accordion',
  component: Accordion,
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;

export const Default = () => {
  const renderBasePanel = (displayBasePanelType: basePanelType) => {
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
      <Accordion.Base render={() => <Base />} />
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

const Base = () => {
  const { handleOpenBasePanel } = useAccordionAction();

  return (
    <FlexBox width={7} height="100vh" css={baseCss}>
      <FlexBox direction="column" gap={2} width="100%" height="fit-content" alignItems="center">
        <button
          onClick={() => handleOpenBasePanel('searchWindow')}
          style={{ border: '1px solid', padding: '1rem' }}
        >
          기본
        </button>
        <button
          onClick={() => handleOpenBasePanel('serverStationFilters')}
          style={{ border: '1px solid', padding: '1rem' }}
        >
          파랑
        </button>
        <button
          onClick={() => handleOpenBasePanel('stationList')}
          style={{ border: '1px solid', padding: '1rem' }}
        >
          빨강
        </button>
      </FlexBox>
    </FlexBox>
  );
};

const baseCss = css`
  padding-top: 1rem;
  border: 1px solid lightgrey;
`;

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
