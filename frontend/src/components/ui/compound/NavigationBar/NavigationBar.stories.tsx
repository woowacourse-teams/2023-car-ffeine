import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import type { Meta } from '@storybook/react';
import { styled } from 'styled-components';

import type { ReactElement } from 'react';
import { useState } from 'react';

import Button from '@common/Button';
import ButtonNext from '@common/ButtonNext';

import NavigationBar from '.';

const meta = {
  title: 'UI/NavigationBar',
  component: NavigationBar,
  tags: ['autodocs'],
} satisfies Meta<typeof NavigationBar>;

export default meta;

export const Default = () => {
  const [basePanel, setBasePanel] = useState<ReactElement | null>(null);
  const [lastPanel, setLastPanel] = useState<ReactElement | null>(null);

  const handleClosePanel = () => {
    if (lastPanel !== null) {
      setLastPanel(null);
    } else {
      setBasePanel(null);
    }
  };

  return (
    <>
      <NavigationBar>
        <NavigationBar.Menu />
        <NavigationBar.BasePanel component={basePanel} />
        <NavigationBar.LastPanel component={lastPanel} />
        <Button variant="label" aria-label="검색창 닫기" onClick={handleClosePanel}>
          <ChevronLeftIcon width="2.4rem" stroke="#9c9fa7" />
        </Button>
      </NavigationBar>
      <div style={{ display: 'flex', flexDirection: 'column', position: 'fixed', right: 0 }}>
        <ButtonNext onClick={() => setBasePanel(<BaseContainerBlue />)}>
          openBlueBasePanel
        </ButtonNext>
        <ButtonNext onClick={() => setBasePanel(<BaseContainerRed />)}>openRedBasePanel</ButtonNext>
        <ButtonNext onClick={() => setBasePanel(<BaseContainer />)}>openWhiteBasePanel</ButtonNext>
        <ButtonNext onClick={() => setLastPanel(<LastContainer />)}>openLastPanel</ButtonNext>
      </div>
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
