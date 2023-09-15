import { css } from 'styled-components';

import type { MouseEvent } from 'react';

import { useExternalValue, useSetExternalState } from '@utils/external-state';

import { getStationSummaryWindowStore } from '@stores/google-maps/stationSummaryWindowStore';
import { selectedStationIdStore } from '@stores/selectedStationStore';

import { useFetchStationSummary } from '@hooks/fetch/useFetchStationSummary';

import Button from '@common/Button';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import ListItem from '@common/ListItem';
import Loader from '@common/Loader';
import Text from '@common/Text';

import ChargingSpeedIcon from './ChargingSpeedIcon';
import StationDetailsWindow from './StationDetailsWindow';
import { useNavigationBar } from './compound/NavigationBar/hooks/useNavigationBar';

interface Props {
  stationId: string;
}

const StationSummaryWindow = ({ stationId }: Props) => {
  const infoWindowInstance = useExternalValue(getStationSummaryWindowStore());
  const setSelectedStationId = useSetExternalState(selectedStationIdStore);
  const { openLastPanel } = useNavigationBar();

  const { isLoading, stationSummary } = useFetchStationSummary(stationId);

  const handleOpenStationDetail = () => {
    setSelectedStationId(stationId);
    openLastPanel(<StationDetailsWindow stationId={stationId} />);
  };

  const handleCloseStationSummary = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    infoWindowInstance.infoWindowInstance.close();
  };

  if (isLoading || stationSummary === null) {
    return (
      <FlexBox justifyContent="center" alignItems="center" height="184.39px">
        <Loader size="xxl" />
      </FlexBox>
    );
  }

  const { stationName, companyName, address, operatingTime, quickChargerCount } = stationSummary;

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
          {quickChargerCount !== 0 && <ChargingSpeedIcon />}
        </FlexBox>
      </Button>
      <FlexBox direction="row" justifyContent="between" mb={1.8}>
        <ButtonNext
          variant="outlined"
          size="xs"
          color="secondary"
          css={{ width: '28%' }}
          onClick={handleCloseStationSummary}
        >
          닫기
        </ButtonNext>
        <ButtonNext
          variant="contained"
          size="xs"
          color="dark"
          css={{ width: '68%' }}
          onClick={handleOpenStationDetail}
        >
          상세보기
        </ButtonNext>
      </FlexBox>
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
  padding: 1.2rem 1.2rem 1.4rem;
  box-shadow: none;
`;

export default StationSummaryWindow;
