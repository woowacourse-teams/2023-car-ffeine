import { useSetExternalState } from '@utils/external-state';

import { selectedStationIdStore } from '@stores/selectedStationStore';

import type { StationSummary } from 'types';

interface Props {
  station: StationSummary;
}

const BriefStationInfo = ({ station }: Props) => {
  const setSelectedStationId = useSetExternalState(selectedStationIdStore);

  const {
    stationId,
    chargers,
    companyName,
    stationName,
    detailLocation,
    isParkingFree,
    isPrivate,
  } = station;

  const slowChargerCount = chargers.filter((charger) => charger.type === '완속').length;
  const fastChargerCount = chargers.length - slowChargerCount;

  const handleOpenStationDetail = () => {
    setSelectedStationId(stationId);
  };

  return (
    <div style={{ minWidth: '200px' }}>
      <div>{companyName}</div>
      <div>{stationName}</div>
      <div>{detailLocation}</div>

      <div style={{ display: 'flex', gap: 10 }}>
        {isParkingFree && <div>주차 무료</div>}
        {isPrivate && <div>이용 제한</div>}
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        {slowChargerCount > 0 && <div>완속: {slowChargerCount}개</div>}
        {fastChargerCount > 0 && <div>급속: {fastChargerCount}개</div>}
      </div>

      <button style={{ width: '100%' }} onClick={handleOpenStationDetail}>
        상세보기
      </button>
    </div>
  );
};

export default BriefStationInfo;
