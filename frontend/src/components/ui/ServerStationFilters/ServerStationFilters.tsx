import { css } from 'styled-components';

import { useExternalValue } from '@utils/external-state';

import { serverStationFiltersOpenStore } from '@stores/serverStationFiltersOpenStore';

import FlexBox from '@common/FlexBox';

import { CHARGER_TYPE, CHARGE_SPEEDS, COMPANY_NAME } from '@constants';

import FilterSection from './FilterOption';

const fixedPositionCss = css`
  position: fixed;
  left: 7rem;
  top: 0;
  z-index: 999;
`;

const paddingCss = css`
  padding: 1.5rem 1rem;
`;

const overFlowCss = css`
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ServerStationFilters = () => {
  const isOpen = useExternalValue(serverStationFiltersOpenStore);

  if (!isOpen) return <></>;

  return (
    <FlexBox
      width={28}
      height={'100vh'}
      direction={'column'}
      alignItems={'center'}
      background={'white'}
      css={`
        ${fixedPositionCss}${paddingCss}${overFlowCss}
      `}
      nowrap={true}
      gap={6}
    >
      <FilterSection title={'커넥터 타입'} filterOptions={Object.values(CHARGER_TYPE)} />
      <FilterSection
        title={'충전 속도'}
        filterOptions={CHARGE_SPEEDS.map(String)}
        filterButtonVariant={'sm'}
      />
      <FilterSection title={'충전 사업자'} filterOptions={Object.values(COMPANY_NAME)} />
    </FlexBox>
  );
};

export default ServerStationFilters;
