import { css } from 'styled-components';

import { useQueryClient } from '@tanstack/react-query';

import { useExternalValue, useSetExternalState } from '@utils/external-state';

import { getBriefStationInfoWindowStore } from '@stores/briefStationInfoWindowStore';
import { getGoogleMapStore } from '@stores/googleMapStore';
import { markerInstanceStore } from '@stores/markerInstanceStore';
import { selectedStationIdStore } from '@stores/selectedStationStore';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import ListItem from '@common/ListItem';
import Text from '@common/Text';

import { useAccordionAction } from '@ui/Accordion/hooks/useAccordionAction';
import ChargingSpeedIcon from '@ui/ChargingSpeedIcon';

import BriefStationInfo from '../BriefStationInfo';

import type { StationSummary } from 'types';

interface Props {
  station: StationSummary;
  tag?: string;
  $noPadding?: boolean;
}

const StationSummaryCard = ({ station, tag, $noPadding }: Props) => {
  const googleMap = useExternalValue(getGoogleMapStore());
  const { handleOpenLastPanel } = useAccordionAction();

  const stationMarkers = useExternalValue(markerInstanceStore);

  const { infoWindowInstance, briefStationInfoRoot } = useExternalValue(
    getBriefStationInfoWindowStore()
  );
  const setSelectedStationId = useSetExternalState(selectedStationIdStore);
  const queryClient = useQueryClient();

  const handleBriefStationInfoOpen = (station: StationSummary) => {
    const { stationId, latitude: lat, longitude: lng } = station;

    const selectedStation = stationMarkers.find((marker) => marker.stationId === stationId);

    googleMap.panTo({ lat, lng });
    queryClient.invalidateQueries({ queryKey: ['stations'] });

    infoWindowInstance.open({
      anchor: selectedStation.markerInstance,
      map: googleMap,
    });

    briefStationInfoRoot.render(<BriefStationInfo station={station} />);
  };

  const handleStationDetailsOpen = (stationId: number) => {
    setSelectedStationId(stationId);
    handleOpenLastPanel();
  };

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
          handleBriefStationInfoOpen(station);
          handleStationDetailsOpen(stationId);
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
            <Text variant="body" align="left" lineClamp={1} mb={1} color="#585858">
              {address || '주소를 직접 알아내자'}
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

export default StationSummaryCard;
