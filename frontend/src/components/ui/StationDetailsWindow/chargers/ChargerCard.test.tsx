import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { calculateLatestUpdateTime } from '@utils/index';

import type { ChargerDetails } from '@type';

import ChargerCard from './ChargerCard';

describe('calculateLatestUpdateTime test', () => {
  it('1분 미만의 시간 차이일 때 "방금 전"을 표시합니다', () => {
    const currentDateTime = new Date();
    const latestUpdatedDateTime = new Date(currentDateTime);
    latestUpdatedDateTime.setSeconds(currentDateTime.getSeconds() - 30);

    expect(calculateLatestUpdateTime(latestUpdatedDateTime.toISOString())).toBe('방금 전');
  });

  it('1시간 미만의 시간 차이일 때 "n분 전"을 표시합니다', () => {
    const currentDateTime = new Date();
    const latestUpdatedDateTime = new Date(currentDateTime);
    latestUpdatedDateTime.setMinutes(currentDateTime.getMinutes() - 45);

    expect(calculateLatestUpdateTime(latestUpdatedDateTime.toISOString())).toBe('45분 전');
  });

  it('1일 미만의 시간 차이일 때 "n시간 전"을 표시합니다', () => {
    const currentDateTime = new Date();
    const latestUpdatedDateTime = new Date(currentDateTime);
    latestUpdatedDateTime.setHours(currentDateTime.getHours() - 12);

    expect(calculateLatestUpdateTime(latestUpdatedDateTime.toISOString())).toBe('12시간 전');
  });

  it('1일 이상의 시간 차이일 때 "n일 전"을 표시합니다', () => {
    const currentDateTime = new Date();
    const latestUpdatedDateTime = new Date(currentDateTime);
    latestUpdatedDateTime.setDate(currentDateTime.getDate() - 3);

    expect(calculateLatestUpdateTime(latestUpdatedDateTime.toISOString())).toBe('3일 전');
  });

  // it('충전기 상태 메시지를 표시합니다', () => {
  //   const charger: ChargerDetails = {
  //     capacity: undefined,
  //     latestUpdateTime: '',
  //     method: undefined,
  //     price: 0,
  //     state: 'COMMUNICATION_ERROR',
  //     type: undefined,
  //   };
  //   render(<ChargerCard charger={charger} />);
  //   const chargerCard = screen.getByText('마지막 통신');
  //   expect(chargerCard).toBeInTheDocument();
  // });
});
