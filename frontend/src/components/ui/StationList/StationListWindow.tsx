import { XMarkIcon } from '@heroicons/react/24/outline';
import { css } from 'styled-components';

import { useExternalValue } from '@utils/external-state';

import { selectedStationIdStore } from '@stores/selectedStationStore';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import { containerCss } from '@ui/ServerStationFilters/ServerStationFilters';
import { useNavigationBar } from '@ui/compound/NavigationBar/hooks/useNavigationBar';

import { MOBILE_BREAKPOINT } from '@constants';

import StationList from './StationList';

const StationListWindow = () => {
  const selectedStationId = useExternalValue(selectedStationIdStore);
  const { closeBasePanel } = useNavigationBar();

  if (selectedStationId !== null) {
    closeBasePanel();
  }

  return (
    <FlexBox css={[containerCss]} nowrap>
      <Button css={xIconCss} onClick={closeBasePanel}>
        <XMarkIcon width={32} />
      </Button>
      <FlexBox css={headerCss}>
        <Text variant="h5">주변 충전소</Text>
      </FlexBox>
      <StationList />
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
  top: 4rem;
  right: 3rem;
`;

export default StationListWindow;
