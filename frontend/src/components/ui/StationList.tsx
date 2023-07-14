import { styled } from 'styled-components';
import { useStations } from '../../hooks/useStations';
import { googleMapStore } from '../../stores/googleMapStore';
import { useExternalValue } from '../../utils/external-state';
import { markerInstanceStore } from '../../stores/markerIntanceStore';

const StationList = () => {
  const googleMap = useExternalValue(googleMapStore);

  const { data: stations, isSuccess, isFetching } = useStations(googleMap);
  const markers = useExternalValue(markerInstanceStore);

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
              stations.filter(
                (station) => !markers.map((marker) => marker.stationId).includes(station.stationId)
              ).length
            }
          </div>
          <ul>
            {stations.map((station) => {
              const { stationId, stationName } = station;

              return (
                <li key={stationId}>
                  <button onClick={() => console.log(stationId)}>{stationName}</button>
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
