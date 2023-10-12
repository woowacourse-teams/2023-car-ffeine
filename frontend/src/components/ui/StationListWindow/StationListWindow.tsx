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
      <FlexBox width="calc(100vw - 4rem)" mt={10} mb={5} css={headerCss}>
        <Text variant="h5">주변 충전소</Text>
      </FlexBox>
      <Suspense>
        <StationList />
      </Suspense>
    </FlexBox>
  );
};

const headerCss = css`
  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    margin-top: 2.8rem;
  }
`;

const xIconCss = css`
  position: absolute;
  top: 2.24rem;
  right: 1.4rem;
`;

export default StationListWindow;
