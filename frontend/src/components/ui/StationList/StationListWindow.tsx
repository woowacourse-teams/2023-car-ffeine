import { XMarkIcon } from '@heroicons/react/24/outline';
import { css } from 'styled-components';

import { useExternalValue } from '@utils/external-state';

import { selectedStationIdStore } from '@stores/selectedStationStore';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import { containerCss } from '@ui/ServerStationFilters/ServerStationFilters';
import { useNavigationBar } from '@ui/compound/NavigationBar/hooks/useNavigationBar';

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
  margin-top: 4rem;

  width: calc(100vw - 6rem);
  margin-bottom: 2rem;
`;

const xIconCss = css`
  position: absolute;
  top: 4rem;
  right: 3rem;
`;

export default StationListWindow;
