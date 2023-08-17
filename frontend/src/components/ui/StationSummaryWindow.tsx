import { XMarkIcon } from '@heroicons/react/24/outline';
import { css } from 'styled-components';

import type { MouseEvent } from 'react';

import { useExternalValue, useSetExternalState } from '@utils/external-state';

import { getStationSummaryWindowStore } from '@stores/google-maps/stationSummaryWindowStore';
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
  const infoWindowInstance = useExternalValue(getStationSummaryWindowStore());
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

  const handleCloseStationSummary = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    infoWindowInstance.infoWindowInstance.close();
  };

  return (
    <ListItem tag="div" key={stationId} css={padding}>
      <Button width="100%" shadow css={foundStationButton} onClick={handleOpenStationDetail}>
        <Button onClick={handleCloseStationSummary} css={closeButtonCss}>
          <XMarkIcon fill="#333" width={24} />
        </Button>
        <FlexBox alignItems="start" mr={2} justifyContent="between" nowrap columnGap={2.8}>
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
            <Text variant="caption" align="left" lineClamp={1} mb={3.5} color="#585858">
              {operatingTime}
            </Text>
            <FlexBox columnGap={3}>
              <Text variant="label" align="left" color="#4b4b4b" css={labelStyle}>
                {isPrivate ? '이용 제한' : '외부인 개방'}
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

const padding = css`
  padding: 1.2rem;
`;

const companyNameText = css`
  font-size: 1.3rem;
`;

const foundStationButton = css`
  padding: 1.6rem 1.2rem;
  box-shadow: none;
`;

const labelStyle = css`
  padding: 0.2rem 1rem 0.3rem;
  background: var(--light-color);
  border-radius: 8px;
`;

const closeButtonCss = css`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
`;

export default StationSummaryWindow;
