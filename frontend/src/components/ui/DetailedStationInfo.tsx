import { styled } from 'styled-components';

import { useSelectedStation } from '@hooks/useSelectedStation';

const DetailedStationInfo = () => {
  const { data: station, isLoading, isError } = useSelectedStation();

  if (isLoading || isError) return <></>;

  const {
    stationName,
    companyName,
    contact,
    chargers,
    isParkingFree,
    operatingTime,
    address,
    detailLocation,
    isPrivate,
    stationState,
    privateReason,
  } = station;

  return (
    <Container>
      <h2>{stationName}</h2>
      <p>{companyName}</p>
      <p>{address}</p>
      <p>{detailLocation}</p>
      <p>{operatingTime}</p>
      <p>{stationState}</p>
      <p>{contact}</p>
      <p>{privateReason}</p>
      <ul>
        <li>{isPrivate}</li>
        <li>{isParkingFree}</li>
      </ul>
      {chargers.map((data, index) => {
        const { type, price, capacity, latestUpdateTime, state, method } = data;

        return (
          <ul key={index}>
            <li>{type}</li>
            <li>{price}</li>
            <li>{capacity}</li>
            <li>{String(latestUpdateTime)}</li>
            <li>{state}</li>
            <li>{method}</li>
          </ul>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 80px;
  left: 180px;
  z-index: 999;
  padding: 10px;
  background-color: white;
  box-shadow: 1px 1px 2px gray;
`;

export default DetailedStationInfo;
