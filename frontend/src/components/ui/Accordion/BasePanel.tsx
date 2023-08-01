import { css } from 'styled-components';

import type { ReactNode } from 'react';
import { useContext } from 'react';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import type { BasePanelType } from '.';
import { AccordionContext } from '.';
import { useAccordionAction } from './hooks/useAccordionAction';

interface Props {
  render: (basePanelType: BasePanelType) => ReactNode;
}

const BasePanel = ({ render }: Props) => {
  const { handleCloseAllPanel } = useAccordionAction();
  const { isLastPanelOpen, isBasePanelOpen, basePanelType } = useContext(AccordionContext);

  const canViewCloseButton = !isLastPanelOpen && isBasePanelOpen;

  return (
    <FlexBox width="fit-content" css={containerCss}>
      {isBasePanelOpen && render(basePanelType)}
      {canViewCloseButton && (
        <Button css={closeAllPanelButtonCss} onClick={handleCloseAllPanel}>
          <Text>{'<'}</Text>
        </Button>
      )}
    </FlexBox>
  );
};

const containerCss = css`
  position: relative;
  margin-left: 7rem;
`;

export const closeAllPanelButtonCss = css`
  width: 2rem;
  height: 3rem;

  border: 1px solid lightgrey;
  border-left: 0;
  border-radius: 0;

  position: absolute;
  top: 50%;
  right: -2rem;

  background-color: white;
  color: black;
`;

export default BasePanel;
