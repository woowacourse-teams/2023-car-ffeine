import { css } from 'styled-components';

import { useSetExternalState } from '@utils/external-state';

import { selectedStationIdStore } from '@stores/selectedStationStore';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import ListItem from '@common/ListItem';
import Text from '@common/Text';

import type { StationSummary } from '@type';

import ChargingSpeedIcon from './ChargingSpeedIcon';
import StationDetailsWindow from './StationDetailsWindow';
import { useNavigationBar } from './compound/NavigationBar/hooks/useNavigationBar';

interface Props {
  station: StationSummary;
}

const StationSummaryWindow = ({ station }: Props) => {
  const setSelectedStationId = useSetExternalState(selectedStationIdStore);
  const { openLastPanel } = useNavigationBar();

  const {
    stationId,
    chargers,
    companyName,
    stationName,
    address,
    operatingTime,
    isParkingFree,
    isPrivate,
  } = station;

  const slowChargerCount = chargers.filter((charger) => charger.capacity < 50).length;
  const fastChargerCount = chargers.length - slowChargerCount;

  const handleOpenStationDetail = () => {
    setSelectedStationId(stationId);
    openLastPanel(<StationDetailsWindow />);
  };

  return (
    <ListItem tag="div" key={stationId} css={noPadding}>
      <Button width="100%" shadow css={foundStationButton} onClick={handleOpenStationDetail}>
        <FlexBox alignItems="start" justifyContent="between" nowrap columnGap={2.8}>
          <article>
            <Text
              tag="h4"
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
              {address || '주소 미확인'}
            </Text>
            <Text variant="caption" align="left" lineClamp={1} mb={3} color="#585858">
              {operatingTime}
            </Text>
            <FlexBox columnGap={3}>
              <Text variant="label" align="left" color="#4b4b4b" css={labelStyle}>
                {isPrivate ? '이용제한구역' : '공공 충전소'}
              </Text>
              <Text variant="label" align="left" color="#4b4b4b" css={labelStyle}>
                {isParkingFree ? '무료 주차' : '유료 주차'}
              </Text>
            </FlexBox>
          </article>
          {fastChargerCount !== 0 && <ChargingSpeedIcon />}
        </FlexBox>
      </Button>
    </ListItem>
  );
};

const noPadding = css`
  padding: 0;
`;

const companyNameText = css`
  font-size: 1.3rem;
`;

const foundStationButton = css`
  padding: 1.4rem 1.2rem 2rem;
  box-shadow: 0 0.3rem 0.8rem 0 var(--gray-200-color);
  border-radius: 1.2rem;
`;

const labelStyle = css`
  padding: 0.2rem 1rem 0.3rem;
  background: var(--light-color);
  border-radius: 8px;
`;

export default StationSummaryWindow;
