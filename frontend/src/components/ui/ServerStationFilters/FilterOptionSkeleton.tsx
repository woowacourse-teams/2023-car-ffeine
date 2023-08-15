import { css } from 'styled-components';

import { generateRandomData } from '@utils/randomDataGenerator';

import FlexBox from '@common/FlexBox';
import Skeleton from '@common/Skeleton';

const FilterOptionSkeleton = () => {
  return (
    <>
      <FlexBox
        width={30}
        direction={'column'}
        css={css`
          margin-bottom: 4.8rem;
        `}
      >
        <FlexBox justifyContent="between">
          <Skeleton width="15rem" height="2rem" mb={1} />
          <Skeleton width="8rem" height="2rem" mb={1} />
        </FlexBox>
        <FlexBox gap={2}>
          {Array.from({ length: generateRandomData([10, 15, 20]) }, (_, index) => (
            <Skeleton
              key={index}
              width={`${generateRandomData([8, 10, 12, 14])}rem`}
              height="4rem"
            />
          ))}
        </FlexBox>
      </FlexBox>
    </>
  );
};
export default FilterOptionSkeleton;
