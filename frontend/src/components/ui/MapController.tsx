import { useExternalValue } from '@utils/external-state';

import { getGoogleMapStore, googleMapActions } from '@stores/googleMapStore';

import { useCurrentPosition } from '@hooks/google-maps/useCurrentPosition';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';

import { INITIAL_ZOOM_SIZE } from '@constants/googleMaps';

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
    <Box position="fixed" bottom={5} right={2} css={{ zIndex: 999 }}>
      <Box mb={3}>
        <ButtonNext variant="contained" color="light" onClick={() => handleCurrentPositionButton()}>
          🧭
        </ButtonNext>
      </Box>
      <Box mb={1}>
        <ButtonNext variant="contained" color="light" onClick={() => handleZoomUpButton()}>
          ➕
        </ButtonNext>
      </Box>
      <Box>
        <ButtonNext variant="contained" color="light" onClick={() => handleZoomDownButton()}>
          ➖
        </ButtonNext>
      </Box>
    </Box>
  );
};

export default MapController;
