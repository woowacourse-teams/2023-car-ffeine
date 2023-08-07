import { css } from 'styled-components';

import { modalActions } from '@stores/layout/modalStore';

import Alert from '@common/Alert';
import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Skeleton from '@common/Skeleton';

import ChargerCardSkeleton from '@ui/StationDetailsWindow/ChargerCardSkeleton';
import StationInformationSkeleton from '@ui/StationDetailsWindow/StationInformationSkeleton';

const StationDetailsViewSkeleton = () => {
  return (
    <Box px={2} py={10} css={containerCss}>
      <StationInformationSkeleton />
      <FlexBox justifyContent="center">
        <Skeleton width="90%" height="3rem" />
      </FlexBox>
      <hr />
      <FlexBox>
        {Array(10)
          .fill(undefined)
          .map((v, i) => (
            <ChargerCardSkeleton key={i} />
          ))}
      </FlexBox>
    </Box>
  );
};

const containerCss = css`
  width: 34rem;
  height: 100vh;
  background-color: white;
  box-shadow: 1px 1px 2px gray;
  border-left: 0.5px solid #e1e4eb;
  border-right: 0.5px solid #e1e4eb;
  overflow: scroll;
`;

export default StationDetailsViewSkeleton;
