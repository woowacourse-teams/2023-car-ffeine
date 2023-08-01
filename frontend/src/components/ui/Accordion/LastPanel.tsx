import { css } from 'styled-components';

import type { ReactNode } from 'react';
import { useContext } from 'react';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import { AccordionContext } from '.';
import { closeAllPanelButtonCss } from './BasePanel';
import { useAccordionAction } from './hooks/useAccordionAction';

interface Props {
  render: () => ReactNode;
}

const LastPanel = ({ render }: Props) => {
  const { handleCloseAllPanel, handleCloseLastPanel } = useAccordionAction();
  const { isLastPanelOpen, isBasePanelOpen } = useContext(AccordionContext);

  return (
    <FlexBox width="fit-content" css={containerCss}>
      {isLastPanelOpen && isBasePanelOpen && (
        <>
          {render()}
          <Button css={closeAllPanelButtonCss} onClick={handleCloseAllPanel}>
            <Text>{'<'}</Text>
          </Button>
          <Button css={closeLastPanelButtonCss} onClick={handleCloseLastPanel}>
            <Text>{'X'}</Text>
          </Button>
        </>
      )}
    </FlexBox>
  );
};

const containerCss = css`
  position: relative;
`;

const closeLastPanelButtonCss = css`
  width: 3rem;
  height: 3rem;

  border: 1px solid lightgrey;
  border-left: 0;
  border-radius: 0;

  position: absolute;
  top: 0;
  right: -3rem;

  background-color: white;
  color: black;
`;

export default LastPanel;
