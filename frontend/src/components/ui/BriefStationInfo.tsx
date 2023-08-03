import { useSetExternalState } from '@utils/external-state';

import { forceOpenAccordionPanelStore } from '@stores/forceOpenAccordionPanelStore';
import { selectedStationIdStore } from '@stores/selectedStationStore';

import { CHARGING_SPEED } from '@constants';

import type { StationSummary } from 'types';

interface Props {
  station: StationSummary;
}

const BriefStationInfo = ({ station }: Props) => {
  const setSelectedStationId = useSetExternalState(selectedStationIdStore);
  const setForceOpenAccordionPanel = useSetExternalState(forceOpenAccordionPanelStore);

  const {
    stationId,
    chargers,
    companyName,
    stationName,
    detailLocation,
    isParkingFree,
    isPrivate,
  } = station;

  const slowChargerCount = chargers.filter((charger) => charger.capacity < 50).length;
  const fastChargerCount = chargers.length - slowChargerCount;

  const handleOpenStationDetail = () => {
    setSelectedStationId(stationId);
    setForceOpenAccordionPanel(true);
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
        {slowChargerCount > 0 && (
          <div>
            {CHARGING_SPEED.STANDARD}: {slowChargerCount}개
          </div>
        )}
        {fastChargerCount > 0 && (
          <div>
            {CHARGING_SPEED.QUICK}: {fastChargerCount}개
          </div>
        )}
      </div>

      <button style={{ width: '100%' }} onClick={handleOpenStationDetail}>
        상세보기
      </button>
    </div>
  );
};

export default BriefStationInfo;
