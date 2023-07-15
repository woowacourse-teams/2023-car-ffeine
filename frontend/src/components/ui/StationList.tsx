import { styled } from 'styled-components';
import { useStations } from '../../hooks/useStations';
import { googleMapStore } from '../../stores/googleMapStore';
import { useExternalValue } from '../../utils/external-state';
import { markerInstanceStore } from '../../stores/markerInstanceStore';
import { getBriefStationInfoWindowStore } from '../../stores/briefStationInfoWindowStore';
import BriefStationInfo from './BriefStationInfo';
import { useUpdateStations } from '../../hooks/useUpdateStations';
import type { Station } from '../../types';

const StationList = () => {
  const googleMap = useExternalValue(googleMapStore);

  const { data: stations, isSuccess, isFetching } = useStations(googleMap);
  const stationMarkers = useExternalValue(markerInstanceStore);

  const { infoWindowInstance, briefStationInfoRoot } = useExternalValue(
    getBriefStationInfoWindowStore()
  );

  const { updateStations } = useUpdateStations();

  const handleStationInfoOpen = (station: Station) => {
    const { stationId, latitude: lat, longitude: lng } = station;

    const selectedStation = stationMarkers.find((marker) => marker.stationId === stationId);

    googleMap.panTo({ lat, lng });
    updateStations(googleMap);

    infoWindowInstance.open({
      anchor: selectedStation.markerInstance,
      map: googleMap,
    });

    briefStationInfoRoot.render(<BriefStationInfo station={station} />);
  };

  // TODO: 스켈레톤으로 바꾸기
  if (isFetching) {
    return <Container>⌛️</Container>;
  }

  return (
    <Container>
      {isSuccess && (
        <>
          <div>
            불일치 충전소 개수:
            {
              stationMarkers.filter(
                (station) =>
                  !stationMarkers.map((marker) => marker.stationId).includes(station.stationId)
              ).length
            }
          </div>
          <ul>
            {stations.map((station) => {
              const { stationId, stationName } = station;

              return (
                <li key={stationId}>
                  <button onClick={() => handleStationInfoOpen(station)}>{stationName}</button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 999;
  padding: 10px;
  background-color: white;
  box-shadow: 1px 1px 2px gray;
`;

export default StationList;
