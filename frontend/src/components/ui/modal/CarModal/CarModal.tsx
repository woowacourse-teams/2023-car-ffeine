import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { serverStore } from '@stores/config/serverStore';
import { modalActions } from '@stores/layout/modalStore';
import { toastActions } from '@stores/layout/toastStore';
import { memberInfoStore } from '@stores/login/memberInfoStore';
import { memberTokenStore } from '@stores/login/memberTokenStore';
import { serverStationFilterAction } from '@stores/station-filters/serverStationFiltersStore';

import { useCars } from '@hooks/tanstack-query/car/useCars';

import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import LogoIcon from '@ui/Svg/LogoIcon';

import { SERVERS } from '@constants';
import { QUERY_KEY_STATIONS } from '@constants/queryKeys';

import type { StationFilters } from '@type';
import type { Car } from '@type/cars';

import { getCarFilters, submitMemberCar, submitMemberFilters } from './fetch';

const CarModal = () => {
  const queryClient = useQueryClient();

  const { data: cars, isLoading } = useCars();
  const { setAllServerStationFilters } = serverStationFilterAction;

  const [carName, setCarName] = useState('');
  const [vintage, setVintage] = useState('');

  const handleSelectCarName = (name: string) => {
    setCarName(name);
  };

  const handleSelectVintage = (vintage: string) => {
    setVintage(vintage);
  };

  const handleFetchCarFilters = async () => {
    if (carName === '') {
      toastActions.showToast('차량 모델명을 선택해주세요', 'error');
      return;
    }

    if (vintage === '') {
      toastActions.showToast('차량 연식을 선택해주세요', 'error');
      return;
    }

    try {
      const { carId } = await submitMemberCar(carName, vintage);
      const carFilters = await getCarFilters(carId);
      const memberFilters = await submitMemberFilters(carFilters);

      setAllServerStationFilters(memberFilters);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATIONS] });

      toastActions.showToast('챠량 등록이 완료되었습니다');
      modalActions.closeModal();
    } catch (error) {
      toastActions.showToast(error.message, 'error');
    }
  };

  if (isLoading || cars === undefined) {
    return (
      <FlexBox direction="column" alignItems="center">
        <LogoIcon width={10} />
        <Text variant="h5">로딩중...</Text>
      </FlexBox>
    );
  }

  const carNames = [...new Set([...(cars ?? []).map((car) => car.name)])];

  return (
    <FlexBox direction="column" alignItems="center">
      <FlexBox>
        <SelectBox options={['모델명', ...carNames]} onChange={handleSelectCarName} />
        <SelectBox
          options={[
            '연식',
            ...cars
              .filter((car) => car.name === (carName !== '' ? carName : carNames[0]))
              .map((car) => car.vintage),
          ]}
          onChange={handleSelectVintage}
        />
      </FlexBox>
      <FlexBox>
        <ButtonNext
          onClick={() => {
            try {
              handleFetchCarFilters();
            } catch (error) {
              console.log(error);
              toastActions.showToast(error.message, 'error');
            }
          }}
          variant="outlined"
          color="success"
        >
          등록
        </ButtonNext>
        <ButtonNext onClick={modalActions.closeModal} variant="outlined" color="error">
          취소
        </ButtonNext>
      </FlexBox>
    </FlexBox>
  );
};

const SelectBox = ({
  options,
  onChange,
}: {
  options: string[];
  onChange: (option: string) => void;
}) => {
  return (
    <select
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default CarModal;
