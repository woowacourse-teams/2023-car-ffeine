import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { serverStore } from '@stores/config/serverStore';
import { modalActions } from '@stores/layout/modalStore';
import { toastActions } from '@stores/layout/toastStore';
import { memberInfoStore } from '@stores/login/memberInfoStore';
import { memberTokenStore } from '@stores/login/memberTokenStore';
import { serverStationFilterAction } from '@stores/station-filters/serverStationFiltersStore';

import { useCars } from '@hooks/tanstack-query/car/useCarInfo';
import type { ServerStationFilters } from '@hooks/tanstack-query/station-filters/useServerStationFilters';

import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import LogoIcon from '@ui/Svg/LogoIcon';

import { SERVERS } from '@constants';
import { QUERY_KEY_STATIONS } from '@constants/queryKeys';

import type { StationFilters } from '@type';

const CarModal = () => {
  const queryClient = useQueryClient();

  const { data: cars, isLoading } = useCars();
  const { getAllServerStationFilters, setCarFilters, setAllServerStationFilters } =
    serverStationFilterAction;

  const memberId = memberInfoStore.getState()?.memberId;
  const memberToken = memberTokenStore.getState();

  const { closeModal } = modalActions;

  const [carName, setCarName] = useState('');
  const [vintage, setVintage] = useState('');
  const [carId, setCarId] = useState<number>();

  const handleSelectCarName = (name: string) => {
    setCarName(name);
  };

  const handleSelectVintage = (vintage: string) => {
    setVintage(vintage);
  };

  const getCarId = () => {
    const selectedCar = cars.find((car) => car.name === carName && car.vintage === vintage);

    return selectedCar.carId;
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

    const mode = serverStore.getState();
    const carFilters = await fetch(`${SERVERS[mode]}/cars/${carId}/filters`).then<
      Omit<ServerStationFilters, 'companies'>
    >((response) => response.json());

    setCarFilters(carFilters);

    if (memberId === undefined) {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATIONS] });
      return;
    }

    const memberFilters = await fetch(`${SERVERS[mode]}/members/${memberId}/filters`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${memberToken}`,
      },
      body: JSON.stringify(getAllServerStationFilters()),
    }).then<StationFilters>((response) => response.json());

    setAllServerStationFilters(memberFilters);
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATIONS] });

    toastActions.showToast('챠량 등록이 완료되었습니다');

    closeModal();
  };

  useEffect(() => {
    if (carName !== '' && vintage !== '') {
      const carId = getCarId();

      console.log(carId);

      setCarId(carId);
    }
  }, [carName, vintage]);

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
        <ButtonNext onClick={handleFetchCarFilters} variant="outlined" color="success">
          등록
        </ButtonNext>
        <ButtonNext variant="outlined" color="error">
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
