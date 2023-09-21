import { render } from '@testing-library/react';

import type { StationMarker } from '@type';

import { CarFfeineMarker } from './CarFfeineMarker';

describe('CarFfeineMarker 컴포넌트 테스트', () => {
  it('CarFfeineMarker 컴포넌트가 렌더링 된다.', () => {
    const stationMarker: StationMarker = {
      availableCount: 0,
      isParkingFree: false,
      isPrivate: false,
      latitude: 0,
      longitude: 0,
      quickChargerCount: 0,
      stationId: '',
      stationName: '',
    };
    render(<CarFfeineMarker {...stationMarker} />);
  });
  it('CarFfeineMarker의 사용 가능 충전기 숫자가 렌더링 된다.', () => {
    const stationMarker: StationMarker = {
      availableCount: 10,
      isParkingFree: false,
      isPrivate: false,
      latitude: 0,
      longitude: 0,
      quickChargerCount: 0,
      stationId: '',
      stationName: '',
    };
    const { getByText } = render(<CarFfeineMarker {...stationMarker} />);
    expect(getByText('10')).toBeInTheDocument();
  });
});
