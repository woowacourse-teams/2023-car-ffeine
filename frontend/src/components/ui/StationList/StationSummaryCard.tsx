import { css } from 'styled-components';

import { useStationSummary } from '@hooks/google-maps/useStationSummary';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import ListItem from '@common/ListItem';
import Text from '@common/Text';

import ChargingSpeedIcon from '@ui/ChargingSpeedIcon';
import StationDetailsWindow from '@ui/StationDetailsWindow';
import { useNavigationBar } from '@ui/compound/NavigationBar/hooks/useNavigationBar';

import type { StationSummary } from '@type';

interface Props {
  station: StationSummary;
  tag?: string;
  $noPadding?: boolean;
}

const StationSummaryCard = ({ station, tag, $noPadding }: Props) => {
  const { openLastPanel } = useNavigationBar();
  const { openStationSummary } = useStationSummary();

  const {
    stationId,
    stationName,
    address,
    companyName,
    isPrivate,
    isParkingFree,
    operatingTime,
    chargers,
  } = station;
  const fastChargerCount = chargers.filter(({ capacity }) => capacity >= 50).length;

  return (
    <ListItem tag={tag} key={stationId} css={$noPadding && noPadding}>
      <Button
        width="100%"
        shadow
        css={foundStationButton}
        onClick={() => {
          openStationSummary(station);
          openLastPanel(<StationDetailsWindow />);
        }}
      >
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
            <Text variant="label" align="left" lineClamp={1} mb={1} color="#585858">
              {address === 'null' || !address ? '주소를 직접 알아내자' : address}
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
  padding: 1.8rem 1.4rem 2rem;
  box-shadow: 0 0.3rem 0.8rem 0 var(--gray-200-color);
  border-radius: 20px;
`;

const labelStyle = css`
  padding: 0.2rem 1rem 0.3rem;
  background: var(--light-color);
  border-radius: 8px;
`;

export default StationSummaryCard;
