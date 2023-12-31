import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';
import { css } from 'styled-components';

import { BiCurrentLocation } from 'react-icons/bi';

import { useClusterMarkersQuery } from '@marker/components/LargeDeltaAreaMarkerContainer/hooks/useClusterMarkersQuery';
import { useStationMarkersQuery } from '@marker/components/SmallMediumDeltaAreaMarkerContainer/hooks/useStationMarkersQuery';

import { googleMapActions } from '@stores/google-maps/googleMapStore';

import Box from '@common/Box';
import Button from '@common/Button';
import Loader from '@common/Loader';

import { MOBILE_BREAKPOINT } from '@constants';

const MapController = () => {
  const { isFetching: isStationMarkerFetching } = useStationMarkersQuery();
  const { isFetching: isClusterMarkerFetching } = useClusterMarkersQuery();

  const isMarkerFetching = isStationMarkerFetching || isClusterMarkerFetching;

  const handleCurrentPositionButton = () => {
    if (!isMarkerFetching) {
      googleMapActions.moveToCurrentPosition();
    }
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
        {isMarkerFetching ? (
          <Loader css={{ borderBottomColor: 'blue' }} />
        ) : (
          <BiCurrentLocation size={24} color="#4D6CD0" stroke="#333" aria-label="내 위치로 이동" />
        )}
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
  position: fixed;
  bottom: 3.2rem;
  right: 1.6rem;
  z-index: 99;

  width: 4.2rem;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    bottom: 9.6rem;
  }
`;

const buttonCss = css`
  display: flex;
  width: 100%;
  height: 4.2rem;
  border: 1.8px solid #e3e8f7;

  & svg,
  div {
    margin: auto;
  }
`;

const currentPositionIconCss = css`
  margin-bottom: 20px;
`;

const plusIconCss = css`
  border-bottom: 0;
`;

export default MapController;
