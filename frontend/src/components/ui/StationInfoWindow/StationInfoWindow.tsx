import type { MouseEvent } from 'react';

import { useExternalValue } from '@utils/external-state';

import { getStationInfoWindowStore } from '@stores/google-maps/stationInfoWindowStore';

import FlexBox from '@common/FlexBox';
import Loader from '@common/Loader';

import { useNavigationBar } from '@ui/Navigator/NavigationBar/hooks/useNavigationBar';

import StationDetailsWindow from '../StationDetailsWindow';
import StationInfo from './StationInfo';
import { useFetchStationDetails } from './useFetchStationDetails';

export interface StationInfoWindowProps {
  selectedStationId: string;
}

const StationInfoWindow = ({ selectedStationId }: StationInfoWindowProps) => {
  const infoWindowInstance = useExternalValue(getStationInfoWindowStore());
  const { openLastPanel } = useNavigationBar();

  const { stationDetails, isLoading } = useFetchStationDetails(selectedStationId);

  const handleOpenStationDetail = () => {
    openLastPanel(<StationDetailsWindow stationId={selectedStationId} />);
  };

  const handleCloseStationWindow = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    infoWindowInstance.infoWindowInstance.close();
  };

  /**
   * TODO: 추후에 스테이션 상세 정보를 불러오는데 실패했을 때의 처리를 추가해야 합니다.
   */

  if (isLoading || stationDetails === null) {
    return (
      <FlexBox justifyContent="center" alignItems="center" height="17.52rem">
        <Loader size="xxl" />
      </FlexBox>
    );
  }

  return (
    <StationInfo
      stationDetails={stationDetails}
      handleOpenStationDetail={handleOpenStationDetail}
      handleCloseStationWindow={handleCloseStationWindow}
    />
  );
};

export default StationInfoWindow;
