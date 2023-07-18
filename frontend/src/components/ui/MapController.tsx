import { styled } from 'styled-components';

import { googleMapActions } from '@stores/googleMapStore';

const MapController = () => {
  const handleZoomUpButton = () => {
    googleMapActions.zoomUp();
  };

  const handleZoomDownButton = () => {
    googleMapActions.zoomDown();
  };

  return (
    <Container>
      <div style={{ marginBottom: '10px' }}>
        <Button>🧭</Button>
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
