import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { css } from 'styled-components';

import type { ReactNode } from 'react';
import { useContext } from 'react';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';

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
        <Button variant="label" aria-label="검색창 닫기" onClick={handleCloseAllPanel}>
          <ChevronLeftIcon width="2.4rem" stroke="#9c9fa7" />
        </Button>
      )}
    </FlexBox>
  );
};

const containerCss = css`
  position: relative;
  margin-left: 7rem;
`;

export default BasePanel;
