import { ArrowRightOnRectangleIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import ProfileMenu from 'components/ui/Navigator/ProfileMenu';

import type { PropsWithChildren } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { logout } from '@utils/login';

import { modalActions } from '@stores/layout/modalStore';
import {
  selectedCapacitiesFilterStore,
  selectedCompaniesFilterStore,
  selectedConnectorTypesFilterStore,
} from '@stores/station-filters/serverStationFiltersStore';

import CarModal from '@ui/modal/CarModal/CarModal';

import { QUERY_KEY_STATION_MARKERS } from '@constants/queryKeys';

const PersonalMenu = () => {
  const queryClient = useQueryClient();
  const { openModal } = modalActions;

  const personalMenus: PropsWithChildren<{ onClick: () => void }>[] = [
    {
      children: (
        <>
          <PencilSquareIcon width="1.8rem" color="#333" /> 차량등록
        </>
      ),
      onClick: () => {
        openModal(<CarModal />);
      },
    },
    {
      children: (
        <>
          <ArrowRightOnRectangleIcon width="1.8rem" color="#333" /> 로그아웃
        </>
      ),
      onClick: () => {
        logout();

        selectedCapacitiesFilterStore.setState(new Set([]));
        selectedConnectorTypesFilterStore.setState(new Set([]));
        selectedCompaniesFilterStore.setState(new Set([]));

        queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATION_MARKERS] });
      },
    },
  ];

  return <ProfileMenu menus={personalMenus} />;
};
export default PersonalMenu;
