import { css } from 'styled-components';

import type { ReactNode } from 'react';

import FlexBox from '@common/FlexBox';

interface Props {
  render: () => ReactNode;
}

const Base = ({ render }: Props) => {
  return (
    <FlexBox width="fit-content" css={containerCss}>
      {render()}
    </FlexBox>
  );
};

const containerCss = css`
  position: relative;
  border-radius: 0;
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

export default Base;
