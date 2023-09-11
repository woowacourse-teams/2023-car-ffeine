import { useQueryClient } from '@tanstack/react-query';

import { serverStationFilterAction } from '@stores/station-filters/serverStationFiltersStore';

import { useCarFilters } from '@hooks/tanstack-query/station-filters/useCarFilters';
import { useMemberFilters } from '@hooks/tanstack-query/station-filters/useMemberFilters';

import { QUERY_KEY_STATION_MARKERS } from '@constants/queryKeys';

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

export default UserFilterListener;
