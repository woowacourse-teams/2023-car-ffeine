import { css, styled } from 'styled-components';

import { useExternalState, useExternalValue } from '@utils/external-state';

import type { Panels } from '@stores/layout/navigationBarPanelStore';
import { navigationBarPanelStore } from '@stores/layout/navigationBarPanelStore';
import { clientStationFiltersStore } from '@stores/station-filters/clientStationFiltersStore';

import useMediaQueries from '@hooks/useMediaQueries';

import FlexBox from '@common/FlexBox';

import { MOBILE_BREAKPOINT, NAVIGATOR_PANEL_WIDTH } from '@constants';
import { CHARGING_SPEED } from '@constants/chargers';

import StationSearchBar from './StationSearchWindow/StationSearchBar';

const ClientStationFilters = () => {
  const [
    {
      isAvailableStationFilterSelected,
      isFastChargeStationFilterSelected,
      isParkingFreeStationFilterSelected,
      isPrivateStationFilterSelected,
    },
    setFilterOption,
  ] = useExternalState(clientStationFiltersStore);

  const ADDITIONAL_MARGIN = 8;
  const { basePanel, lastPanel } = useExternalValue(navigationBarPanelStore);
  const navigationComponentWidth =
    (basePanel === null ? 0 : NAVIGATOR_PANEL_WIDTH) +
    (lastPanel === null ? 0 : NAVIGATOR_PANEL_WIDTH) +
    ADDITIONAL_MARGIN;

  const toggleAvailableStation = () => {
    setFilterOption((prev) => ({
      ...prev,
      isAvailableStationFilterSelected: !prev.isAvailableStationFilterSelected,
    }));
  };

  const toggleParkingFreeStation = () => {
    setFilterOption((prev) => ({
      ...prev,
      isParkingFreeStationFilterSelected: !prev.isParkingFreeStationFilterSelected,
    }));
  };

  const toggleFastChargeStation = () => {
    setFilterOption((prev) => ({
      ...prev,
      isFastChargeStationFilterSelected: !prev.isFastChargeStationFilterSelected,
    }));
  };

  const togglePrivateStation = () => {
    setFilterOption((prev) => ({
      ...prev,
      isPrivateStationFilterSelected: !prev.isPrivateStationFilterSelected,
    }));
  };

  const screen = useMediaQueries();

  return (
    <Container left={navigationComponentWidth} $basePanel={basePanel}>
      {screen.get('isMobile') ? <StationSearchBar /> : !basePanel && <StationSearchBar />}
      <FlexBox css={mobileFilterContainerCss}>
        <ClientFilterButton
          onClick={toggleAvailableStation}
          isChecked={isAvailableStationFilterSelected}
        >
          현재 사용 가능
        </ClientFilterButton>
        <ClientFilterButton
          onClick={toggleParkingFreeStation}
          isChecked={isParkingFreeStationFilterSelected}
        >
          주차 무료
        </ClientFilterButton>
        <ClientFilterButton
          onClick={toggleFastChargeStation}
          isChecked={isFastChargeStationFilterSelected}
        >
          {CHARGING_SPEED.quick}
        </ClientFilterButton>
        <ClientFilterButton
          onClick={togglePrivateStation}
          isChecked={isPrivateStationFilterSelected}
        >
          외부인 개방
        </ClientFilterButton>
      </FlexBox>
    </Container>
  );
};

const Container = styled.div<{ left: number; $basePanel: Panels['basePanel'] }>`
  position: fixed;
  top: ${({ $basePanel }) => ($basePanel ? '16.5px' : '14px')};
  left: ${({ left }) => left}rem;
  z-index: 998;
  padding: 10px;

  display: flex;
  align-items: center;
  column-gap: 40px;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    left: 0;
    gap: 10px;
    flex-direction: column;
    width: 100%;
  }
`;

const ClientFilterButton = styled.button<{ isChecked: boolean }>`
  padding: 0.6rem 1.2rem;
  margin-right: 0.4rem;
  background: ${({ isChecked }) => (isChecked ? '#ccdaff' : '#ffffff')};
  box-shadow:
    0 1px 2px rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);
  border-radius: 16px;
`;

const mobileFilterContainerCss = css`
  margin-top: 4px;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    row-gap: 10px;
  }
`;

export default ClientStationFilters;
