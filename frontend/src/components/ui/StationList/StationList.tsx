import { css, styled } from 'styled-components';

import { useExternalValue, useSetExternalState } from '@utils/external-state';

import { getBriefStationInfoWindowStore } from '@stores/briefStationInfoWindowStore';
import { getGoogleMapStore } from '@stores/googleMapStore';
import { markerInstanceStore } from '@stores/markerInstanceStore';
import { selectedStationIdStore } from '@stores/selectedStationStore';

import { useStations } from '@hooks/useStations';
import { useUpdateStations } from '@hooks/useUpdateStations';

import FlexBox from '@common/FlexBox';
import List from '@common/List';
import ListItem from '@common/ListItem';
import Text from '@common/Text';

import BriefStationInfo from '../BriefStationInfo';
import StationCard from './StationCard';

import type { StationSummary } from 'types';

const StationList = () => {
  const googleMap = useExternalValue(getGoogleMapStore());

  const { data: stations, isSuccess, isFetching } = useStations();
  const stationMarkers = useExternalValue(markerInstanceStore);

  const { infoWindowInstance, briefStationInfoRoot } = useExternalValue(
    getBriefStationInfoWindowStore()
  );
  const setSelectedStationId = useSetExternalState(selectedStationIdStore);

  const { updateStations } = useUpdateStations();

  const handleBriefStationInfoOpen = (station: StationSummary) => {
    const { stationId, latitude: lat, longitude: lng } = station;

    const selectedStation = stationMarkers.find((marker) => marker.stationId === stationId);

    googleMap.panTo({ lat, lng });
    updateStations();

    infoWindowInstance.open({
      anchor: selectedStation.markerInstance,
      map: googleMap,
    });

    briefStationInfoRoot.render(<BriefStationInfo station={station} />);
  };

  const handleStationDetailsOpen = (stationId: number) => {
    setSelectedStationId(stationId);
  };

  return (
    <FlexBox width="34rem" height="100vh" css={containerCss}>
      {isSuccess && (
        <List css={listContainer}>
          {stations.map((station) => {
            const { stationId } = station;

            return (
              <ListItem key={stationId} css={noPadding}>
                <StationCard
                  station={station}
                  onClick={() => {
                    handleBriefStationInfoOpen(station);
                    handleStationDetailsOpen(stationId);
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      )}
    </FlexBox>
  );
};

const containerCss = css`
  position: fixed;
  top: 0;
  left: 7rem;
  z-index: 999;

  padding: 2rem;
  background-color: white;
  border-right: 1px solid #ddd;
`;

const noPadding = css`
  padding: 0;
`;

const listContainer = css`
  width: 100%;
  height: 100%;

  overflow: scroll;
`;

export default StationList;
