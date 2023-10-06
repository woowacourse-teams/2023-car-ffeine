import { css, styled } from 'styled-components';

import { useExternalState, useExternalValue } from '@utils/external-state';
import { getTypedObjectKeys } from '@utils/getTypedObjectKeys';

import { deltaAreaStore } from '@stores/google-maps/zoomStore';
import { navigationBarPanelStore } from '@stores/layout/navigationBarPanelStore';
import { toastActions } from '@stores/layout/toastStore';
import type { ClientStationFilter } from '@stores/station-filters/clientStationFiltersStore';
import { clientStationFiltersStore } from '@stores/station-filters/clientStationFiltersStore';

import useMediaQueries from '@hooks/useMediaQueries';

import FlexBox from '@common/FlexBox';

import { MOBILE_BREAKPOINT, NAVIGATOR_PANEL_WIDTH } from '@constants';

import StationSearchBar from './StationSearchWindow/StationSearchBar';

const ADDITIONAL_MARGIN = 8;

const ClientStationFilters = () => {
  const screen = useMediaQueries();
  const [filterOptions, setFilterOptions] = useExternalState(clientStationFiltersStore);
  const { basePanel, lastPanel } = useExternalValue(navigationBarPanelStore);
  const zoom = useExternalValue(deltaAreaStore);

  const navigationComponentWidth =
    (basePanel === null ? 0 : NAVIGATOR_PANEL_WIDTH) +
    (lastPanel === null ? 0 : NAVIGATOR_PANEL_WIDTH) +
    ADDITIONAL_MARGIN;

  const toggleFilterOption = (filterKey: keyof ClientStationFilter) => {
    setFilterOptions((prev) => {
      toastActions.showToast(
        prev[filterKey].isAvailable ? '필터가 해제되었습니다.' : '필터가 적용되었습니다.',
        prev[filterKey].isAvailable ? 'secondary' : 'primary'
      );

      return {
        ...prev,
        [filterKey]: {
          ...prev[filterKey],
          isAvailable: !prev[filterKey].isAvailable,
        },
      };
    });
  };

  return (
    <Container left={navigationComponentWidth}>
      {screen.get('isMobile') ? <StationSearchBar /> : !basePanel && <StationSearchBar />}
      <FlexBox css={filterContainerCss}>
        {getTypedObjectKeys(filterOptions).map((filterKey) => (
          <ClientFilterButton
            key={filterKey}
            onClick={() => toggleFilterOption(filterKey)}
            $isChecked={filterOptions[filterKey].isAvailable}
          >
            {filterOptions[filterKey].label}
          </ClientFilterButton>
        ))}
      </FlexBox>
    </Container>
  );
};

const Container = styled.div<{
  left: number;
}>`
  position: fixed;
  top: 14px;
  left: ${({ left }) => left}rem;
  z-index: 998;
  padding: 10px;
  display: flex;
  align-items: start;
  column-gap: 40px;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    left: 0;
    gap: 10px;
    flex-direction: column;
    width: 100%;
  }
`;

const ClientFilterButton = styled.button<{
  $isChecked: boolean;
}>`
  padding: 0.6rem 1.6rem;
  background: ${({ $isChecked }) => ($isChecked ? '#ccdaff' : '#fff')};
  box-shadow:
    0 1px 2px rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);
  border-radius: 16px;
`;

const filterContainerCss = css`
  gap: 10px;
  border-radius: 0;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    flex-wrap: nowrap;
    width: 100%;
    padding: 0 0.4rem 1rem;
    overflow-x: auto;

    & > button {
      flex: none;
    }
  }
`;

export default ClientStationFilters;
