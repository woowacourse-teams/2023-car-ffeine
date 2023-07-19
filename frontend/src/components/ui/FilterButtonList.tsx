import { styled } from 'styled-components';

import { useExternalState } from '@utils/external-state';

import { stationFilterStore } from '@stores/stationFilterStore';

const FilterButtonList = () => {
  const [
    {
      isShowingAvailableStationOnly,
      isShowingFastChargeStationOnly,
      isShowingParkingFreeStationOnly,
    },
    setFilterOption,
  ] = useExternalState(stationFilterStore);

  const toggleAvailableStation = () => {
    setFilterOption((prev) => ({
      ...prev,
      isShowingAvailableStationOnly: !prev.isShowingAvailableStationOnly,
    }));
  };

  const toggleParkingFreeStation = () => {
    setFilterOption((prev) => ({
      ...prev,
      isShowingParkingFreeStationOnly: !prev.isShowingParkingFreeStationOnly,
    }));
  };

  const toggleFastChargeStation = () => {
    setFilterOption((prev) => ({
      ...prev,
      isShowingFastChargeStationOnly: !prev.isShowingFastChargeStationOnly,
    }));
  };

  return (
    <Container>
      <Button onClick={toggleAvailableStation} isActive={isShowingAvailableStationOnly}>
        현재 사용 가능
      </Button>
      <Button onClick={toggleParkingFreeStation} isActive={isShowingParkingFreeStationOnly}>
        주차 무료
      </Button>
      <Button onClick={toggleFastChargeStation} isActive={isShowingFastChargeStationOnly}>
        급속
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
  left: 300px;
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
