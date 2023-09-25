import { XMarkIcon } from '@heroicons/react/24/outline';
import { css } from 'styled-components';

import { lazy, Suspense } from 'react';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import { useNavigationBar } from '@ui/Navigator/NavigationBar/hooks/useNavigationBar';
import { containerCss } from '@ui/ServerStationFilters/ServerStationFilters';

import { MOBILE_BREAKPOINT } from '@constants';

const StationList = lazy(() => import('./StationList'));

const StationListWindow = () => {
  const { closeBasePanel } = useNavigationBar();

  return (
    <FlexBox css={[containerCss]} nowrap>
      <Button css={xIconCss} onClick={closeBasePanel}>
        <XMarkIcon width={32} />
      </Button>
      <FlexBox css={headerCss}>
        <Text variant="h5">주변 충전소</Text>
      </FlexBox>
      <Suspense>
        <StationList />
      </Suspense>
    </FlexBox>
  );
};

const headerCss = css`
  margin: 4rem 0 2rem;

  width: calc(100vw - 6rem);

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    margin-top: 2.8rem;
  }
`;

const xIconCss = css`
  position: absolute;
  top: 2rem;
  right: 3rem;
`;

export default StationListWindow;
