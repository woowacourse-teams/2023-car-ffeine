import type { Differences } from '@ui/StationDetailsWindow/reports/StationReportConfirmation';
import { findDifferentKeys } from '@ui/StationDetailsWindow/reports/domain';

describe('findDifferentKeys()', () => {
  test.each([
    // case 1
    [
      {
        address: '',
        companyName: '',
        contact: '',
        detailLocation: '',
        isParkingFree: false,
        isPrivate: false,
        latitude: 0,
        longitude: 0,
        operatingTime: '',
        privateReason: '',
        reportCount: 0,
        stationId: 0,
        stationName: '',
        stationState: '',
      },
      {
        address: '',
        companyName: '',
        contact: '',
        detailLocation: '',
        isParkingFree: false,
        isPrivate: false,
        latitude: 0,
        longitude: 0,
        operatingTime: '',
        privateReason: '',
        reportCount: 0,
        stationId: 0,
        stationName: '',
        stationState: '',
      },
      0,
    ],
    // case 2
    [
      {
        address: '',
        companyName: '',
        contact: '',
        detailLocation: '',
        isParkingFree: false,
        isPrivate: false,
        latitude: 0,
        longitude: 0,
        operatingTime: '',
        privateReason: '',
        reportCount: 0,
        stationId: 0,
        stationName: '',
        stationState: '',
      },
      {
        address: '',
        companyName: '',
        contact: '',
        detailLocation: '',
        isParkingFree: false,
        isPrivate: false,
        latitude: 0,
        longitude: 0,
        operatingTime: '',
        privateReason: '',
        reportCount: 1,
        stationId: 0,
        stationName: '',
        stationState: '',
      },
      1,
    ],
    // case 3
    [
      {
        address: '',
        companyName: '',
        contact: '',
        detailLocation: '',
        isParkingFree: false,
        isPrivate: false,
        latitude: 0,
        longitude: 0,
        operatingTime: '',
        privateReason: '',
        reportCount: 0,
        stationId: 0,
        stationName: '',
        stationState: '',
      },
      {
        address: '',
        companyName: 'X Corp',
        contact: '',
        detailLocation: '우리집',
        isParkingFree: true,
        isPrivate: false,
        latitude: 1.23,
        longitude: 4.56,
        operatingTime: '매일매일',
        privateReason: '',
        reportCount: 1,
        stationId: 10,
        stationName: 'X 충전소',
        stationState: '운영중임?',
      },
      10,
    ],
  ])('findDifferentKeys() with different objects', (form, station, expectedDifferentCount) => {
    const differentKeys = findDifferentKeys(form, station);
    expect(differentKeys.length).toBe(expectedDifferentCount);

    const differencesArray: Differences[] = differentKeys.map((key) => ({
      category: key,
      reportedDetail: form[key],
    }));

    expect(differencesArray.length).toBe(expectedDifferentCount);
  });
});
