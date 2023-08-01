import { BoltIcon } from '@heroicons/react/24/solid';
import { css } from 'styled-components';

import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import type { StationSummary } from 'types';

interface StationCardProps {
  station: StationSummary;
  onClick: () => void;
}

const StationCard = ({ station, onClick }: StationCardProps) => {
  const { address, companyName, stationName, isParkingFree, isPrivate } = station;

  return (
    <FlexBox
      tag="button"
      width="calc(30rem - 2px)"
      direction="column"
      justifyContent="center"
      gap={3}
      nowrap
      css={paddingCss}
      onClick={onClick}
    >
      <FlexBox alignItems="center" nowrap>
        <FlexBox
          aria-disabled
          background="#e9edf8"
          justifyContent="center"
          alignItems="center"
          nowrap
          css={iconWrapper}
        >
          <BoltIcon width={24} fill="#5c68d6" />
        </FlexBox>
        <FlexBox direction="column" height={7} justifyContent="between" nowrap>
          <Text variant="label" lineClamp={1} align="left">
            {companyName}
          </Text>
          <Text variant="h5" lineClamp={1} align="left">
            {stationName}
          </Text>
          <Text variant="caption" lineClamp={1} align="left">
            {address}
          </Text>
        </FlexBox>
      </FlexBox>
      <FlexBox>
        {isPrivate && (
          <FlexBox css={badge}>
            <Text variant="caption">이용제한</Text>
          </FlexBox>
        )}
        {isParkingFree && (
          <FlexBox css={badge}>
            <Text variant="caption">무료주차</Text>
          </FlexBox>
        )}
      </FlexBox>
    </FlexBox>
  );
};

const paddingCss = css`
  padding: 0.8rem;
  border: 1px solid;
  margin: 0;
  margin-bottom: 1rem;
`;

const iconWrapper = css`
  padding: 0.4rem;
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  flex-shrink: 0;
`;

const badge = css`
  width: fit-content;
  height: fit-content;
  padding: 0.4rem;

  border: 1px solid;
  border-radius: 0.7rem;
`;

export default StationCard;
