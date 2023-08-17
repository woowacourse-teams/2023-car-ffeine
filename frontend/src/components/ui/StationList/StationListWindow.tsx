import { css } from 'styled-components';

import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import { containerCss } from '@ui/ServerStationFilters/ServerStationFilters';

import StationList from './StationList';

const StationListWindow = () => {
  return (
    <FlexBox css={[containerCss]}>
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

export default StationListWindow;
