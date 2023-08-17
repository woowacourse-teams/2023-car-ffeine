import { css, styled } from 'styled-components';

import { useExternalState, useExternalValue } from '@utils/external-state';

import { navigationBarPanelStore } from '@stores/layout/navigationBarPanelStore';
import { clientStationFiltersStore } from '@stores/station-filters/clientStationFiltersStore';

import ButtonNext from '@common/ButtonNext';

import { NAVIGATOR_PANEL_WIDTH } from '@constants';
import { CHARGING_SPEED } from '@constants/chargers';

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

  const ADDITIONAL_MARGIN = 10;
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

  return (
    <Container left={navigationComponentWidth}>
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
      <ClientFilterButton onClick={togglePrivateStation} isChecked={isPrivateStationFilterSelected}>
        외부인 개방
      </ClientFilterButton>
    </Container>
  );
};

const Container = styled.div<{ left: number }>`
  position: fixed;
  top: 10px;
  left: ${(props) => props.left}rem;
  z-index: 998;
  padding: 10px;
  //background-color: white;

  display: flex;
  gap: 10px;
`;

const ClientFilterButton = styled.button<{ isChecked: boolean }>`
  padding: 0.6rem 1.2rem;
  margin-right: 0.2rem;
  background: ${({ isChecked }) => (isChecked ? '#ccdaff' : '#ffffff')};
  box-shadow:
    0 1px 2px rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);
  border-radius: 16px;
`;

export default ClientStationFilters;
