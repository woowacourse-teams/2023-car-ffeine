import { useQueryClient } from '@tanstack/react-query';

import StationMarkersContainer from '@marker/StationMarkersContainer';

import { serverStationFilterAction } from '@stores/station-filters/serverStationFiltersStore';

import { useCarFilters } from '@hooks/tanstack-query/station-filters/useCarFilters';
import { useMemberFilters } from '@hooks/tanstack-query/station-filters/useMemberFilters';

import ToastContainer from '@common/Toast/ToastContainer';

import ClientStationFilters from '@ui/ClientStationFilters';
import MapController from '@ui/MapController';
import ModalContainer from '@ui/ModalContainer';
import Navigator from '@ui/Navigator';
import WarningModalContainer from '@ui/WarningModalContainer';

import { QUERY_KEY_STATION_MARKERS } from '@constants/queryKeys';

import CarFfeineMapListener from './CarFfeineListener';

const CarFfeineMap = () => {
  return (
    <>
      <CarFfeineMapListener />
      <UserFilterListener />

      <ToastContainer />
      <ModalContainer />

      <Navigator />
      <ClientStationFilters />
      <MapController />

      <WarningModalContainer />
      <StationMarkersContainer />
    </>
  );
};

const UserFilterListener = () => {
  const queryClient = useQueryClient();
  const { data: memberFilters } = useMemberFilters();
  const { data: carFilters } = useCarFilters();
  const { setAllServerStationFilters } = serverStationFilterAction;

  if (memberFilters !== undefined) {
    setAllServerStationFilters(memberFilters);
    setAllServerStationFilters(carFilters);
    queryClient.invalidateQueries([{ queryKey: [QUERY_KEY_STATION_MARKERS] }]);
  }

  return <></>;
};

export default CarFfeineMap;
