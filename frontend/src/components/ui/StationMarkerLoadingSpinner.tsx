import { css } from 'styled-components';

import { getNavigationComponentWidth } from '@utils/google-maps/getCalculatedMapDelta';

import { useStations } from '@hooks/tanstack-query/station-markers/useStations';

import Loader from '@common/Loader';

import { MOBILE_BREAKPOINT } from '@constants';

const StationMarkerLoadingSpinner = () => {
  const navigationComponentWidth = getNavigationComponentWidth();

  const { isFetching } = useStations();

  if (isFetching) {
    return <Loader size="10rem" border={6} css={positionCss(navigationComponentWidth)} />;
  }

  return <></>;
};

const positionCss = (navigationComponentWidth: number) => css`
  position: fixed;
  z-index: 99;
  top: 50%;
  left: calc(50% + ${navigationComponentWidth / 2}rem);
  margin: -5rem 0 0 -5rem;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    left: 50%;
  }
`;

export default StationMarkerLoadingSpinner;
