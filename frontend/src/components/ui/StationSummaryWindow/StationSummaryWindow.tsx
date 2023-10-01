import { css } from 'styled-components';

import type { MouseEvent } from 'react';

import { useExternalValue } from '@utils/external-state';

import { getStationInfoWindowStore } from '@stores/google-maps/stationInfoWindowStore';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import ListItem from '@common/ListItem';
import Loader from '@common/Loader';
import Text from '@common/Text';

import { useNavigationBar } from '@ui/Navigator/NavigationBar/hooks/useNavigationBar';
import { useFetchStationDetatils } from '@ui/StationSummaryWindow/useFetchStationDetatils';

import StationDetailsWindow from '../StationDetailsWindow';
import SummaryButtons from './SummaryButtons';

export interface StationSummaryProps {
  selectedStationId: string;
}

const StationSummaryWindow = ({ selectedStationId }: StationSummaryProps) => {
  const infoWindowInstance = useExternalValue(getStationInfoWindowStore());
  const { openLastPanel } = useNavigationBar();

  const { stationDetails, isLoading } = useFetchStationDetatils(selectedStationId);

  const handleOpenStationDetail = () => {
    openLastPanel(<StationDetailsWindow stationId={selectedStationId} />);
  };

  const handleCloseStationSummary = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    infoWindowInstance.infoWindowInstance.close();
  };

  /**
   * TODO: 추후에 스테이션 상세 정보를 불러오는데 실패했을 때의 처리를 추가해야 합니다.
   */

  if (isLoading || stationDetails === null) {
    return (
      <FlexBox justifyContent="center" alignItems="center" height="44.44px">
        <Loader size="xxl" />
      </FlexBox>
    );
  }

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
          {/*{quickChargerCount !== 0 && <ChargingSpeedIcon />}*/}
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

export default StationSummaryWindow;
