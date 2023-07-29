import { useSelectedStation } from '@hooks/useSelectedStation';

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

  return <DetailedStation station={station} />;
};
export default DetailedStationInfo;
