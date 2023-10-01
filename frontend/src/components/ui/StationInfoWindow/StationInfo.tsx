import { css } from 'styled-components';

import type { MouseEvent } from 'react';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import ListItem from '@common/ListItem';
import Text from '@common/Text';

import ChargingSpeedIcon from '@ui/ChargingSpeedIcon';
import SummaryButtons from '@ui/StationInfoWindow/SummaryButtons';

import type { StationDetails } from '@type';

export interface StationInfoProps {
  stationDetails: StationDetails;
  handleOpenStationDetail: () => void;
  handleCloseStationSummary: (event: MouseEvent<HTMLButtonElement>) => void;
}

const StationInfo = ({
  stationDetails,
  handleOpenStationDetail,
  handleCloseStationSummary,
}: StationInfoProps) => {
  const {
    address,
    chargers,
    companyName,
    contact,
    detailLocation,
    isParkingFree,
    isPrivate,
    latitude,
    longitude,
    operatingTime,
    privateReason,
    reportCount,
    stationId,
    stationName,
    stationState,
  } = stationDetails;

  return (
    <ListItem tag="div" key={stationId} css={padding}>
      <Button width="100%" shadow css={foundStationButton} onClick={handleOpenStationDetail}>
        <FlexBox alignItems="start" justifyContent="between" nowrap columnGap={2.8}>
          <article>
            <Text
              tag="h3"
              align="left"
              variant="subtitle"
              title={stationName}
              lineClamp={1}
              css={companyNameText}
            >
              {companyName}
            </Text>
            <Text tag="h3" align="left" variant="h5" title={stationName} lineClamp={1}>
              {stationName}
            </Text>
            <Text variant="body" align="left" lineClamp={1} mb={1} color="#585858">
              {address === 'null' || !address ? '주소 미확인' : address}
            </Text>
            <Text variant="caption" align="left" lineClamp={1} mb={1.8} color="#585858">
              {operatingTime}
            </Text>
          </article>
          {chargers.filter((charger) => charger.capacity >= 50).length !== 0 && (
            <ChargingSpeedIcon />
          )}
        </FlexBox>
      </Button>
      <SummaryButtons
        handleCloseStationSummary={handleCloseStationSummary}
        handleOpenStationDetail={handleOpenStationDetail}
      />
    </ListItem>
  );
};

const padding = css`
  padding: 2.4rem 2.4rem 1.8rem;
`;

const companyNameText = css`
  font-size: 1.3rem;
`;

const foundStationButton = css`
  box-shadow: none;
`;

export default StationInfo;
