import { styled } from 'styled-components';

import { useExternalState } from '@utils/external-state';

import { stationFilterStore } from '@stores/stationFilterStore';

import ButtonNext from '@common/ButtonNext';

import { CHARGING_SPEED } from '@constants';

const ClientStationFilters = () => {
  const [
    {
      isAvailableStationFilterSelected,
      isFastChargeStationFilterSelected,
      isParkingFreeStationFilterSelected,
      isPrivateStationFilterSelected,
    },
    setFilterOption,
  ] = useExternalState(stationFilterStore);

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
    <Container>
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
        외부인 출입 제한
      </ButtonNext>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 10px;
  left: 180px;
  z-index: 998;
  padding: 10px;
  background-color: white;

  display: flex;
  gap: 10px;
`;

export default ClientStationFilters;
