import { XMarkIcon } from '@heroicons/react/24/outline';

import { useState } from 'react';

import IndexedDBUtil from '@utils/IndexedDBUtil';

import { modalActions } from '@stores/layout/modalStore';

import Box from '@common/Box';
import Button from '@common/Button';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

const regionList = [
  'seoul',
  'incheon',
  'gwangju',
  'daegu',
  'ulsan',
  'daejeon',
  'busan',
  'gyeonggi',
  'gangwon',
  'chungnam',
  'chungbuk',
  'gyeongbuk',
  'gyeongnam',
  'jeonbuk',
  'jeonnam',
  'jeju',
] as const;
type RegionType = (typeof regionList)[number];

const DeveloperModeModal = () => {
  const dbUtil = new IndexedDBUtil('carffeineDB', 1);
  const [isFetchingStationsLoading, setIsFetchingStationsLoading] = useState(false);

  const fetchStationsData = async (region: RegionType) => {
    const response = await fetch(
      `https://raw.githubusercontent.com/car-ffeine/json-backup/main/real_station_${region}.json`
    );
    const data = await response.json();
    return data;
  };

  const removeAllStationsData = () => {
    dbUtil
      .open()
      .then(() => {
        return dbUtil.removeAllData('stations');
      })
      .then(() => {
        alert('모든 데이터가 삭제되었습니다!');
      })
      .then(() => {
        dbUtil.close();
      });
  };

  const loadStationsData = async () => {
    setIsFetchingStationsLoading(true);
    dbUtil
      .open()
      .then(() => {
        return dbUtil.removeAllData('stations');
      })
      .then(() => {
        const fetchPromises = regionList.map(async (region) => {
          const data = await fetchStationsData(region);
          return data;
        });

        return Promise.all(fetchPromises);
      })
      .then((dataList) => {
        const mergedData = dataList.reduce((acc, data) => [...acc, ...data], []);
        return dbUtil.addMultipleData('stations', mergedData);
      })
      .then(() => {
        alert('데이터 수신 및 추가 성공!');
        setIsFetchingStationsLoading(false);
        dbUtil.close();
      });
  };

  return (
    <FlexBox
      tag="section"
      direction="column"
      justifyContent="center"
      alignItems="center"
      maxWidth={32}
      width="calc(100vw - 4rem)"
      height="500px"
      px={10}
    >
      <Button mt={-11} mr={-6} mb={-1} ml="auto" onClick={modalActions.closeModal}>
        <XMarkIcon width={28} />
      </Button>

      <Box my={2}>
        <Text mb={2}>신규 수신 전에 초기화를 해주세요.</Text>
        <ButtonNext size="sm" color="error" onClick={removeAllStationsData}>
          전국 충전소 데이터 초기화
        </ButtonNext>
      </Box>
      <Box my={2}>
        <Text mb={2}>로드하는데 시간이 좀 걸립니다.</Text>
        <ButtonNext size="sm" onClick={loadStationsData} disabled={isFetchingStationsLoading}>
          {isFetchingStationsLoading ? '수신중...' : '전국 충전소 데이터 수신/저장'}
        </ButtonNext>
        <Text mb={2}>
          처리 이후에는 새로고침을 반드시 해주셔야합니다. (개발자 탭 / Application / Storage /
          IndexedDB / carffeineDB)
        </Text>
      </Box>
    </FlexBox>
  );
};
export default DeveloperModeModal;
