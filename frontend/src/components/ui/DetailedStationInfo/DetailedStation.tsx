import { styled } from 'styled-components';

import { CHARGER_TYPES } from '@constants';

import type { StationDetails } from '../../../types';

export interface DetailedStationProps {
  station: StationDetails;
}

const DetailedStation = ({ station }: DetailedStationProps) => {
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
    reportCount,
  } = station;

  return (
    <Container>
      <h2>{stationName}</h2>
      <p>{companyName}</p>
      <p>{address}</p>
      {detailLocation && <p>{detailLocation}</p>}
      {operatingTime && <p>{operatingTime}</p>}
      {stationState && <p>{stationState}</p>}
      {contact && <p>{contact}</p>}
      {privateReason && <p>{privateReason}</p>}
      <div>
        {isPrivate && <p>이용 제한</p>}
        {isParkingFree && <p>주차무료</p>}
      </div>
      {chargers.map((data, index) => {
        const { type, price, capacity, latestUpdateTime, state, method } = data;

        return (
          <ChargerContainer key={index}>
            <li>{CHARGER_TYPES[type as keyof typeof CHARGER_TYPES]}</li>
            <li>가격: {price}</li>
            <li>{capacity >= 50 ? '급속' : '완속'}</li>
            {latestUpdateTime && <li>{String(latestUpdateTime)}</li>}
            <li>충전기 상태: {state}</li>
            {method && <li>{method}</li>}
          </ChargerContainer>
        );
      })}

      <div>누적 고장 신고 횟수: {reportCount}회</div>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  left: 41rem;
  width: 34rem;
  z-index: 999;
  padding: 10px;
  background-color: white;
  box-shadow: 1px 1px 2px gray;
`;
const ChargerContainer = styled.ul`
  border: 1px solid #000;
`;
export default DetailedStation;
