import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';

import type { StationDetails } from '@type';

import StationReportConfirmation from './StationReportConfirmation';

jest.mock('@hooks/tanstack-query/station-details/reports/useUpdateStationReport', () => ({
  useUpdateStationReport: () => ({
    updateStationReport: jest.fn(),
    isLoading: false,
  }),
}));

describe('StationReportConfirmation 테스트', () => {
  const mockStation: StationDetails = {
    address: '',
    chargers: [],
    companyName: '',
    contact: '',
    detailLocation: '',
    isParkingFree: true,
    isPrivate: false,
    latitude: 0,
    longitude: 0,
    operatingTime: '',
    privateReason: '',
    reportCount: 0,
    stationId: '',
    stationName: '',
    stationState: '',
  };

  it('초기 렌더링 테스트', () => {
    const { getByText, getByTestId } = render(<StationReportConfirmation station={mockStation} />);

    expect(getByText('도로명 주소')).toBeInTheDocument();
    expect(getByText('상세주소')).toBeInTheDocument();

    expect(getByTestId('isParkingFree-checkbox')).toBeChecked();
    expect(getByTestId('isPrivate-checkbox')).not.toBeChecked();

    expect(getByText('제안하기')).toBeInTheDocument();
    expect(getByText('돌아가기')).toBeInTheDocument();
  });

  it('체크박스들이 눌렸을 때 반응하는지 확인한다', () => {
    const { getByTestId } = render(<StationReportConfirmation station={mockStation} />);

    const isParkingFreeCheckbox = getByTestId('isParkingFree-checkbox');
    fireEvent.click(isParkingFreeCheckbox);

    expect(isParkingFreeCheckbox).not.toBeChecked();

    const isPrivateCheckbox = getByTestId('isPrivate-checkbox');
    fireEvent.click(isPrivateCheckbox);

    expect(isPrivateCheckbox).toBeChecked();
  });
});
