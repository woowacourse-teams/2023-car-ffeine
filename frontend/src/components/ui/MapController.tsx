import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { css } from 'styled-components';

import { useExternalValue } from '@utils/external-state';

import { getGoogleMapStore, googleMapActions } from '@stores/google-maps/googleMapStore';

import { useCurrentPosition } from '@hooks/google-maps/useCurrentPosition';

import Box from '@common/Box';
import Button from '@common/Button';

import { MOBILE_BREAKPOINT } from '@constants';
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
    <Box css={containerCss}>
      <Button
        outlined
        css={[buttonCss, currentPositionIconCss]}
        onClick={handleCurrentPositionButton}
      >
        <MapPinIcon
          width={24}
          fill="#0054ff"
          stroke="#333"
          type="button"
          aria-label="내 위치로 이동"
        />
      </Button>
      <Button
        outlined
        noRadius="bottom"
        css={[buttonCss, plusIconCss]}
        onClick={handleZoomUpButton}
        type="button"
        aria-label="확대"
      >
        <PlusSmallIcon width={24} fill="#333" />
      </Button>
      <Button
        outlined
        noRadius="top"
        css={buttonCss}
        onClick={handleZoomDownButton}
        type="button"
        aria-label="축소"
      >
        <MinusSmallIcon width={24} fill="#333" />
      </Button>
    </Box>
  );
};

const containerCss = css`
  z-index: 99;

  position: fixed;
  bottom: 3.2rem;
  right: 0.8rem;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    bottom: 8rem;
    right: 0.8rem;
  }
`;

const buttonCss = css`
  display: flex;
  padding: 8px;
  border: 1.8px solid #e3e8f7;
`;

const currentPositionIconCss = css`
  margin-bottom: 20px;
`;

const plusIconCss = css`
  border-bottom: 0;
`;

export default MapController;
