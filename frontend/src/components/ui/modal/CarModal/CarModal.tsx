import { css, styled } from 'styled-components';

import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useExternalState } from '@utils/external-state';

import { modalActions } from '@stores/layout/modalStore';
import { toastActions } from '@stores/layout/toastStore';
import { memberInfoStore } from '@stores/login/memberInfoStore';
import { serverStationFilterAction } from '@stores/station-filters/serverStationFiltersStore';

import { useCars } from '@hooks/tanstack-query/car/useCars';

import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Loader from '@common/Loader';
import Text from '@common/Text';

import { QUERY_KEY_STATION_MARKERS } from '@constants/queryKeys';

import { getCarFilters, submitMemberCar, submitMemberFilters } from './fetch';

const CarModal = () => {
  const queryClient = useQueryClient();

  const { data: cars, isLoading } = useCars();
  const { setAllServerStationFilters } = serverStationFilterAction;

  const [memberInfo, setMemberInfo] = useExternalState(memberInfoStore);
  const [carName, setCarName] = useState(memberInfo.car !== null ? memberInfo.car.name : '모델명');
  const [vintage, setVintage] = useState(memberInfo.car !== null ? memberInfo.car.vintage : '연식');

  const handleSelectCarName = (name: string) => {
    setCarName(name);
    setVintage('연식');
  };

  const handleSelectVintage = (vintage: string) => {
    setVintage(vintage);
  };

  const handleFetchCarFilters = async () => {
    if (carName === '모델명') {
      toastActions.showToast('차량 모델명을 선택해주세요', 'error');
      return;
    }

    if (vintage === '연식') {
      toastActions.showToast('차량 연식을 선택해주세요', 'error');
      return;
    }

    try {
      const { carId } = await submitMemberCar(carName, vintage);
      const carFilters = await getCarFilters(carId);
      const memberFilters = await submitMemberFilters(carFilters);

      setAllServerStationFilters(memberFilters);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATION_MARKERS] });
      setMemberInfo((prev) => ({
        ...prev,
        car: {
          ...prev.car,
          name: carName,
          vintage,
        },
      }));

      toastActions.showToast('챠량 등록이 완료되었습니다');
      modalActions.closeModal();
    } catch (error) {
      toastActions.showToast(error.message, 'error');
      modalActions.closeModal();
    }
  };

  if (isLoading || cars === undefined) {
    return (
      <FlexBox direction="column" alignItems="center">
        <Loader size="xxl" />
      </FlexBox>
    );
  }

  const carNames = [...new Set([...(cars ?? []).map((car) => car.name)])];

  return (
    <FlexBox width={34} direction="column" alignItems="center" css={paddingCss}>
      <Text variant="h5" mb={3}>
        차량 선택
      </Text>
      <FlexBox width="100%">
        <FlexBox css={[flexRatioCss, selectBoxCss]}>
          <SelectBox
            options={['모델명', ...carNames]}
            onChange={handleSelectCarName}
            value={carName}
          />
        </FlexBox>
        <FlexBox css={[flexRatioCss, selectBoxCss]}>
          <SelectBox
            options={[
              '연식',
              ...cars
                .filter((car) => car.name === (carName !== '모델명' ? carName : carNames[0]))
                .map((car) => car.vintage),
            ]}
            onChange={handleSelectVintage}
            value={vintage}
          />
        </FlexBox>
      </FlexBox>
      <FlexBox width="100%">
        <ButtonNext onClick={modalActions.closeModal} variant="outlined" css={flexRatioCss}>
          취소
        </ButtonNext>
        <ButtonNext
          onClick={() => {
            try {
              handleFetchCarFilters();
            } catch (error) {
              toastActions.showToast(error.message, 'error');
            }
          }}
          variant="contained"
          css={flexRatioCss}
        >
          등록
        </ButtonNext>
      </FlexBox>
    </FlexBox>
  );
};

const SelectBox = ({
  options,
  onChange,
  value,
}: {
  options: string[];
  onChange: (option: string) => void;
  value: string;
}) => {
  return (
    <StyledSelectBox
      onChange={({ target: { value } }) => {
        onChange(value);
      }}
      value={value}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </StyledSelectBox>
  );
};

const flexRatioCss = css`
  flex: 1;
`;

const selectBoxCss = css`
  height: 4rem;
`;

const paddingCss = css`
  padding: 1rem;
`;

const StyledSelectBox = styled.select`
  flex: 1;
`;

export default CarModal;
