import type { Station } from 'types';

interface Props {
  station: Station;
}

const BriefStationInfo = ({ station }: Props) => {
  const slowChargerCount = station.chargers.filter((charger) => charger.type === '완속').length;
  const fastChargerCount = station.chargers.length - slowChargerCount;

  const handleOpenStationDetail = () => {
    console.log('야미 형님 여기서 상세 정보 불러오기 작업하시면 됩니다');
  };

  return (
    <div style={{ minWidth: '200px' }}>
      <div>{station.companyName}</div>
      <div>{station.stationName}</div>
      <div>{station.detailLocation}</div>

      <div style={{ display: 'flex', gap: 10 }}>
        {station.isParkingFree && <div>주차 무료</div>}
        {station.isPrivate && <div>이용 제한</div>}
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
