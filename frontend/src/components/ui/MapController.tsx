import { styled } from 'styled-components';

import { useExternalValue } from '@utils/external-state';

import { getGoogleMapStore, googleMapActions } from '@stores/googleMapStore';

import { useCurrentPosition } from '@hooks/useCurrentPosition';

import { INITIAL_ZOOM_SIZE } from '@constants';

const MapController = () => {
  const position = useCurrentPosition();
  const googleMap = useExternalValue(getGoogleMapStore());

  const handleCurrentPositionButton = () => {
    googleMap.panTo({ lat: position.lat, lng: position.lng });
    googleMap.setZoom(INITIAL_ZOOM_SIZE);
  };

  const handleZoomUpButton = () => {
    googleMapActions.zoomUp();
  };

  const handleZoomDownButton = () => {
    googleMapActions.zoomDown();
  };

  return (
    <Container>
      <div style={{ marginBottom: '10px' }}>
        <Button onClick={() => handleCurrentPositionButton()}>🧭</Button>
      </div>
      <div>
        <Button onClick={() => handleZoomUpButton()}>➕</Button>
      </div>
      <div>
        <Button onClick={() => handleZoomDownButton()}>➖</Button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 999;
`;

const Button = styled.button`
  background-color: white;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default MapController;
