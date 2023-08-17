import { styled } from 'styled-components';

import { useExternalState } from '@utils/external-state';
import { getNavigationComponentWidth } from '@utils/google-maps/getCalculatedMapDelta';

import { clientStationFiltersStore } from '@stores/station-filters/clientStationFiltersStore';

import ButtonNext from '@common/ButtonNext';

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
  const navigationComponentWidth = getNavigationComponentWidth() + ADDITIONAL_MARGIN;

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
      <ButtonNext
        onClick={toggleAvailableStation}
        variant={isAvailableStationFilterSelected ? 'contained' : 'outlined'}
        color="dark"
        size="sm"
      >
        현재 사용 가능
      </ButtonNext>
      <ButtonNext
        onClick={toggleParkingFreeStation}
        variant={isParkingFreeStationFilterSelected ? 'contained' : 'outlined'}
        color="dark"
        size="sm"
      >
        주차 무료
      </ButtonNext>
      <ButtonNext
        onClick={toggleFastChargeStation}
        variant={isFastChargeStationFilterSelected ? 'contained' : 'outlined'}
        color="dark"
        size="sm"
      >
        {CHARGING_SPEED.quick}
      </ButtonNext>
      <ButtonNext
        onClick={togglePrivateStation}
        variant={isPrivateStationFilterSelected ? 'contained' : 'outlined'}
        color="dark"
        size="sm"
      >
        외부인 개방
      </ButtonNext>
    </Container>
  );
};

const Container = styled.div<{ left: number }>`
  position: fixed;
  top: 10px;
  left: ${(props) => props.left}rem;
  z-index: 998;
  padding: 10px;
  background-color: white;

  display: flex;
  gap: 10px;
`;

export default ClientStationFilters;
