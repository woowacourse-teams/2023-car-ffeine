import { css } from 'styled-components';

import { useStationInfoWindow } from '@hooks/google-maps/useStationInfoWindow';
import useMediaQueries from '@hooks/useMediaQueries';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import ListItem from '@common/ListItem';
import Text from '@common/Text';

import ChargingSpeedIcon from '@ui/ChargingSpeedIcon';
import { useNavigationBar } from '@ui/Navigator/NavigationBar/hooks/useNavigationBar';
import StationDetailsWindow from '@ui/StationDetailsWindow';

import type { StationSummary } from '@type';

interface Props {
  station: StationSummary;
  tag?: string;
  $noPadding?: boolean;
}

const StationSummaryCard = ({ station, tag, $noPadding }: Props) => {
  const { openLastPanel, closeBasePanel } = useNavigationBar();
  const { openStationInfoWindow } = useStationInfoWindow();
  const screen = useMediaQueries();

  const {
    stationId,
    stationName,
    address,
    companyName,
    isPrivate,
    isParkingFree,
    operatingTime,
    quickChargerCount,
  } = station;

  return (
    <ListItem tag={tag} key={stationId} css={$noPadding && noPadding}>
      <Button
        width="100%"
        shadow
        css={foundStationButton}
        onClick={() => {
          openStationInfoWindow(stationId);
          if (screen.get('isMobile')) {
            closeBasePanel();
          } else {
            openLastPanel(<StationDetailsWindow stationId={stationId} />);
          }
        }}
      >
        <FlexBox alignItems="start" justifyContent="between" nowrap columnGap={2.8}>
          <article>
            <Text tag="h4" align="left" title={stationName} lineClamp={1} fontSize={1.3}>
              {companyName}
            </Text>
            <Text tag="h3" align="left" variant="h5" title={stationName} lineClamp={1}>
              {stationName}
            </Text>
            <Text variant="label" align="left" lineClamp={1} mb={1} color="#585858">
              {address === 'null' || !address ? '주소 미확인' : address}
            </Text>
            <Text variant="caption" align="left" lineClamp={1} mb={3} color="#585858">
              {operatingTime}
            </Text>
            <FlexBox columnGap={3}>
              <Text variant="pillbox" align="left">
                {isPrivate ? '이용 제한' : '외부인 개방'}
              </Text>
              <Text variant="pillbox" align="left">
                {isParkingFree ? '무료 주차' : '유료 주차'}
              </Text>
            </FlexBox>
          </article>
          {/* TODO: 디자인 변경 및 flex가 아닌 position으로 변경 */}
          {quickChargerCount !== 0 && <ChargingSpeedIcon />}
        </FlexBox>
      </Button>
    </ListItem>
  );
};

const noPadding = css`
  padding: 0;
`;

const foundStationButton = css`
  padding: 1.6rem 1.4rem 1.8rem;
  box-shadow: 0 0.3rem 0.8rem 0 var(--gray-200-color);
  border-radius: 10px;
`;

export default StationSummaryCard;
