import { styled } from 'styled-components';
import { useStations } from '../../hooks/useStations';
import { googleMapStore } from '../../stores/googleMapStore';
import { useExternalValue } from '../../utils/external-state';

const StationList = () => {
  const googleMap = useExternalValue(googleMapStore);

  const { data: stations, isSuccess, isFetching } = useStations(googleMap);

  // TODO: 스켈레톤으로 바꾸기
  if (isFetching) {
    return <Container>⌛️</Container>;
  }

  return (
    <Container>
      {isSuccess && (
        <ul>
          {stations.map((station) => (
            <li key={station.stationId}>{station.stationName}</li>
          ))}
        </ul>
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
