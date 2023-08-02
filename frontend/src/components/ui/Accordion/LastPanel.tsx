import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { css } from 'styled-components';

import type { ReactNode } from 'react';
import { useContext } from 'react';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';

import { AccordionContext } from '.';
import { useAccordionAction } from './hooks/useAccordionAction';

interface Props {
  render: () => ReactNode;
}

const LastPanel = ({ render }: Props) => {
  const { handleCloseLastPanel } = useAccordionAction();
  const { isLastPanelOpen, isBasePanelOpen } = useContext(AccordionContext);

  return (
    <FlexBox width="fit-content" css={containerCss}>
      {isLastPanelOpen && isBasePanelOpen && (
        <>
          {render()}
          <Button variant="label" aria-label="검색창 닫기" onClick={handleCloseLastPanel}>
            <ChevronLeftIcon width="2.4rem" stroke="#9c9fa7" />
          </Button>
        </>
      )}
    </FlexBox>
  );
};

const containerCss = css`
  position: relative;
`;

export default LastPanel;
