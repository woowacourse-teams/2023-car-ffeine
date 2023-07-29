import { useSelectedStation } from '@hooks/useSelectedStation';

import Box from '@common/Box';

import DetailedStation from '@ui/DetailedStationInfo/DetailedStation';

/**
 * 이 컴포넌트는 컨테이너의 역할을 하게 될 것입니다.
 */

const DetailedStationInfo = () => {
  const { data: station, isLoading, isError } = useSelectedStation();

  if (isLoading || isError) return <></>;

  /**
   * TODO: 혼잡도도 외부(지금 이 컴포넌트)에서 자식에게 데이터를 주입 해서 렌더링 하는 방식으로 구현이 필요할듯 함. / 1. 데이터 페칭 관련 관심사 분리 가능, 2. 스토리북 테스트 쉬워짐
   */

  return (
    // 여기에서 쓰이는 Box 컴포넌트는 아코디언이 오기 전 까지 임시로 존재합니다. 자식과의 관심사 분리를 위해 분리 조치함.
    <Box
      css={{
        position: 'fixed',
        left: '41rem',
        width: '34rem',
        zIndex: '999',
      }}
    >
      <DetailedStation station={station} />
    </Box>
  );
};

export default DetailedStationInfo;
