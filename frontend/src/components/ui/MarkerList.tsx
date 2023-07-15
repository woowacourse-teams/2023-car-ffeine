import { styled } from 'styled-components';
import { useExternalValue } from '../../utils/external-state';
import { markerInstanceStore } from '../../stores/markerInstanceStore';

const MarkerList = () => {
  const markers = useExternalValue(markerInstanceStore);

  return (
    <Container>
      {markers.map((marker) => (
        <div key={marker.stationId}>{marker.stationId}</div>
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 10px;
  left: 200px;
  z-index: 999;
  padding: 10px;
  background-color: white;
  box-shadow: 1px 1px 2px gray;
`;

export default MarkerList;
