import { styled } from 'styled-components';

import { useExternalState } from '@utils/external-state';

import { stationFilterStore } from '@stores/stationFilterStore';

const FilterButtonList = () => {
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
      <Button onClick={toggleAvailableStation} isActive={isAvailableStationFilterSelected}>
        현재 사용 가능
      </Button>
      <Button onClick={toggleParkingFreeStation} isActive={isParkingFreeStationFilterSelected}>
        주차 무료
      </Button>
      <Button onClick={toggleFastChargeStation} isActive={isFastChargeStationFilterSelected}>
        급속
      </Button>
      <Button onClick={togglePrivateStation} isActive={isPrivateStationFilterSelected}>
        외부인 출입 제한
      </Button>
    </Container>
  );
};

interface ButtonProps {
  isActive: boolean;
}

const Container = styled.div`
  position: fixed;
  top: 10px;
  left: 180px;
  z-index: 999;
  padding: 10px;
  background-color: white;
  box-shadow: 1px 1px 2px gray;

  display: flex;
  gap: 10px;
`;

const Button = styled.button<ButtonProps>`
  border: 1px solid;
  border-radius: 5px;
  padding: 10px;

  color: ${(props) => (props.isActive ? 'white' : 'black')};
  background-color: ${(props) => (props.isActive ? 'black' : 'white')};
`;

export default FilterButtonList;
