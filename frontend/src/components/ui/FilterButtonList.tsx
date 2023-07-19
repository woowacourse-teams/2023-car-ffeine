import { styled } from 'styled-components';

import { useExternalState } from '@utils/external-state';

import { stationFilterStore } from '@stores/stationFilterStore';

const FilterButtonList = () => {
  const [
    { showAvailableStationOnly, showFasterChargeStationOnly, showParkingFreeStationOnly },
    setFilterOption,
  ] = useExternalState(stationFilterStore);

  const toggleAvailableStation = () => {
    setFilterOption((prev) => ({
      ...prev,
      showAvailableStationOnly: !prev.showAvailableStationOnly,
    }));
  };

  const toggleParkingFreeStation = () => {
    setFilterOption((prev) => ({
      ...prev,
      showParkingFreeStationOnly: !prev.showParkingFreeStationOnly,
    }));
  };

  const toggleFasterChargeStation = () => {
    setFilterOption((prev) => ({
      ...prev,
      showFasterChargeStationOnly: !prev.showFasterChargeStationOnly,
    }));
  };

  return (
    <Container>
      <Button onClick={toggleAvailableStation} isActive={showAvailableStationOnly}>
        현재 사용 가능
      </Button>
      <Button onClick={toggleParkingFreeStation} isActive={showParkingFreeStationOnly}>
        주차 무료
      </Button>
      <Button onClick={toggleFasterChargeStation} isActive={showFasterChargeStationOnly}>
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
