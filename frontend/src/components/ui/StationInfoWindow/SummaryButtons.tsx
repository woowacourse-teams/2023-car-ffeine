import { css } from 'styled-components';

import type { MouseEvent } from 'react';

import useMediaQueries from '@hooks/useMediaQueries';

import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';

import { MOBILE_BREAKPOINT } from '@constants';

export interface SummaryButtonsProps {
  handleCloseStationWindow: (event: MouseEvent<HTMLButtonElement>) => void;
  handleOpenStationDetail: () => void;
}

const SummaryButtons = ({
  handleCloseStationWindow,
  handleOpenStationDetail,
}: SummaryButtonsProps) => {
  const screen = useMediaQueries();

  return (
    <FlexBox
      nowrap
      direction="row"
      justifyContent="between"
      mt={2.5}
      mb={screen.get('isMobile') ? 1 : 0}
    >
      <ButtonNext
        variant="outlined"
        size="xs"
        color="secondary"
        css={closeButtonCss}
        onClick={handleCloseStationWindow}
      >
        닫기
      </ButtonNext>
      {screen.get('isMobile') && (
        <ButtonNext
          variant="contained"
          size="xs"
          color="dark"
          css={{ width: '68%' }}
          onClick={handleOpenStationDetail}
        >
          상세보기
        </ButtonNext>
      )}
    </FlexBox>
  );
};

const closeButtonCss = css`
  width: 20%;
  margin-left: auto;
  border-color: #4d5053bf;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 28%;
    margin-left: 0;
  }
`;

export default SummaryButtons;
